// src/controllers/user.controller.js
import { supabaseAdmin as supabase } from "../config/db.js";
import bcrypt from "bcrypt";

// --- Vistas de Autenticación (EJS) ---

export const viewRegister = async (req, res) => {
  try {
    const { username, correo, contrasena } = req.body;
    if (!username || !correo || !contrasena) {
      return res.render("register", { error: "Todos los campos son obligatorios." });
    }

    const { data: existingUser, error: searchError } = await supabase
      .from('cuenta_usuario')
      .select('email')
      .eq('email', correo)
      .maybeSingle();

    if (searchError) throw searchError;
    if (existingUser) {
      return res.render("register", { error: "Ya existe una cuenta con este correo." });
    }

    const hash = await bcrypt.hash(contrasena, 10);
    const { data: newUser, error: insertError } = await supabase
      .from('cuenta_usuario')
      .insert([{ username, email: correo, clave: hash, rol: 'lector', estado: 'activa' }])
      .select();

    if (insertError) throw insertError;

    return res.redirect("/auth/login");
  } catch (err) {
    console.error("Error in viewRegister:", err);
    return res.render("register", { error: "Hubo un error en el registro: " + err.message });
  }
};

export const viewLogin = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.render("login", { error: "Completa los campos." });
    }

    const { data: user, error } = await supabase
      .from('cuenta_usuario')
      .select('*')
      .eq('email', correo)
      .single();

    if (error || !user) {
      return res.render("login", { error: "Usuario o contraseña incorrectos." });
    }

    const ok = await bcrypt.compare(contrasena, user.clave);
    if (!ok) {
      return res.render("login", { error: "Usuario o contraseña incorrectos." });
    }

    // Establecer sesión
    req.session.userId = user.id_cuenta_usuario;
    req.session.user = {
        id: user.id_cuenta_usuario,
        username: user.username,
        email: user.email,
        rol: user.rol,
        avatar: user.avatar_url
    };

    return res.redirect("/principal");
  } catch (err) {
    console.error("Error in viewLogin:", err);
    return res.render("login", { error: "Error al iniciar sesión: " + err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;
    if (!correo) {
      return res.render("olvido", { error: "Introduce un correo válido." });
    }

    // Paso 1: Intentamos enviar el correo de recuperación real usando Supabase Auth
    // Nota: Esto funcionará si el correo está registrado en la sección 'Auth' de Supabase.
    // Si no está registrado ahí (solo en tu tabla de DB), Supabase dirá que el proceso fue exitoso por seguridad,
    // pero no enviará el correo.
    const { error } = await supabase.auth.resetPasswordForEmail(correo, {
      redirectTo: `${req.protocol}://${req.get('host')}/auth/update-password`,
    });

    if (error) {
      console.error("Supabase Auth Error:", error.message);
      return res.render("olvido", { error: "Error al enviar correo: " + error.message });
    }

    // Exito - Redirigimos al login con mensaje real
    return res.render("login", {
      error: `¡Correo enviado! Revisa tu bandeja de entrada (${correo}) para restablecer tu clave.`
    });
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    return res.render("olvido", { error: "Ocurrió un error: " + err.message });
  }
};

// --- API Endpoints (JSON) ---

export const apiRegister = async (req, res) => {
  const { username, email, clave } = req.body;
  try {
    const hashedPass = await bcrypt.hash(clave, 10);
    const { data, error } = await supabase
      .from('cuenta_usuario')
      .insert([{ username, email, clave: hashedPass }])
      .select();

    if (error) throw error;
    const newUser = data[0];
    res.status(201).json({ message: "Usuario registrado", id: newUser.id_cuenta_usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const apiLogin = async (req, res) => {
  const { email, clave } = req.body;
  try {
    const { data: rows, error } = await supabase
      .from('cuenta_usuario')
      .select('*')
      .eq('email', email);

    if (error) throw error;
    if (rows.length === 0) return res.status(401).json({ error: "Usuario no encontrado" });

    const user = rows[0];
    const valid = await bcrypt.compare(clave, user.clave);
    if (!valid) return res.status(401).json({ error: "Clave incorrecta" });

    req.session.user = {
      id: user.id_cuenta_usuario,
      username: user.username,
      email: user.email,
      rol: user.rol,
      avatar: user.avatar_url
    };

    res.json({ message: "Inicio de sesión exitoso", user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// --- Perfil de Usuario ---

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const { data: rows, error } = await supabase
      .from('cuenta_usuario')
      .select('username, email, biografia, avatar_url, rol')
      .eq('id_cuenta_usuario', id);

    if (error) throw error;
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, biografia, avatar_url } = req.body;
  try {
    const { error } = await supabase
      .from('cuenta_usuario')
      .update({ username, biografia, avatar_url })
      .eq('id_cuenta_usuario', id);

    if (error) throw error;
    res.json({ message: "Perfil actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
};
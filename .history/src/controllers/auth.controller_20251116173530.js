export const registerUser = (req, res) => {
    const datos = req.body;
    console.log("Datos recibidos:", datos);
    
    // Aquí procesas y guardas en la BD
    res.send("Usuario registrado");
};

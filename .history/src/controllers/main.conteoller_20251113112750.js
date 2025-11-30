// src/controllers/main.controller.js

export const renderHome = (req, res) => {
    res.render("index", { title: "Inicio | Willpig Studio" });
};

export const renderLogin = (req, res) => {
    res.render("login", { title: "Iniciar sesión" });
};

export const renderRegister = (req, res) => {
    res.render("register", { title: "Registro de usuario" });
};

export const renderBiblioteca = (req, res) => {
    res.render("biblioteca", { title: "Tu Biblioteca" });
};

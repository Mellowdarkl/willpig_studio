// src/controllers/main.controller.js
export const renderHome = (req, res) => {
  res.render("pagprincipal"); // sin .ejs ni carpetas
};

export const renderLogin = (req, res) => {
  res.render("login");
};

export const renderRegister = (req, res) => {
  res.render("register");
};

export const renderBiblioteca = (req, res) => {
  res.render("biblioteca");
};

export const renderNewStorys = (req, res) => {
  res.render("newstorys");
};

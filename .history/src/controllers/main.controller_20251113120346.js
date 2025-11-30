// Controlador principal

export const renderHome = (req, res) => {
    res.render("pagprincipal"); // tu index principal
};

export const renderLogin = (req, res) => {
    res.render("login");
};

export const renderRegister = (req, res) => {
    res.render("register");
};

export const renderLibrary = (req, res) => {
    res.render("biblioteca");
};

export const rendernewstorys = (req, res) => {
    res.render("newstorys");
};

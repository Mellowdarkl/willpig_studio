-- ==================================================
-- 🧩 BASE DE DATOS WILLPIG_STUDIO (Optimizada)
-- ==================================================
DROP DATABASE IF EXISTS WILLPIG_studio;
CREATE DATABASE WILLPIG_studio
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE WILLPIG_studio;

CREATE TABLE Cuenta_usuario (
  idCuenta_usuario INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  clave VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) DEFAULT '/public/img/img.ico/user-icon.png',
  biografia TEXT,
  rol ENUM('lector','escritor','admin','moderador') DEFAULT 'lector',
  estado ENUM('activa','suspendida','deshabilitada') DEFAULT 'activa',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

--  CATEGORÍAS Y CATÁLOGOS

CREATE TABLE Categorias (
  idCategoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Catalogos (
  idCatalogo INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

--  CUENTOS Y CAPÍTULOS

CREATE TABLE Cuentos (
  idCuento INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  resumen TEXT,
  url_portada VARCHAR(255),
  estado ENUM('borrador','progreso','publicado') DEFAULT 'borrador',
  visibilidad ENUM('privada','publica') DEFAULT 'publica',
  fecha_creada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizada TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  cantidad_me_gusta INT DEFAULT 0,
  Cuenta_usuario_id INT NOT NULL,
  Categoria_id INT,
  FOREIGN KEY (Cuenta_usuario_id) REFERENCES Cuenta_usuario(idCuenta_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Categoria_id) REFERENCES Categorias(idCategoria)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Capitulos (
  idCapitulo INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  contenido TEXT NOT NULL,
  fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  Cuento_id INT NOT NULL,
  FOREIGN KEY (Cuento_id) REFERENCES Cuentos(idCuento)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- LISTAS Y GUARDADOS

CREATE TABLE Listas_guardados (
  idLista_guardado INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  predeterminado BOOLEAN DEFAULT FALSE,
  fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Cuenta_usuario_id INT NOT NULL,
  FOREIGN KEY (Cuenta_usuario_id) REFERENCES Cuenta_usuario(idCuenta_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

 -- NOTIFICACIONES

CREATE TABLE Notificacion (
  idNotificacion INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('nuevo_seguidor','nuevo_capitulo','comentario','actualizacion') NOT NULL,
  contenido TEXT NOT NULL,
  vista BOOLEAN DEFAULT FALSE,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Cuenta_usuario_id INT NOT NULL,
  FOREIGN KEY (Cuenta_usuario_id) REFERENCES Cuenta_usuario(idCuenta_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
/*
 SEGUIMIENTO (sistema de seguidores) 

CREATE TABLE Seguimiento (
  idSeguimiento INT AUTO_INCREMENT PRIMARY KEY,
  seguidor_id INT NOT NULL,
  seguido_id INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seguidor_id) REFERENCES Cuenta_usuario(idCuenta_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (seguido_id) REFERENCES Cuenta_usuario(idCuenta_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
*/
-- ==================================================
-- 🔗 RELACIONES N:N
-- ==================================================
CREATE TABLE Cuentos_has_Catalogos (
  Cuento_id INT NOT NULL,
  Catalogo_id INT NOT NULL,
  PRIMARY KEY (Cuento_id, Catalogo_id),
  FOREIGN KEY (Cuento_id) REFERENCES Cuentos(idCuento)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Catalogo_id) REFERENCES Catalogos(idCatalogo)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ==================================================
-- 🧪 DATOS DE PRUEBA
-- ==================================================
INSERT INTO Categorias (nombre) VALUES 
('Fantasía'), ('Aventura'), ('Romance'), ('Ciencia Ficción');

INSERT INTO Cuenta_usuario (username, email, clave, biografia)
VALUES 
('lan_writer', 'lan@example.com', 'clave_hash', 'Amante de los libros interactivos.'),
('ana_reader', 'ana@example.com', 'clave_hash', 'Lectora apasionada por la fantasía.');

SET @lan = 1;
SET @ana = 2;

INSERT INTO Cuentos (titulo, resumen, url_portada, estado, Cuenta_usuario_id, Categoria_id)
VALUES 
('El Guardián del Lago', 'Una historia mágica en el corazón de las montañas.', '/public/img/Isla_R.jpg', 'publicado', @lan, 1),
('Sombras del Pasado', 'Un relato oscuro lleno de misterio y redención.', '/public/img/la flor de otoño.jpg', 'publicado', @lan, 2),
('Vientos del Norte', 'Una aventura de descubrimiento y destino.', '/public/img/Bosque_m.jpg', 'publicado', @ana, 2);

INSERT INTO Notificacion (tipo, contenido, vista, Cuenta_usuario_id)
VALUES 
('nuevo_seguidor', '¡Tienes un nuevo seguidor!', FALSE, @lan),
('nuevo_capitulo', 'Se ha publicado un nuevo capítulo en tu historia.', FALSE, @ana);

-- ==================================================
-- ✅ CONSULTAS DE PRUEBA
-- ==================================================
SELECT CU.username, C.titulo, C.estado, C.fecha_creada
FROM Cuenta_usuario CU
JOIN Cuentos C ON CU.idCuenta_usuario = C.Cuenta_usuario_id;

SELECT username, email FROM Cuenta_usuario WHERE estado = 'activa';

SELECT C.titulo, CA.nombre AS categoria 
FROM Cuentos C
LEFT JOIN Categorias CA ON C.Categoria_id = CA.idCategoria;

CREATE DATABASE libreria;
	
USE libreria;

CREATE TABLE autores (
id_autor INT PRIMARY KEY IDENTITY NOT NULL,
nombre VARCHAR(55) NOT NULL,
apellido VARCHAR(55) NOT NULL,
fecha_nacimiento VARCHAR(55) NOT NULL
);


INSERT INTO autores VALUES (id_autor, nombre)

CREATE TABLE libros (
id_libtos INT PRIMARY KEY IDENTITY NOT NULL,
fecha_publicacion VARCHAR(55) NOT NULL,
precio DECIMAL NOT NULL,
id_autor INT,
FOREIGN KEY (id_autor) REFERENCES autores(id_autor)
);
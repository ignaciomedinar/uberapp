CREATE TABLE choferes (
id INT UNSIGNED AUTO_INCREMENT,
nombre VARCHAR(30) NOT NULL,
celular int(10),
email VARCHAR(30),
clabe int(18),
stat boolean DEFAULT 1,
PRIMARY KEY (id)
);

CREATE TABLE autos (
id INT UNSIGNED AUTO_INCREMENT,
placa VARCHAR(8) NOT NULL,
modelo VARCHAR(30),
color VARCHAR(30),
ownera VARCHAR(30) not null,
porcentaje FLOAT(12,2),
stat boolean DEFAULT 1,
PRIMARY KEY (id)
);

CREATE TABLE gastos (
id_gasto INT UNSIGNED AUTO_INCREMENT,
id_chofer INT,
fecha datetime,
concepto VARCHAR(30),
monto FLOAT(12,2),
stat boolean DEFAULT 1,
PRIMARY KEY (id_gasto)
);

CREATE TABLE ingresos (
id INT UNSIGNED AUTO_INCREMENT,
id_chofer int NOT NULL,
id_gasto int,
uber FLOAT(12,2),
didi FLOAT(12,2),
renta FLOAT(12,2),
fecha datetime,
semana VARCHAR(30) not null,
debe FLOAT(12,2),
utilidad FLOAT(12,2),
PRIMARY KEY (id)
);
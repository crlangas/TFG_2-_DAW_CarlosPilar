SET NAMES utf8mb4;

-- ============================================================
-- Base de datos: MrFinanceV2
-- Segunda version con triggers para el borrado automatico en vez de on delete cascade
-- ============================================================

DROP DATABASE IF EXISTS MrFinanceV2;
CREATE DATABASE IF NOT EXISTS MrFinanceV2 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
 
USE MrFinanceV2;
 
-- ------------------------------------------------------------
-- Tabla: usuarios
-- ------------------------------------------------------------
CREATE TABLE usuarios (
  id_usuario              INT          NOT NULL AUTO_INCREMENT,
  nombre          VARCHAR(100) NOT NULL,
  email           VARCHAR(120) NOT NULL,
  pass            VARCHAR(120) NOT NULL,
  is_2fa          BOOLEAN      NOT NULL DEFAULT FALSE,
  fecha_registro  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario),
  -- unique key en los email para que no existan usuarios duplicados
  UNIQUE KEY uq_usuarios_email (email)
);

-- ------------------------------------------------------------
-- Tabla: categoria
-- ------------------------------------------------------------
CREATE TABLE categorias (
  id_categoria      INT          NOT NULL AUTO_INCREMENT,
  nombre  VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_categoria)
);

-- ------------------------------------------------------------
-- Tabla usuario_categoria
-- ------------------------------------------------------------
CREATE TABLE usuarios_categorias (
  id_usuario   INT NOT NULL,
  id_categoria INT NOT NULL,
  PRIMARY KEY (id_usuario, id_categoria),
  FOREIGN KEY (id_usuario)   REFERENCES usuarios  (id_usuario),
  FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
);

-- ------------------------------------------------------------
-- Tabla: movimientos
-- ------------------------------------------------------------
CREATE TABLE movimientos (
  id            INT                     NOT NULL AUTO_INCREMENT,
  concepto      VARCHAR(255)            NOT NULL,
  tipo          ENUM('ingreso','gasto') NOT NULL,
  monto         DECIMAL(10,2)           NOT NULL,
  fecha         DATETIME                NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario    INT                     NOT NULL,
  id_categoria  INT                     NOT NULL,
  PRIMARY KEY (id),
  -- uso indices para que la bd cargue en cache esos campos y no tarden tanto las consultas
  INDEX idx_movimientos_usuario   (id_usuario),
  INDEX idx_movimientos_categoria (id_categoria),
  INDEX idx_movimientos_fecha     (fecha),
  -- foreing keys referentes a los usuarios y categorias
  FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
  FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
);


-- ============================================================
-- Triggers
-- ============================================================

DELIMITER $$

-- ------------------------------------------------------------
-- Trigger: para antes de eliminar un usuario
-- Elimina primero sus movimientos para no crear datos sueltos.
-- Despues borra sus filas de la tabla auxiliar usuario_categoria.
-- ------------------------------------------------------------
CREATE TRIGGER trg_before_delete_usuario
BEFORE DELETE ON usuarios
FOR EACH ROW
BEGIN
  DELETE FROM movimientos  WHERE id_usuario = OLD.id_usuario;
  DELETE FROM usuarios_categorias WHERE id_usuario = OLD.id_usuario;
END$$

-- ------------------------------------------------------------
-- Trigger: para antes de eliminar una categoría
-- Impide el borrado si existen movimientos con esa categoria,
-- devolviendo un mensaje de error si se intenta hacer el delete.
-- Tambien limpia la tabla pivot si no hay movimientos asociados.
-- ------------------------------------------------------------
CREATE TRIGGER trg_before_delete_categoria
BEFORE DELETE ON categorias
FOR EACH ROW
BEGIN
  DECLARE v_total INT;

  SELECT COUNT(*) INTO v_total
  FROM movimientos
  WHERE id_categoria = OLD.id_categoria;

  IF v_total > 0 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede eliminar la categoría: tiene movimientos asociados.';
  END IF;

  -- si no hay movimientos, limpia las filas auxiliares antes de borrar la categoria
  DELETE FROM usuarios_categorias WHERE id_categoria = OLD.id_categoria;
END$$

DELIMITER ;


-- ============================================================
-- Datos de ejemplo
-- ============================================================

INSERT INTO usuarios (nombre, email, pass, is_2fa) VALUES
  ('Ana García', 'ana@example.com', '1231', FALSE),
  ('Luis Pérez',  'luis@example.com', '123', TRUE),
  ('pepe',  'pepe@example.com', 'pepe', FALSE);

-- las categorias ya no pertenecen a un usuario concreto para evitar repeticion de valores
INSERT INTO categorias (nombre) VALUES
  ('Alimentación'),
  ('Transporte'),
  ('Salario'),
  ('Ocio'),
  ('Ahorro');

-- cada usuario se asocia a las categorias que usa
INSERT INTO usuarios_categorias (id_usuario, id_categoria) VALUES
  (1, 1), -- Ana   -> Alimentación
  (1, 3), -- Ana   -> Salario
  (1, 4), -- Ana   -> Ocio
  (1, 5), -- Ana   -> Ahorro
  (2, 2), -- Luis  -> Transporte
  (2, 3), -- Luis  -> Salario
  (2, 4), -- Luis  -> Ocio
  (3, 3), -- Pepe  -> Salario
  (3,1), --  Pepe  -> Alimentación
  (3,2), --  Pepe  -> Transporte
  (3,4), --  Pepe  -> Ocio
  (3,5); --  Pepe  -> Ahorro

INSERT INTO movimientos (concepto, tipo, monto, id_usuario, id_categoria) VALUES
  ('Nómina marzo',     'ingreso', 1800.00, 1, 3),
  ('Supermercado',     'gasto',     65.40, 1, 1),
  ('Metro mensual',    'gasto',     40.00, 1, 2),
  ('Ahorro mensual',   'ingreso',  200.00, 1, 5),
  ('Cena restaurante', 'gasto',     35.00, 2, 4),
  ('Freelance abril',  'ingreso',  500.00, 2, 3);
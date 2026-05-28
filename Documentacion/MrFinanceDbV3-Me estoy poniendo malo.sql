-- ============================================================
-- Base de datos: MrFinanceV3
-- Cambios respecto a V2:
--   1. Comas faltantes en categoria y movimientos (bug sintáctico)
--   2. UNIQUE KEY (nombre, id_usuario) en categoria (normalización)
--   3. CHECK (monto > 0) en movimientos (integridad de datos)
--   4. Trigger trg_before_insert_movimiento: valida que la
--      categoria pertenezca al mismo usuario del movimiento
--   5. Columna pass ampliada a VARCHAR(255) para hashes bcrypt
--   6. Datos de ejemplo con contraseñas hasheadas (bcrypt)
-- ============================================================

DROP DATABASE IF EXISTS MrFinanceV3;
CREATE DATABASE IF NOT EXISTS MrFinanceV3 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE MrFinanceV3;

-- ------------------------------------------------------------
-- Tabla: usuarios
-- pass VARCHAR(255) para almacenar hashes bcrypt/argon2
-- ------------------------------------------------------------
CREATE TABLE usuarios (
  id              INT          NOT NULL AUTO_INCREMENT,
  nombre          VARCHAR(100) NOT NULL,
  email           VARCHAR(120) NOT NULL,
  pass            VARCHAR(255) NOT NULL,         -- FIX: 120 era insuficiente para hashes
  is_2fa          BOOLEAN      NOT NULL DEFAULT FALSE,
  fecha_registro  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_email (email)
);

-- ------------------------------------------------------------
-- Tabla: categoria
-- FIX 1: coma faltante entre FOREIGN KEY y PRIMARY KEY
-- FIX 2: UNIQUE KEY compuesta para evitar categorías duplicadas
--         por usuario (normalización)
-- ------------------------------------------------------------
CREATE TABLE categoria (
  id         INT          NOT NULL AUTO_INCREMENT,
  nombre     VARCHAR(100) NOT NULL,
  id_usuario INT          NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios (id),  -- FIX: coma añadida
  UNIQUE KEY uq_categoria_usuario (nombre, id_usuario) -- FIX: normalización
);

-- ------------------------------------------------------------
-- Tabla: movimientos
-- FIX 1: coma faltante entre las dos FOREIGN KEY
-- FIX 2: CHECK monto > 0 para evitar valores negativos o cero
-- ------------------------------------------------------------
CREATE TABLE movimientos (
  id           INT                     NOT NULL AUTO_INCREMENT,
  concepto     VARCHAR(255)            NOT NULL,
  tipo         ENUM('ingreso','gasto') NOT NULL,
  monto        DECIMAL(10,2)           NOT NULL,
  fecha        DATETIME                NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario   INT                     NOT NULL,
  id_categoria INT                     NOT NULL,
  PRIMARY KEY (id),
  INDEX idx_movimientos_usuario   (id_usuario),
  INDEX idx_movimientos_categoria (id_categoria),
  INDEX idx_movimientos_fecha     (fecha),
  FOREIGN KEY (id_usuario)   REFERENCES usuarios  (id),
  FOREIGN KEY (id_categoria) REFERENCES categoria (id), -- FIX: coma añadida
  CONSTRAINT chk_monto_positivo CHECK (monto > 0)       -- FIX: integridad
);


-- ============================================================
-- Triggers
-- ============================================================

DELIMITER $$

-- ------------------------------------------------------------
-- Trigger: antes de eliminar un usuario
-- Elimina primero sus movimientos y luego sus categorías.
-- El orden importa: si se borrasen las categorías primero,
-- trg_before_delete_categoria lanzaría error por los movimientos.
-- ------------------------------------------------------------
CREATE TRIGGER trg_before_delete_usuario
BEFORE DELETE ON usuarios
FOR EACH ROW
BEGIN
  DELETE FROM movimientos WHERE id_usuario = OLD.id;
  DELETE FROM categoria   WHERE id_usuario = OLD.id;
END$$

-- ------------------------------------------------------------
-- Trigger: antes de eliminar una categoría
-- Bloquea el borrado si existen movimientos asociados.
-- ------------------------------------------------------------
CREATE TRIGGER trg_before_delete_categoria
BEFORE DELETE ON categoria
FOR EACH ROW
BEGIN
  DECLARE v_total INT;

  SELECT COUNT(*) INTO v_total
  FROM movimientos
  WHERE id_categoria = OLD.id;

  IF v_total > 0 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede eliminar la categoría: tiene movimientos asociados.';
  END IF;
END$$

-- ------------------------------------------------------------
-- Trigger: antes de insertar un movimiento            (NUEVO)
-- Valida que la categoría pertenezca al mismo usuario
-- del movimiento, evitando inconsistencias entre usuarios.
-- Ejemplo sin esto: usuario 1 podría usar una categoría
-- del usuario 2 sin ningún error.
-- ------------------------------------------------------------
CREATE TRIGGER trg_before_insert_movimiento
BEFORE INSERT ON movimientos
FOR EACH ROW
BEGIN
  DECLARE v_owner INT;

  SELECT id_usuario INTO v_owner
  FROM categoria
  WHERE id = NEW.id_categoria;

  IF v_owner <> NEW.id_usuario THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'La categoría no pertenece al usuario del movimiento.';
  END IF;
END$$

-- ------------------------------------------------------------
-- Trigger: antes de actualizar un movimiento          (NUEVO)
-- Misma validación que el de INSERT, aplicada a UPDATE.
-- ------------------------------------------------------------
CREATE TRIGGER trg_before_update_movimiento
BEFORE UPDATE ON movimientos
FOR EACH ROW
BEGIN
  DECLARE v_owner INT;

  SELECT id_usuario INTO v_owner
  FROM categoria
  WHERE id = NEW.id_categoria;

  IF v_owner <> NEW.id_usuario THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'La categoría no pertenece al usuario del movimiento.';
  END IF;
END$$

DELIMITER ;


-- ============================================================
-- Datos de ejemplo
-- Contraseñas hasheadas con bcrypt (coste 10).
-- NUNCA almacenar contraseñas en texto plano en producción.
-- Los hashes de abajo son solo ilustrativos; en la app real
-- el hash lo genera el backend antes del INSERT.
-- ============================================================

INSERT INTO usuarios (nombre, email, pass, is_2fa) VALUES
  ('Ana García', 'ana@example.com', '$2b$10$placeholderHashParaAna1111111111111111111111111', FALSE),
  ('Luis Pérez',  'luis@example.com', '$2b$10$placeholderHashParaLuis111111111111111111111111', TRUE),
  ('Pepe Ruiz',   'pepe@example.com', '$2b$10$placeholderHashParaPepe111111111111111111111111', FALSE);

INSERT INTO categoria (nombre, id_usuario) VALUES
  ('Alimentación', 1),
  ('Transporte',   1),
  ('Salario',      1),
  ('Ocio',         1),
  ('Ahorro',       1),
  ('Transporte',   2),
  ('Salario',      2),
  ('Ocio',         2);

INSERT INTO movimientos (concepto, tipo, monto, id_usuario, id_categoria) VALUES
  ('Nómina marzo',     'ingreso', 1800.00, 1, 3),
  ('Supermercado',     'gasto',     65.40, 1, 1),
  ('Metro mensual',    'gasto',     40.00, 1, 2),
  ('Ahorro mensual',   'ingreso',  200.00, 1, 5),
  ('Cena restaurante', 'gasto',     35.00, 2, 8),
  ('Freelance abril',  'ingreso',  500.00, 2, 7);

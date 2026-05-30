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
  id              INT          NOT NULL AUTO_INCREMENT,
  nombre          VARCHAR(100) NOT NULL,
  email           VARCHAR(120) NOT NULL,
  pass            VARCHAR(120) NOT NULL,
  is_2fa          BOOLEAN      NOT NULL DEFAULT FALSE,
  fecha_registro  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  -- unique key en los email para que no existan usuarios duplicados
  UNIQUE KEY uq_usuarios_email (email)
);
 
-- ------------------------------------------------------------
-- Tabla: categoria
-- ------------------------------------------------------------
CREATE TABLE categoria (
  id          INT          NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100) NOT NULL,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
  PRIMARY KEY (id)
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
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
    FOREIGN KEY (id_categoria) REFERENCES categoria (id)
);
 
 
-- ============================================================
-- Triggers
-- ============================================================
 
DELIMITER $$
 
-- ------------------------------------------------------------
-- Trigger: para antes de eliminar un usuario
-- Elimina primero sus movimientos para no crear datos sueltos.
-- Despues borra las categorias del usuario.
-- ------------------------------------------------------------
CREATE TRIGGER trg_before_delete_usuario
BEFORE DELETE ON usuarios
FOR EACH ROW
BEGIN
  DELETE FROM movimientos  WHERE id_usuario = OLD.id;
  DELETE FROM categoria WHERE id_usuario = OLD.id;
END$$
 
-- ------------------------------------------------------------
-- Trigger: para antes de eliminar una categoría
-- Impide el borrado si existen movimientos con esa categoria,
-- devolviendo un mensaje de error si se intenta hacer el delete.
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
 
DELIMITER ;
 
 
-- ============================================================
-- Datos de ejemplo
-- ============================================================
 
INSERT INTO usuarios (nombre, email, pass, is_2fa) VALUES
  ('Ana García', 'ana@example.com', '1231', FALSE),
  ('Luis Pérez',  'luis@example.com', '123', TRUE),
  ('pepe',  'pepe@example.com', 'pepe', FALSE);
 

INSERT INTO categoria (nombre, id_usuario) VALUES
  ('Alimentación',1),
  ('Transporte',2),
  ('Salario',3),
  ('Ocio',1),
  ('Ahorro',1);
 
INSERT INTO movimientos (concepto, tipo, monto, id_usuario, id_categoria) VALUES
  ('Nómina marzo',     'ingreso', 1800.00, 1, 3),
  ('Supermercado',     'gasto',     65.40, 1, 1),
  ('Metro mensual',    'gasto',     40.00, 1, 2),
  ('Ahorro mensual',   'ingreso',  200.00, 1, 5),
  ('Cena restaurante', 'gasto',     35.00, 2, 4),
  ('Freelance abril',  'ingreso',  500.00, 2, 3);
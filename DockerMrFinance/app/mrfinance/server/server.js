import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

//importo las funciones para el 2fa
import { enviarCodigoVerificacion, verificarCodigo } from './authService.js'; 

import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../client/public/fotosDePerfil');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const userId = req.body.userId;
    let ext = path.extname(file.originalname);
    if (!ext) ext = '.png'; // fallback
    
    // Eliminar fotos antiguas de este usuario
    try {
      const files = fs.readdirSync(uploadDir);
      files.forEach(f => {
        if (f.startsWith(`fotodeperfil${userId}.`)) {
          fs.unlinkSync(path.join(uploadDir, f));
        }
      });
    } catch (err) {
      console.error("Error limpiando fotos antiguas:", err);
    }

    cb(null, `fotodeperfil${userId}${ext}`);
  }
});
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.json());

app.get('/profile-picture/:id', (req, res) => {
    const userId = req.params.id;
    try {
        const files = fs.readdirSync(uploadDir);
        const userPhoto = files.find(f => f.startsWith(`fotodeperfil${userId}.`));
        if (userPhoto) {
            res.sendFile(path.join(uploadDir, userPhoto));
        } else {
            res.status(404).json({ success: false, message: "Foto no encontrada" });
        }
    } catch (e) {
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

const db = mysql.createConnection({
    host: "db",
    user: "user",
    password: "user",
    database: "MrFinanceV2",
    charset: "utf8mb4"
});

// ← Conectar explícitamente y ver el error si lo hay importante para debugear a la hora de hacer npm run dev
db.connect((err) => {
    if (err) {
        console.error("Error conectando a la DB:", err.message);
        return;
    }
    console.log("Conectado a MySQL ✓");
});

// Logica de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT *, id_usuario AS id FROM usuarios WHERE email = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) {
      console.error("Error en query:", err.message);
      return res.status(500).json({ success: false, message: "Error del servidor" });
    }

    if (data.length === 0) {
      return res.status(401).json({ success: false, message: "Email o contraseña incorrectos" });
    }

    const user = data[0];
    const isBcryptHash = user.pass && user.pass.startsWith('$2');

    let passwordMatch = false;
    if (isBcryptHash) {
      passwordMatch = bcrypt.compareSync(password, user.pass);
    } else {
      passwordMatch = (password === user.pass);
      if (passwordMatch) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);
        db.query("UPDATE usuarios SET pass = ? WHERE email = ?", [hashedPass, user.email]);
        console.log(`Contraseña migrada a bcrypt para: ${user.email}`);
        user.pass = hashedPass;
      }
    }

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Email o contraseña incorrectos" });
    }

    // Comprobar si tiene 2FA activo en la BD
    if (user.is_2fa) {
      try {
        await enviarCodigoVerificacion(user.email);
        // No devolvemos los datos del usuario todavia, solo avisamos al frontend
        return res.status(200).json({ success: true, requires2fa: true, email: user.email });
      } catch (error) {
        console.error("Error enviando codigo 2FA:", error.message);
        return res.status(500).json({ success: false, message: "Error enviando el codigo de verificacion" });
      }
    }

    // Sin 2FA: login directo
    return res.status(200).json({ success: true, user });
  });
});

// Endpoint para verificar el codigo 2FA
app.post('/verify-2fa', (req, res) => {
  const { email, codigo } = req.body;

  //ni no se le pasa el mail o el codigo da error
  if (!email || !codigo) {
    return res.status(400).json({ success: false, message: "Faltan datos" });
  }

  const resultado = verificarCodigo(email, codigo);

  if (!resultado.valido) {
    return res.status(401).json({ success: false, message: resultado.mensaje });
  }

  // Codigo correcto: devuelve los datos del usuario
  const sql = "SELECT *, id_usuario AS id FROM usuarios WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error del servidor" });
    }
    return res.status(200).json({ success: true, user: data[0] });
  });
});

// Logica de registro
app.post('/register', (req, res) => {
    const { email, password, nombre } = req.body;

    // Comprueba que la contraseña sea de minimo 12 caracteres
    if (!password || password.length < 12) {
        return res.status(401).json({ success: false, message: "La contraseña es muy corta, tiene que ser de minimo 12 caracteres" });
    }

    // Primero comprueba si ya existe un usuario con ese email
    const sqlCheckUser = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sqlCheckUser, [email], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(500).json({ success: false, message: "Error del servidor" });
        }

        // Si ya existe, devuelve conflicto
        if (data.length > 0) {
            return res.status(409).json({ success: false, message: "El usuario ya existe" });
        }

        // Si no existe, encripta la contraseña y lo inserta
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);

        const sqlInsertUser = "INSERT INTO usuarios (email, pass, nombre) VALUES (?, ?, ?)";
        db.query(sqlInsertUser, [email, hashedPass, nombre], (err, result) => {
            if (err) {
                console.error("Error en query:", err.message);
                return res.status(500).json({ success: false, message: "Error del servidor" });
            }
            const user = {
                id: result.insertId,
                email: email,
                pass: hashedPass,
                nombre: nombre
            };
            return res.status(200).json({ success: true, user });
        });
    });
});

app.post('/movimientos', (req, res) => {
    const { userId, pass } = req.body;

    // Primero comprueba si el usuario existe y coincide la contraseña
    const sqlCheckUser = "SELECT *, id_usuario AS id FROM usuarios WHERE id_usuario = ? AND pass = ?";
    db.query(sqlCheckUser, [userId, pass], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(500).json({ success: false, message: "Error del servidor" });
        }

        // Si no existe el usuario o la contraseña no coincide
        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
        }

        // Si existe y la contraseña coincide, busca los movimientos del usuario
        const sqlMovimientos = `
            SELECT m.*, c.nombre as categoria_nombre 
            FROM movimientos m
            LEFT JOIN categorias c ON m.id_categoria = c.id_categoria
            WHERE m.id_usuario = ?
            ORDER BY m.fecha DESC
        `;
        db.query(sqlMovimientos, [userId], (err, data) => {
            if (err) {
                console.error("Error en query:", err.message);
                return res.status(500).json({ success: false, message: "Error del servidor" });
            }

            return res.status(200).json({ success: true, movimientos: data });
        });
    });
});

// Obtener todas las categorías del usuario
app.post('/categorias/list', (req, res) => {
    //recoje el usuario y la contraseña la cotraseña simplemente es para comprobar que nadie solo con el id pueda ver las categorias.
    const userId = req.body.data.userId;
    const pass = req.body.data.pass;

    // primero comprueba que el usuario existe y coincide la contraseña
    const sqlCheckUser = "SELECT *, id_usuario AS id FROM usuarios WHERE id_usuario = ? AND pass = ?";
    db.query(sqlCheckUser, [userId, pass], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(404).json({ success: false, message: "Error" });
        }

        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Usuario no autorizado" });
        }

        //una vez autenticado pilla con un inner join los datos de la tabla categorias a traves de la tabla pivot usuario_categoria.
        const sql = `
            SELECT c.*, c.id_categoria AS id 
            FROM categorias c
            INNER JOIN usuarios_categorias uc ON c.id_categoria = uc.id_categoria
            WHERE uc.id_usuario = ?
            ORDER BY c.nombre ASC
        `;
        db.query(sql, [userId], (err, data) => {
            if (err) {
                console.error("Error en query:", err.message);
                return res.status(500).json({ success: false, message: "Error al mostrar las categorías" });
            }
            return res.status(200).json({ success: true, categorias: data });
        });
    });
});

// Añadir una nueva categoría
app.post('/categorias', (req, res) => {
    const { nombre, userId, pass } = req.body;

    if (!nombre || nombre.trim() === '') { //si el nombre esta vacio da este error
        return res.status(400).json({ success: false, message: "El nombre de la categoría es obligatorio" });
    }

    // primero comprueba que el usuario existe y coincide la contraseña
    const sqlCheckUser = "SELECT *, id_usuario AS id FROM usuarios WHERE id_usuario = ? AND pass = ?";
    db.query(sqlCheckUser, [userId, pass], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(404).json({ success: false, message: "Error" });
        }

        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Usuario no autorizado" });
        }

        // 1. Busca si la categoría con ese nombre ya existe de forma global en la tabla categoria
        const sqlFindGlobal = "SELECT *, id_categoria AS id FROM categorias WHERE nombre = ?";
        db.query(sqlFindGlobal, [nombre.trim()], (err, globalCats) => {
            if (err) {
                console.error("Error en query:", err.message);
                return res.status(500).json({ success: false, message: "Error del servidor" });
            }

            if (globalCats.length > 0) {
                // La categoría ya existe a nivel global, comprobamos si ya está asociada a este usuario en la tabla pivot
                const existingCat = globalCats[0];
                const sqlCheckLink = "SELECT * FROM usuarios_categorias WHERE id_usuario = ? AND id_categoria = ?";
                db.query(sqlCheckLink, [userId, existingCat.id], (err, links) => {
                    if (err) {
                        console.error("Error en query:", err.message);
                        return res.status(500).json({ success: false, message: "Error del servidor" });
                    }

                    if (links.length > 0) {
                        return res.status(409).json({ success: false, message: "Esa categoría ya existe" });
                    }

                    // Si no está asociada, creamos la relación en la tabla pivot usuario_categoria
                    const sqlInsertLink = "INSERT INTO usuarios_categorias (id_usuario, id_categoria) VALUES (?, ?)";
                    db.query(sqlInsertLink, [userId, existingCat.id], (err) => {
                        if (err) {
                            console.error("Error en query:", err.message);
                            return res.status(500).json({ success: false, message: "Error del servidor" });
                        }
                        return res.status(200).json({ success: true, categoria: { id: existingCat.id, nombre: existingCat.nombre, id_usuario: userId } });
                    });
                });
            } else {
                // La categoría no existe de forma global, la insertamos primero en la tabla categoria
                const sqlInsertGlobal = "INSERT INTO categorias (nombre) VALUES (?)";
                db.query(sqlInsertGlobal, [nombre.trim()], (err, result) => {
                    if (err) {
                        console.error("Error en query:", err.message);
                        return res.status(500).json({ success: false, message: "Error del servidor" });
                    }
                    const newCatId = result.insertId;

                    // Creamos la relación en la tabla pivot usuario_categoria
                    const sqlInsertLink = "INSERT INTO usuarios_categorias (id_usuario, id_categoria) VALUES (?, ?)";
                    db.query(sqlInsertLink, [userId, newCatId], (err) => {
                        if (err) {
                            console.error("Error en query:", err.message);
                            return res.status(500).json({ success: false, message: "Error del servidor" });
                        }
                        return res.status(200).json({ success: true, categoria: { id: newCatId, nombre: nombre.trim(), id_usuario: userId } });
                    });
                });
            }
        });
    });
});

// Añadir un nuevo movimiento
app.post('/add-movimiento', (req, res) => {
    const { userId, pass, tipo, monto, fecha, id_categoria, concepto } = req.body;

    // Validaciones básicas
    if (!userId || !pass) {
        return res.status(400).json({ success: false, message: "Faltan credenciales de usuario" });
    }
    if (!tipo || !['gasto', 'ingreso'].includes(tipo)) {
        return res.status(400).json({ success: false, message: "El tipo debe ser 'gasto' o 'ingreso'" });
    }
    if (!monto || monto <= 0) {
        return res.status(400).json({ success: false, message: "El monto debe ser mayor que 0" });
    }
    if (!id_categoria) {
        return res.status(400).json({ success: false, message: "Debes seleccionar una categoría" });
    }

    // Verificar que el usuario existe y la contraseña coincide (mismo patrón que /movimientos)
    const sqlCheckUser = "SELECT *, id_usuario AS id FROM usuarios WHERE id_usuario = ?";
    db.query(sqlCheckUser, [userId], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(500).json({ success: false, message: "Error del servidor" });
        }

        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Usuario no encontrado" });
        }

        const user = data[0];

        // Compara la contraseña (soporta tanto hash bcrypt como pass en texto plano del login)
        const isBcryptHash = user.pass && user.pass.startsWith('$2');
        let passwordMatch = false;

        if (isBcryptHash) {
            // Si la pass almacenada es un hash, comparamos el hash enviado directamente
            passwordMatch = (pass === user.pass);
        } else {
            passwordMatch = (pass === user.pass);
        }

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }

        // Insertar el movimiento
        const sqlInsert = `
            INSERT INTO movimientos (id_usuario, tipo, monto, fecha, id_categoria, concepto) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const fechaFinal = fecha || new Date().toISOString().split('T')[0];
        const conceptoFinal = concepto || 'Sin concepto';

        db.query(sqlInsert, [userId, tipo, monto, fechaFinal, id_categoria || null, conceptoFinal], (err, result) => {
            if (err) {
                console.error("Error en query:", err.message);
                return res.status(500).json({ success: false, message: "Error del servidor al guardar el movimiento" });
            }
            return res.status(200).json({ success: true, message: "Movimiento guardado correctamente", id: result.insertId });
        });
    });
});

// Eliminar un movimiento
app.post('/borrar-movimiento', (req, res) => {
    const { userId, pass, movimientoId } = req.body;

    // Validaciones básicas
    if (!userId || !pass) {
        return res.status(400).json({ success: false, message: "Faltan credenciales de usuario" });
    }
    if (!movimientoId) {
        return res.status(400).json({ success: false, message: "Falta el identificador del movimiento" });
    }

    // Verificar que el usuario existe y la contraseña coincide
    const sqlCheckUser = "SELECT *, id_usuario AS id FROM usuarios WHERE id_usuario = ?";
    db.query(sqlCheckUser, [userId], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(500).json({ success: false, message: "Error del servidor" });
        }

        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Usuario no encontrado" });
        }

        const user = data[0];

        // Compara la contraseña (soporta tanto hash bcrypt como pass en texto plano)
        const isBcryptHash = user.pass && user.pass.startsWith('$2');
        let passwordMatch = false;

        if (isBcryptHash) {
            // Si la pass almacenada es un hash, comparamos el hash enviado directamente
            passwordMatch = (pass === user.pass);
        } else {
            passwordMatch = (pass === user.pass);
        }

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }

        // Insertar el movimiento
        const sqlDelete = `
           delete from movimientos where id = ?;
        `;

        db.query(sqlDelete, [movimientoId], (err, result) => {
            if (err) {
                console.error("Error en query:", err.message);
                return res.status(500).json({ success: false, message: "Error del servidor al borrar el movimiento" });
            }
            return res.status(200).json({ success: true, message: "Movimiento borrado correctamente" });
        });
    });
});

// Editar un movimiento
app.post('/mod-movimiento', (req, res) => {
    const { userId, pass, movimientoId, tipo, monto, fecha, id_categoria, concepto } = req.body;

    if (!userId || !pass) {
        return res.status(400).json({ success: false, message: "Faltan credenciales de usuario" });
    }
    if (!movimientoId) {
        return res.status(400).json({ success: false, message: "Falta el identificador del movimiento" });
    }
    if (!tipo || !['gasto', 'ingreso'].includes(tipo)) {
        return res.status(400).json({ success: false, message: "El tipo debe ser 'gasto' o 'ingreso'" });
    }
    if (!monto || monto <= 0) {
        return res.status(400).json({ success: false, message: "El monto debe ser mayor que 0" });
    }

    const sqlCheckUser = "SELECT *, id_usuario AS id FROM usuarios WHERE id_usuario = ?";
    db.query(sqlCheckUser, [userId], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(500).json({ success: false, message: "Error del servidor" });
        }
        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Usuario no encontrado" });
        }

        const user = data[0];
        const passwordMatch = (pass === user.pass);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }

        const fechaFinal = fecha || new Date().toISOString().split('T')[0];
        const conceptoFinal = concepto || 'Sin concepto';

        const sqlUpdate = `
            UPDATE movimientos
            SET tipo = ?, monto = ?, fecha = ?, id_categoria = ?, concepto = ?
            WHERE id = ? AND id_usuario = ?
        `;
        db.query(sqlUpdate, [tipo, monto, fechaFinal, id_categoria || null, conceptoFinal, movimientoId, userId], (err, result) => {
            if (err) {
                console.error("Error en query:", err.message);
                return res.status(500).json({ success: false, message: "Error del servidor al editar el movimiento" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: "Movimiento no encontrado o no pertenece al usuario" });
            }
            return res.status(200).json({ success: true, message: "Movimiento actualizado correctamente" });
        });
    });
});

app.post('/userInfo', (req, res) => {
    const { userId, pass } = req.body;

    // valida que se hayan enviado credenciales
    if (!userId || !pass) {
        return res.status(400).json({ success: false, message: "Faltan credenciales de usuario" });
    }
    // valida que la pass sea correcta
    const sqlCheckUser = "SELECT *, id_usuario AS id FROM usuarios WHERE id_usuario = ? AND pass = ?";

    db.query(sqlCheckUser, [userId, pass], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(500).json({ success: false, message: "Error del servidor" });
        }
        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Usuario no encontrado" });
        }
        //si no da error la consulta y encuentra el usuario devuelve los datos del mismo
        return res.status(200).json({ success: true, user: data[0] });
    });
});

app.post('/toggle-2fa', (req, res) => {
    const { userId, pass, is_2fa } = req.body;

    if (!userId || !pass) {
        return res.status(400).json({ success: false, message: "Faltan credenciales de usuario" });
    }

    const sqlCheckUser = "SELECT *, id_usuario AS id FROM usuarios WHERE id_usuario = ? AND pass = ?";

    db.query(sqlCheckUser, [userId, pass], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(500).json({ success: false, message: "Error del servidor" });
        }
        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Usuario no encontrado" });
        }

        const sqlUpdate = "UPDATE usuarios SET is_2fa = ? WHERE id_usuario = ?";
        db.query(sqlUpdate, [is_2fa ? 1 : 0, userId], (err, result) => {
            if (err) {
                console.error("Error en query:", err.message);
                return res.status(500).json({ success: false, message: "Error al actualizar 2FA" });
            }
            return res.status(200).json({ success: true, message: "2FA actualizado correctamente", is_2fa });
        });
    });
});

app.post('/upload-profile-picture', upload.single('foto'), (req, res) => {
    const { userId, pass } = req.body;

    if (!userId || !pass) {
        return res.status(400).json({ success: false, message: "Faltan credenciales de usuario" });
    }

    const sqlCheckUser = "SELECT *, id_usuario AS id FROM usuarios WHERE id_usuario = ? AND pass = ?";

    db.query(sqlCheckUser, [userId, pass], (err, data) => {
        if (err) {
            console.error("Error en query:", err.message);
            return res.status(500).json({ success: false, message: "Error del servidor" });
        }
        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Usuario no encontrado" });
        }

        return res.status(200).json({ success: true, message: "Foto actualizada correctamente" });
    });
});


app.listen(8081, '0.0.0.0', () => {
    console.log("Backend funcionando OK");
});
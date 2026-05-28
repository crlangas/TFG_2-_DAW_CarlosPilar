import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS, Gmail usa 587 con upgrade
  auth: {
    user: process.env.GMAIL_USER, //usuario 
    pass: process.env.GMAIL_APP_PASS, //contraseña
  },
});

//comprueba que el servidor SMTP este listo y no de errores
transporter.verify((error) => {
  if (error) {
    console.error("Error de conexion SMTP:", error.message);
  } else {
    console.log("Servidor SMTP listo para enviar mensajes");
  }
});

export default transporter;
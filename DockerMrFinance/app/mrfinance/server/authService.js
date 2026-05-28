import transporter from "./mailer.js";

const codigosActivos = new Map();

async function enviarCodigoVerificacion(emailDestino) { //seactiva cuando se le pasa un mail
  const codigo = Math.floor(1000 + Math.random() * 9000).toString(); //genera un numero aleatorio de 4 digitos
  const expiracion = Date.now() + 10 * 60 * 1000; //establece la expiracion en 10 minutos

  codigosActivos.set(emailDestino, { codigo, expiracion }); //guarda el codigo y la expiracion

  const info = await transporter.sendMail({
    from: `"MR Finance" <${process.env.GMAIL_USER}>`, //correo del remitente
    to: emailDestino, //correo del destinatario
    subject: "Tu codigo de verificacion", //asunto del correo
    text: `Tu codigo es: ${codigo}\nExpira en 10 minutos.`, //texto del correo
    html: `
      <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:24px;
                  border:1px solid #e0e0e0;border-radius:8px;">
        <h2 style="color:black;">Verificacion en 2 pasos de MR FINANCE</h2>
        <p>Usa el siguiente codigo para completar tu inicio de sesion:</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;
                    text-align:center;color:black;padding:16px 0;">
          ${codigo}
        </div>
        <p style="color:gray;font-size:13px;">
          <strong color:black;>Este codigo expira en 10 minutos</strong>.<br>
          Si no solicitaste este codigo ignora este mensaje.
        </p>
      </div>
    `,
  });

  console.log("Codigo enviado. Message ID:", info.messageId);
  return true;
}

function verificarCodigo(emailDestino, codigoIngresado) { //se activa cuando se le pasa un mail y un codigo
  const entrada = codigosActivos.get(emailDestino);

  //comprueba que el codigo sea correcto
  if (!entrada) {
    return { valido: false, mensaje: "No hay codigo activo para este correo." };
  }

  if (Date.now() > entrada.expiracion) {
    codigosActivos.delete(emailDestino);
    return { valido: false, mensaje: "El codigo ha expirado." };
  }

  if (entrada.codigo !== codigoIngresado) {
    return { valido: false, mensaje: "Codigo incorrecto." };
  }

  codigosActivos.delete(emailDestino); //elimina el codigo exitoso
  return { valido: true, mensaje: "Verificacion exitosa." };
}

export { enviarCodigoVerificacion, verificarCodigo };
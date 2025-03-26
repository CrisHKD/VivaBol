const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un correo de verificación de cuenta.
 * @param {string} email - Correo del usuario.
 * @param {string} token - Token de verificación generado.
 */

async function sendVerificationMail(email, token) {
  const verificationLink = `http://localhost:3000/api/verify/confirm/${token}`;
  console.log(verificationLink);

  const mailOptions = {
    from: `"VivaBol" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verifica tu cuenta",
    html: `
      <h2>¡Bienvenido!</h2>
      <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
      <a href="${verificationLink}" style="padding: 10px; background: blue; color: white; text-decoration: none; border-radius: 5px;">Verificar cuenta</a>
      <p>Si no solicitaste esto, ignora este correo.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de verificación enviado a:", email);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
}

module.exports = { sendVerificationMail };
const transporter = require('../../config/mail');

const sendDeletionEmail = (email, firstname) => {
  const mailOptions = {
    from: 'Ecommerce <a.valenti3003@gmail.com>',
    to: email,
    subject: 'Cuenta eliminada por inactividad',
    text: `Hola ${firstname},\n\nTu cuenta ha sido eliminada por inactividad.\n\nSaludos,\nEquipo de Soporte`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

module.exports = {
  sendDeletionEmail
}
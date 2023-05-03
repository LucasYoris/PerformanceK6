var nodemailer = require('nodemailer')

function enviarMail(body, callback) {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'marcoantoniomamanichura@gmail.com',
        pass: 'psfqrvjcpiebxevf'
      }
    });
  
    let mailOptions = {
      from: '<marcoantoniomamanichura@gmail.com>',
      to: 'lucasyoris@gmail.com',
      subject: 'Correo de prueba',
      html: body
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        callback(error);
      } else {
        callback(null, info);
      }
    });
  }
  
  module.exports = {
    enviarMail
  }
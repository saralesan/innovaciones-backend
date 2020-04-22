const nodemailer = require('nodemailer');
var config = require('./config.json');

module.exports = (contact_us) => {
    var transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: 587,
        auth: {
            user: config.smtp.user,
            pass: config.smtp.password
        }
        
    });

    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } 
        else {
            console.log("Server is ready to take the message");
        }
    });

    const mailOptions = {
        from: `"${contact_us.name}" <${contact_us.email}>`,
        to: config.message_config.recipent,
        subject: contact_us.subject,
        html: `
            <strong>Nombre: </strong> ${contact_us.name} <br/>
            <strong>E-mail: </strong> ${contact_us.email} <br/>
            <strong>Mensaje: </strong> ${contact_us.message}
            `
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Successfully sent!');
            console.log(info);
        }
    });
}
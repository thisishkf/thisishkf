const config = require('./config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: config.auth
});

const mailOptions = {
	from: 'hkf1113.code.api@gmail.com', // sender address
	to: 'hkf1113.code.api@gmail.com', // list of receivers
	subject: 'Testing Nodemailer', // Subject line
	html: '<p>Hello fform the otherside</p>'// plain text body
};



const _sendGmail = function (opts = {}) {
	if ('form' in opts && 'to' in opts && 'subject' in opts && 'html' in opts){
		transporter.sendMail(mailOptions, function (err, info) {
			if (err)
				console.log(err)
			else
				console.log(info);
		});
	}
}

module.exports = {
	sendGmail : _sendGmail
};
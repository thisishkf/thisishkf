const config = require('./config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: config.auth
});

const _sendGmail = function (opts = {}) {
	if ('form' in opts && 'to' in opts && 'subject' in opts && 'html' in opts){
		transporter.sendMail(opts, function (err, info) {
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
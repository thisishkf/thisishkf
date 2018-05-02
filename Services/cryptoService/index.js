const assert = require('assert');
const crypto = require('crypto');
const { ALGO, ENCODING } = require('./constant');
const config = require('./config.json');

var aes = {
	encrypt: function (text) {
		var algorithm = ALGO.AES;
		var inputEncoding = ENCODING.utf3;
		var outputEncoding = ENCODING.base64;

		var key = config.private_key;

		var cipher = crypto.createCipher(algorithm, key);
		var ciphered = cipher.update(text, inputEncoding, outputEncoding);
		ciphered += cipher.final(outputEncoding);
		return ciphered;
	},
	decrypt: function (text) {
		var algorithm = ALGO.AES;
		var inputEncoding = ENCODING.utf3;
		var outputEncoding = ENCODING.base64;
		var key = config.private_key;

		var decipher = crypto.createDecipher(algorithm, key);
		var deciphered = decipher.update(text, outputEncoding, inputEncoding);
		deciphered += decipher.final(inputEncoding);

		return deciphered;
	}
}

var _sha1 = function(text){
	return crypto.createHash(ALGO.SHA256)
	.update(text)
	.digest(ENCODING.base64);
}

var _sha256 = function(text){
	return crypto.createHash(ALGO.SHA1)
	.update(text)
	.digest(ENCODING.base64);
}

var _md5 = function(text){
	return crypto.createHash(ALGO.MD5)
	.update(text)
	.digest(ENCODING.base64);
}


module.exports = {
	aes : aes,
	sha1: _sha1,
	sha256 : _sha256,
	md5 : _md5
};

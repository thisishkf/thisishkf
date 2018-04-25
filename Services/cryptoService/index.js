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

		console.log(deciphered);
		return deciphered;
	}
}

var sha1 = function(text){
	return crypto.createHash(ALGO.SHA256)
	.update(text)
	.digest(ENCODING.base64);
}

var sha256 = function(text){
	return crypto.createHash(ALGO.SHA1)
	.update(text)
	.digest(ENCODING.base64);
}

var md5 = function(text){
	return crypto.createHash(ALGO.MD5)
	.update(text)
	.digest(ENCODING.base64);
}

let str = "Hello it's me";
let a = aes.encrypt(str);
console.log(a);
let b = aes.decrypt(a);

console.log(sha256(str));
console.log(sha1(str));
console.log(md5(str));
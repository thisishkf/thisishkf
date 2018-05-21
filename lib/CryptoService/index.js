/**
 * @author 		Sam Ho <hkf1113@gmail.com>
 * @create 		2018-04-19
 * @modified 	2018-05-16
 */

const assert = require('assert');
const crypto = require('crypto');

const { ALGO, ENCODING } = require(__dirname + '/constant');
const config = require(__dirname + '/../../config.json').CRYPTO;

var aes = {};
/**
 * @param	{string}	text
 * @return	{string}
 */
aes.encrypt = function (text) {
	var outputEncoding = ENCODING.base64;

	var cipher = crypto.createCipher(ALGO.AES, config.private_key);
	var ciphered = cipher.update(text, ENCODING.utf3, outputEncoding);
	ciphered += cipher.final(outputEncoding);
	return ciphered;
};
/**
 * @param	{string}	text
 * @return	{string}
 */
aes.decrypt = function (text) {
	var algorithm = ALGO.AES;
	var inputEncoding = ENCODING.utf3;
	var outputEncoding = ENCODING.base64;
	var key = config.private_key;

	var decipher = crypto.createDecipher(algorithm, key);
	var deciphered = decipher.update(text, outputEncoding, inputEncoding);
	deciphered += decipher.final(inputEncoding);

	return deciphered;
};

/**
 * Hashing input text by using sha1
 * 
 * @param	{string}	text	Unhashed text
 * @return	{string}			Hashed text in sha1
 */
const _sha1 = function (text) {
	return crypto.createHash(ALGO.SHA256)
		.update(text)
		.digest(ENCODING.base64);
};

/**
 * Hashing input text by using sha256
 * 
 * @param	{string}	text	Unhashed text
 * @return	{string}			Hashed text in sha256
 */
const _sha256 = function (text) {
	return crypto.createHash(ALGO.SHA1)
		.update(text)
		.digest(ENCODING.base64);
};

/**
 * Hashing input text by using md5
 * 
 * @param	{string}	text	Unhashed text
 * @return	{string}			Hashed text in md5
 */
const _md5 = function (text) {
	return crypto.createHash(ALGO.MD5)
		.update(text)
		.digest(ENCODING.base64);
};

module.exports = {
	aes: aes,
	sha1: _sha1,
	sha256: _sha256,
	md5: _md5
};

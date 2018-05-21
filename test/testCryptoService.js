const assert = require('assert');
const { aes, sha1, sha256, md5 } = require('../lib/cryptoService');

describe('cryptoService', () => {
	describe('aes', () => {
		it('Encrytion are reversible', (done) => {
			let string = "string here";
			let result = aes.decrypt(aes.encrypt(string));
			assert.equal(result, string);
			done();
		});
		it('Encrytion return String', (done) => {
			let string = "string here";
			let result = typeof aes.encrypt(string);
			assert.equal(result, 'string');
			done();
		});
		it('Decryption return String', (done) => {
			let string = "string here";
			let result = typeof aes.decrypt(aes.encrypt(string));
			assert.equal(result, 'string');
			done();
		});
	});
});
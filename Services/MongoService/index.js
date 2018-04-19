const MongoClient = require('mongodb').MongoClient;
const logger = require('../Logger');
const assert = require('assert');

var state = {
	db: null
};

exports.connect = function (url) {
	return new Promise((resolve, reject) => {
		if (state.db) {
			return resolve(state.db);
		}
		logger.info(`[MongoDB] Connecting to: ${url}`);
		try {
			MongoClient.connect(url, function (err, db) {
				assert.equal(err, null);
				logger.info(`[MongoDB] Connection build at ${Date()}`);
				state.db = db;
				resolve(state.db);
			});
		} catch (err) {
			reject({ err: "[MongoDB] Unable to connect MongoDB" });
		}
	});
}

exports.get = function () {
	return state.db;
}

exports.close = function (done) {
	if (state.db) {
		state.db.close(function (err, result) {
			state.db = null;
			done(err);
		});
	} else {
		done(err);
	}
}
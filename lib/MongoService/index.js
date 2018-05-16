/**
 * @author 		Sam Ho <hkf1113@gmail.com>
 * @create 		2017-12-01
 * @modified 	2018-05-13
 */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const logger = require('../Logger');
const config = require('../../config.json').MongoDB;

var state = {
	db: null
};

/**
 * 
 * @param 	{string} 	url 	Mongo connection url
 * @return 	{Promise}			resolve with MongoDB Connection Object || reject with err object
 */
const _connect = function (url = null) {
	return new Promise((resolve, reject) => {
		if (state.db) {
			return resolve(state.db);
        }
        if(url === null){
            url = `mongodb://${config.account}:${config.password}@${config.mongoUri}/${config.database}`;
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

/**
 * @return {Object}	MongoDB Connection Object
 */
const _get = function () {
	return state.db;
}

/**
 * @callback done
 * @param {function} done 
 */
const _close = function (done) {
	if (state.db) {
		state.db.close(function (err, result) {
			state.db = null;
			done(err);
		});
	} else {
		done(err);
	}
}


module.exports ={
	connect : _connect,
	get : _get,
	close : _close
};
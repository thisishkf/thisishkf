/**
 * @author 		Sam Ho <hkf1113@gmail.com>
 * @create 		2018-04-19
 * @modified 	2018-05-16
 */
const mysql = require('mysql');
const assert = require('assert');

const config = require(__dirname + '/../../config').MYSQL;
const logger = require(__dirname + '/../Logger');

var state = {
	db: null
};

const _connect = function () {
	return new Promise((resolve, reject) => {
		try {
			if (state.db) {
				return resolve(state.db);
			}
			logger.info(`[MySQLDB] Connecting to: ${config.host}:${config.port}`);
			pool = mysql.createPool(config);
			logger.info(`[MySQLDB] Connection Pool build at ${Date()}`);
			state.db = pool;
			resolve(state.db);
		} catch (err) {
			reject({ err: "[MySQLDB] Unable to connect MySQL DB" });
		}
	});
}

const _discounnect = function () {
	if (state.db) {
		state.db.end(function (err) {
			assert.equal(err, null);
			state.db = null;
		})
	}
}

const _buildQuery = function (sql, params) {
	for (let key in params) {
		if (sql.indexOf(key) <= 0) {
			throw new Error(`[MySQLDB] Building SQL fail: Invalid parameter pairs of key ${key}`);
		}
		sql = sql.replace(`:${key}`, `"${params[key]}"`);
	}
	return sql;
}

const _select = function (sql, params = null, callback = function () { }) {
	if (sql.toUpperCase().indexOf("SELECT") === -1) {
		throw new Error('[MYSQL] cannot find Select Statement');
	}
	if (params != null) {
		sql = _buildQuery(sql, params);
	}
	pool.getConnection(function (err, connection) {
		assert.equal(err, null);
		connection.query(sql, function (error, results, fields) {
			connection.release();
			assert.equal(err, null);
			callback(results);
		});
	});
}

const _selectOne = function (sql, params = null, callback = function () { }) {

	if (sql.toUpperCase().indexOf("SELECT") === -1) {
		throw new Error('[MYSQL] cannot find Select Statement');
	}
	if (params != null) {
		sql = _buildQuery(sql, params);
	}
	pool.getConnection(function (err, connection) {
		assert.equal(err, null);
		connection.query(sql, function (error, results, fields) {
			connection.release();
			assert.equal(err, null);
			callback(results == null ? null : results[0]);
		});
	});
}

const _insert = function (sql, params = null, callback = function () { }) {
	if (sql.toUpperCase().indexOf("INSERT INTO") === -1) {
		throw new Error('[MYSQL] cannot find Insert Statement');
	}
	if (params != null) {
		sql = _buildQuery(sql, params);
	}
	pool.getConnection(function (err, connection) {
		assert.equal(err, null);
		connection.query(sql, function (error, results, fields) {
			connection.release();
			assert.equal(err, null);
			callback(results.insertId);
		});
	});

}

const _update = function (sql, params = null, callback = function () { }) {
	if (sql.toUpperCase().indexOf("UPDATE") === -1) {
		throw new Error('[MYSQL] cannot find Update Statement');
	}
	if (params != null) {
		sql = _buildQuery(sql, params);
	}
	pool.getConnection(function (err, connection) {
		assert.equal(err, null);
		connection.query(sql, function (error, results, fields) {
			connection.release();
			assert.equal(err, null);
			let nUpdated = parseInt(results.message.match(/^\(Rows matched: (\d*)  Changed: (\d*)  Warnings: (\d*)/)[2]);
			callback(nUpdated);
		});
	});
}

const _delete = function (sql, params = null, callback = function () { }) {

	if (sql.toUpperCase().indexOf("DELETE") === -1) {
		throw new Error('[MYSQL] cannot find Delete Statement');
	}
	if (params != null) {
		sql = _buildQuery(sql, params);
	}
	pool.getConnection(function (err, connection) {
		assert.equal(err, null);
		connection.query(sql, function (error, results, fields) {
			connection.release();
			assert.equal(err, null);
			callback(results.affectedRows);
		});
	});
}

module.exports = {
	connect: _connect,
	discounnect: _discounnect,
	select: _select,
	selectOne: _selectOne,
	insert: _insert,
	update: _update,
	delete: _delete
};





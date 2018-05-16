/**
 * @author 		Sam Ho <hkf1113@gmail.com>
 * @create 		2017-12-01
 * @modified 	2018-05-13
 */
const fs = require('fs');
const config = require(__dirname + '/../../config.json').Logger;
const { COLOR, LEVEL, DAYS } = require(__dirname + '/constant');

const _info = function (msg) {
	writeLog("INFO", COLOR.Black, `\t${msg}`);
};

const _debug = function (msg) {
	writeLog("DEBUG", COLOR.Black, `\t${msg}`);
};

const _error = function (msg) {
	writeLog("ERROR", COLOR.Red, msg);
};

const _warn = function (msg) {
	writeLog("WARN", COLOR.Yellow, `\t${msg}`);
};

const _access = function (req) {
	let msg = makeAccessLog(req);
	writeLog("TRACE", COLOR.Black, msg);
}


/**
 * 
 * @param {string} type 
 * @param {string} color 
 * @param {string} msg 
 */
const writeLog = function (type, color, msg = "") {
	try {
		let { week, day, time } = getDayInfo();
		let text = `${week} ${day} ${time} [${process.pid}][${type}]\t ${msg}`;
		switch (type) {
			case "TRACE":
				log2File(type, text);
				break;
			default:
				console.log(color, text);
				log2File(type, text);
		}
	} catch (err) {
		let { week, day, time } = getDayInfo();
		text = `${week} ${day} ${time} [thread id: ${process.pid}][${type}]\t ${JSON.stringify(err)}`;
		console.log(COLOR.Red, text);
	}
};

/**
 * Write logging information to file
 * 
 * @param {string} type 	Logging type (logger level)
 * @param {string} text 	Logging information
 */
const log2File = function (type = "DEBUG", text = "") {
	//preapre file
	let { date } = getDayInfo();
	var fileName = config.filePath;
	switch (type) {
		case "ERROR":
			fileName += config.fileName.ERROR;
			break;
		case "TRACE":
			fileName += config.fileName.ACCESS;
			break;
		case "DEBUG":
		default:
			fileName += config.fileName.DEBUG;
	}
	fileName = fileName.replace("{DATE}", date);
	//writing out message
	try {
		fs.stat(fileName, function (err, stat) {
			if (err === null) {
				fs.appendFileSync(fileName, text + "\n");
			} else if (err.code === 'ENOENT') {
				fs.writeFile(fileName, text, function () { });
			} else {
				console.log('[ERROR]: ', err.code);
			}
		});
	} catch (err) {
		console.log(err);
	}
};

/**
 * @private
 * @return {Object} All Information of today
 */
const getDayInfo = function () {
	let today = new Date();
	let year = `${today.getFullYear()}`;
	let month = today.getMonth() + 1;
	month = today.getMonth() >= 10 ? `${today.getMonth()}` : `0${today.getMonth()}`;
	let day = today.getDate() >= 10 ? `${today.getDate()}` : `0${today.getDate()}`;
	let week = DAYS[today.getDay()];

	let hour = today.getHours() >= 10 ? `${today.getHours()}` : `0${today.getHours()}`;
	let min = today.getMinutes() >= 10 ? `${today.getMinutes()}` : `0${today.getMinutes()}`;
	let sec = today.getSeconds() >= 10 ? `${today.getSeconds()}` : `0${today.getSeconds()}`;
	let time = `${hour}:${min}:${sec}`;
	let date = `${year}${month}${day}`;

	return {
		year: year,
		month: month,
		day: day,
		week: week,
		time: time,
		date: date
	};
}

/**
 * make Access Log
 * 
 * @param 	{Obecjt} req 	Express Request Object
 * @return 	{string} Access Log Information
 */
const makeAccessLog = function (req) {
	var msg = `{ip} [{clfDate}] "{method} {url} {protocol}/{httpVersion}" "{contentLength}" "{referer}" "{userAgent}"`
	let data = {
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null),
		clfDate: getDayInfo().date,
		method: req.method,
		protocol: req.protocol,
		url: req.url,
		httpVersion: req.httpVersion,
		contentLength: req.headers['content-length'] || "",
		referer: req.headers['referer'] || "",
		userAgent: req.headers['user-agent']
	}

	Object.keys(data).forEach((key) => {
		msg = msg.replace(`{${key}}`, data[key]);
	});
	return msg;
}

module.exports = {
	info: _info,
	debug: _debug,
	error: _error,
	warn: _warn,
	access: _access
};
const request = require('request');
const ping = require('ping');
const { DEV_LIST } = require('./config');

const healthCheck = function (callback = function () { }) {
	return new Promise((resolve, reject) => {
		try {
			healthCheckProcess(DEV_LIST.slice(), {}, function (result) {
				resolve(result);
			});
		}
		catch (err) {
			reject(err);
		}
	});
}
/**
 * @private
 */
const healthCheckProcess = function (siteList = [], result = {}, callback = function () { }) {
	if (siteList.length == 0) {
		return callback(result);
	}

	let site = siteList.shift();
	let subTask = `checking ${site.uri}`;
	console.time(subTask);
	let start = new Date().getTime();
	request(site.uri, function (error, response, html) {
		let end = new Date().getTime();
		console.timeEnd(subTask);
		if (!error && response.statusCode == 200) {
			result[site.title] = {
				ip: site.ip,
				active: true,
				err: "",
				responseTime: end - start
			};
		} else {
			ping.sys.probe(site.ip, function (isAlive) {
				result[site.title] = {
					ip: site.ip,
					active: false,
					err: error,
					msg: isAlive ? "Server Ip is active but site cannot be reached" : "Server Ip is Inactive"
				};
			});
		}
		return healthCheckProcess(siteList, result, callback);
	});
}

module.exports = {
	healthCheck: healthCheck
};
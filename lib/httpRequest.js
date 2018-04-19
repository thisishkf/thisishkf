const http = require('http');
const https = require('https');
const url = require('url');

/*
 * Global constants
 */
const PROTOCOL_HTTP = "http:";
const PROTOCOL_HTTPS = "https";


/**
 * @param		{String}	uri
 * @returns {JSON}		uriParser.prased|urlParse.u
 *		protocol	: "http:" | "https" | null ,
 *		slashes	: true		| false,
 *		auth			: auth		| null, {@example "username:password"}
 *		host			: host		| null, {@example "example.org"}
 *		port			: port		| null, {@example "80"}
 *		hostname	: hostname| null, {@example "example.org"}
 *		hash			: hash		| null,
 *		search		:	search	| null, {@example "?param1=value1&param2=value2"}
 *		query		:	query		| null, {@example "param1=value1&param2=value2"}
 *		pathname	: pathname| null, {@example "/askStock",}
 *		path			: "${pathname + seach}" | null , {@example "/askStock?param1=value1&param2=value2"}
 *		href			: "${protocol}//${hostname}", {@example "http://example.org/"}
 */
var uriParser = function (uri) {
	const DEFAULT_REQUEST_PROTOCOL = "http";
	const DEFAULT_HTTP_PORT = 80;
	const DEFAULT_HTTPS_PORT = 443;
	if (!uri.includes("://")) {
		uri = `${DEFAULT_REQUEST_PROTOCOL}://${uri}`;
	}
	let prased = url.parse(uri);
	if (prased.protocol === PROTOCOL_HTTPS && prased.port === null) {
		prased.port = DEFAULT_HTTPS_PORT;
	}
	if (prased.protocol === PROTOCOL_HTTP && prased.port === null) {
		prased.port = DEFAULT_HTTP_PORT;
	}
	return prased;
};

/**
 * Parse JSON Object into required format for HTTP Request Configuration
 * 
 * 
 * @param		{String}	method		HTTP Request method ("GET" | "POST" | "PUT" | "DELETE" )
 * @param		{JSON}		uriParser	JSON Object that prased by url.js {@link url#parse(String)}
 * @param		{JSON}		params		Parameters for building HTTP Request Query in JSON Object Format
 * @returns {JSON}							JSON Object uses for sending HTTP Request
 */
var httpConfigParser = function (method, uriParser, params = null) {

	if (uriParser.query === null && params !== null) {
		let query = "?";
		for (let key in params) {
			query += `${key}=${params[key]}&`;
		}
		uriParser.path += query.substring(0, query.length - 1);
	}
	return config = {
		host: uriParser.host,
		port: uriParser.port,
		path: uriParser.path,
		method: method
	};

};

/**
 * Main Function to be called for sending HTTP POST Request
 * 
 * {@link uriParser}
 * {@link httpConfigParser}
 * @callback callback
 * @param {String}		uri				HTTP Request URI
 * @param {JSON}			params		JSON Object that prased by url.js {@link url#parse(String)}
 * @param {callback}	callback	Callback Function Asynchronized function call
 * @param {Array}			args			Unhandled arguement array.
 */
var httpPost = function (uri, params = null, callback = function() {}, ...args){
	let parsedUri = uriParser(uri);
	let config = httpConfigParser("POST", parsedUri, params);
	let secure = false;
	switch (parsedUri.protocol) {
		case PROTOCOL_HTTP:
			secure = false;
			break;
		case PROTOCOL_HTTPS:
			secure = true;
			break;
		default:
			callback({err: "unSupported protocol of Untility"});
			break;
	}
	httpRequest(config, secure, callback);
};

/**
 * Main Function to be called for sending HTTP GET Request
 * 
 * {@link uriParser}
 * {@link httpConfigParser}
 * @callback callback
 * @param {String}		uri				HTTP Request URI
 * @param {JSON}			params		JSON Object that prased by url.js {@link url#parse(String)}
 * @param {callback}	callback	Callback Function Asynchronized function call
 * @param {Array}			args			Unhandled arguement array.
 */
var httpGet = function (uri, params = null, callback = function() {}, ...args) {
	let parsedUri = uriParser(uri);
	let config = httpConfigParser("GET", parsedUri, params);
	let secure = false;
	switch (parsedUri.protocol) {
		case PROTOCOL_HTTP:
			secure = false;
			break;
		case PROTOCOL_HTTPS:
			secure = true;
			break;
		default:
			callback({err: "unSupported protocol of Untility"});
			break;
	}
	httpRequest(config, secure, callback);
};

/**
 * @private
 * @callback					callback					
 * @param {JSON}			options			HTTP Request Config
 * @param {callback}	callback	
 */
var httpRequest = function (options, secure = false, callback) {
	try {
		let data = '';
		let reqFunction = http.request;
		if (secure) {
			reqFunction = https.request;
		}
		let req = reqFunction(options, (res) => {
			res.setEncoding('utf8');
			console.log(`httpRequest ${options.host + options.path} statusCode: ${res.statusCode}`);
			res.on('data', (chunk) => {
				data += chunk;
			});
			res.on('end', () => {
//				console.log(`HTTP Response: ${JSON.stringify(data)}`);
				callback(JSON.parse(data));
			});
		}).on("error", (err) => {
//			console.log("Error: " + err.message);
			callback(JSON.parse(err));
		});
		req.end();
	} catch (e) {
//		console.log(`HTTP EEEOR: ${e} `);
		callback({err: e});
}
};


var httpGet = function (uri, params = null, callback = function() {}, ...args) {
	let parsedUri = uriParser(uri);
	let config = httpConfigParser("GET", parsedUri, params);
	let secure = false;
	switch (parsedUri.protocol) {
		case PROTOCOL_HTTP:
			secure = false;
			break;
		case PROTOCOL_HTTPS:
			secure = true;
			break;
		default:
			callback({err: "unSupported protocol of Untility"});
			break;
	}
	httpRequest(config, secure, callback);
};

exports.httpGet = httpGet;
exports.httpPost = httpPost;
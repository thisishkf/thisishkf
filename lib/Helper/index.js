/**
 * @author 		Sam Ho <hkf1113@gmail.com>
 * @create 		2017-12-01
 * @modified 	2018-05-16
 */

/**
 * Make Page Model for rendering ejs
 * 
 * @param {string} 	module 	Dynamic pikcing view modules
 * @param {array} 	script	Array of string that giving js path. 
 * @return {Object}
 */
const _getmodel = function (module = 'www', script = []) {
	return {
		head: {
			meta: {
				title: "Thisishkf",
				description: "",
				keyword: "",
			},
			script: script
		},
		menu: {
			Util: [
				{ title: 'HealthCheck', uri: '/util/healthCheck', status: "active" },
				{ title: 'Count Down', uri: '/util/countdown', status: "active" },
				{ title: 'Host List', uri: '/util/hostList', status: "active" },
				{ title: 'Youtube Download', uri: '/util/youtubeDownload', status: "active" }
			],

			Game: [
				{ title: 'no2g', uri: '/game/no2g', status: "active" },
			],

			Job: [
				{ title: 'portfolio', uri: '/job/portfolio', status: "active" },
				{ title: 'question', uri: '/job/question', status: "active" }
			]
		},
		main: {
			module : module
		},
		foot: { copyright: '' }
	};
}
/**
 * Use for making EJS reponse rending
 * 
 * @param {Object} res 		Express response Object
 * @param {string} view 	dynamic picking ejs view
 * @param {Object} model	use for rendering ejs
 */
const _render = function (res, view, model) {
	model.view = view;
	res.render(`${model.main.module}/index`, model);
}
/**
 * use for making ajax response
 * 
 * @param {Object} 	res 	Express response Object
 * @param {boolean} result 	result of ajax call
 * @param {JSON} 	data 	ajax response body
 * @param {string} 	msg 	extra response message
 */
const _makeAjax = function (res, result = false, data = null, msg = '') {
	let responseData = { r: result, data: data, msg: msg };
	res.end(JSON.stringify(responseData));
}

module.exports = {
	getmodel: _getmodel,
	_render: _render,
	makeAjax: _makeAjax
};
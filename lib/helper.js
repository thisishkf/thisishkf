const _getmodel = function () {
	return {
		head: {
			meta: {
				title: "Thisishkf",
				description: "",
				keyword: "",
			},
			script: []
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
		main: {},
		foot: { copyright: '' }
	};
}

const _render = function (res, view, model) {
	model.view = view;
	res.render('index', model);
}

const _makeAjax = function (res, result = false, data = null, msg = '') {
	let responseData = { r: result, data: data, msg: msg };
	res.end(JSON.stringify(responseData));
}

module.exports = {
	getmodel: _getmodel,
	_render: _render,
	makeAjax: _makeAjax
};
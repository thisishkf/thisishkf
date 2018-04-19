const _getmodel = function () {
	return {
		head: {
			meta: {
				title : "Thisishkf",
				description : "",
				keyword : "",
			},
			script: []
		},
		menu: [
			{ title: 'HealthCheck', uri: '/util/healthCheck' ,status : "active"},
			{ title: 'Count Down', uri: '/util/countdown' ,status : "active"},
			{ title: 'Host List', uri: '/util/hostList' ,status : "active"},
			{ title: 'Youtube Download', uri: '/util/youtubeDownload' ,status : "active"}
		],
		main: {},
		foot: { copyright: '' }
	};
}

const _render = function (res, view, model) {
	model.view = view;
	res.render('index', model);
}

const _makeAjax = function (res, rresult = false, data = null, msg = '') {
	res, end({ r: result, data: data, msg: msg });
}

module.exports = {
	getmodel: _getmodel,
	_render: _render,
	makeAjax: _makeAjax
};
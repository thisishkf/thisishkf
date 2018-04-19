const _getmodel = function(){
	return {
		head : {
			title : '',
			script : []
		},
		menu : [{title : '', uri : ''}],
		main : {},
		foot : { copyright : ''}
	};
}

const _render = function(res , view, model){
	model.view = view;
	res.render('index' , model);
}

module.exports = {
	getmodel : _getmodel,
	_render : _render
};
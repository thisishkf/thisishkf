$(document).ready(function () {
	$("#youtubeDownload").find('input[type=button]').on('click', (event) => {
		event.preventDefault();
		let _this = $("#youtubeDownload");
		let data = {
			link: _this.find('input[name=link]').val(),
			type: _this.find('input[name=type]:checked').val(),
			title: _this.find('input[name=title]').val(),
			artist: _this.find('input[name=artist]').val(),
			makeItuensMeta: _this.find('input[name=makeItuensMeta]').prop('checked')
		};
		console.log(data);
		$.ajax({
			url: "/util/youtubeDownload",
			method: "POST",
			dataType: 'json',
			data: data,
			beforeSend() {
				console.log("Sending Data");
			},
			success(res) {
				console.log(res);
				if(res.r == true){
					alert("Download success");
				}
			},
			error() {

			},
			complete() {

			}
		});
	});
});
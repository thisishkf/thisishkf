const request = require('request');
const cheerio = require('cheerio');

const getRates = function () {
	const API_URI = "http://www.aastocks.com/tc/forex/quote/curcrossrates.aspx";

	return new Promise((resolve, reject) => {
		try {
			request(API_URI, function (error, response, html) {
				if (!error && response.statusCode == 200) {
					const $ = cheerio.load(html);
					const table = $(".content").find('table');
					let rateList = [];
					table.find('.text_right').each(function () {
						let _this = $(this);
						if(_this.find('a').html() != null && !_this.hasClass("greya")){
							let rate = {};
							let key = _this.find('a').attr("title");
							let val = _this.find('a').html();
							rate[key] = val;
							rateList.push(rate);
						}
					});

					resolve(rateList);
				} else {
					console.log('error:', error); // Print the error if one occurred
					console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
					reject({ err: err, response: response });
				}
			});
		} catch (err) {
			reject({ err: err });
		}
	});
}
module.exports = {
	getRates: getRates
}

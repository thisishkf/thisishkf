const request = require('request');
const cheerio = require('cheerio');

const getCurrentPrice = function (code) {
	code = code.padStart(4,'0');
	const API_URI = "https://hk.finance.yahoo.com/quote/#CODE#.HK/";
	var uri = API_URI.replace("#CODE#", `${code}`);
	return new Promise((resolve, reject) => {
		try {
			request(uri, function (error, response, html) {
				if (!error && response.statusCode == 200) {
					const $ = cheerio.load(html);
					const header = $("#quote-header-info");
					let priceField = header.children().last().find('span').html();
					let result = priceField.match(/<!--.*-->(.*)<!--.*-->/);

					const summary = $("#quote-summary");
					let summaryInfo = [];
					summary.find('table').each(function () {
						let _thisTable = $(this);
						_thisTable.find('tr').each(function () {
							let _thisTr = $(this);
							let field = {};
							let key = "", val = "";
							_thisTr.find('td').each(function (i) {
								let _thisTd = $(this);
								switch (i) {
									case 0:
										key = decodeURI(_thisTd.find('span').text());
										break;
									case 1:
										try {
											val = decodeURI(_thisTd.find('span').text()) || decodeURI(_thisTd.text());
										} catch (err) {
											console.log(err);
											val = _thisTd.find('span').text() || _thisTd.text();
										}
										break;
									default:
								}
							});
							field[key] = val;
							summaryInfo.push(field);
						});
					});
					let out = { stock: code, currentPrice: result[1], summary: summaryInfo };
					resolve(out);
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
	getCurrentPrice: getCurrentPrice
}

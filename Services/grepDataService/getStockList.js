const request = require('request');
const cheerio = require('cheerio');

const STOCKLISTURI = "http://www.hkexnews.hk/hyperlink/hyperlist.HTM";

var getStockList = function (uri = STOCKLISTURI) {
	var stockList = [];
	return new Promise((resolve, reject) => {
		try {
			request(uri, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					const $ = cheerio.load(body);
					const table = $(".ms-rteTable-BlueTable_ENG");

					table.find('tr').each(function () {
						let _thisTr = $(this);
						let stock = {};
						_thisTr.find('td').each(function (i) {
							let _thisTd = $(this);
							switch (i) {
								case 0:
									stock.code = _thisTd.find('p').html() || _thisTd.html();
									break;
								case 1:
									stock.name = _thisTd.find('p').html() || _thisTd.find('span').html() || _thisTd.html();
									break;
								case 2:
									stock.website = _thisTd.find('a').html();
									break;
								default:
							}
						});
						stockList.push(stock);
					});
					resolve(stockList);
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
	getStockList: getStockList
}
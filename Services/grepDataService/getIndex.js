const request = require('request');
const cheerio = require('cheerio');

const getHKIndex = function () {
	const API_URI = "http://www.aastocks.com/tc/stocks/market/index/hk-index.aspx";
	return new Promise((resolve, reject) => {
		try {
			request(API_URI, function (error, response, html) {
				if (!error && response.statusCode == 200) {
					const $ = cheerio.load(html);
					const table = $(".content").find(".tblM");
					let indexList = [];
					table.find('tr').each(function (i) {
						if (i > 1 && i < table.find('tr').length - 1) {
							let _thisTr = $(this);
							let index = {};
							_thisTr.find('td').each(function (tdIndex) {
								let _thisTd = $(this);
								switch (tdIndex) {
									case 0:
										index.title = _thisTd.children('a').last().find('div').text() || _thisTd.find('div').text();
										break;
									case 1:
										index.currentPrice = _thisTd.children('div').last().html();
										break;
									case 2:
										index.change = _thisTd.find('span').html();
										break;
									case 3:
										index.changePrecentage = _thisTd.find('span').html();
										break;
									case 4:
										index.turnover = _thisTd.html();
										break;
									case 5:
										index.high = _thisTd.html();
										break;
									case 6:
										index.low = _thisTd.html();
										break;
									case 7:
										index.weekly = _thisTd.find('span').html();
										break;
									default:
								}
							});
							indexList.push(index);
						}
					});
					resolve(indexList);
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

const getGlobalIndex = function () {
	const API_URI = "http://www.aastocks.com/tc/stocks/market/index/world-index.aspx";
	return new Promise((resolve, reject) => {
		try {
			request(API_URI, function (error, response, html) {
				if (!error && response.statusCode == 200) {
					const $ = cheerio.load(html);
					const table = $(".grid_11").find(".content").find(".tblM");
					let indexList = [];
					let worldPointer = "";
					table.find('tr').each(function (i) {
						if (i > 0 && i < table.find('tr').length - 1) {
							let _thisTr = $(this);
							let index = {};
							switch (_thisTr.find('td').length) {
								case 1:
									break;
								case 4:
									_thisTr.find('td').each(function (tdIndex) {
										let _thisTd = $(this);
										switch (tdIndex) {
											case 0:
												index.title = _thisTd.find('span').text();
												index.location = worldPointer;
												break;
											case 1:
												let priceField = _thisTd.find('span').html().match(/<span.*span>(.*)/) ;
												index.currentPrice = priceField ? priceField[1] : _thisTd.find('span').html();
												break;
											case 2:
												index.change = _thisTd.find('span').html();
												break;
											case 3:
												index.changePrecentage = _thisTd.find('span').html();
												break;
											default:
										}
									});
									indexList.push(index);
									break;
								case 5:
									_thisTr.find('td').each(function (tdIndex) {
										let _thisTd = $(this);
										switch (tdIndex) {
											case 0:
												worldPointer = _thisTd.find('div').text();
												index.location = worldPointer;
												break;
											case 1:
												index.title = _thisTd.find('span').text();
												break;
											case 2:
												index.currentPrice = _thisTd.find('span').html().match(/<span.*span>(.*)/)[1];
												break;
											case 3:
												index.change = _thisTd.find('span').html();
												break;
											case 4:
												index.changePrecentage = _thisTd.find('span').html();
												break;
											default:
										}
									});
									indexList.push(index);
									break;
								default:
							}
						}
					});
					resolve(indexList);

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


getGlobalIndex()
	.then(data => {
		console.log(data);
	})
	.catch(err => console.log(err));

module.exports = {
	getHKIndex: getHKIndex
}

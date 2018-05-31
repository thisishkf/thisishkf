const request = require('request');
const cheerio = require('cheerio');

const getHills = function () {
	const API_URI = "http://www.kinhang.org.hk/mountain.htm";

	return new Promise((resolve, reject) => {
		try {
			request(API_URI, function (error, response, html) {
				if (!error && response.statusCode == 200) {
					const $ = cheerio.load(html);
					const table = $('table');
					let hillList = [];
					table.find('tr').each(function (i) {
						let _thisTr = $(this);
						let hill = {};
						_thisTr.find('td').each(function (i) {
							let _thisTd = $(this);
							switch (i) {
								case 0:
									break;
								case 1:
									hill.eName = _thisTd.find('font').text();
									break;
								case 2:
									hill.heigh = _thisTd.find('font').find('p').text();
									break;
								case 3:
									hill.location = _thisTd.find('p').text();
								default:
							}
						});
						hillList.push(hill);
					});
					console.log(hillList);
					resolve();
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
	getHills: getHills
}

getHills();
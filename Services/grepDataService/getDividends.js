const request = require('request');
const cheerio = require('cheerio');

const getDividends = function (code) {
	const API_URI = "http://www.aastocks.com/en/stocks/analysis/dividend.aspx?symbol=#CODE#";
	var uri = API_URI.replace("#CODE#", `${code}`);
	return new Promise((resolve, reject) => {
		try {
			request(uri, function (error, response, html) {
				if (!error && response.statusCode == 200) {
					const $ = cheerio.load(html);
					const table = $(".content").children('table').last();
					let dividendsList = [];
					table.find('tr').each(function (i) {
						if (i > 0) {
							let dividend = {};
							let _thisTr = $(this);
							_thisTr.find('td').each(function (tdIndex) {
								let _thisTd = $(this);
								switch (tdIndex) {
									case 0:
										dividend.Announce_Date = _thisTd.html();
										break;
									case 1:
										dividend.Year_end = _thisTd.html();
										break;
									case 2:
										dividend.Event = _thisTd.html();
										break;
									case 3:
										dividend.Particular = _thisTd.html().match(/.*:(.*)/)[1];
										break;
									case 4:
										dividend.Type = _thisTd.html();
										break;
									case 5:
										dividend.Ex_Date = _thisTd.html();
										break;
									case 6:
										dividend.Book_Close_Date = _thisTd.html();
										break;
									case 7:
										dividend.Payable_Date = _thisTd.html();
										break;
									default:
								}
							});
							dividendsList.push(dividend);
						}
					});
					resolve(dividendsList);
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
getDividends(3).then(
	data => {
		console.log(data[0]);
		console.log(data[1]);
		console.log(data[2]);
	}
).catch(err => console.log(err));
module.exports = {
	getDividends: getDividends
}

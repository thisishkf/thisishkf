const request = require('request');
const cheerio = require('cheerio');

const { getCurrentPrice } = require('./getCurrentPrice');
const { getStockList } = require('./getStockList');

module.exports = {
	getCurrentPrice: getCurrentPrice,
	getStockList: getStockList
}
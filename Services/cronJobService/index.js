const CronJob = require('cron').CronJob;

const config = require('./config');
const { TIMEZONE } = require('./constant');

const { getStockList, getCurrentPrice } = require('../grepDataService');

new CronJob('0 * * * * *', function () {
	getCurrentPrice("0700")
	.then(data => console.log(JSON.stringify(data)))
	.catch(err => console.log(err));
}, true, TIMEZONE.HK);

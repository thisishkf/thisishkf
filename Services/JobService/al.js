const _getYear = function (year) {
    if (typeof year == 'string') {
        year = parseInt(year);
    }
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        return 366;
    } else {
        return 365;
    }
}

/**
 * 
 * @param   {Date} StartDate 
 * @param   {Date} endDate 
 * @return  {int}
 */
const _getDiff = function (startDate, endDate = new Date()) {
    if (typeof startDate == 'string'){
        startDate = new Date(startDate);
    }
    if (typeof endDate == 'string'){
        endDate = new Date(endDate);
    }
    let timeDifference = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDifference / 86400000);
}

const _calculateALGain = function (startDate, alPerYear) {
    return (_getDiff(startDate) / 365.25) * alPerYear;
}

const _calculateALUsed = function (alHistory) {
    let alUsed = 0;
    alHistory.forEach(ele => {
        alUsed += ele.count;
    });
    return alUsed;
}

/**
 * 
 * @param   {Date}  StartDate 
 * @param   {int}   alPerYear 
 * @return  {JSON}  
 */
const _getAL = function (data) {
    data.totalAl = _calculateALGain(data.startDate, data.alPerYear);
    data.alLeft = data.totalAl - _calculateALUsed(data.alHistory);
    return data;
}

module.exports = {
    getAL: _getAL
}


const mongodb = require(__dirname + '/../../lib/MongoService');

const _getMatchList = function () {
    return new Promise(resolve => {
        mongodb.get().collection('hkjc_matchList')
            .aggregate([
                { "$sort": { "_id": -1 } },
                { "$limit": 1 }
            ]).toArray(function (err, result) {
                resolve(result[0]);
            });
    });

}

const _getHDA = function (id) {
    return new Promise(resolve => {
        let criteria = { "match.id": id };
        let _data = [], data = {};
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        if (index == 0) {
                            data = { Away: [], Draw: [], Home: [] };
                        }
                        data['Away'].push(ele._raw.hadodds.A.split("@")[1]);
                        data['Draw'].push(ele._raw.hadodds.D.split("@")[1]);
                        data['Home'].push(ele._raw.hadodds.H.split("@")[1]);
                    });
                    resolve(data);
                }
            });
    });
}

const _getCHL = function (id) {
    return new Promise(resolve => {
        let criteria = { "match.id": id };
        let _data = [], data = {};
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        if (!('chlodds' in ele._raw)) {
                            data["--"] = { L: [], H: [] };
                        } else {
                            ele._raw.chlodds.LINELIST.forEach(function (val, i) {
                                let key = val.LINE.split('/')[0];
                                if (!(key in data)) {
                                    data[key] = { L: [], H: [] };
                                }
                                data[key].L.push(val.L.split("@")[1]);
                                data[key].H.push(val.H.split("@")[1]);
                            });
                        }
                    });
                    resolve(data);

                }
            });
    });
}

const _getHIL = function (id) {
    return new Promise(resolve => {
        let criteria = { "match.id": id };
        let _data = [], data = {};;
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        if (!('hilodds' in ele._raw)) {
                            data["--"] = { L: [], H: [] };
                        } else {
                            ele._raw.hilodds.LINELIST.forEach(function (val, i) {
                                let key = val.LINE;
                                if (!(key in data)) {
                                    data[key] = { L: [], H: [] };
                                }
                                data[key].L.push(val.L.split("@")[1]);
                                data[key].H.push(val.H.split("@")[1]);
                            });
                        }
                    });
                    resolve(data);
                }
            });
    });
}

const _getCRS = function (id) {
    return new Promise(resolve => {
        let criteria = { "match.id": id };
        let _data = [], data = {};;
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        Object.keys(ele._raw.crsodds).forEach(function (score, i) {
                            if (score.indexOf("S") == 0) {
                                let rate = ele._raw.crsodds[score];
                                let key = score.split("S")[1];
                                switch (key) {
                                    case "M1MH":
                                        key = "主其他";
                                        break;
                                    case "M1MA":
                                        key = "客其他";
                                        break;
                                    case "M1MD":
                                        key = "和其他";
                                        break;
                                    default:
                                        key = parseInt(key.substr(0, 2)) + ":" + parseInt(key.substr(2));
                                        break;
                                }
                                if (!(key in data)) {
                                    data[key] = [];
                                }
                                data[key].push(rate.split("@")[1]);
                            }
                        });
                    });
                    resolve(data);
                }
            });
    });
}

const _getFCS = function (id) {
    return new Promise(resolve => {
        let criteria = { "match.id": id };
        let _data = [], data = {};;
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        Object.keys(ele._raw.fcsodds).forEach(function (score, i) {
                            if (score.indexOf("S") == 0) {
                                let rate = ele._raw.fcsodds[score];
                                let key = score.split("S")[1];
                                switch (key) {
                                    case "M1MH":
                                        key = "主其他";
                                        break;
                                    case "M1MA":
                                        key = "客其他";
                                        break;
                                    case "M1MD":
                                        key = "和其他";
                                        break;
                                    default:
                                        key = parseInt(key.substr(0, 2)) + ":" + parseInt(key.substr(2));
                                        break;
                                }
                                if (!(key in data)) {
                                    data[key] = [];
                                }
                                data[key].push(rate.split("@")[1]);
                            }
                        });
                    });
                    resolve(data);
                }
            });
    });
}
const _getTTGO = function (id) {
    return new Promise(resolve => {
        let criteria = { "match.id": id };
        let _data = [], data = {};;
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        Object.keys(ele._raw.ttgodds).forEach(function (goal, i) {
                            if (goal.length == 2) {
                                let rate = ele._raw.ttgodds[goal];
                                let key = goal.substr(1, 1);
                                if (!(key in data)) {
                                    data[key] = [];
                                }
                                data[key].push(rate.split("@")[1]);
                            }
                        });
                    });
                    resolve(data);
                }
            }); //end Mongo connection
    });
}

module.exports = {
    getMatchList: _getMatchList,
    getHDA: _getHDA,
    getCHL: _getCHL,
    getHIL: _getHIL,
    getCRS: _getCRS,
    getFCS: _getFCS,
    getTTGO: _getTTGO
}
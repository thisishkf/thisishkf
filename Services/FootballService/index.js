const { grepODDS } = require(__dirname + '/odds500');
const hkjc = require(__dirname + '/hkjc');


module.exports = {
    grepODDS: grepODDS,
    getHKJCMatchList: hkjc.getMatchList,
    getHKJCHDA : hkjc.getHDA,
    getHKJCCHL: hkjc.getCHL,
    getHKJCHIL: hkjc.getHIL,
    getHKJCCRS: hkjc.getCRS,
    getHKJCFCS: hkjc.getFCS,
    getHKJCTTGO: hkjc.getTTGO
}
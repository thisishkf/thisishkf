const hkjc = require(__dirname + '/hkjc');
const odds500 = require(__dirname + 'odds500');

const analyseWithCRS = async function (options) {
    let hkjcCRS = await hkjc.getCRS(options.HKJC.id);
    let odds500CRS = await odds500.getCRS(options.ODDS500.url);

    let result = {};
    //Main
    let highlight = { score: "", diff: 9999 };
    Object.keys(hkjcCRS).sort().forEach(function (ele) {
        //Get min value in HKJC
        let min_hkjc = getHKJCMinBet(ele, hkjcCRS);
        let min_all = getODDS500MinBet(ele, odds500CRS);
        
        result[key]
        //Make comparison
        let res = "";
        let diff = min_hkjc - min_all;
        if (diff < highlight.diff) {
            highlight = { score: ele, diff: diff };
        }

        if (diff < 0) {
            res = `Low (${diff.toFixed(2)})`;
        } else if (diff == 0) {
            res = `Equal`;
        } else if (diff < 0.25) {
            res = `Close (${diff.toFixed(2)})`;
        }

        // Printing Result
        switch (ele) {
            case "主其他":
                log(`| HO\t| ${min_hkjc}\t| ${min_all}\t| ${res}\t`);
                break;
            case "客其他":
                log(`| AO\t| ${min_hkjc}\t| ${min_all}\t| ${res}\t`);
                break;
            case "和其他":
                log(`| DO\t| ${min_hkjc}\t| ${min_all}\t| ${res}\t`);
                break;
            default:
                log(`| ${ele}\t| ${min_hkjc}\t| ${min_all}\t| ${res}\t`);
        }
    });//end loop
    log(`HKJC Lowest Bet is ${highlight.score} with ${highlight.diff} lower than other mainstream bets`);
}

const getHKJCMinBet = function (key, data) {
    switch (key) {
        case "主其他":
        case "客其他":
            return Math.min(...data[key]);
            break;
        default:
            return data[key];
    }
}

const getODDS500MinBet = function (key, data) {
    if (!(key in data) || data[key].length == 0) {
        return 0;
    }
    return Math.min(...allBets[key]);

}
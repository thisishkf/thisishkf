// TODO : Auto Pick url by match home-away
const _getCRS = async function (url) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            url: url,
            gzip: true,
            headers: {
                "Host": "odds.500.com",
                "Content-Type": "text/html",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh;q=0.6",
            }
        };
        request(options, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                let data = {
                    "0:0": [], "1:1": [], "2:2": [], "3:3": [],
                    "1:0": [], "2:0": [], "3:0": [], "4:0": [],
                    "0:1": [], "0:2": [], "0:3": [], "0:4": [],
                    "2:1": [], "1:2": [],
                    "3:1": [], "3:2": [], "1:3": [], "2:3": [],
                    "4:1": [], "4:2": [], "1:4": [], "2:4": [],
                    "5:1": [], "5:2": [], "1:5": [], "2:5": [],
                    "主其他": [], "和其他": [], "客其他": []
                };
                $('.pub_table').find('tr').each(function (i) {
                    if (i > 0) {
                        let _tr = $(this);
                        let company = _tr.find('td:nth-child(2)').text();
                        if (company != "Interwetten") {
                            data["1:0"].push(parseFloat(_tr.find('td:nth-child(4)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["0:1"].push(parseFloat(_tr.find('td:nth-child(4)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));

                            data["2:0"].push(parseFloat(_tr.find('td:nth-child(5)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["0:2"].push(parseFloat(_tr.find('td:nth-child(5)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));
                            data["2:1"].push(parseFloat(_tr.find('td:nth-child(6)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["1:2"].push(parseFloat(_tr.find('td:nth-child(6)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));

                            data["3:0"].push(parseFloat(_tr.find('td:nth-child(7)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["0:3"].push(parseFloat(_tr.find('td:nth-child(7)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));
                            data["3:1"].push(parseFloat(_tr.find('td:nth-child(8)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["1:3"].push(parseFloat(_tr.find('td:nth-child(9)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));
                            data["3:2"].push(parseFloat(_tr.find('td:nth-child(9)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["2:3"].push(parseFloat(_tr.find('td:nth-child(9)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));

                            data["4:0"].push(parseFloat(_tr.find('td:nth-child(10)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["0:4"].push(parseFloat(_tr.find('td:nth-child(10)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));
                            data["4:1"].push(parseFloat(_tr.find('td:nth-child(11)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["1:4"].push(parseFloat(_tr.find('td:nth-child(11)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));
                            data["4:2"].push(parseFloat(_tr.find('td:nth-child(12)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["2:4"].push(parseFloat(_tr.find('td:nth-child(13)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));
                            data["主其他"].push(parseFloat(_tr.find('td:nth-child(13)').html().match(/<span .*>(.*)<\/span>(.*)/)[1]));
                            data["客其他"].push(parseFloat(_tr.find('td:nth-child(13)').html().match(/<span .*>(.*)<\/span>(.*)/)[2]));

                            data["0:0"].push(parseFloat(_tr.find('td:nth-child(14)').text()));
                            data["1:1"].push(parseFloat(_tr.find('td:nth-child(15)').text()));
                            data["2:2"].push(parseFloat(_tr.find('td:nth-child(16)').text()));
                            data["3:3"].push(parseFloat(_tr.find('td:nth-child(17)').text()));
                            data["和其他"].push(parseFloat(_tr.find('td:nth-child(18)').text()));
                        }
                    }
                });
                resolve(data);
            }
        });//end request()
    });
}

module.exports = {
    getCRS : _getCRS
}
var request = require('request');
var q = require('q');
var cheerio = require('cheerio');
var Socks5ClientHttpAgent = require('socks5-http-client/lib/Agent');
var Socks5ClientHttpsAgent = require('socks5-https-client/lib/Agent');

var proxy = {
    socksPort: 9050
};
var httpAgent = new Socks5ClientHttpAgent(proxy);
var httpsAgent = new Socks5ClientHttpsAgent(proxy);
request = request.defaults({
    jar: request.jar()
});
module.exports = function(keyword, provider) {

    var url = provider.url(keyword);
    var agent = url.substr(0, 5) === 'https' ? httpsAgent : httpAgent;

    var def = q.defer();

    request({
        url: url,
        agent: agent,
        pool: {
            maxSockets: Infinity
        }
    }, function(err, res, body) {
        if (err) throw err;
        var $ = cheerio.load(body);
        def.resolve(provider.parse($));
    });

    return def.promise;

};

var crawler = require('./crawler');

// provider
var kavkaz = require('./provider/kavkaz');

var p = crawler('russia', kavkaz);

p.then(function(r) {
    console.log(r);
});

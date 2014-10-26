var request = require('request');

module.exports = {

    url: function(keyword) {
        return 'http://2r2tz6wzqh7gaji7.onion/eng/search.php?q=' + keyword;
    },

    parse: function($) {
        var data = $('.text-b a.link-blue-11').map(function() {
            return $(this).text();
        }).get();

        return data;
    }

};

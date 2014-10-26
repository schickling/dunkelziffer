var request = require('request');

module.exports = {

    parse: function($) {
        var data = $('.search-results a span').map(function() {
            return $(this).text();
        }).get();

        return data;
    }

};

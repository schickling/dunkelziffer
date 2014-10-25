var request = require('request');
var _ = require('lodash');

module.exports = {

    url: function(keyword) {
        return 'http://mobile.nytimes.com/search?query=' + keyword;
    },

    parse: function($) {
        var data = $('.search-results a span').map(function() {
            return $(this).text();
        }).get();

        return data;
    }

};

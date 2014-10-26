var request = require('request');
var htmlToText = require('html-to-text').fromString;

module.exports = {

    isDeep: false,

    url: function(keyword) {
        return 'http://mobile.nytimes.com/search?sort=rel&page=0&query=' + keyword;
    },

    parse: function($) {

        return $('.search-results li.highlighted.border-b').map(function() {

            var el = $(this);
            var url = 'http://mobile.nytimes.com' + el.find('a').attr('href');
            var title = htmlToText(el.find('a span').html()).replace(' - NYTimes.com', '').replace('...', '');
            var dateString = el.find('p.search-item-details span:first-child').html();
            var date = new Date(dateString);

            return {
                url: url,
                title: title,
                date: date,
                source: 'New York Times'
            };

        }).get();

    }

};

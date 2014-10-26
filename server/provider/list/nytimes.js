var request = require('request');

module.exports = {

    url: function(keyword) {
        return 'http://mobile.nytimes.com/search?query=' + keyword;
    },

    parse: function($) {

        return $('.search-results li.highlighted.border-b').map(function() {

            var el = $(this);
            var url = 'http://mobile.nytimes.com' + el.find('a').attr('href');
            var title = el.find('a span').html();
            var dateString = el.find('p.search-item-details span:first-child').html();
            var date = new Date(dateString);

            return {
                url: url,
                title: title,
                date: date,
                isDeep: false,
                source: 'New York Times'
            };

        }).get();

    }

};

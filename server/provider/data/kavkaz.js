var htmlToText = require('html-to-text').fromString;

module.exports = {

    check: function(url) {
        return url.indexOf('2r2tz6wzqh7gaji7') > -1;
    },

    url: function(url) {
        return url;
    },

    parse: function($) {

        var title = $('h1').html();
        var text = htmlToText($('#text-b').html());

        return {
            title: title,
            text: text
        };

    }

};

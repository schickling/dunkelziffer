var htmlToText = require('html-to-text').fromString;

module.exports = {

    isDeep: true,

    check: function(url) {
        return url.indexOf('2r2tz6wzqh7gaji7') > -1;
    },

    url: function(url) {
        return url;
    },

    parse: function($) {

        var title = $('h1').html();
        var text = htmlToText($('#text-b').html().replace(/&#xFFFD;/g, '').replace(' <br />', '')).replace(/\[.*\]/g, '');

        return {
            title: title,
            text: text
        };

    }

};

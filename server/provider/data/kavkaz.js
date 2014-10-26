var request = require('request');
var htmlToText = require('html-to-text').fromString;

module.exports = {

    parse: function($) {

        return $('.text-b a.link-blue-11').map(function() {

            var el = $(this);
            var title = el.find('h1').html();
            var text = htmlToText(el.find('#text-b').html());

            return {
                title: title,
                text: text
            };

        }).get();

    }

};

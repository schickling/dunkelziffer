module.exports = {

    isDeep: false,

    check: function(url) {
        return url.indexOf('nytimes.com') > -1;
    },

    url: function(url) {
        return url;
    },

    parse: function($) {

        var title = $('h1 i').html();

        var text = $('.article-body > p').map(function() {
            return $(this).html();
        }).get().join('\n');

        return {
            title: title,
            text: text
        };

    }

};

module.exports = {

    check: function(url) {
        return url.indexOf('nytimes.com') > -1;
    },

    url: function(url) {
        return url;
    },

    parse: function($) {

        var title = $('h1.headline').html();

        //var text = $('.article-body p').map(function() {
        //return $(this).html();
        //}).get().concat('\n');
        var text = 1;

        return {
            title: title,
            text: text
        };

    }

};

module.exports = {

    isDeep: true,

    url: function(keyword) {
        return 'http://2r2tz6wzqh7gaji7.onion/eng/search.php?q=' + keyword;
    },

    parse: function($) {

        return $('td.top-black td.text-b[valign=top]').map(function() {

            var el = $(this);
            var url = 'http://2r2tz6wzqh7gaji7.onion' + el.find('a.link-blue-11').attr('href');
            var title = el.find('a.link-blue-11').html();
            var lastDiv = el.find('div:last-child').html().trim();
            var dateString = lastDiv.substr(lastDiv.indexOf('//') + 3);
            var date = new Date(dateString);

            return {
                url: url,
                title: title,
                date: date,
                source: 'Kavkaz Center'
            };

        }).get();

    }

};

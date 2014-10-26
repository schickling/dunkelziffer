// App = Ember.Application.create();

// App.Socket = io();

// App.Router.map(function() {
//   // put your routes here
// });

// App.IndexRoute = Ember.Route.extend({
//     model: function () {
//         // if (!query) {
//         //     return [];
//         // }



//         // var that = this;

//         // that.set('hasSearched', true);


//         return Ember.Deferred.promise(function (p) {

//             // var ajaxCall = $.ajax(jsRoutes.controllers.Search.json().url, {
//             //     type: 'POST',
//             //     contentType: 'application/json',
//             //     dataType: 'json',
//             //     data: JSON.stringify(paramsObj)
//             // }).then(function (response) {


//             // listen for results
//             socket.on('data', function(data) {
//                 console.log(data);
//             });


//             //     return results;
//             // });

//             // p.resolve(ajaxCall);


//         });
//     }
// });

// App.IndexController = Ember.Controller.extend({
//     init: function(){
//         var that = this;

//         // listen for results
//         App.Socket.on('data', function(data) {

//             console.log(data);


//             var models = [];

//             data.forEach(function(title){
//                 models.push(App.SearchResult.create({
//                         title: title
//                     })
//                 );

//             });



//             that.set('results', Array.prototype.concat(that.get('results'),models));
//         });
//     },
//     results: [],
//     actions: {
//         doSearch: function(query){
//             var that = this;

//             if (!query) {
//                 that.results = [];
//                 console.log('');
//                 return;
//             }


//             App.Socket.emit('keyword', query);
//         },
//     }
// });

// //MODELS
// App.SearchResult = Ember.Object.extend({
//     title: ''
// });

$(document).ready(function(){

    var socket = io(),
        lastKeyword = '',
        resultsDeep = resultsClear = [],
        _isSearching = false,
        isSearching = function(value){
            if(typeof value !== 'undefined'){
                _isSearching = value;
            }

            //toggle search indicator
            if(_isSearching){
                $('#search-indicator').show();
            } else {
                $('#search-indicator').hide();
            }

            return _isSearching;
        },
        searchTimeoutThrottle = 500,
        searchTimeout;

    socket.on('data', function(data) {
        populateResults(data);
    });

    socket.emit('keyword', 'russia');


    $('#query').on('keyup', function(){
        clearTimeout(searchTimeout);
        var query = $('#query').val();

        // validate search query
        if(!query){
            populateResults(); //reset results if query is empty
            return;
        }

        searchTimeout = setTimeout(function(){
            doSearch(query);
        },searchTimeoutThrottle);
    });

    var populateResults = function(results){

        if(!results){
            resetSearch();
            return;
        }

        if(results.keyword!==lastKeyword){
            return;
        }

        if(results.isDeep){
            resultsDark = Array.prototype.concat(resultsDark, results.data);
        } else {
            resultsClear = Array.prototype.concat(resultsClear, results.data);
        }

        var resultsClearHtml = resultsDarkHtml = '';

        resultsClear.forEach(function(result){
            resultsClearHtml += resultTemplate(result);
        });

        $('#results-clear').html(resultsClearHtml);
        $('#results-dark').html(resultsDarkHtml);

        isSearching(false);
    };

    var resultTemplate = function(result){
        var template = $($('#result-template').html());


        template.attr('href', result.url);
        template.find('.result-title').html(result.title);
        template.find('.result-source').html(result.source);
        template.find('.result-date').html(result.date);

        return template[0].outerHTML;
    };

    var resetSearch = function(){
        resultsClear = resultsDark = [];
        $('#results-clear, #results-dark').html('');
    };

    var doSearch = function(query){
        if(!isSearching()){
            if(lastKeyword!==query){
                resetSearch();
            }
            lastKeyword = query;
            isSearching(true);
            socket.emit('keyword', query);
        }
    };
});
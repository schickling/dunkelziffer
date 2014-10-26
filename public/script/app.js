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
        results = [],
        _isSearching = false,
        isSearching = function(value){
            console.log('called', value);
            if(typeof value !== 'undefined'){
                _isSearching = value;
            }

            setTimeout(function(){
                //toggle search indicator
                if(_isSearching){
                    $('#search-indicator').show();
                } else {
                    console.log('should hide');
                    $('#search-indicator').css('color','red');
                }
            },0);

            return _isSearching;
        },
        searchTimeoutThrottle = 300,
        searchTimeout;

    socket.on('data', function(data) {
        console.log('search results', data);
        isSearching(false);
    });

    $('#query').on('keyup', function(){
        clearTimeout(searchTimeout);
        var query = $('#query').val();

        // validate search query
        if(!query){
            results = []; //reset results if query is empty
            return;
        }

        searchTimeout = setTimeout(function(){
            doSearch(query);
        },searchTimeoutThrottle);
    });


    var doSearch = function(query){
        console.log('do search', query, isSearching());
        if(!isSearching()){
            isSearching(true);
            socket.emit('keyword', query);
        }
    };
});
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

    socket.on('data-list', function(data) {
        populateResults(data);
    });

    socket.on('data-details', function(data) {
        console.log('DETIAL DATA', data);
        populateResultDetail(data.data, data.isDeep);
    });

    socket.emit('keyword', 'russia');

    $('a.result-back-btn').on('click', function(e){
        e.preventDefault();

        $(this).parents('.result-detail-content').hide();

        return false;
    });

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

    var populateResultDetail = function(result, isDeep){
        var target = isDeep ? $('#results-dark'):$('#results-clear');
            targetContent = target.find('.result-detail-content');

        targetContent.find('.result-title').html(result.title);
        targetContent.find('.result-content').html(result.text);

        targetContent.show();
    };

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

        var resultsClearContent = $('<ul/>').addClass('list-unstyled'),
            resultsDarkContent = $('<ul/>').addClass('list-unstyled');

        resultsClear.forEach(function(result){
            resultsClearContent.append(resultTemplate(result));
        });

        resultsDark.forEach(function(result){
            resultsDarkContent.append(resultTemplate(result));
        });

        $('#results-clear .results-content').html('').append(resultsClearContent);
        $('#results-dark .results-content').html('').append(resultsDarkContent);

        $('body').addClass('has-results');
        isSearching(false);
    };

    var resultClickListener = function(e){
        e.preventDefault();

        var url = $(this).attr('href');

        socket.emit('details', url);

        return false;
    };

    var resultDetailTemplate = function(result){
        var template = $($('#result-detail-template').html());

    };

    var resultTemplate = function(result){
        var output = $('<li/>'),
            template = $($('#result-template').html());

        template.attr('href', result.url);
        template.find('.result-title').html(result.title);
        template.find('.result-source').html(result.source);
        template.find('.result-date').html(result.date);

        template.on('click', resultClickListener);

        output.append(template);

        return output;
    };

    var resetSearch = function(){
        $('body').removeClass('has-results');
        resultsClear = [];
        resultsDark = [];
        $('#results-clear .results-content, #results-dark .results-content').html('');
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
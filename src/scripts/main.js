/**
 * Created by RENATO on 22/12/2015.
 */

var components = require('./components.js');
var router = require('./router.js');
var ko = require('knockout');
var $ = require('jquery');
var config = require('./config');
var datacontext = require('../modules/dataservices/datacontext.js');
var players = require('../component/pages/players/players.js');
var pageViewModel = require('../modules/pageviewmodel.js');

var app = {
    init: function (){
        var players = ko.observableArray();

        var mainViewModel = {
            pageParams: {route: router.currentRoute,
                         players: players
            }
        };

        $.when(datacontext.players.getData({results: players}))
            .done(function() {
                pageViewModel.players.players(players());
                ko.applyBindings(mainViewModel);
                console.log('Api Url:' + config.apiEndpoint.url);
            });

        components.register();
    }
};

app.init();

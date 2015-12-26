/**
 * Created by RENATO on 22/12/2015.
 */

var components = require('./components.js');
var router = require('./router.js');
var ko = require('knockout');
var $ = require('jquery');
var config = require('./config');
var datacontext = require('../modules/dataservices/datacontext.js');

var app = {
    init: function (){
        components.register();

        var players = ko.observableArray();

        var mainViewModel = {
            pageParams: {route: router.currentRoute,
                         players: players
            }
        };

        $.when(datacontext.players.getData({results: players}))
            .done(function() {
                ko.applyBindings(mainViewModel);
                console.log('Api Url:' + config.apiEndpoint.url);
            });
    }
};

app.init();


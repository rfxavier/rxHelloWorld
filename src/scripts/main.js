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
            route: router.currentRoute,
            pageParams: {route: router.currentRoute,
                         players: players
            }
        };

//todo remove
/*
        self.getPlayers = function() {
            $.ajax({
                    url: config.apiEndpoint.url + '/player',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {},
                    cache: false
                })
                .done(function(data, textStatus, jqXHR) {
                    players(data);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + "; " + errorThrown);
                });
        }();


        ko.applyBindings(mainViewModel);
        console.log('Api Url:' + config.apiEndpoint.url);
        console.log(mainViewModel.pageParams);
*/


        $.when(datacontext.players.getData({results: players}))
            .done(function() {
                //console.log(self.players())
                ko.applyBindings(mainViewModel);
                console.log('Api Url:' + config.apiEndpoint.url);
            });

    }
};

app.init();


/**
 * Created by RENATO on 22/12/2015.
 */

var ko = require('knockout');
var crossroads = require('crossroads');
var hasher = require('hasher');
var pageViewModel = require('../modules/pageviewmodel.js');

var router = function (routerConfig) {
    var self = this;
    self.currentRoute = ko.observable({});

    ko.utils.arrayForEach(routerConfig.routes, function(route) {
        crossroads.addRoute(route.url, function(requestParams) {
            self.currentRoute(ko.utils.extend(requestParams, route.params));
            route.params.callback && route.params.callback(ko.utils.extend(requestParams, route.params));
        });
    });
    //crossroads.routed.add(console.log, console);

    // Activate Crossroads
    crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;

    hasher.initialized.add(function(hash) {
        crossroads.parse(hash);
    });
    hasher.changed.add(function(hash, oldHash) {
        if (pageViewModel.teams && pageViewModel.teams.isDirty()){
            console.log('cant leave from ' + oldHash + ' to ' + hash);
            hasher.changed.active = false;
            hasher.setHash(oldHash);
            hasher.changed.active = true;
            alert('cant leave. dirty.');
        }
        else {
            crossroads.parse(hash);
            console.log('hasher.changed from ' + oldHash + ' to ' + hash);
            }
    });
    hasher.init();
};

var routes =  [
               { url: '',                    params: { page: 'page-home', callback: pageViewModel.home.activate} },
               { url: 'players',             params: { page: 'page-players', callback: pageViewModel.players.activate} },
               { url: 'players{?query}',     params: { page: 'page-players', callback: pageViewModel.players.activate} },
               { url: 'playersDX',           params: { page: 'page-playersDX', callback: pageViewModel.playersDX.activate} },
               { url: 'playersDX{?query}',   params: { page: 'page-playersDX', callback: pageViewModel.playersDX.activate} },
               { url: 'teams',               params: { page: 'page-teams', callback: pageViewModel.teams.activate} }
];

// Create and export router instance
var routerInstance = new router({routes: routes});

module.exports = routerInstance;

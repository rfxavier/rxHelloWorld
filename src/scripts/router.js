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
            route.params.callback && route.params.callback();
        });
    });
    //crossroads.routed.add(console.log, console);

    // Activate Crossroads
    crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;

    hasher.initialized.add(function(hash) {
        crossroads.parse(hash);
    });
    hasher.changed.add(function(hash) {
        crossroads.parse(hash);
    });
    hasher.init();
};

var routes =  [
               { url: '',          params: { page: 'page-home', callback: pageViewModel.home.activate} },
               { url: 'players',   params: { page: 'page-players', callback: pageViewModel.players.activate} },
               { url: 'teams',     params: { page: 'page-teams', callback: pageViewModel.teams.activate} }
];

// Create and export router instance
var routerInstance = new router({routes: routes});

module.exports = routerInstance;

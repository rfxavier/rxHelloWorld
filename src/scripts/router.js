/**
 * Created by RENATO on 22/12/2015.
 */

var ko = require('knockout');
var crossroads = require('crossroads');
var hasher = require('hasher');
var vm = require('../modules/vm.js');
var pageViewModel = require('../modules/pageviewmodel.js');

var router = function (routerConfig) {
    var self = this;
    self.currentRoute = ko.observable({});
    //console.log(config.routes);

    ko.utils.arrayForEach(routerConfig.routes, function(route) {
        crossroads.addRoute(route.url, function(requestParams) {
            self.currentRoute(ko.utils.extend(requestParams, route.params));
            route.params.callback();
            //route.params.instance.initEventDelegates && route.params.instance.initEventDelegates();
            route.params.instance.pagePar = route.params;
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

//todo callback for later
var routes =  [
               //{ url: '',          params: { page: 'page-home', callback: pageViewModel.players.activate} },
               { url: '',          params: { page: 'page-home', callback: pageViewModel.players.activate, instance: pageViewModel.players} },
               { url: 'players',   params: { page: 'page-players', callback: pageViewModel.players.activate, instance: pageViewModel.players} },
               { url: 'teams',     params: { page: 'page-teams', callback: pageViewModel.players.activate, instance: pageViewModel.players} }
];

// Create and export router instance
var routerInstance = new router({routes: routes});

module.exports = routerInstance;

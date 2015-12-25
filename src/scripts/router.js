/**
 * Created by RENATO on 22/12/2015.
 */

var ko = require('knockout');
var crossroads = require('crossroads');
var hasher = require('hasher');
var config = require('./config.js');

var router = function (routerConfig) {
    var self = this;
    self.currentRoute = ko.observable({});
    //console.log(config.routes);

    ko.utils.arrayForEach(routerConfig.routes, function(route) {
        crossroads.addRoute(route.url, function(requestParams) {
            self.currentRoute(ko.utils.extend(requestParams, route.params));
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

// Create and export router instance
var routerInstance = new router({routes: config.routes});

module.exports = routerInstance;
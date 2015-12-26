/**
 * Created by RENATO on 22/12/2015.
 */

var $ = require('jquery');
var ko = require('knockout');
var datacontext = require('../../../modules/dataservices/datacontext.js');

var pageHomeViewModel = function(route) {
    var self = this;

    self.players = ko.observableArray();

    self.playersDs = $.Deferred(function(def) {
        $.when(datacontext.players.getData({results: self.players}))
            .fail(function () { def.reject(); })

            .done(function () { def.resolve(); });
    }).promise()
        .done(function() {
            console.log(self.players())
        });

    self.activate = function() {
        console.log("activating home");
    };
};

module.exports = pageHomeViewModel;
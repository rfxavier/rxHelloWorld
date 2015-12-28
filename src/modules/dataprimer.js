/**
 * Created by RENATO on 27/12/2015.
 */

var ko = require('knockout');
var config = require('../scripts/config.js');
var datacontext = require('./dataservices/datacontext.js');

var fetch = function() {
    return $.Deferred(function(def) {
        var data = {
            players: ko.observableArray(),
            teams: ko.observableArray()
        };

        $.when(
            datacontext.players.getData({results: data.players}),
            datacontext.teams.getData({results: data.teams})
                .fail(function () { def.reject(); })
                .done(function () { def.resolve(); })
        )
    }).promise();
};

module.exports = {fetch: fetch};
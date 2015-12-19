/**
 * Created by RENATO on 12/12/2015.
 */
var ko = require('knockout');
var $ = require('jquery');

var viewModel = function() {
    var self = this;
    self.name = ko.observable();
    self.players = ko.observableArray();
    self.inputFirstName = ko.observable();
    self.inputLastName = ko.observable();
    self.playerData  = {
        firstName: self.inputFirstName,
        lastName: self.inputLastName
    };

    self.playerInsert = function () {
        console.log(ko.toJSON(self.playerData));
        self.insertPlayer(ko.toJSON(self.playerData));
    };

    self.playerDelete = function (player) {
        console.log('/' + player.playerId);
        self.deletePlayer(player.playerId);
    };

    self.getPlayers = function() {
        $.ajax({
                url: 'http://rfxavier-001-site3.btempurl.com/api/player',
                type: 'GET',
                dataType: 'jsonp',
                data: {},
                cache: false
        })
        .done(function(data, textStatus, jqXHR) {
            self.players(data);
            console.log(self.players());
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + "; " + errorThrown)
        });
    };

    self.insertPlayer = function(playerData) {
        $.ajax({
                url: 'http://rfxavier-001-site3.btempurl.com/api/player',
                type: 'POST',
                contentType: "application/json",
                crossDomain: true,
                data: playerData
        })
        .done(function(data, textStatus, jqXHR) {
            console.log('POST done');
            self.inputFirstName('');
            self.inputLastName('');
            self.getPlayers();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("RX" + textStatus + "; " + errorThrown)
        });
    };

    self.deletePlayer = function(playerId) {
        $.ajax({
                url: 'http://rfxavier-001-site3.btempurl.com/api/player/' + playerId,
                type: 'DELETE',
                crossDomain: true
        })
        .done(function(data, textStatus, jqXHR) {
            self.getPlayers();

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("RX" + textStatus + "; " + errorThrown)
        });
    };

    //initialization when "new" is called
    self.getPlayers();
};

module.exports = {
    applyKoBindings : function () {
    console.log('Apply ko bindings');
    ko.applyBindings(new viewModel());
    }
};

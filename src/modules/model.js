/**
 * Created by RENATO on 12/12/2015.
 */
var ko = require('knockout');
var $ = require('jquery');

var viewModel = function() {
    var self = this;

    self.players = ko.observableArray();
    self.teams = ko.observableArray();
    self.inputFirstName = ko.observable();
    self.inputLastName = ko.observable();
    self.selectedTeam = ko.observable({});
    self.playerData  = {
        firstName: self.inputFirstName,
        lastName: self.inputLastName
    };

    self.playerInsert = function () {
        self.playerData.teamId = self.selectedTeam().teamId;

        console.log(ko.toJSON(self.playerData));
        self.insertPlayer(ko.toJSON(self.playerData));
    };

    self.playerDelete = function (player) {
        console.log('/' + player.playerId);
        self.deletePlayer(player.playerId);
    };

    self.getTeams = function() {
        $.ajax({
                url: 'http://rfxavier-001-site3.btempurl.com/api/team',
                type: 'GET',
                dataType: 'jsonp',
                data: {}
        })
        .done(function(data, textStatus, jqXHR) {
            self.teams(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + "; " + errorThrown)
        });
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
            //console.log(jqXHR + "; " + textStatus + "; " + errorThrown)
            console.log(jqXHR.responseJSON.message);
            alert(jqXHR.responseJSON.message)
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
    self.getTeams();
    self.getPlayers();
};

module.exports = {
    applyKoBindings : function () {
    console.log('Apply ko bindings');
    ko.applyBindings(new viewModel());
    }
};

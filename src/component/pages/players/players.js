/**
 * Created by RENATO on 22/12/2015.
 */

var ko = require('knockout');
var $ = require('jquery');
var config = require('../../../scripts/config');
var koUtils = require('../../../modules/koDebugHelper.js');

var playersViewModel = function() {
    var self = this;

    //todo koUtils debug module - move from here?
    self.koUtils = koUtils;

    self.players = ko.observableArray();
    self.teams = ko.observableArray();
    self.inputFirstName = ko.observable();
    self.inputLastName = ko.observable();
    self.selectedTeam = ko.observable({});
    self.playerData  = {
        firstName: self.inputFirstName,
        lastName: self.inputLastName
    };
    self.mousedOverTeam = ko.observable({});
    self.mousedOverTeamName = ko.pureComputed(function() {
        return self.mousedOverTeam().teamName || '';
    });
    self.mousedOverTeamNameTitle = ko.pureComputed((function() {
        return self.mousedOverTeamName() + " players";
    }));

    //self.mousedOverTeamPlayers = self.mousedOverTeam().players;
    self.mousedOverTeamPlayers = ko.computed(function() {
        return self.mousedOverTeam().players;
    });

    self.mousedOutTeam = function() {
        self.mousedOverTeam({});
    };

    self.getPlayerFullName = function(item) {
        return item.firstName + " " + item.lastName;
    };

    self.getTeamDetails = function (player) {
        var filteredTeam = $.grep(self.teams(), function(obj) {
            return obj.teamName === player.teamName;
        });

        //filteredTeam[0] = 1st element in teams() it finds
        self.mousedOverTeam(filteredTeam[0]);
    };

    self.playerInsert = function () {
        //self.playerData.teamId = self.selectedTeam().teamId;
        //extend = linha acima, mesmo efeito, feito a título de aprendizado
        //object literal in destination is put on top of object in source = (defaults)
        ko.utils.extend(self.playerData, {teamId: self.selectedTeam().teamId});

        self.insertPlayer(ko.toJSON(self.playerData));
    };

    self.playerDelete = function (player) {
        self.deletePlayer(player.playerId);
    };

    self.getTeams = function() {
        $.ajax({
                url: config.apiEndpoint.url + '/team',
                type: 'GET',
                dataType: 'jsonp',
                data: {}
            })
            .done(function(data, textStatus, jqXHR) {
                self.teams(data);
                //console.log(self.teams());

            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + "; " + errorThrown);
            });

    };

    self.getPlayers = function() {
        $.ajax({
                url: config.apiEndpoint.url + '/player',
                type: 'GET',
                dataType: 'jsonp',
                data: {},
                cache: false
            })
            .done(function(data, textStatus, jqXHR) {
                self.players(data);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + "; " + errorThrown);
            });
    };

    self.insertPlayer = function(playerData) {
        $.ajax({
                url: config.apiEndpoint.url + '/player',
                type: 'POST',
                contentType: "application/json",
                crossDomain: true,
                data: playerData
            })
            .done(function(data, textStatus, jqXHR) {
                self.inputFirstName('');
                self.inputLastName('');
                //Refresh players and teams object arrays
                self.getPlayers();
                self.getTeams();
                //todo if  self.mousedOverTeam is the same teams as just inserted, then self.getTeamDetails
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR + "; " + textStatus + "; " + errorThrown)
                alert(jqXHR.responseJSON.message);
            });
    };

    self.deletePlayer = function(playerId) {
        $.ajax({
                url: config.apiEndpoint.url + '/player/' + playerId,
                type: 'DELETE',
                crossDomain: true
            })
            .done(function(data, textStatus, jqXHR) {
                //Refresh players and teams object arrays
                self.getPlayers();
                self.getTeams();
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + "; " + errorThrown);
            });
    };

    //initialization when "new" is called
    self.getTeams();
    self.getPlayers();
    console.log('gotten Teams and Players');
};

//var playersViewModelInstance = new playersViewModel();

module.exports = playersViewModel;

//module.exports = {
//    init : function () {
//        ko.applyBindings(new playersViewModel());
//    }
//};
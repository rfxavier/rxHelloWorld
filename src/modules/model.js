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
    self.mousedOverTeam = ko.observable({});
    self.mousedOverTeamName = ko.pureComputed(function() {
        //var retTeamName = '';
        //
        //if (self.mousedOverTeam().teamName) {
        //    retTeamName = 'Team ' + self.mousedOverTeam().teamName;
        //}
        //
        //return retTeamName;
        return self.mousedOverTeam().teamName || ''
    });
    self.mousedOverTeamNameTitle = ko.pureComputed((function() {
        return self.mousedOverTeamName() + " players";
    }));

    //self.mousedOverTeamPlayers = self.mousedOverTeam().players;
    self.mousedOverTeamPlayers = ko.computed(function() {
        return self.mousedOverTeam().players;
    });

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
        self.playerData.teamId = self.selectedTeam().teamId;

        self.insertPlayer(ko.toJSON(self.playerData));
    };

    self.playerDelete = function (player) {
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
            //console.log(self.teams());

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
            self.inputFirstName('');
            self.inputLastName('');
            //Refresh players and teams object arrays
            self.getPlayers();
            self.getTeams();
            //if  self.mousedOverTeam is the same teams as just inserted, then self.getTeamDetails
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR + "; " + textStatus + "; " + errorThrown)
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
            console.log(textStatus + "; " + errorThrown)
        });
    };

    //initialization when "new" is called
    self.getTeams();
    self.getPlayers();

};

module.exports = {
    init : function () {
    ko.applyBindings(new viewModel());
    }
};

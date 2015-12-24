/**
 * Created by RENATO on 23/12/2015.
 */

var ko = require('knockout');
var $ = require('jquery');
var config = require('../../../scripts/config');

var teamsViewModel = function() {
    var self = this;

    self.teams = ko.observableArray();
    self.inputTeamName = ko.observable();

    self.teamData  = {
        teamName: self.inputTeamName
    };

    self.teamInsert = function () {
        self.insertTeam(ko.toJSON(self.teamData));
    };

    self.teamDelete = function (team) {
        self.deleteTeam(team.teamId);
    };

    self.getTeams = function() {
        $.ajax({
                url: config.apiEndpoint.url + '/team',
                type: 'GET',
                dataType: 'jsonp',
                data: {},
                cache: false
            })
            .done(function(data, textStatus, jqXHR) {
                self.teams(data);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
            });
    };

    self.insertTeam = function(teamData) {
        $.ajax({
                url: config.apiEndpoint.url + '/team',
                type: 'POST',
                contentType: "application/json",
                crossDomain: true,
                data: teamData
            })
            .done(function(data, textStatus, jqXHR) {
                self.inputTeamName('');
                //Refresh teams and teams object arrays
                self.getTeams();
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR + "; " + textStatus + "; " + errorThrown)
                alert(jqXHR.responseJSON.message);
            });
    };

    
    self.deleteTeam = function(teamId) {
        $.ajax({
                url: config.apiEndpoint.url + '/team/' + teamId,
                type: 'DELETE',
                crossDomain: true
            })
            .done(function(data, textStatus, jqXHR) {
                //Refresh teams object arrays
                self.getTeams();
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
            });
    };
    
    self.getTeams();
};

module.exports = teamsViewModel;

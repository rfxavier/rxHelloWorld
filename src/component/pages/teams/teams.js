/**
 * Created by RENATO on 23/12/2015.
 */

var ko = require('knockout');
var $ = require('jquery');
var config = require('../../../scripts/config');
var datacontext = require('../../../modules/dataservices/datacontext.js');

var teamsViewModel = function() {
    var self = this;

    self.teams = ko.observableArray();
    self.inputTeamName = ko.observable();

    self.teamData  = {
        teamName: self.inputTeamName
    };

    self.reloadData = function(forceRefresh) {
        $.when(datacontext.teams.getData({results: self.teams, forceRefresh: forceRefresh}));
    };

    self.teamInsert = function () {
        self.insertTeam(ko.toJSON(self.teamData));
    };

    self.teamDelete = function (team) {
        self.deleteTeam(team.teamId);
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
                self.reloadData(true);
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
                self.reloadData(true);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
            });
    };

    //initialization when "new" is called
    //...

    self.activate = function() {
        console.log("activating teams");
        self.initEventDelegates();
        self.reloadData(false);
    };

    self.initEventDelegates = function () {
        //jQuery event Delegates
        //For applying into .fn-players container

        //on click for every element with selector .fn-teamdel inside container with selector .fn-teams
        $(".fn-teams").on("click", ".fn-teamdel", function() {
            self.teamDelete(ko.dataFor(this));
        });
    };

};

module.exports = teamsViewModel;

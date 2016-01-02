/**
 * Created by RENATO on 22/12/2015.
 */

var ko = require('knockout');
var $ = require('jquery');
var config = require('../../../scripts/config');
var koUtils = require('../../../modules/koDebugHelper.js');
var datacontext = require('../../../modules/dataservices/datacontext.js');

var playersViewModel = function(pageParams) {
    var self = this;

    //todo koUtils debug module - move from here?
    self.koUtils = koUtils;

    self.players = ko.observableArray();
    self.teams = ko.observableArray();
    self.inputFirstName = ko.observable();
    self.inputLastName = ko.observable();
    self.selectedTeam = ko.observable({});

    //playerData = object literal to be serialized to json - data to be passed to api endpoint
    self.playerData  = {
        firstName: self.inputFirstName,
        lastName: self.inputLastName
    };
    self.mousedOverTeam = ko.observable({}); //initialized with empty object = default value
    self.mousedOverTeamName = ko.pureComputed(function() {
        return self.mousedOverTeam().teamName;
    });
    self.mousedOverTeamNameTitle = ko.pureComputed((function() {
        return self.mousedOverTeamName() ? self.mousedOverTeamName() + " players" : undefined;
        //ternary operator - iif: truthy, return team + " players", else return empty string ""
    }));

    self.mousedOverTeamPlayers = ko.pureComputed(function() {
        return self.mousedOverTeam().players;
    });

    self.mousedOutTeam = function() {
        self.mousedOverTeam({});
    };

    //working manual subscription between viewModel properties
    self.selectedTeam.subscribe(function(newValue) {
        //Initial value has to be an empty object - defaults to empty object
        self.mousedOverTeam(newValue || {});
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

    self.reloadData = function(forceRefresh) {
        $.when(datacontext.players.getData({results: self.players, forceRefresh: forceRefresh}),
               datacontext.teams.getData({results: self.teams, forceRefresh: forceRefresh}));
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
                self.reloadData(true);
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
                self.reloadData(true);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + "; " + errorThrown);
            });
    };

    //initialization when "new" is called
    //...

    self.activate = function(queryParams) {
        //queryParams - coming from url params on the route, as object
        console.log("activating players");
        console.log(queryParams);
        self.initEventDelegates();
        self.reloadData(false);
    };

    self.initEventDelegates = function () {
        //unobtrusive event handler
        //uses jQuery instead of
        //knockout's data-bind="click: playerInsert"

        //$(".buttonInsert").on("click", function () {
        //    self.playerInsert();
        //});

        //jQuery event Delegates
        //For applying into .fn-players container
        //on mouseover for every element with selector .fn-teamdet inside container with selector .fn-players
        $(".fn-players").on("mouseover", ".fn-teamdet", function() {
            self.getTeamDetails(ko.dataFor(this));
        });

        //on click for every element with selector .fn-playerdel inside container with selector .fn-players
        $(".fn-players").on("click", ".fn-playerdel", function() {
            self.playerDelete(ko.dataFor(this));
        });
    };
};

module.exports = playersViewModel;
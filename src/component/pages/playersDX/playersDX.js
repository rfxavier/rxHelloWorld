/**
 * Created by RENATO on 22/12/2015.
 */

var ko = require('knockout');
var $ = require('jquery');
var config = require('../../../scripts/config');
var koUtils = require('../../../modules/koDebugHelper.js');
var datacontext = require('../../../modules/dataservices/datacontext.js');

var playersDXViewModel = function(pageParams) {
    var self = this;

    self.players = ko.observableArray();
    self.teams = ko.observableArray();

    self.dxDataSource = new DevExpress.data.DataSource({
        load: function(loadOptions) {
            return self.players();
        },
        key: "playerId",
        totalCount: function(options) {
            return self.players.length;
        },
        remove: function(playerId) {
            //console.log(config.apiEndpoint.url + '/player/' + playerId);
            $.ajax({
                    url: config.apiEndpoint.url + '/player/' + playerId,
                    type: 'DELETE',
                    crossDomain: true
                })
                .done(function(data, textStatus, jqXHR) {
                    //Refresh players and teams object arrays
                    self.reloadData(true)
                        .then(function () {
                            $("#gridPlayers") && $("#gridPlayers").dxDataGrid('instance') && $("#gridPlayers").dxDataGrid('instance').refresh();
                        });
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + "; " + errorThrown);
                });
        }
    });

    self.dataGridOptions = {
        dataSource: self.dxDataSource,
        scrolling: {
            mode: "virtual"
        },
        editing: {
            mode: "row",
            allowDeleting: true
        },
        columns: ["firstName", "lastName", "teamName"]
    };

    self.reloadData = function(forceRefresh) {
        return $.when(datacontext.players.getData({results: self.players, forceRefresh: forceRefresh}),
                      datacontext.teams.getData({results: self.teams, forceRefresh: forceRefresh})

        );
    };

    self.activate = function() {
        //self.initEventDelegates();
        console.log(self.players());
        self.reloadData(self.players().length===0)
            .then(function () {
                console.log(self.players());
                console.log( $("#gridPlayers").dxDataGrid('instance'));
                $("#gridPlayers").dxDataGrid && $("#gridPlayers").dxDataGrid('instance') && $("#gridPlayers").dxDataGrid('instance').refresh();
                //var datagrid = $("#gridContainer").dxDataGrid('instance');
                //datagrid.refresh();

            });
        var grid = $("#gridPlayers").dxDataGrid('instance');
        console.log(grid);
        console.log("activating playersDX");
    };
};

module.exports = playersDXViewModel;
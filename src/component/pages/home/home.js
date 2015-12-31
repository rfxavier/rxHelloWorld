/**
 * Created by RENATO on 22/12/2015.
 */

var $ = require('jquery');
var ko = require('knockout');
var datacontext = require('../../../modules/dataservices/datacontext.js');
//var $data = require('jaydata');

var pageHomeViewModel = function() {
    var self = this;
    self.btn = ko.observable('Button Bind Me');
    //var jayDataGet = function() {
    //    console.log('getting jayData');
    //    console.log($data);
    //};

    self.players = ko.observableArray();
    self.teams = ko.observableArray();

    self.dataGridOptions = {
        dataSource: self.players,
            paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true
        },
        columns: ["firstName", "lastName", "teamName"]
    };

    self.reloadData = function(forceRefresh) {
        $.when(datacontext.players.getData({results: self.players, forceRefresh: forceRefresh}),
            datacontext.teams.getData({results: self.teams, forceRefresh: forceRefresh}));
    };

    self.activate = function() {
        //self.initEventDelegates();
        self.reloadData(false);
        console.log("activating home");
    };

};

module.exports = pageHomeViewModel;
/**
 * Created by RENATO on 22/12/2015.
 */

var ko = require('knockout');
var $ = require('jquery');

var dataprimer = require('../modules/dataprimer.js');
var components = require('./components.js');
var router = require('./router.js');
var pageViewModel = require('../modules/pageviewmodel.js');

var app = {
    init: function (){

        //var mainViewModel = function() {
        //    return { pageParams: {route: router.currentRoute} }
        //};

        var mainViewModel = { pageParams: {route: router.currentRoute} };

        //** Inside components.register()
        //require of pageViewModel.js for the 1st time, get pageViewModel instances born
        //pageViewModel.home
        //pageViewModel.players
        //pageViewModel.playersDX
        //pageViewModel.teams

        //** From the top of the page
        //require of router.js for the 1st time, instantiates router.js constructor and gets
        //a router object to router var
        $.when(dataprimer.fetch())
            .then(components.register())
            .then(ko.applyBindings(mainViewModel));
    }
};

app.init();

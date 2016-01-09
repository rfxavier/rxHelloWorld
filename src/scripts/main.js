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

        //pageViewModel 1st require AND REFERENCE - instances are born
        //components.register();

        //router 1st require AND REFERENCE - instance is born
        $.when(dataprimer.fetch())
            .then(components.register())
            .then(ko.applyBindings(mainViewModel));
    }
};

app.init();

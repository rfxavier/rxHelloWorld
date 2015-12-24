/**
 * Created by RENATO on 22/12/2015.
 */

var components = require('./components.js');
var router = require('./router.js');
var ko = require('knockout');
var config = require('./config');

var app = {
    init: function (){
        components.register();

        var mainViewModel = {
            route: router.currentRoute
        };

        ko.applyBindings(mainViewModel);
        console.log('Api Url:' + config.apiEndpoint.url);
    }
};

app.init();


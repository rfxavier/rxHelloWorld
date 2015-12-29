/**
 * Created by RENATO on 21/12/2015.
 */

/*jslint node: true */

//All components must be registered in this single location

'use strict';

var ko    = require('knockout');
var fs    = require('fs');
var path  = require('path');
var pageViewModel = require('../modules/pageviewmodel.js');

module.exports = {
    register: function () {

        ko.components.register('nav-bar', {
            viewModel: require('../component/navbar/navbar.js'),
            template: require('fs').readFileSync(path.join(__dirname, '/../component/navbar/navbar.html'), 'utf8')
        });

        ko.components.register('page-home', {
            viewModel: require('../component/pages/home/home.js'),
            template: require('fs').readFileSync(path.join(__dirname, '/../component/pages/home/home.html'), 'utf8'),
            synchronous: true       //to be compatible with jQuery event registration. Async would not register jQuery events
        });

        ko.components.register('page-players', {
            viewModel: { instance: pageViewModel.players },
            template: require('fs').readFileSync(path.join(__dirname, '/../component/pages/players/players.html'), 'utf8'),
            synchronous: true       //to be compatible with jQuery event registration. Async would not register jQuery events
        });

        ko.components.register('page-teams', {
            viewModel: { instance: pageViewModel.teams },
            template: require('fs').readFileSync(path.join(__dirname, '/../component/pages/teams/teams.html'), 'utf8'),
            synchronous: true       //to be compatible with jQuery event registration. Async would not register jQuery events
        });
    }
};

/**
 * Created by RENATO on 22/12/2015.
 */

var $ = require('jquery');
var ko = require('knockout');
var hasher = require('hasher');

var pageHomeViewModel = function() {
    var self = this;

    self.navigateToTeams = function() {
        console.log('navigateToTeams');
        hasher.setHash('teams');
    };

    self.dxButtonOptions  = {
        text: 'Navigate to Teams',
        onClick: self.navigateToTeams };

    self.activate = function() {
        //self.initEventDelegates();
        console.log("activating home");
    };
};

module.exports = pageHomeViewModel;
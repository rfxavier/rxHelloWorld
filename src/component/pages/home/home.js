/**
 * Created by RENATO on 22/12/2015.
 */

var $ = require('jquery');
var ko = require('knockout');

var pageHomeViewModel = function(pageParams) {
    var self = this;

    self.activate = function() {
        console.log("activating home");
    };

};

module.exports = pageHomeViewModel;
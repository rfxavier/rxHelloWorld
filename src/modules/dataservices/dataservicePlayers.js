/**
 * Created by RENATO on 25/12/2015.
 */

var $ = require('jquery');
var amplify = require('amplify');
var config = require('../../scripts/config.js');

var init = function() {
    // Pass Resource Id, Request Type, and Settings
    amplify.request.define('player', 'ajax', {
        url: config.apiEndpoint.url + '/player',
        dataType: 'jsonp',
        type: 'GET'
        //cache: true
        //cache: 60000 // 1 minute
        //cache: 'persist'
    });
};

var getPlayers = function (callbacks) {
    return amplify.request({
        resourceId: 'player',
        success: callbacks.success,
        error: callbacks.error
    });
};

init();

module.exports = {getPlayers: getPlayers};

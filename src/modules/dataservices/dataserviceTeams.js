/**
 * Created by RENATO on 27/12/2015.
 */
    
var $ = require('jquery');
var amplify = require('amplify');
var config = require('../../scripts/config.js');

var init = function() {
    // Pass Resource Id, Request Type, and Settings
    amplify.request.define('team', 'ajax', {
        url: config.apiEndpoint.url + '/team',
        dataType: 'jsonp',
        type: 'GET'
        //cache: true
        //cache: 60000 // 1 minute
        //cache: 'persist'
    });
};

var getTeams = function (callbacks) {
    return amplify.request({
        resourceId: 'team',
        success: callbacks.success,
        error: callbacks.error
    });
};

init();

module.exports = {getTeams: getTeams};
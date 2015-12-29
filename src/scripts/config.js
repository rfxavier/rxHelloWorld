/**
 * Created by RENATO on 23/12/2015.
 */

var configApp = function() {
    var self = this;

    self.apiEndpoint = {};
    self.routes = {};

    self.apiEndpoint.url = "http://localhost:6555/api";
    //self.apiEndpoint.url = "http://rfxavier-001-site3.btempurl.com/api";
    //self.apiEndpoint.url = "http://playersapirx.azurewebsites.net/api";
};

module.exports = new configApp();

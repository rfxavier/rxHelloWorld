/**
 * Created by RENATO on 23/12/2015.
 */

var config = {};

config.apiEndpoint = {};
config.routes = {};

//config.apiEndpoint.url = "http://localhost:6555/api";
config.apiEndpoint.url = "http://rfxavier-001-site3.btempurl.com/api";
//config.apiEndpoint.url = "http://playersapirx.azurewebsites.net/api";

config.routes =  [
                  { url: '',          params: { page: 'page-home' } },
                  { url: 'players',   params: { page: 'page-players' } },
                  { url: 'teams',     params: { page: 'page-teams' } }
];

module.exports = config;

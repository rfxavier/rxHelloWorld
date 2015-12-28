/**
 * Created by RENATO on 27/12/2015.
 */

var players = require('../component/pages/players/players.js');
var teams = require('../component/pages/teams/teams.js');

var playersViewModelInstance = new players;
var teamsViewModelInstance = new teams;

module.exports = {players: playersViewModelInstance,
                  teams: teamsViewModelInstance};
/**
 * Created by RENATO on 27/12/2015.
 * Contains viewModels of pages, retrieved through requiring each of them
 * Each viewModel fetched through require is exported such as:
 *      module.exports = playersViewModel;
 * Its entire non-instantiated constructor function
 *
 * This module serves one new instance of each page viewModel to all other modules
 * on the application, whoever require this very module will be getting
 * exposed page viewModel objects instantiated (1 for each page)
 * see module.exports
 */

var home = require('../component/pages/home/home.js');
var players = require('../component/pages/players/players.js');
var playersDX = require('../component/pages/playersDX/playersDX.js');
var teams = require('../component/pages/teams/teams.js');

var homeViewModelInstance = new home;
var playersViewModelInstance = new players;
var playersDXViewModelInstance = new playersDX;
var teamsViewModelInstance = new teams;

/**
 *
 * @type {{home: (pageHomeViewModel|exports|module.exports), players: (playersViewModel|exports|module.exports), teams: (teamsViewModel|exports|module.exports)}}
 */
module.exports = {home: homeViewModelInstance,
                  players: playersViewModelInstance,
                  playersDX: playersDXViewModelInstance,
                  teams: teamsViewModelInstance};
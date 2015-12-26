/**
 * Created by RENATO on 25/12/2015.
 */

var $ = require('jquery');
var utils = require('../utils.js');
var dataservice = require('./dataservice.js');

var EntitySet = function(getFunction) {
    var items = {};

    var getData = function (options) {
        return $.Deferred(function (def) {
            var results = options && options.results,
                sortFunction = options && options.sortFunction,
                filter = options && options.filter,
                forceRefresh = options && options.forceRefresh,
                param = options && options.param,
                getFunctionOverride = options && options.getFunctionOverride;

            getFunction = getFunctionOverride || getFunction;

            // If the internal items object doesnt exist,
            // or it exists but has no properties,
            // or we force a refresh
            if (forceRefresh || !items || !utils.hasProperties(items)) {
                getFunction({
                    success: function (dtoList) {
                        //items = mapToContext(dtoList, items, results, mapper, filter, sortFunction);
                        items = dtoList;
                        results(dtoList); //results = e.g.: self.players - observable array
                        def.resolve(results);
                    },
                    error: function (response) {
                        //logger.error(config.toasts.errorGettingData);
                        def.reject();
                    }
                }, param);
            } else {
                //itemsToArray(items, results, filter, sortFunction);
                results(items);
                def.resolve(results);
            }
        }).promise();
    };

    return {getData: getData};
};

var players = new EntitySet(dataservice.players.getPlayers);

module.exports = {players: players};

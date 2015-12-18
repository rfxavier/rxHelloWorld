/**
 * Created by RENATO on 12/12/2015.
 */
var ko = require('knockout');
var $ = require('jquery');

var model = module.exports = {
    viewModel: {
        name: ko.observable(),
        players: ko.observableArray(),
        inputFirstName: ko.observable(),
        inputLastName: ko.observable(),
        //playerData : {
        //    firstName: viewModel.inputFirstName,
        //    lastName: viewModel.inputLastName
        //},
        showViewModel: function () {
            console.log(ko.toJSON(model.viewModel));
        }
    },

    init: function () {
        console.log('init model2');
        model.getPlayers();
    },

    getPlayers: function() {
         $.ajax({
            url: 'http://rfxavier-001-site3.btempurl.com/api/player',
            type: 'GET',
            dataType: 'jsonp',
            data: {},
            cache: false
        })
             .done(function(data, textStatus, jqXHR) {
                 model.viewModel.players(data);
                 console.log(model.viewModel.players());
             })
             .fail(function(jqXHR, textStatus, errorThrown) {
                 console.log(textStatus + "; " + errorThrown)
             });
    },

    applyKoBindings: function () {
        ko.applyBindings(model.viewModel);
    }
};
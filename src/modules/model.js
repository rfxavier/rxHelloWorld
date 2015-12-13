/**
 * Created by RENATO on 12/12/2015.
 */
var ko = require('knockout');

var model = module.exports = {
    init: function () {
        console.log('init model');
    },

    viewModel: {
        name: ko.observable()
    },

    applyKoBindings: function () {
        ko.applyBindings(model.viewModel);
    }
};
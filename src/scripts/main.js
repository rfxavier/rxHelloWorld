/**
 * Created by RENATO on 12/12/2015.
 */
var model = require('./../modules/model.js');
var $ = require('jquery');

var app = {
    init: function (){
        model.applyKoBindings();
    }
};

app.init();

/**
 * Created by RENATO on 12/12/2015.
 */

var components = require('./components.js');
var model = require('./../modules/model.js');

var app = {
    init: function (){
        console.log('main.js init')
        components.register();
        model.init();
    }
};

app.init();

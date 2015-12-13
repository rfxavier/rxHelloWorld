/**
 * Created by RENATO on 12/12/2015.
 */
var model = require('./../modules/model.js');

var app = {
    init: function (){
        model.init();
    }
};

app.init();

model.applyKoBindings();

/**
 * Created by RENATO on 25/12/2015.
 */
var ko = require('knockout');

//track the number of re-evaluations for a computed observable
ko.observableArray.fn.trackReevaluations = function () {
    var self = this;
    self.reevaluationCount = ko.observable(0);
    self.subscribe(function () {
        this.reevaluationCount(this.reevaluationCount() + 1);
    }, self);
    return self;
};

ko.utils.debugInfo = function (items) {
    return ko.computed(function () {
        //new in KO 2.1. it used to be JSON.stringify(ko.toJS(timeslots), null, 2)
        return ko.toJSON(items, null, 2);
    });
};

//todo Understand why ko.utils.debugInfo (name of variable)
module.exports = {trackReevaluations: ko.observableArray.fn.trackReevaluations,
                  debugInfo: ko.utils.debugInfo};

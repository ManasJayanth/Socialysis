define([], function () {
    var LastActModel = Backbone.Model.extend({
        urlRoot: '/last-activity'
    });
    
    return new LastActModel(); 
});

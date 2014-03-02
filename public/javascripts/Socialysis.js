define(['Router'], function (Router) {
    return {
        initialize: function () {
            Backbone.history.start({pushState: true});
        }
    }
});

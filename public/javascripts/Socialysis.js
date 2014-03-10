define(['Router'], function (Router) {
    return {
        initialize: function () {
            Backbone.history.start();
            $.get('/authentication', function () {
                Backbone.history.navigate('dashboard', {trigger: true});
            })
            .fail(function () {
                Backbone.history.navigate('', {trigger: true});
            });
        }
    }
});

define(['Router'], function (Router) {
    return {
        initialize: function () {
            Backbone.history.start();
            function authCallback () {
                Backbone.history.navigate(window.location.hash,{trigger: true});
            }
            $.get('/authentication', authCallback)
            .fail(function () {
                Backbone.history.navigate('', {trigger: true});
            });
        }
    };
});

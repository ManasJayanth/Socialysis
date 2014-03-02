define(['Backbone','text!templates/last-activity.html'], function (Backbone, lastActivityTempl) {
    var LastActivityView = Backbone.View.extend({
        el: '#last-activity',
        render: function() {
            this.$el.html(lastActivityTempl);
        }
    });

    return new LastActivityView();
});

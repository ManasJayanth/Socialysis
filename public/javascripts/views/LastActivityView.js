define(['Backbone','text!templates/last-activity.html'], function (Backbone, lastActivityTempl) {
    var LastActivityView = Backbone.View.extend({
        id: '#last-activity',
        render: function() {
            this.$el = $(this.id);
            this.$el.html(lastActivityTempl);
        }
    });

    return new LastActivityView();
});

(function(){
    var dependencies = ['Backbone','models/LastAct','text!templates/last-activity.html'];

    function definition (Backbone, lastAct, lastActivityTempl) {
        var LastActivityView = Backbone.View.extend({
            id: '#last-activity',
            initialize: function () {
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
            },
            updateModel: function () {
                this.model.fetch({
                    success: function (model, res, options) {
                    }
                });
            },
            render: function() {
                this.$el = $(this.id);
                this.$el.html(_.template(lastActivityTempl, { model: this.model}));
            }
        });

        return new LastActivityView({model: lastAct});
    }

    define(dependencies, definition);
})();

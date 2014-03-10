define(['Backbone','text!templates/thumbnails.html'], function (Backbone, thumbnailsTempl) {
    var ThumbnailsView = Backbone.View.extend({
        id: '#dashboard-space',
        render: function() {
            this.$el = $(this.id);
            this.$el.html(thumbnailsTempl);
        }
    });

    return new ThumbnailsView();
});

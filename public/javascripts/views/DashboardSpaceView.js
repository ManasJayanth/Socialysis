define(['Backbone','text!templates/thumbnails.html'], function (Backbone, thumbnailsTempl) {
    var ThumbnailsView = Backbone.View.extend({
        el: '#dashboard-space',
        render: function() {
            this.$el.html(thumbnailsTempl);
        }
    });

    return new ThumbnailsView();
});

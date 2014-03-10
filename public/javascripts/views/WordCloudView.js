define(['Backbone', 'text!templates/word-cloud-templ.html', 'views/WordCloudModule'], function (Backbone, wordCloudTempl, wordCloudModule) {
    var WordCloudView = Backbone.View.extend({
        id: '#dashboard-space',
        render: function() {
            this.$el = $(this.id);
            this.$el.html(wordCloudTempl);
            wordCloudModule.render();
        }
    });

    return new WordCloudView();
});

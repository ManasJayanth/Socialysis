require.config({
    paths: {
        jQuery: '/javascripts/bower_components/jquery/dist/jquery',
        Underscore: '/javascripts/bower_components/underscore/underscore',
        Backbone: '/javascripts/bower_components/backbone/backbone',
        text: '/javascripts/bower_components/text/text',
        templates: '../templates'
    },

    shim: {
        'Backbone': ['Underscore', 'jQuery'],
        'Socialysis': ['Backbone']
    }
});

require(['Socialysis'], function(Socialysis) {
    Socialysis.initialize();
});


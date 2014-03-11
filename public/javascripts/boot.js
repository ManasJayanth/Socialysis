require.config({
    paths: {
        jQuery: '/javascripts/bower_components/jquery/dist/jquery',
        Underscore: '/javascripts/bower_components/underscore/underscore',
        Backbone: '/javascripts/bower_components/backbone/backbone',
        text: '/javascripts/bower_components/text/text',
        templates: '../templates',
        d3: '/javascripts/bower_components/d3/d3',
        d3Cloud: '/javascripts/bower_components/d3-cloud/d3.layout.cloud'
    },

    shim: {
        'Backbone': {
            deps: ['Underscore', 'jQuery']
        },
        'Socialysis': ['Backbone'],
        'd3Cloud': {
            deps: ['d3.global']
        },
        'jQuery': {
            exports: "$",
        }
    }
});


/** Hack for Non AMD modules dependending on D3 */
define("d3.global", ["d3"], function(_) {
    d3 = _;
});

require(['Socialysis'], function(Socialysis) {
    Socialysis.initialize();
});

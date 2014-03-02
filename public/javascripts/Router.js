var dependencies = ['Backbone', 
                    'views/UserInfoView', 
                    'views/LastActivityView',
                    'views/DashboardSpaceView',
                    'views/WordCloudView',
                    'text!templates/dashboard-template.html'];
function defineModule (Backbone, userInfoView, lastActivityView, dashboardSpaceView, wordCloudView, dashboardTempl) {

    var Router = Backbone.Router.extend({
        routes: {
            'dashboard': 'dashboardHome',
            'dashboard/wordcloud': 'wordcloud'
        }
    });
    var router = new Router();
    router.on('route:dashboardHome', renderDashboard);
    router.on('route:wordcloud', renderWordcloud);
    return router;

    function renderDashboard () {
        userInfoView.render();
        lastActivityView.render();
        dashboardSpaceView.render();
    }
    function renderWordcloud () {
        userInfoView.render();
        lastActivityView.render();
        console.log(wordCloudView);
        wordCloudView.render();
    }
}
define(dependencies, defineModule);

var dependencies = ['Backbone', 
                    'views/UserInfoView',
                    'views/LoginView',
                    'views/LastActivityView',
                    'views/DashboardSpaceView',
                    'views/WordCloudView',
                    'text!templates/dashboard-template.html'];
function defineModule (Backbone, userInfoView, loginView, lastActivityView, dashboardSpaceView,
                       wordCloudView, dashboardTempl) {

    var Router = Backbone.Router.extend({
        routes: {
            '': 'login',
            'dashboard': 'dashboardHome',
            'wordcloud': 'wordcloud',
            'empathy': 'empathy'
        }
    });
    var router = new Router();
    router.on('route:dashboardHome', renderDashboard);
    router.on('route:wordcloud', renderWordcloud);
    router.on('route:login', renderLogin);
    return router;

    function renderDashboard () {
        $('body').html(dashboardTempl);
        userInfoView.render();
        lastActivityView.render();
        dashboardSpaceView.render();
    }
    function renderWordcloud () {
        userInfoView.render();
        lastActivityView.render();
        wordCloudView.render();
    }
    function renderLogin () {
        loginView.render();
    }
}
define(dependencies, defineModule);

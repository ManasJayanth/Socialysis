var dependencies = ['Backbone',
                    'views/UserInfoView',
                    'views/LoginView',
                    'views/LastActivityView',
                    'views/DashboardSpaceView',
                    'views/WordCloudView',
                    'text!templates/dashboard-template.html'];
function defineModule (Backbone, userInfoView, loginView, lastActivityView,
                       dashboardSpaceView, wordCloudView, dashboardTempl) {

    var Router = Backbone.Router.extend({
        initialize: function () {
            // Nothing..
        },
        routes: {
            '': 'login',
            'dashboard': 'dashboard',
            'wordcloud': 'wordcloud',
            'empathy': 'empathy'
        }
    });
    var router = new Router();
    router.on('route:login', renderLogin);
    router.on('route:dashboard', renderDashboard);
    router.on('route:wordcloud', renderWordcloud);
    router.on('route:empathy', renderEmpathy);
    return router;

    function renderDashboard () {
        $('body').html(dashboardTempl);
        userInfoView.updateModel();
        userInfoView.render();
        lastActivityView.updateModel();
        lastActivityView.render();
        dashboardSpaceView.render();
    }
    function renderWordcloud () {
        // Necessary when a page reload is made. Without this backbone used
        // previously rendered template
        $('body').html(dashboardTempl);
        userInfoView.updateModel();
        userInfoView.render();
        lastActivityView.updateModel();
        lastActivityView.render();
        wordCloudView.updateModel();
        wordCloudView.render();
    }
    function renderEmpathy () {
        $('body').html(dashboardTempl);
        userInfoView.updateModel();
        userInfoView.render();
        lastActivityView.updateModel();
        lastActivityView.render();
        alert('empathy coming soon');
    }
    function renderLogin () {
        loginView.render();
    }
}
define(dependencies, defineModule);

define(['Backbone', 'text!templates/user-info.html'], function (Backbone, userInfoTempl) {
    var UserInfoView = Backbone.View.extend({
        el: '#user-info',
        render: function() {
            this.$el.html(userInfoTempl);
        }
    });

    return new UserInfoView();
});


define(['Backbone', 'text!templates/user-info.html'], function (Backbone, userInfoTempl) {
    var UserInfoModel = Backbone.Model.extend({
        url: '/user-info'
    });

    var userModel = new UserInfoModel();
    userModel.fetch({
        success: function (model, res, options) {
        }
    });
    var UserInfoView = Backbone.View.extend({
        el: '#user-info',
        initialize: function () {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },
        render: function() {
            this.$el.html(_.template(userInfoTempl, { model: this.model}));
        }
    });

    return new UserInfoView({model: userModel});
});

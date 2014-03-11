define(['Backbone', 'text!templates/user-info.html'], function (Backbone, userInfoTempl) {
    var UserInfoModel = Backbone.Model.extend({
        url: '/user-info'
    });

    var userModel = new UserInfoModel();
    
    var UserInfoView = Backbone.View.extend({
        id: '#user-info',
        initialize: function () {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },
        render: function() {
            this.$el = $(this.id);
            this.$el.html(_.template(userInfoTempl, { model: this.model}));
        },
        updateModel: function () {
            this.model.fetch({
                success: function (model, res, options) {
                }
            });
        }
    });

    return new UserInfoView({model: userModel});
});

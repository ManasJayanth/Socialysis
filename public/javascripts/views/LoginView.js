define(['Backbone', 'text!templates/login.html'], function (Backbone, loginTemplate) {
    var LoginView = Backbone.View.extend({
        el: 'body',
        render: function () {
            this.$el.html(loginTemplate);
            initFbSDK();
        },
        events: {
            'click #signin': fbLogin
        }
    });

    return new LoginView();

    function sendDetails (details) {

        $.ajax({
            type: "POST",
            url: "/authentication",
            data: details,
            success: function () {
                Backbone.history.navigate('#/dashboard');
            },
            error: function (err) {
                console.log(err);
            }
        });
        
    }
    function fbLogin(){
        FB.login(function(response) {

            if (response.authResponse) {
                accessToken = response.authResponse.accessToken; //get access token
                userId = response.authResponse.userID; //get FB UID
                
                sendDetails({
                    id: userId,
                    accessToken: accessToken
                });

                
            } else {
                //user hit cancel button
                alert('You have cancelled login or did not fully authorize.');
            }
        },{ scope: 'friends_status,user_photos' });
    }

    function initFbSDK() {

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1541497706075482',
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });

        };

        // Load the SDK asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));

    }    
});

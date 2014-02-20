function sendDetails (details) {

    $.ajax({
        type: "POST",
        url: "/login",
        data: details,
        success: function () {
            
            // console.log('Details received'); 
            //Not required as ajax req 
            //is not responded unless error
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
    });
}

function initFbSDK() {

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1444576589109672',
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

$(document).ready(function () {

    initFbSDK();

    $('#signin').on('click', fbLogin);
});

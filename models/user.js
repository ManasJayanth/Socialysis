exports.id = '';
exports.login = function (req, res) {
    req.session.fbid = req.body.id;
    req.session.accessToken = req.body.accessToken;
    req.session.loggedIn = true;
    res.send(200);
};

exports.profile = function (req, res, FB) {
    if(!req.session.loggedIn) {
        res.redirect('/');
    } else {
        FB.setAccessToken(req.session.accessToken);
        var that = this;
        /** 
         * Note instead of /me, /this.id has been used as explained here
         * http://stackoverflow.com/questions/11230747/facebook-php-sdk-3-issue-in-access-token
         */
        FB.api('/' + this.id + '/picture?redirect=0&height=400&type=normal&width',
               function (fbres) {
                   if(!fbres || fbres.error) {
                       console.log(!fbres ? 'error occurred' : fbres.error);
                       return;
                   }
                   exports.dpUrl = fbres.data.url;
                   res.render('dashboard', {
                       url: exports.dpUrl
                   });
               });
    }
};

exports.getInfo = function (req, res, FB) {
    if(!req.session.loggedIn) {
        res.send(400);
    } else {
        FB.api('/me', function (fbres) {
            if(!fbres || fbres.error) {
                console.log(!fbres ? 'error occurred' : fbres.error);
                return;
            }
            var name = fbres.name;
            /* Getting profile pic */
            FB.api('/' + req.session.fbid + '/picture?redirect=0&height=400&type=normal&width',
               function (fbres) {
                   if(!fbres || fbres.error) {
                       console.log(!fbres ? 'error occurred' : fbres.error);
                       return;
                   }
                   res.json({
                       name: name,
                       dp: fbres.data.url
                   });
               });
        });
    }
};

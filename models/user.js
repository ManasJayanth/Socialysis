exports.id = '';
exports.login = function (req, res) {
    exports.id = req.body.id;
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

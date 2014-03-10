var FB = require('fb');
exports.id = '';
exports.login = function (req, res) {
    req.session.fbid = req.body.id;
    req.session.accessToken = req.body.accessToken;
    req.session.loggedIn = true;
    res.send(200);
};

exports.getInfo = function (req, res) {
    if(!req.session.loggedIn) {
        res.send(400);
    } else {
        FB.setAccessToken(req.session.accessToken);
        FB.api('/me', function (fbres) {
            if(!fbres || fbres.error) {
                console.log('trapped');
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

exports.logout = function (req, res) {
    req.session.fbid = '';
    req.session.accessToken = '';
    req.session.loggedIn = false;
    res.redirect('/');
};
 exports.checkLogin = function (req, res) {
    if(req.session.loggedIn) {
        res.send(200);
    } else {
        res.send(400);
    }
};

exports.getWordCloudData = function(req, res) {

    if(req.session.loggedIn === true) {

        FB.setAccessToken( req.session.accessToken);
        FB.api('me/friends', function (fbres) {
            if(!fbres || fbres.error) {
                console.log(!fbres ? 'error occurred' : fbres.error);
                return;
            }
            var ids = [];
            for(var i = 0; i < fbres.data.length && i < 50; ++i) {
                ids.push(fbres.data[i].id);
            }
            var posts = [], temp = [];
            var count = 0;
            var async = require("async");
            console.log('Fetching...');
            function iterator (id, cb){

                FB.api(id + '/statuses', function (fbres) {
                    if(!fbres || fbres.error) {
                        console.log(!fbres ? 'error occurred' : fbres.error);
                        return;
                    }
                    for(var j in fbres.data) {
                        temp.push(fbres.data[j].message);
                        count++;
                    }
                    cb();
                });
            }
            function createJSON(err) {
                var text = temp.join(' ');
                wordcloud.createJSON(text);
            }
            async.each(ids, iterator, createJSON);
        });
        res.render('dashboard');
    } else {
        res.redirect('/');
    }
};

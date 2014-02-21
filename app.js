/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./models/user');
var http = require('http');
var path = require('path');
var FB = require('fb');
var wordcloud = require('./modules/wordcloud');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/authentication', user.login);
app.get('/welcome', function(req, res) {

    if(req.session.loggedIn == true) {

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
            async.each(ids,
                       // 2nd parameter is the function that each item is passed into
                       function(id, cb){

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
                       },
                       function (err) {
                           var text = temp.join(' ');
                           wordcloud.createJSON(text);
                      });
            // for(var i in ids) {
            //     FB.api(ids[i] + '/statuses', function (fbres) {
            //         if(!fbres || fbres.error) {
            //             console.log(!fbres ? 'error occurred' : fbres.error);
            //             return;
            //         }
            //         for(var j in fbres.data) {
            //             temp.push(fbres.data[j].message);
            //             console.log(fbres.data[j].message);
            //         }
            //     });
            // }

        });
        res.render('dashboard');
    } else {
        res.redirect('/');
    }
})
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

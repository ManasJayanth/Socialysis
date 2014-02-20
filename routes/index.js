exports.index = function(req, res){
    if(req.session.loggedIn == true) {
        res.redirect('/welcome');
    } else {
        res.render('index', { title: 'Express' });
    }
};

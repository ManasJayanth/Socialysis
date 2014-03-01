exports.index = function(req, res){
    if(req.session.loggedIn == true) {
        res.redirect('/dashboard');
    } else {
        res.render('index', { title: 'Express' });
    }
};

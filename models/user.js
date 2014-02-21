exports.login = function (req, res) {
    req.session.id = req.body.id;
    req.session.accessToken = req.body.accessToken;
    req.session.loggedIn = true;
    res.send(200);
};

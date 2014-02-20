exports.login = function (req, res) {
    this.id = req.body.id;
    this.accessToken = req.body.accessToken;
    req.session.loggedIn = true;
    res.send(200);
};

const passport = require('passport');

//export a function (or 2?)
module.exports = (app) => {
    //with a get request with the url, do these callback functions

    //send user to the facebook login
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
        console.log('At Callback');
        res.send('You are logged in!');
    });

    //logout route
    app.get('/api/logout', (req, res) => {
        //added on from our middleware. it deletes cookie session or something
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        //get current user. if there's a user, send it to the front end
        res.send(req.user);
    })

};

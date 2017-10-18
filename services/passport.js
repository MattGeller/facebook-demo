//passport uses strategies to handle different types of user authentication

const passport = require('passport');

const mongoose = require('mongoose');

//get the facebook strategy
const FacebookStrategy = require('passport-facebook');

//import our user model
const User = mongoose.model('users');

const keys = require('../config/keys');

//serializeuser takes a callback. it uses cookies to check if someone is in the database
//thing of this part as creating the cookie
//the callback function done is built in to and provided by node
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//think of this part as decrypting the cookie
passport.deserializeUser((id, done) => {
    //pretty much every action we make on our database is asynchronous, so we return a promise
    User.findById(id).then(user => {
        //errors is the first parameter of done, so let's keep it null for simplicity
        done(null, user);
    });
});

// //.use method tells passport 'use this strategy'
// passport.use(
//     new FacebookStrategy({
//             clientID: keys.fb_app_id,
//             clientSecret: keys.fb_app_secret,
//             callbackURL: '/auth/facebook/callback'
//         }, /*second argument is a callback function*/
//         (accessToken, refreshToken, profile, done) => {
//             console.log('Profile', profile);
//
//             //for all the users, find one who has a facebook id of the thing you got back...
//             //...to check if the user already exists in the database
//             //.findOne() is provided to us by mongoose
//             User.findOne({facebook_id: profile.id}).then(existingUser => {
//                 if(existingUser){ //if it DID find an existing user
//                     done(null, existingUser);
//                 } else { //if there is NOT an existing user, we need to create one
//                     new User({facebook_id: profile.id}).save().then(newUser => {
//                         done(null, newUser);
//                     })
//                 }
//             })
//
//             //call done() within this function so that passport knows it's done
//         }
//     )
// );


//async/await version of the method above

//.use method tells passport 'use this strategy'
passport.use(
    new FacebookStrategy({
            clientID: keys.fb_app_id,
            clientSecret: keys.fb_app_secret,
            callbackURL: '/auth/facebook/callback'
        }, /*second argument is a callback function*/
        async (accessToken, refreshToken, profile, done) => {
            console.log('FB profile object:',profile);
            const existingUser = await User.findOne({facebook_id: profile.id});

            if (existingUser) { //if it DID find an existing user
                done(null, existingUser);
            } else { //if there is NOT an existing user, we need to create one
                const newUser = await new User({facebook_id: profile.id, display_name: profile.displayName}).save();
                done(null, newUser);
            }

        }

    )
);
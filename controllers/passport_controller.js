//load bcrypt
var bCrypt = require('bcrypt-nodejs');
var db = require('../models');

module.exports = function (passport, signin) {

    var Signin = signin;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (signin, done) {
        done(null, signin.id);
    });

    // used to deserialize the login
    passport.deserializeUser(function (id, done) {
        db.Member.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    // create new member
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },

        // member sign-up
        function (req, email, password, done) {
            // encrypts password
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            //search db for email (unique parameter)
            db.Member.findOne({
                where: {
                    email: email
                }
            // error if found
            }).then(function (accountFound) {
                if (accountFound) {
                    return done(null, false, {
                        message: 'email address already in use. please try again'
                    });
                // stores new member info iv var data
                } else {
                    var hashPassword = generateHash(password);
                    var data = {
                        email: email,
                        password: hashPassword,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        phone: req.body.phone,
                        photoUrl: req.body.photoUrl,
                        inOrOut: req.body.inOrOut,
                        cooking: req.body.cooking,
                        gardening: req.body.gardening,
                        painting: req.body.painting,
                        carpentry: req.body.carpentry,
                        plumbing: req.body.plumbing,
                        electrical: req.body.electrical,
                        publicRelations: req.body.publicRelations,
                        marketing: req.body.marketing,
                        fundRaising: req.body.fundRaising,
                        programming: req.body.programming,
                        sales: req.body.sales,
                        teaching: req.body.teaching,
                    };
                    // adds new member to the databaste
                    db.Member.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false, {
                                message: 'an error occured. please try again.'
                            });
                        }
                        if (newUser) {
                            return done(null, newUser, {
                                message: 'success! account created.'
                            });
                        }
                    });
                }
                // return done(null, accountFound);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'an error occured. please try again.'
                });
            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            // encrypts password entered checks if valid
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };
            // search db for email user entered matches password entered
            db.Member.findOne({
                where: {
                    email: email
                }
            }).then(function (signin) {
                // alert if invalid email
                if (!signin) {
                    return done(null, null, {
                        message: 'email/password combination incorrect. please try again.'
                    });
                }
                // alert if invalid password
                if (!isValidPassword(signin.password, password)) {
                    return done(null, null, {
                        message: 'email/password combination incorrect. please try again.'
                    });
                }
                // signin successful returns success to sign in api call on home.js
                return done(null, signin);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'an error occured. please try again.'
                });
            });
        }
    ));
};
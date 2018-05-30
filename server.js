var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var passport = require('passport');
var session = require('express-session');
var app = express();
var PORT = process.env.PORT || 5000;

var db = require("./models");

app.use(session({
    secret: 'ninety tuba spike',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// bodyParser to translate urlform and json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//load passport strategy
require('./controllers/passport_controller.js')(passport, db.members);

// Import routes and give the server access to them.
require("./routes/html_routes.js")(app);
require("./controllers/api_controller.js")(app, passport);

// handlebars rout to static files - css, img
app.use(express.static('public'));

// Use to clear databases during development { force: true }
// { force: true }

// Initiate database interface and start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function () {
    console.log('database sync okay');
    app.listen(PORT, function (err) {
        if (!err) {
            // Log (server-side) when our server has started
            console.log("Server listening on: http://localhost:" + PORT);
        }
        else {
            console.log(err);
        }
    });
}).catch(function (err) {
    console.log(err, "database synch failed");
});

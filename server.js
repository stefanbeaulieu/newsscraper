// Require Dependencies
var express = require('express');
var expressHandlebars = require("express-handlebars");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

// Set up ports to be either hosts or designated port
var PORT = process.env.PORT || 3000;

// Set up express app
var app = express();

// Setting up the express router
var router = express.Router();

//require routes file pass our router object
require("./config/routes")(router);

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to our Express app
app.engine('handlebars', expressHandlebars({
    defaultLayout: "main"
}));
app.set('view engine', "handlebars");

// use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}))

// Have very request go through our router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to mongoose for our database
mongoose.connect(db, function (error) {
    // Log any errors connecting with mongoodse
    if ( error ) {
        console.log(error);
    }
    // Or log a success message
    else {
        console.log ('mongoose connection is successful');
    }
});

// Listen to the port
app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT);
})
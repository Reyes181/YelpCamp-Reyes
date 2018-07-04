require('dotenv').config();
var express = require("express"), 
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Campground = require("./models/campground"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment");
    
var commentRoutes = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index");


// seedDB(); // seed the database
mongoose.connect("mongodb://localhost/yelp_camp_v13");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Jericho",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.message = req.flash("message");
    next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// Start Server listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});
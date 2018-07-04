var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware function goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    // function to check user ownership of campground upload
    // is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found!");
                res.redirect("back");
            } else{
                // does user own campground
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else {
                    req.flash("error", "Don't have permission");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
     // is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found!");
                res.redirect("back");
            } else{
                // does user own comment
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else {
                    req.flash("error", "Don't have permission");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Must be logged in first to complete this action");
    res.redirect("/login");
};

module.exports = middlewareObj;
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Fox Cove Park", 
        image: "https://images.unsplash.com/photo-1501703979959-797917eb21c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4132e8087781addd674e137a9f596dc&auto=format&fit=crop&w=500&q=60",
        description: "Clean stream water, friendly animals, and man made trails"
    },
    {
        name: "Alpache Mountains", 
        image: "https://images.unsplash.com/photo-1520732713659-8f14034ba7d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7a330e0a93ad58039a3d719ee837c6a4&auto=format&fit=crop&w=500&q=60",
        description: "Dry climate, great scenery, and nearby gas stations and diners"
    },
    {
        name: "Two World Field", 
        image: "https://images.unsplash.com/photo-1501950952862-f7f6f7c2ee33?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2cbd13895964dccfebb0633af3b5e597&auto=format&fit=crop&w=749&q=80",
        description: "Beach, carnival, and free concerts! Nothing provides more lasting memories than a great show. Especially when shared with friends and family. That's why, in addition to the most thrilling rides on the planet, youll find a wide variety of top-shelf entertainment right here at the park. The kind of entertainment youll be talking about for years to come."
    },
    {
        name: "Deer Creek",
        image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7ca353cfcc4299e6c3d431ff862e1cf&auto=format&fit=crop&w=500&q=60",
        description: "Premade campgrounds, wide open space, and bbq locations"
    },
    {
        name: "Frost Hills",
        image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=795&q=80",
        description: "Fresh snow, cabins for warmth, and star sky at night"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campgrounds){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great",
                                author: "Herald"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campgrounds.comments.push(comment);
                                    campgrounds.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;
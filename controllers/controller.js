var mongoose = require('mongoose');
var User = mongoose.model('users');
var Restaurant = mongoose.model('restaurants');
var express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());


/* For all the user's operation */
// Create new user
var createUser = function(req, res) {
    var user = new User({
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password
    });
    
    user.save(function(err, newUser) {
        if (!err) {
            res.send(newUser);
        } else {
            res.sendStatus(400);
        }
    });
};
 
// Find all users
var findAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (!err) {
            res.send(users);
        } else {
            res.sendStatus(404);
        }
    });
};
 
// Find one user by id
var findOneUser = function(req, res) {
    var userInx = req.params.id;
    User.findById(userInx, function(err, user) {
        if (!err) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    });
};
 
//Find one user by name
var findUserByName = function(req, res) {
    var userName = req.params.name;
    User.findOne({name:userName}, function(err, user) {
        if (!err) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    });
};

//Delete user by id
var deleteUserById = function(req, res) {
    var userId = req.params.id;
    User.findByIdAndRemove(userId, function(err, user) {
        if (!err) {
            res.send("delete user");
        } else {
            res.status(404).send(err);
        }
   });
};


module.exports.createUser = createUser;
module.exports.findAllUsers = findAllUsers;
module.exports.findOneUser = findOneUser;
module.exports.findUserByName = findUserByName;
module.exports.deleteUserById = deleteUserById;
/* User's operations end here */
/******************************/

/***************************************/
/* For all the restaurant's operation */
// Create new restaurant
var createRestaurant = function(req, res) {
    var restaurant = new Restaurant(
        {
            "name":req.body.name,
            "location":req.body.location,
            "food":req.body.food,
            "time":req.body.time
        }
    );

    restaurant.save(function(err, newRestaurant) {
        if (!err) {
            res.send(newRestaurant);
        } else {
            res.sendStatus(400);
        }
    });
};
 
// Find all restaurants
var findAllRestaurants = function(req, res) {
    Restaurant.find(function(err, restaurants) {
        if (!err) {
            res.send(restaurants);
        } else {
            res.sendStatus(404);
        }
    });
};

// Find one restaurant by id
var findOneRestaurant = function(req, res) {
    var restInx = req.params.id;
    Restaurant.findById(restInx, function(err, restaurant) {
        if (!err) {
            res.send(restaurant);
        } else {
            res.sendStatus(404);
        }
    });
};
 
//Find one restaurant by name
var findRestaurantByName = function(req, res) {
    var restName = req.params.name;
    Restaurant.find({name:restName}, function(err, restaurant) {
        if (!err) {
            res.send(rest);
        } else {
            res.sendStatus(404);
        }
    });
};

//Delete restaurant by id
var deleteRestaurantById = function(req, res) {
    var restId = req.params.id;
    Restaurant.findByIdAndRemove(restId, function(err, restaurant) {
        if (!err) {
            res.send("delete restaurant");
        } else {
            res.sendStatus(404);
        }
    });
};


module.exports.createRestaurant = createRestaurant;
module.exports.findAllRestaurants = findAllRestaurants;
module.exports.findOneRestaurant = findOneRestaurant;
module.exports.findRestaurantByName = findRestaurantByName;
module.exports.deleteRestaurantById = deleteRestaurantById;
/* Restaurant's operations end here */
/************************************/



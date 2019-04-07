var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

/* For all the user's operation */
// Create new user
router.post('/users', controller.createUser);
 
// Find all users
router.get('/users', controller.findAllUsers);
 
// Find one user by id
router.get('/users/id/:id', controller.findOneUser);
 
//Find one user by name
router.get('/users/name/:name', controller.findUserByName);

//Delete user by id
router.delete('/users/id/:id', controller.deleteUserById);

/* User's operations end here */
/******************************/

/***************************************/
/* For all the restaurant's operation */
// Create new restaurant
router.post('/restaurants', controller.createRestaurant);
 
// Find all restaurants
router.get('/restaurants', controller.findAllRestaurants);
 
// Find one restaurant by id
router.get('/restaurants/id/:id', controller.findOneRestaurant);
 
//Find one restaurant by name
router.get('/restaurants/name/:name', controller.findRestaurantByName);

//Delete restaurant by id
router.delete('/restaurants/id/:id', controller.deleteRestaurantById);

/* Restaurant's operations end here */
/************************************/

module.exports = router;


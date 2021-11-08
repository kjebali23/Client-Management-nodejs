const express = require('express')
const route = express.Router()
const services = require('../services/render') 

const controller = require('../controller/controller')


/**
 * @description Login route
 * @method Get/
 */
route.get('/login' , services.login)

/**
 * @description Login route
 * @method Get/
 */
route.get('/signin' , services.signup)

/**
 * @description submit login form
 * @method Post/
 */
route.post('/login' , services.login_post)

/**
 * @description submit signup form
 * @method Post/
 */
route.post('/signin', services.signup_post)


/**
 * @description Root Route
 * @method Get/
 */
route.get('/', services.homeRoutes )

/**
 * @description add user
 * @method Get/
 */
route.get('/add-user', services.add_user)

/**
 * @description update user
 * @method Get/
 */
route.get('/update_user', services.update_user)


//API
route.post('/api/users' , controller.create);
route.get('/api/users' , controller.find);
route.put('/api/users/:id' , controller.update);
route.delete('/api/users/:id' , controller.delete);


module.exports = route
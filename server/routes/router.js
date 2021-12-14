const express = require('express')
const route = express.Router()
const services = require('../services/render') 
const controller = require('../controller/controller')
const {ensureAuthenticated} = require('../../utils/auth');


/**
 * @description Login
 * @method Get/
 */
route.get('/login', services.login )

/**
 * @description login
 * @method Post/
 */
 route.post('/login', controller.login_post );
 
 //Passport successRedirect Route:
 route.get('/successjson', function(req, res) {
    res.redirect('/');
});

//Passport failureRedirect Route:
route.get('/failurejson', function(req, res) {
    res.redirect('/login');
});

/**
 * @description Sign-up
 * @method Get/
 */
route.get('/sign-up', services.sign_up )

/**
 * @description sign-up
 * @method Post/
 */
 route.post('/sign-up', controller.register_post );

/**
 * @description logout
 * @method Get/
 */
route.get('/logout' , (req,res)=>{
    req.logout();
    res.redirect('/login');
})


/**
 * @description Root Route
 * @method Get/
 */
route.get('/',ensureAuthenticated ,services.homeRoutes )

/**
 * @description add user
 * @method Get/
 */
route.get('/add-user', ensureAuthenticated,services.add_user)

/**
 * @description update user
 * @method Get/
 */
route.get('/update_user', ensureAuthenticated,services.update_user)

/**
 * @description users map
 * @method Get/
 */
route.get('/map',ensureAuthenticated ,  services.map)

/**
 * @description Authentified Users messaging 
 * @method Get/
 */


//API
route.post('/api/users',controller.create);
route.get('/api/users' , controller.find);
route.put('/api/users/:id' ,controller.update);
route.delete('/api/users/:id' ,controller.delete);
route.get('/sms',controller.sms);



module.exports = route
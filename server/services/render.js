const axios = require('axios');
const {ensureAuthenticated} = require('../../utils/auth');


exports.login = (req,res) =>{
    res.render('login');
}

exports.sign_up = (req,res)=>{
    res.render('register');
}


exports.homeRoutes = (req,res) =>{
    // make a get request to /api/users
    axios.get('https://node-js-transporter.herokuapp.com/')
         .then(function(response){
             res.render('index' , {users : response.data});
            })
         .catch(err =>{
             res.send(err)
         })

    
}

exports.map = (req,res)=>{
    res.render('map');
}

exports.add_user = (req,res) =>{
    res.render('add_user');
}

exports.update_user = (req,res) =>{
    axios.get('http://localhost:3000/api/users', {params : {id: req.query.id}})
         .then(function(userdata){
             res.render("update_user" , { user : userdata.data})
         })
         .catch(err=>{
             res.send(err);
         })
}


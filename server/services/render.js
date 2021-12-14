const axios = require('axios');


exports.login = (req,res) =>{
    res.render('login');
}

exports.sign_up = (req,res)=>{
    res.render('register');
}


exports.homeRoutes = (req,res) =>{
    // make a get request to /api/users
    axios.get('https://node-js-transporter.herokuapp.com/api/users')
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
    axios.get('https://node-js-transporter.herokuapp.com/api/users', {params : {id: req.query.id}})
         .then(function(userdata){
             res.render("update_user" , { user : userdata.data})
         })
         .catch(err=>{
             res.send(err);
         })
}


const axios = require('axios');
const userAccount = require('../model/UserModel');
const jwt = require('jsonwebtoken');

//handle errors
const handelErrors = (err)=>{
    console.log(err.message, err.code)
    let errors = {email : '' , password : ''}

    //duplicate email error
    if (err.code == 11000){
        errors.email = 'This email is already used';
        return errors

    }

    //validation errors
    if(err.message.includes('userAccount validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors

}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id} , 'khalil s secret' ,{
        expiresIn : maxAge
    });
}

exports.login = (req,res)=>{
    res.render('include/_logform');
}

exports.signup = (req,res)=>{
    res.render('include/_signin')
}

exports.signup_post = async (req,res)=>{
    const {email , password} = req.body;
    try{
        const user = await userAccount.create(({email , password}));
        const token = createToken(user._id)
        res.cookie('jwt' , token, {httpOnly: true , maxAge : maxAge * 1000});
        res.status(201).json({user: user._id});
    }catch(err){
        const errors = handelErrors(err);
        res.status(400).json({errors});
    }

    
}

exports.login_post = async (req,res)=>{
    const {email , password} = req.body;
    try{
        const  user = await userAccount.login(email , password)
        res.status(201).json({user : user._id})
    }catch(err){
        res.status(401).json();
    }
    
}


exports.homeRoutes = (req,res) =>{
    // make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
         .then(function(response){
             console.log(response)
             res.render('index' , {users : response.data});
            })
         .catch(err =>{
             res.send(err)
         })

    
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
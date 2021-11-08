const mongoose = require('mongoose')
const {isEmail} = require('validator')
const simplecrypt = require('simplecrypt')

var sc = simplecrypt()

var userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true , 'Please enter an E-mail'],
        unique: true,
        lowercase: true,
        validate : [isEmail , 'Please enter a valid E-mail']
    },
    password:{
        type:String,
        required: [true , 'Please enter a Password'],
        minlength: [6 , 'Minimum password length is 6 charachters'],
    }
});

//fire a function before doc saved to db


//static method to login user
userSchema.statics.login = async function(email , password){
    const user = await this.findOne({email});
    if(user){
        
        var auth = false
        if (this.password == password){
             auth = true
        }else{
             auth = false
        }
        if(auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}



const userAccount = mongoose.model('userAccount' , userSchema);
module.exports = userAccount;
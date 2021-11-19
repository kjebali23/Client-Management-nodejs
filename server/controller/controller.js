const twilio = require('twilio');


const passport = require('passport');
// UserAccounts && Clients Models
var Userdb = require('../model/model');
const Accounts = require('../model/accountModel');

// Crypting
const bcrypt = require('bcryptjs');



//login user
exports.login_post = ('/login', passport.authenticate('local', {
    successRedirect : '/successjson', // redirect to the secure profile section
    failureRedirect : '/failurejson', // redirect back to the signup page if there is an error
    
}));

exports.register_post = (req,res)=>{
    const {email , password} = req.body;
    let errors = [];
    //check required fields 
    if (!email , !password){
        errors.push({msg: 'All fields are required'});
    }
    if (password.length < 6){
        errors.push({msg: 'Password lenght should be greater than 6'})
    }
    if (errors.length >0){
        res.render('register' ,{
            errors,
            email,
            password
        })
        console.log(errors)
    }else{
        //validation passed 
        Accounts.findOne({email : email})
        .then(user =>{
            if(user){
                //User Account exists
                errors.push({msg:'An account with this email already exists'});
                res.render('register' , {
                    errors,
                    email,
                    password
                });
                console.log(errors);
            }else{
                const newAccount = new Accounts({
                    email : email,
                    password : password,
                });
                
                //hash password
                bcrypt.genSalt(10,(err, salt)=> 
                    bcrypt.hash(newAccount.password , salt , (err,hash)=>{
                        if(err) throw err;
                        //Set password to hashed
                        newAccount.password = hash;
                        //save User
                        newAccount.save()
                            .then(user =>{
                                res.redirect('/')
                            })
                            .catch(err=>console.log(err));
                    }))
                
            }
        });

    }

}


//create and save new user

exports.create = (req,res)=>{
//validate request
if(!req.body){
    res.status(400).send({message : 'Content can not be empty'});
    return;
}
// new user
const user = new Userdb({
    name : req.body.name,
    phone : req.body.phone,
    full_adress : req.body.full_adress,

})
// save user in the database
user
    .save(user)
    .then(data=>{
        //res.send(data)
        res.redirect('/add-user')
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation "
        })
    })

}

//retrieve and return all users / retrieve  and return one user

exports.find = (req,res)=>{
    
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
              .then(data =>{
                  if(!data){
                      res.status(404).send({message : `Cannot find user with id ${id}`})
                  }else{
                      res.send(data)
                  }
              })
              .catch(err=>{
                  res.status(500).send({message: `Error retrieving user with id ${id}`  })
              })
    }else{
        Userdb.find()
            .then(user=>{
                res.send(user)
            })
            .catch(err =>{
                res.status(500).send({ message : err.message || "Error occurred while retrieving user"})
            })
    }
    
    
    
}

//Update a new identified user by id 

exports.update = (req, res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message : "Data to update cannot be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id , req.body ,{useFindAndModify : false})
    .then(data=>{
        if(!data){
            res.status(400).send({message : `Cannot update user with ${id}. Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message : "Error updating user information"})
    })

}

//Delete a user with with specified id 

exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
          .then(data=>{
              if(!data){
                  res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong`})
              }else{
                  res.send({
                      message : "user deleted successfully!"
                  })
              }
          })
          .catch(err=>{
              res.status(500).send({message : "Could not delete user with id: "+id})
          })
}

//Send a message throuht twilio:
exports.sms = (req,res)=>{
    const accountSid = 'ACc6e3d954428cbeee9b934ebbb47dcce3';
    const authToken = '6f100b94088853b6ce2d9d177180c915';
    const client = require('twilio')(accountSid, authToken);

    client.messages
  .create({
     body: 'The Jquery script is working',
     from: '+13342474246',
     to: '+21692465844'
   })
  .then(message => console.log(message.sid));
    res.status(200).send({message : "mrigl"});
}


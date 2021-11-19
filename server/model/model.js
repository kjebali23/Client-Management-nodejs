const mongoose = require('mongoose');
const geocoder = require('../../utils/geocoder');

var schema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    phone:{
        type:String,
        required:true,
        maxlength : 8,
    },
    full_adress:{
        type: String,
        required : true
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number],
          index: '2dsphere',
        }
      },
    
})


//geocode and create location
schema.pre('save' , async function(next){
const loc = await geocoder.geocode(this.full_adress);
this.location={
  type: 'Point',
  coordinates: [loc[0].longitude , loc[0].latitude]
}
})


const Userdb = mongoose.model('userdb' , schema)
module.exports = Userdb;


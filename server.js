const express = require('express');
const dotenv = require('dotenv');
const app = express();
const morgan = require('morgan');
const path  = require('path');
const session = require('express-session');
const passport = require('passport');

const connectDB = require('./server/database/connection');

//passport config
require('./utils/passport')(passport);

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'));

//mongoDb connection
connectDB();

//parse request to body parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// set view engine
app.set("view engine" , "ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")));
app.use('/img', express.static(path.resolve(__dirname,"assets/img")));
app.use('/js', express.static(path.resolve(__dirname,"assets/js")));

//Express Session
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//load routers
app.use('/', require('./server/routes/router'));


app.listen(PORT , ()=>{
    console.log(`The server is running on port ${PORT}`);
})
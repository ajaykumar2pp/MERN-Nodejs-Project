require('dotenv').config()
const express =require('express');
const path = require('path');
const app =express();
const ejs = require('ejs');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const router =require('./routes/webRoute')
const cookieParser = require('cookie-parser');

// const flash = require('express-flash')

// *******************    Set Template Engine  ***********************************//

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'))
console.log(app.get("view engine"))


// ************************  Database Connection  **********************************//
const {connectMonggose} = require('./app/database/db')
connectMonggose();

// ************************   Flash    ******************************************//
// app.use(flash())

// **********************************  Global Variable Used **************************//
global.appRoot = path.resolve(__dirname);
// *************************    Assets    ****************************************//
const publicPath = path.join(__dirname,"public");
app.use(express.static(publicPath));
app.use(express.static(__dirname + '/public'));
// app.use("/assets", express.static('./assets'));
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// **********************************  Uploads  ************************************//
app.use('/uploads', express.static('uploads'));

// ***************************  Routes  *************************************//
app.use(router);

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})
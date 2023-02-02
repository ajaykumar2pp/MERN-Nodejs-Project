require('dotenv').config()
const router = require('express').Router();
const User = require('../app/model/user')
const Order = require('../app/model/order')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// ******************************************   Register SETUP  ********************************//
router.get("/",(req, resp)=> {
  resp.render('register')
})

// ******************************************   SIGN IN SETUP  ********************************//
router.get("/signin",(req, resp)=> {
  resp.render('login')
})

// **********************************  Add a New User    *********************************//
router.post('/', async (req, res) => {
  const { name, phoneNumber, password } = req.body;
  console.log( name, phoneNumber, password )
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    phoneNumber,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.render("login")
  } catch (err) {
    res.status(400).send(err);
  }

})

// **********************************  Login a User   *********************************//
router.post('/login-user', async (req, res) => {
  const { phoneNumber, password } = req.body;
  console.log( phoneNumber, password )
    // Validate request 
    if (!phoneNumber || !password) {
      req.flash('error', 'All fields are required')
      return res.redirect('/register')

  }

  // Find the user by phone number
  const user = await User.findOne({ phoneNumber });
  if (!user)
   
   return res.status(400).send('Invalid phone number or password');
  
  // Compare the password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) 
    
  return res.status(400).send('Invalid phone number or password');
  
  // Create and assign a JWT
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);

})
// *****************************************************************************************//
// **********************************  Add a new Order   *********************************//
router.post('/add-order', async (req, res) => {
  const { userId, subTotal, phoneNumber } = req.body;
  const order = new Order({
    userId,
    subTotal,
    phoneNumber
  });

  try {
    const savedOrder = await order.save();
    res.send(savedOrder);
  } catch (err) {
    res.status(400).send(err);
  }

})

// ********************************** Get Order details  *********************************//
router.get('/get-order', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.query.userId });
    res.send(orders);
  } catch (err) {
    res.status(400).send(err);
  }
});





module.exports = router;
require('dotenv').config()
const router = require('express').Router();
const User = require('../app/model/user')
const Order = require('../app/model/order')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




// ********************************************   Home  Page   **********************//
router.get("/", (req, resp) => {
  resp.render('home')
})



// ********************************************   Smoothie Page   **********************//
router.get("/smoothies", (req, resp) => {
  resp.render('smoothies')
})



// ******************************************   Register SETUP  ********************************//
router.get("/add-user", (req, resp) => {
  resp.render('register')
})

// ******************************************   SIGN IN SETUP  ********************************//
router.get("/signin", (req, resp) => {
  resp.render('login')
})

// **********************************  Add a New User    *********************************//
router.post('/', async (req, res) => {
  const { name, phoneNumber, password } = req.body;
  console.log(name, phoneNumber, password)
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // const user = new User({
  //   name,
  //   phoneNumber,
  //   password: hashedPassword
  // });
  try {

    // Create and assign a JWT
    const user = await User.create({ name, phoneNumber, password: hashedPassword });
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
    // res.header('auth-token', token).send(token);
    res.cookie('jwt', token, { maxAge: maxAge * 1000 });
    // res.status(201).json({ user: user._id });
    console.log("auth-token =>>", token)

    const savedUser = await user.save();
    res.render("login")
  } catch (err) {
    res.status(400).send(err);
  }

})
// ***********************************  Create a Json Web Token  *********************//
const maxAge = 3 * 24 * 60 * 60;
// **********************************  Login a User   *********************************//
router.post('/login-user', async (req, res) => {
  const { phoneNumber, password } = req.body;
  console.log(phoneNumber, password)
  // Validate request 
  if (!phoneNumber || !password) {
    // req.flash('error', 'All fields are required')
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
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
  // res.header('auth-token', token).send(token);
  res.cookie('jwt', token, { maxAge: maxAge * 1000 });
  res.redirect("OrderPage");
  console.log("auth-token =>>", token)

})
// *****************************************************************************************//
// **********************************  Add a new Order   *********************************//
router.post('/add-order', async (req, res) => {
  const { userId, subTotal, phoneNumber, image } = req.body;
  console.log(userId, subTotal, phoneNumber, image)
  const order = new Order({
    userId,
    subTotal,
    phoneNumber,
    image

  });

  try {
    const savedOrder = await order.save();
    res.send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
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
// ********************************** Get Order details  *********************************//
router.get('/orderpage', async (req, res) => {
   res.render("OrderPage")
});





module.exports = router;
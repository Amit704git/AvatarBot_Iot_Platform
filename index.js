require('dotenv').config()
const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const engine = require("ejs-mate");
const flash = require("connect-flash");
const session = require("express-session");
const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword , sendPasswordResetEmail} = require('firebase/auth');
const {auth ,db } = require('./firebaseConfig.js');
const {isLoggedIn} = require("./middleware.js");
const {signup ,signin ,resetCredential , signout} = require("./controller/auth.js");
const {sendmail,verifyOtp} = require("./controller/verifyEmail.js");
const {addRoomListings , dashboardListings} = require("./controller/listings.js");

const sessionOptions = {
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie :{
      expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge : 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
  },
};


app.use(session(sessionOptions));
app.use(flash());

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(flash());
app.set('view engine', 'ejs');
const path = require("path");
app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"/views"));
app.use("/images", express.static("images"));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;

  next();
});

// ==================================== mongoDB connection ===================================
const dburl = process.env.ATLASDB_URL;

main()
.then(res =>{
    console.log('database connected successfully');
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
}


// ============================================= / route =============================
app.get('/', isLoggedIn ,(req, res) => {
res.render('listings/dashboard');    
});
// ================================================= sign up get route ==============================
app.get('/signup', (req, res) =>{
    res.render("auth-forms/signup.ejs");
})
// ============================================ sign up sending OTP ===============================
app.post('/send-mail', sendmail);
// ===================================== sign up post route ==================================
app.post('/signup',verifyOtp , signup);
// ============================== sign in get route ===========================
app.get('/signin', (req, res) =>{
  res.render('auth-forms/login.ejs');
});
// ============================== sign in get route ===========================
app.post('/signin',signin );

//===================================== forgot password =======================
app.get('/auth/reset-credentials', (req, res) =>{
  res.render('auth-forms/forgot-pass.ejs');
});
// ================================= reset pass ================
app.post('/auth/reset-credentials', resetCredential);

// ============================== Room create route ==========================
app.post('/listings/add-credentials',isLoggedIn, addRoomListings);

// ============================== sign out ==========================
app.post('/signout',isLoggedIn, signout);
//============================ all route ===================================
app.all('*', (req , res) => {
  res.render('error_page/error_404.ejs');
})
app.listen(PORT, () =>{
    console.log(`listining on port ${PORT}`);
})
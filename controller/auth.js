const mongoose = require('mongoose');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword , sendPasswordResetEmail,signInWithPhoneNumber} = require('firebase/auth');
const {auth ,db} = require('../firebaseConfig');
const {userDetails} = require("../models/user.js");


const signup = async (req, res , next) => {
    const {name, mobile_no, email, password ,con_password } = req.body;
    if (password == con_password) {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        db.ref(`users/` + user.uid).set({
          email: user.email,
          uid: user.uid,
          mobile:mobile_no,
          StringIn:"#$$%%$",
          StringOut:"#$$%%$",
          dashboard:[
            {
              Humidity:"45", 
              Temp:"43",
              voltage:"34",
              current:"23",
              TotalCusm:"678",
            }
          ],
        })
        let newUser = new userDetails({
          email:email,
          password:password,
          uid:user.uid,
          mobile_no:mobile_no,
        })
        newUser.save();
        req.flash("success", "Welcome to Avatarbot ! please login");
        res.redirect('/signin');
      })
      .catch((error) => {
        req.flash("error", "This account is already exist pls login");
        res.redirect('/signin');
      });
    } else{
      req.flash("error"," your confirm password dose not match please enter carefully !");
      res.redirect('/signup')
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        res.cookie('user', user.uid);
        req.flash("success", "Login successfully");
        res.redirect('/');
      })
      .catch((error) => {
        req.flash("error","please enter valid email or password!");
        res.redirect('/signin')
      });
  }

const resetCredential = async (req ,res ) => {
    const { email} = req.body;
     await sendPasswordResetEmail(auth, email)
    .then((userCredential) => {
      res.redirect('/signin');
    })
    .catch((error) => {
      req.flash("error","please enter valid email !");
    });
  
  }

const signout = async (req, res) => {
     await res.clearCookie('user');
    res.redirect('/');
  }
  module.exports = { signup , signin, resetCredential , signout };

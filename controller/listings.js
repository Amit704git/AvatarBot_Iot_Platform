const mongoose = require('mongoose');
const {roomSchema} = require("../models/listings.js");
const {userDetails} = require("../models/user.js");
const {auth ,db} = require('../firebaseConfig');

// ============================================= dashboard listings ==============================
const dashboardListings = (req, res) => {
    wss.on('connection', async (ws) => {
        console.log('New WebSocket connection');
    
        const userRef = db.ref(`users/${req.cookies.user}`);
        userRef.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
      
        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
      });
      res.render('listings/dashboard');    
}

// ============================================= add room listings ==============================
const addRoomListings = async (req, res) => {
    const { room_name} = req.body;
    let user = await userDetails.find({uid:req.cookies.user});
    user = user.map(u => {
        let newRoom = new roomSchema({
            roomName: room_name,
            userId: u._id,
        });
        return newRoom.save()
        .then(() =>{
            req.flash('success','Room created successfully');
            res.redirect('/');
        }).catch(err =>{
            req.flash('error','Room not created');
            res.redirect('/');
        });
    });
}

module.exports = {addRoomListings , dashboardListings};
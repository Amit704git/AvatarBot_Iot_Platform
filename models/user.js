const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    mobile_no: {
        type:Number,
        required : true,
        match: /^[0-9]{10}$/,
    },
}, {
    timestamps: true,
});

const userDetails = mongoose.model('User', userSchema);

module.exports = {userDetails};
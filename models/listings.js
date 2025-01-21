const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomName: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: String, 
        required: true
    }
});

const room = mongoose.model('Room', roomSchema);
module.exports = {roomSchema: room};
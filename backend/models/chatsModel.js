const mongoose = require("mongoose");
const uuid = require("uuid");

const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4(),
        unique: true
    },
    house_id:{
        type: String,
        required: true
    },
    messages:{
        type: mongoose.Schema.Types.Mixed
    },
    created_on:{
        type: Date,
        default: Date()
    }
});

const chatRoom = mongoose.model("chatroom", chatSchema,"chatrooms");

module.exports = chatRoom;
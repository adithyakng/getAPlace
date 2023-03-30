const mongoose = require("mongoose");
const uuid = require("uuid");

const raiseRequestSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4(),
    },
    userId: {
        type: String,
        required: true,
    },
    adminUserId:{
        type: String,
        required: true,
    },
    houseId: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0,
    },
    message:{
        type:String,
        required:true,
    },
    created_on: {
        type: Date,
        default: Date(),
    },
    deleted: {
        type: Number,
        default: 0,
    }
});


const raiseRequest = mongoose.model("raiseRequest", raiseRequestSchema, "raiseRequests");
module.exports = raiseRequest;

const chatsController = {}
const userModal = require("../models/userModel");
const adminUserModal = require("../models/adminUserModel")
const helpers = require('../helpers');
const houseModal = require('../models/houseModel');
const chatModal = require("../models/chatsModel");

chatsController.getMessages = async (req,res) => {
    const chatRoomId = req.query.chatroomid;

    if(!chatRoomId){
        return res.json({
            status: 0,
            message: "Invalid chatroom id"
        })
    }
    const chatModel = await chatModal.findOne({id:chatRoomId});
    if(!chatModel){
        return res.json({
            status: 0,
            message: "Chatroom not found"
        })
    }

    let messages = [];

    if(chatModel.messages){
        for(let i = 0; i < chatModel.messages.length; i++){
            let message = chatModel.messages[i];
            let messageObj = {};
            let userId = message.userId;
            let user;
            if(userId){
                user = await userModal.findOne({id: userId});
            }
            if(!user){
                user = await adminUserModal.findOne({id: userId});
            }
            messageObj["name"] = (user) ? ((req.user.id == user.id) ? "Me" : user.name) : "Guest";
            messageObj["isSender"] = (user) ? ((req.user.id == user.id) ? true : false) : false;
            messageObj["message"] = message.message;
            messageObj['time'] = message.time;
            messages.push(messageObj);
        };
    }
    return res.json({
        status: 1,
        "messages": messages
    });
}

chatsController.postMessage = async (req,res) => {
    let chatRoomId = req.query.chatroomid;
    if(!chatRoomId){
        return res.json({
            status: 0,
            message: "Invalid chatroom id"
        })
    }
    let chatRoom = await chatModal.findOne({id: chatRoomId});
    if(!chatRoom){
        return res.json({
            status: 0,
            message: "Chatroom not found"
        })
    }
    let message = req.body.message;
    if(!message){
        return res.json({
            status: 0,
            message: "Invalid message"
        })
    }
    let messages = chatRoom.messages ? chatRoom.messages : [];
    messages.push({'userId': req.user.id, 'message': message, 'time': new Date()});
    chatRoom.messages = messages;

    try{
        await chatRoom.updateOne({messages: messages});
        return res.json({
            status: 1,
            message: "Message sent"
        })
    } catch(error){
        return res.json({
            status: 0,
            message: "Error posting message"
        })
    }
    
}
module.exports = chatsController;
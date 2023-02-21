const commonController = {};
const houseModal = require('../models/houseModel');
commonController.listHouses = async (req,res) => {
    let houses = [];
    if(req.user.isAdmin){
        houses = await houseModal.find({userId:req.user.id});
    }
    else{
        houses = await houseModal.find({});
    }
    return res.status(200).json(houses);
}

module.exports = commonController;
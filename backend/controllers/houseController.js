const houseController = {};
const houseModal = require('../models/houseModel')

houseController.getFaq = async (req, res) => {
  
    let id = req.query.id
    let house = await houseModal.findOne({'id': id});
    if(house){
       return res.json({
        status: 1,
        faq: house.faqs
       });
    }
    return res.json({
        status: 0,
        message: 'ID or house not found'
    })
};

module.exports = houseController;

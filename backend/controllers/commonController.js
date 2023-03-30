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

commonController.submitLease = async (req,res) => {
    const user = req.user;
    const houseId = req.body.houseId;

    if(!user){
        return res.json({
            status: 0,
            message: "User not found"
        })
    }
    const house = await houseModal.findOne({id:houseId, occupied:0});
    if(!house){
        return res.json({
            status: 0,
            message: "House not found"
        })
    }

    house.occupied = 1;
    house.occupied_by = user.id;
    try{    
        await house.save();
    }catch(error){
        return res.json({
            status: 0,
            message: "Something went wrong while saving house occupied status"
        })
    }

    return res.json({
        status: 1,
        message: "House occupied successfully"
    });
}

commonController.sortHouses = async (req,res) => {
    let query = [];
    if(!req.user.isAdmin){ 
        query.push({occupied: 0});
    }
    if(req.body.bedroom){
        query.push({bedroom: req.body.bedroom});
    }
    if(req.body.bathroom){
        query.push({bathroom: req.body.bathroom});
    }
    if(req.body.minCarpetArea){
        query.push({carpetArea: {'$gte':req.body.minCarpetArea}});
    }
    if(req.body.maxCarpetArea){
        query.push({carpetArea: {'$lte':req.body.maxCarpetArea}});
    }
    if(req.body.features){
        query.push({features: {'$all':req.body.features}});
    }
    if(req.body.minCost){
        query.push({cost: {'$gte':req.body.minCost}});
    }
    if(req.body.maxCost){
        query.push({cost: {'$lte':req.body.maxCost}});
    }
    if(req.body.amenities){
        query.push({amenities: {'$all':req.body.amenities}});
    }
    let houses;
    if(query.length == 0){
        houses = await houseModal.find();
    }
    else{
        houses = await houseModal.find({$and:query})
    }
    return res.json({
        status:1,
        houses: houses,
        message: "Houses fetched successfully"
    });

}

commonController.getSortOptions = async (req, res) => {
    let houses;
    if(req.user.isAdmin){
        houses = await houseModal.find();
    }
    else{
        houses = await houseModal.find({occupied:0});
    }

    let options = {};
    options['bedroom'] = [];
    options['bathroom'] = [];
    options['features'] = [];
    options['amenities'] = [];
    options['carpetArea'] = [0,0];
    options['cost'] = [0,0];
    let minCarpetArea = Infinity, maxCarpetArea = 0, minCost = Infinity, maxCost = 0;
    houses.forEach(element => {
        if(!options['bedroom'].includes(element.bedroom)){
            options['bedroom'].push(element.bedroom);
        }
        if(!options['bathroom'].includes(element.bathroom)){
            options['bathroom'].push(element.bathroom);
        }
        minCarpetArea = Math.min(minCarpetArea, element.carpetArea);
        maxCarpetArea = Math.max(maxCarpetArea, element.carpetArea);
        if(element.features){
            element.features.forEach(feature => {
                if(!options['features'].includes(feature)){
                    options['features'].push(feature);
                }
            });
        }
        if(element.amenities){
            element.amenities.forEach(amenity => {
                if(!options['amenities'].includes(amenity)){
                    options['amenities'].push(amenity);
                }
            });
        }
        minCost = Math.min(minCost, element.cost);
        maxCost = Math.max(maxCost, element.cost);

    });
    options["carpetArea"] = [minCarpetArea, maxCarpetArea];
    options["cost"] = [minCost, maxCost];
    return res.json({
        status:1,
        options: options
    })
}

module.exports = commonController;
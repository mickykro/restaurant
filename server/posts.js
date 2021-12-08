
const fs = require('fs');
const {orders, floor, completedPath} = require('./utils');



exports.getOrders = async (req, res, next)=>{
    res.json(JSON.parse(orders))
    
}
exports.getFloor = async (req, res, next)=>{
   res.json(JSON.parse(floor));
}


exports.addPosts =  async (req, res) => {
        const dataToAppend = req.body.json;
        
     fs.writeFile(completedPath,JSON.stringify({data:dataToAppend, dateAdded: Date.now()}),(err)=>{
         console.log(err);
     });
    }
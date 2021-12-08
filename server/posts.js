
const fs = require('fs');
const {orders, floor, completedPath} = require('./utils');



exports.getOrders = async (req, res, next)=>{
console.log('get orders: ',JSON.parse(orders));
    res.json(JSON.parse(orders))
    // res.get(orders);
}
exports.getFloor = async (req, res, next)=>{
    console.log(floor);
   res.json(JSON.parse(floor));
    // res.end(floor);
}


exports.addPosts =  async (req, res) => {
        const dataToAppend = req.body.json;
        fs.w
     fs.writeFile(completedPath,JSON.stringify({data:dataToAppend, dateAdded: Date.now()}),(err)=>{
         console.log(err);
     });
    }
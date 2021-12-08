const fs = require('fs');
const path = require('path');
const ordersPath = path.resolve('C:/Users/Dell/Desktop/resume/poalim_project/restaurant-1/server/jsons', 'orders.json');
const floorPath = path.resolve('C:/Users/Dell/Desktop/resume/poalim_project/restaurant-1/server/jsons', 'floor.json');
const completedPath = path.resolve('C:/Users/Dell/Desktop/resume/poalim_project/restaurant-1/server/jsons', 'completed_orders.json')

exports.orders = getJson(ordersPath);
exports.floor = getJson(floorPath);
  function getJson(path){
      const data =  fs.readFileSync(path); 
      return data;

}


exports.append = appendData;

function appendData( req, res){
 return fs.appendFile(completedPath,data);

}




// exports.orders = orders;



// exports.readOrders = fs.readFile('./orders.json',(err, res)=>{
//     if(err){
//         return err.message;
//     }
//     try{
//         console.log(res);
//         return JSON.parse(res);
//     }catch(e){
//         return e.message;
//     }
// });

// exports.append = fs.appendFile('../jsons/orders_complete.json',{
//     name: 'micky'
// }, 'utf8', (err)=>{
//     if(err) console.log(err);
// });






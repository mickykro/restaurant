import floor from '../jsons/floor.json';
// import orders from '../jsons/orders.json';
import Table from '../Components/table';
import axios from 'axios';


async function getFloor(){
    return await axios('http://localhost:3001/getFloor',).catch(e=>{
        console.log('error fetching gerFloor: ',e);
    });
}

async function getOrders(){
    return await axios('http://localhost:3001/getOrders').catch(e=>{

        console.log('error fetching gerOrders: ',e);
    });

}

const OrdersFromJSON = async () => {
     return await getOrders();
    

}
const tablesFromJSON = async () => {
    return await getFloor();
}







export  { tablesFromJSON, OrdersFromJSON };

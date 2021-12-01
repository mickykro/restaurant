import floor from '../jsons/floor.json';
import orders from '../jsons/orders.json';
import Table from '../Components/table';



const tablesFromJSON = floor.map((table, i) => {

    return (
        {
            number: table.Table,
            diners: table.Diners,
            concat: table.Concat,
            available: true,
            freeSeats: table.Diners,
            openDialog: false,
            start: 0,
            mobile: 0,
        }
    );
});


const ordersFromJSON = orders.map((order) => {

    return (
        {
        mobile: order.Mobile,
        diners: order.Diners
    }
    )
    ;
});

export { tablesFromJSON, ordersFromJSON };

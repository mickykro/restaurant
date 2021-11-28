import floor from '../jsons/floor.json';
import orders from '../jsons/orders.json';
import Table_design from '../Design/table_design';
import { Box } from '@material-ui/core';

const getTableShapeByDiners = (diners)=>{
    if(diners < 1 ) {
        return 'error';
    }
    switch(diners){
        case 1: return 'circle';
        case 2: return 'elipse';
        case 3: return 'triangle';
        case 4: return 'square';
        default: return 'pentagon';
    }
}

export const tables = floor.map((table, i)=>{

    return ( 
                <div key={i}>
                <Table_design tableNumber={table.Table} className={getTableShapeByDiners(table.Diners)} onClick={()=>{
                    console.log(`table ${table.Table} was clicked`);
                }} /></div>
            );
});


export const ordersFromJSON = orders.map((order)=>{
    return <order mobile={order.Mobile} diners={order.Diners} />; 
});


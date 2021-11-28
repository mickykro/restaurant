import { useState } from 'react';
import Table_design from '../Design/table_design';

export const table = ( number, diners, concat)=>{
    const [color, setColor] = useState('green');

    return ( 
        <div key={i}>
        <Table_design tableNumber={number} className={getTableShapeByDiners(diners)} onClick={()=>{
            console.log(`table ${number} was clicked`);
        }}  /></div>
    );
    return { number, diners, concat};
}

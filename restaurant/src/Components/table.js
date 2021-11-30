import { useState } from 'react';
import Table_design from '../Design/table_design';
import Dialog from '../Design/dialog';

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

const  Table = ( {number, diners, concat, freeSeats, openDialog=true, start })=>{
    const available = freeSeats > 0;
    const [dialog, setDialog] = useState();
    const [open, setOpen] = useState(openDialog);
    const infoDialog = ( <Dialog available={available} freeSeats={freeSeats} openDialog={open} setOpen={setOpen} number={number} start={start}/>)
    console.log(`${available} : `,number);
    return ( <>
        <Table_design tableNumber={number} available={available} className={getTableShapeByDiners(diners)} onClick={()=>{
            console.log(`table ${number} was clicked, available: `,available);
            setDialog(infoDialog);
          
        }}  />
        {dialog}
        </>
    );
}
export default Table;

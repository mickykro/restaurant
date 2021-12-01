import { useState } from 'react';
import Table_design from '../Design/table_design';
import Dialog from '../Design/dialog';
const getTableShapeByDiners = (diners) => {
    if (diners < 1) {
        return 'error';
    }
    switch (diners) {
        case 1: return 'circle';
        case 2: return 'elipse';
        case 3: return 'triangle';
        case 4: return 'square';
        default: return 'pentagon';
    }
}

const Table = ({ number, diners, concat, freeSeats, openDialog = true, start, setFreeSeats, completed, setCompleted, mobile }) => {
    const available = freeSeats > 0;
    if (!available) {
        setTimeout(() => {
            setFreeSeats(number, diners);
            const start_time = new Date(start).getHours() + ':' + new Date(start).getMinutes();
            const end_time = `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`;
            const current = completed;
            current.push({ mobile, diners, start_time, end_time });
            setCompleted(current);
        }, 15000)
    }
    const [dialog, setDialog] = useState();
    const [open, setOpen] = useState(openDialog);
    const infoDialog = (<Dialog available={available} diners={diners} freeSeats={freeSeats} openDialog={open} setOpen={setOpen} number={number} start={start} />)

    return (<>
        <Table_design tableNumber={number} available={available} className={getTableShapeByDiners(diners)} onClick={() => {
            setDialog(infoDialog);

        }} />
        {dialog}
    </>
    );
}
export default Table;

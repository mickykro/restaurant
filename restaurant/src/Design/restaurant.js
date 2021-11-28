import { Box} from '@material-ui/core';
import { useState } from 'react';
import Table_design from '../Design/table_design';
import { tables } from '../utils/read';


const Restaurant = ()=>{
    return (
        <Box sx={{
            display: 'grid',
            columnGap: '20vh',
            rowGap: '10vh',
            gridTemplateColumns: 'repeat(4, 1fr)',
            alignItems: 'center', 
            
        }} >
                {tables}
        </Box>
    )
};

export default Restaurant;

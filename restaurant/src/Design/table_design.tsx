import React, { FC, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { height, margin } from '@mui/system';


const useStyles = makeStyles((theme) => ({
    triangle: {
        width: 0,
        height: 0,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderTopWidth: '0px',
        borderWidth: '65px',
        borderStyle:'solid', 
        marginRight: '10vh',
        marginBottom: '2vh',
        boxShadow:' 3px 21px 11px -10px grey',
    },
    pentagon: {
        position: 'relative',
        width: '1.5vh',
        boxSizing: 'content-box',
        borderWidth: '50px 18px 0',
        borderStyle: 'solid',
        borderColor: 'red ',
        boxShadow: '10px 7px 5px grey',
        marginBottom: '2vh'
        

    },
    pentagonInner: {
        width: '1.5vh',
        borderBottomWidth: 0,
        borderLeftColor: "transparent",
        borderLeftWidth: 18,
        borderRightColor: "transparent",
        borderRightWidth: 18,
        borderTopWidth: 50,
     },
    pentagonBefore : {
    position: "inherit",
    height: 0,
    width: '2vh',
    marginTop: 10,
    marginBottom: -1,
    left: 0,
    borderStyle: "solid",
    borderBottomWidth: 45,
    borderLeftColor: "transparent",
    borderLeftWidth: 47,
    borderRightColor: "transparent",
    borderRightWidth: 47,
    borderTopWidth: 0,
    borderTopColor: "transparent",
    

    },
    circle:{
        width: '10vh',
        height: '10vh',
        borderRadius: '50%',
        boxShadow: '-8px 10px 5px grey',
        margin: '2vh'
    },
    elipse:{
        height: '6vh',
        width: '10vh',
        borderRadius: '50%',
        boxShadow: '8px 5px 5px grey',
        margin: '2vh'      
    }, 
    square: {

        height: '10vh',
        width: '10vh',
        margin: '2vh',
        boxShadow: '8px 8px 8px grey'

    }



}));

type props = {
    className: 'triangle'| 'pentagon'| 'pentagonBefore' | 'pentagonInner'| 'circle' | 'elipse' | 'square',
    children?: React.ReactNode,
    onClick: Function,
    tableNumber: number,
    available: boolean,
    
}

const Table: FC<props> = ({ className='triangle' ,children, onClick, tableNumber, available }: props): ReactElement => {
    const classes = useStyles();    
    const color = className === 'triangle'? 'transparent' : available ? 'green' : 'red';
    const triangleColor = available ? 'green' : 'red'; 
    const isPentagon = className === 'pentagon' ? 'transparent' : color;
    return (<Grid container item xs={4} direction='column'  >
        {className === 'pentagon' && <div>
             <div className={classes.pentagonBefore} style={{borderBottomColor: `${color}`}} />
        <div className={classes.pentagonInner} style={{borderBottomColor: `${color}`, borderTopColor: `${color}`}}/>
        </div> 
        }
        <button className={classes[className]} onClick={(e) => ( onClick && onClick(e) ) }  style={{backgroundColor: `${color}`,
         borderBottomColor: `${triangleColor}`}}></button>
        {tableNumber} 
    </Grid>);
}


export default Table;
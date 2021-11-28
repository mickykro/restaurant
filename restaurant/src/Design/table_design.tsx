import React, { FC, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { height, margin } from '@mui/system';


const useStyles = makeStyles((theme) => ({
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '65px solid transparent',
        borderRight: '65px solid transparent',
        borderBottom: '65px solid #ff0000', 
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
        borderBottomColor: "red",
        borderBottomWidth: 0,
        borderLeftColor: "transparent",
        borderLeftWidth: 18,
        borderRightColor: "transparent",
        borderRightWidth: 18,
        borderTopColor: "red",
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
    borderBottomColor: "red",
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
    available: string
}

const Table: FC<props> = ({ className='triangle' ,children, onClick, tableNumber, available }: props): ReactElement => {
    const classes = useStyles();    
    return (<Grid container item xs={4} direction='column'  >
        {className === 'pentagon' && <div>
             <div className={classes.pentagonBefore} />
        <div className={classes.pentagonInner} />
        </div>
        }
        <Button className={classes[className]} onClick={(e) => ( onClick && onClick(e) ) } />
        {tableNumber}
    </Grid>);
}


export default Table;
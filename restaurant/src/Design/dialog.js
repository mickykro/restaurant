import  React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



export default function ResponsiveDialog({ freeSeats, number , start, openDialog , setOpen, diners }) {
    const theme = useTheme();
    const [innerOpen, setInnerOpen] = useState(openDialog);
    const dialogTitle = freeSeats > 0 ? 'available table' : 'occupied table';
    const dialogText = freeSeats < diners ? `table number ${number} started at ${new Date(start).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })}`: 
    `table number ${number} is available and has ${freeSeats} empty seats`;

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(()=>{
        setInnerOpen(openDialog);
    },[])

    const handleClose = () => {
        setInnerOpen(false);
    };


    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={innerOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

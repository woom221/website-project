import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ClassCard from '../Classinfo';
import OutlinedEnrollButtons from '../Enroll';

export default function AlertDialog({ classinformation }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {classinformation.capacity !== 0 && new Date(classinformation.time) > new Date() && !classinformation.enrolled.includes(Number(localStorage.getItem("userID"))) ? <Button onClick={ handleClickOpen } variant="outlined" sx={{width: 200, height: 100}}>
            {classinformation.name.length > 10? classinformation.name.substring(0, 10) + '...' : classinformation.name}
            <br/>
            Start Date: {`${(new Date(classinformation.time)).toLocaleString('en-US', {month: 'short'})} ${(new Date(classinformation.time)).getDate()}`}
            <br/>
            Start Time: {`${(new Date(classinformation.time)).getHours() < 10 ? "0" + (new Date(classinformation.time)).getHours() : (new Date(classinformation.time)).getHours()}:${(new Date(classinformation.time)).getMinutes() < 10 ? "0" + new Date(classinformation.time).getMinutes() : new Date(classinformation.time).getMinutes()}`}
            </Button> : <Button variant="outlined" disabled sx={{width: 200, height: 100}}> 
            {classinformation.name.length > 10? classinformation.name.substring(0, 10) + '...' : classinformation.name}
            <br/>
            Start Date: {`${(new Date(classinformation.time)).toLocaleString('en-US', {month: 'short'})} ${(new Date(classinformation.time)).getDate()}`}
            <br/>
            Start Time:{`${(new Date(classinformation.time)).getHours() < 10 ? "0" + (new Date(classinformation.time)).getHours() : (new Date(classinformation.time)).getHours()}:${(new Date(classinformation.time)).getMinutes() < 10 ? "0" + new Date(classinformation.time).getMinutes() : new Date(classinformation.time).getMinutes()}`}
            </Button>}


            <Dialog open={ open } onClose={handleClose}>
                <DialogTitle id={ (classinformation.id).toString() } textAlign='center'>
                    { `Enroll to ${classinformation.name.length > 30 ? classinformation.name.substring(0, 30) + '...' : classinformation.name}?` }
                </DialogTitle>
                <DialogContent sx={{height: '70%'}}>
                    <ClassCard value={ classinformation } />
                </DialogContent>
                <DialogActions>
                    <OutlinedEnrollButtons class_id={classinformation.id} />
                </DialogActions>
            </Dialog>
        </div>
    );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import { Hidden, Typography } from '@mui/material';



export default function OutlinedEnrollButtons( {class_id} ) {

    const [message, setMessage] = React.useState('')


    const enrollAttempt = () => {
        fetch(`http://localhost:8000/classes/add/${class_id}/`, {credentials: 'include', method: 'POST', headers: {'Authorization': "Token " + localStorage.getItem("token")}})
        .then(function(response) {
            if (response.status === 200) {
                response.json().then(json => setMessage(json.details))
            }
            else if (response.status === 401) {
                {window.location.href = '/login';}
            }
            else if (response.status === 403) {
                {window.location.href = '/all_subscriptions';}
            }
        }).catch(() => console.log('error'))
    }

    const enrollAllAttempt = () => {
        fetch(`http://localhost:8000/classes/addall/${class_id}/`, {credentials: 'include', method: 'POST', headers: {'Authorization': "Token " + localStorage.getItem("token")}})
        .then(function(response) {
            if (response.status === 200) {
                response.json().then(json => setMessage(json.details))
            }
            else if (response.status === 401) {
                {window.location.href = '/login';}
            }
            else if (response.status === 403) {
                {window.location.href = '/all_subscriptions';}
            }
        }).catch(() => console.log('error'))
    }

    const Enrollment = ({message}) => {

        if (message.includes('Successful')) {
            return (<>
                <Typography textAlign={"center"}>
                Successfully enrolled. Check 'My Schedule' for details
                </Typography>
            <Typography sx={{display: 'none'}}>{setTimeout(function(){window.location.reload();}, 3000)}</Typography>
            </>)
        }
        else if (message.includes('full')) {
            return (<>
                <Typography textAlign={"center"}>
                    Unsuccessful Enrollment! Classes are not available
                    OR You are already enrolled in the class(es)
                </Typography>
            </>)
        }

        else if (message.includes('already enrolled')) {
            return (<>
                <Typography textAlign={"center"}>You are already enrolled in the class(es)</Typography>
            </>)
        }
        else {
            return (<>
                <Button variant="outlined" onClick={ enrollAttempt }>Enroll</Button>
                <Button variant="outlined" onClick={ enrollAllAttempt }>Enroll Every Subsequent Class (including this class)</Button>
            </>)
        }
    };

    return (<>
        <Enrollment message={message}/>
        </>
    );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Route } from 'react-router-dom';
import MyClassTab from '../MyClassTab';



export default function OutlinedDropButtons( {class_id} ) {

    const [message, setMessage] = React.useState('')


    const dropAttempt = () => {
        fetch(`http://localhost:8000/classes/drop/${class_id}/`, {credentials: 'include', method: 'POST', headers: {'Authorization': "Token " + localStorage.getItem("token")}})
        .then(function(response) {
            if (response.status === 200) {
                response.json().then(json => setMessage(json.details))
            }
            else if (response.status === 401) {
                {setTimeout(function(){window.location.href = '/login';}, 2000)}
            }
            else if (response.status === 403) {
                console.log("subscription needed")
            }
        }).catch(() => console.log('error'))
    }

    const dropAllAttempt = () => {
        fetch(`http://localhost:8000/classes/dropall/${class_id}/`, {credentials: 'include', method: 'POST', headers: {'Authorization': "Token " + localStorage.getItem("token")}})
        .then(function(response) {
            if (response.status === 200) {
                response.json().then(json => setMessage(json.details))
            }
            else if (response.status === 401) {
                // route to login screen
                console.log("log in needed")
            }
            else if (response.status === 403) {
                console.log("subscription needed")
            }
        }).catch(() => console.log('error'))
    }


    const Dropped = ({message}) => {
        if (message.includes('Successful')) {
            return (<>
                <Typography textAlign={"center"} variant='h6'>
                {message}
                </Typography>
            <Typography sx={{display: 'none'}}>{setTimeout(function(){window.location.reload();}, 3000)}</Typography>
            </>)
        }

        else if (message.includes('enrolled')) {
            return (<>
                <Typography textAlign={"center"} variant='h6'>
                You've already dropped from the class
                </Typography>
            </>)
        }
        else {
            return (<>
                <Button variant="outlined" onClick={ dropAttempt }>Drop</Button>
                <Button variant="outlined" onClick={ dropAllAttempt }>Drop Every Subsequent Class (including this class)</Button>
            </>)
        }
    }


    return (<>
        <Dropped message={message}/>
        </>
    );
}

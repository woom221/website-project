import { Card, Typography } from "@mui/material";
import CardContent from '@mui/material/CardContent';

export default function ClassCard({ value }) {
    return (
        <>
        <Card sx={{ minWidth: 250, padding:'10px 10px 10px 10px'}}>
            <CardContent sx={{ width: '80%', minWidth: 200}}>
                <Typography variant="h6"> Coach: { value.coach.length > 20 ? value.coach.substring(0, 20) + '...' : value.coach } </Typography>
                <br/>
                <Typography variant="h6"> 
                 Regular Start Time:
                 <br/>
                {`Every ${new Date(value.time).toLocaleString('default', {weekday: 'long'})} at ${ new Date(value.time).getHours() < 10 ? '0' + new Date(value.time).getHours(): new Date(value.time).getHours()}:${ new Date(value.time).getMinutes() < 10 ? '0' + new Date(value.time).getMinutes() : new Date(value.time).getMinutes() }` } 
                </Typography>
                <br/>
                <Typography variant="h6"> Last Class Date: { value.end_recursion } </Typography>
                <br/>
                <Typography variant="h6"> About: { value.description.substring(0, 35) } </Typography>
                <Typography variant="h6"> { value.description.substring(35, 70) } </Typography>
                <Typography variant="h6"> { value.description.substring(70, 105) } </Typography>
                <Typography variant="h6"> { value.description.substring(105, 140) } </Typography>
                <Typography variant="h6"> { value.description.substring(175, 210) } </Typography>
                <Typography variant="h6"> { value.description.substring(245, 255) } </Typography>
            </CardContent>
        </Card>
        </>
    );
}
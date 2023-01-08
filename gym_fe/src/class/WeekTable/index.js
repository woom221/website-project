import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination } from '@mui/material';
import AlertDialog from '../ClassAlert';


export default function WeekTable( { studio_val, offset } ) {


    const PER_PAGE = 10;
    const [classes, setClasses] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const handleChange = (e, p) => {
        setPage(p);
      };


    React.useEffect(() => {
        fetch(`http://localhost:8000/classes/studio/${studio_val}/?page=${page}`)
            .then(response => response.json())
            .then(json => {
                setClasses(json.results)
                setTotalPages(Math.ceil(json.count/PER_PAGE) * offset)})
        }, [page, offset, studio_val]);

    return (
        <>
        <TableContainer component={Paper} sx={{maxHeight: "750px", width: '70%', overflowX: 'scroll', overflowY: 'scroll'}}>
            <Table sx={{ width: '100%'}}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"> Sunday </TableCell>
                        <TableCell align="center"> Monday </TableCell>
                        <TableCell align="center"> Tuesday </TableCell>
                        <TableCell align="center"> Wednesday </TableCell>
                        <TableCell align="center"> Thursday </TableCell>
                        <TableCell align="center"> Friday </TableCell>
                        <TableCell align="center"> Saturday </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ classes.map((each_class) =>
                        (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Sunday"
                        ? <AlertDialog key={ each_class.id } classinformation={ each_class } />: ''))}</TableCell>
                        <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ classes.map((each_class) =>
                        (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Monday"
                        ? <AlertDialog key={ each_class.id } classinformation={ each_class } />: ''))}</TableCell>
                        <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ classes.map((each_class) =>
                        (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Tuesday"
                        ? <AlertDialog key={ each_class.id } classinformation={ each_class } />: ''))}</TableCell>
                        <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ classes.map((each_class) =>
                        (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Wednesday"
                        ? <AlertDialog key={ each_class.id } classinformation={ each_class } />: ''))}</TableCell>
                        <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ classes.map((each_class) =>
                        (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Thursday"
                        ? <AlertDialog key={ each_class.id } classinformation={ each_class } />: ''))}</TableCell>
                        <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ classes.map((each_class) =>
                        (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Friday"
                        ? <AlertDialog key={ each_class.id } classinformation={ each_class } />: ''))}</TableCell>
                        <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ classes.map((each_class) =>
                        (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Saturday" && new Date(each_class.time).getDate
                        ? <AlertDialog key={ each_class.id } classinformation={ each_class } />: ''))}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Pagination count={totalPages} page={page} onChange={handleChange} showFirstButton showLastButton />
        </TableContainer>
        </>
    );
}

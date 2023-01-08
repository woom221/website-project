import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import DropAlert from '../DropAlert';


export default function MyFutureClass() {
    const [futureClassesUser, setFutureClassesUser] = React.useState([]);
    const [pageUser, setPageUser] = React.useState(0);
    const [offSet, setOffSet] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(1000);

    const handleChange = (e, p) => {
        if (p + offSet < totalPage) {
            setPageUser(p);
        }
      };


    React.useEffect(() => {
        fetch(`http://localhost:8000/classes/view/${ localStorage.getItem("userID") }/?page=${ pageUser + offSet + 1}`, {method: 'GET', headers: {'Authorization': "Token " + localStorage.getItem("token")}})
            .then(response => response.ok ? response.json() : window.location.href = '/login')
            .then((json) => {
                setFutureClassesUser(json.results.filter(result => (new Date(result.time) >= new Date())))
                setTotalPage(json.next === null ? pageUser + offSet + 1 : totalPage)
                setOffSet(json.results.filter(result => (new Date(result.time) >= new Date())).length === 0 && json.results.length !== 0 ? offSet + 1 : offSet)
            }
        )}, [pageUser, offSet]);

    return (
                <>
                <TableContainer component={Paper} sx={{maxHeight: "750px", width: '70%', overflowX: 'scroll', overflowY: 'scroll'}}>
                    <Table sx={{ width: '100%' }}>
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
                                <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ futureClassesUser.map((each_class) =>
                                (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Sunday"
                                ? <DropAlert key={ each_class.id } classinformation={ each_class }/>: ''))}</TableCell>
                                <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ futureClassesUser.map((each_class) =>
                                (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Monday"
                                ? <DropAlert key={ each_class.id } classinformation={ each_class }/>: ''))}</TableCell>
                                <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ futureClassesUser.map((each_class) =>
                                (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Tuesday"
                                ? <DropAlert key={ each_class.id } classinformation={ each_class }/>: ''))}</TableCell>
                                <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ futureClassesUser.map((each_class) =>
                                (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Wednesday"
                                ? <DropAlert key={ each_class.id } classinformation={ each_class }/>: ''))}</TableCell>
                                <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ futureClassesUser.map((each_class) =>
                                (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Thursday"
                                ? <DropAlert key={ each_class.id } classinformation={ each_class }/>: ''))}</TableCell>
                                <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ futureClassesUser.map((each_class) =>
                                (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Friday"
                                ? <DropAlert key={ each_class.id } classinformation={ each_class }/>: ''))}</TableCell>
                                <TableCell align="center" sx={{ padding: "10px 10px 10px 10px"}}>{ futureClassesUser.map((each_class) =>
                                (new Date(each_class.time).toLocaleString('default', {weekday: 'long'}) === "Saturday" && new Date(each_class.time).getDate
                                ? <DropAlert key={ each_class.id } classinformation={ each_class }/>: ''))}</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        count={-1}
                        page={pageUser}
                        onPageChange={handleChange}
                        ActionsComponent={TablePaginationActions}
                        rowsPerPage={10}
                        rowsPerPageOptions={[]}
                        />
                    </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}
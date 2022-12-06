import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateAdmin } from '../../store';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useParams } from 'react-router-dom';


const Userlist = () => {
    const { auth, user } = useSelector( state => state )
    const dispatch = useDispatch()
    const {id }= useParams()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    var singleuserkey = ['id', 'fullName', 'username', 'isAdmin']


    const handleChangeConnect = (id, val) => {
        if(id !== auth.id){
            dispatch(updateAdmin(!val, id))
        }
    };
    
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{ mr: '15%' }}></Box>
            {
                auth.id === id ?
                <TableContainer component={Paper}>
                    <Table sx={{ width: '700px' }} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell >ID</TableCell>
                                <TableCell align="right">Username</TableCell>
                                <TableCell align="right">FullName</TableCell>
                                <TableCell align="right">idAdmin</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {user.map((singleuser) => {
                            let row = {}
                            for(var i = 0; i <singleuserkey.length; i++ ){
                                row[singleuserkey[i]] = singleuser[singleuserkey[i]]
                            }
                            return (
                                <TableRow
                                    key={row.id}
                                    sx={{"&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell >{row.id}</TableCell>
                                    <TableCell align="right">{row.username}</TableCell>
                                    <TableCell align="right">{row.fullName.includes('null') ? '' : row.fullName}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color={row.isAdmin ? "primary" : "secondary"}
                                            onClick={() => {
                                                handleChangeConnect(row.id, row.isAdmin);
                                            }}
                                        >
                                            {row.isAdmin ? "Admin" : "Customer"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                </TableContainer> :
                <Typography>You are not administrator!!!</Typography>
            }
            <Box sx={{ ml: '15%' }}></Box>
        </Box>
        
    );

};

export default Userlist;


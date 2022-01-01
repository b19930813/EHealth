import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(SportName, Calories, Heart, RunDistance, RunSpeed) {
  return { SportName, Calories, Heart, RunDistance, RunSpeed };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SportTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>運動名稱</TableCell>
            <TableCell align="right">消耗熱量</TableCell>
            <TableCell align="right">心跳</TableCell>
            <TableCell align="right">跑步距離</TableCell>
            <TableCell align="right">跑步速度</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.SportName}
              </TableCell>
              <TableCell align="right">{row.Calories}</TableCell>
              <TableCell align="right">{row.Heart}</TableCell>
              <TableCell align="right">{row.RunDistance}</TableCell>
              <TableCell align="right">{row.RunSpeed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
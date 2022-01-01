import * as React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { config } from '../../api/config'
import SportTable from './sportTable'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles(theme => ({
    basic: {
        paddingLeft: "20%",
        paddingRight: "20%",
        marginTop: "3%"
    },
    context: {
        paddingTop: "2%",
        paddingLeft: "12%",
        paddingRight: "12%",
    },
    Card: {
        marginRight: '2%',
        display: "inline-block",
    },
    banner: {
        backgroundColor: 'yellow',
        height: '300px',
        width: '100%',
    },
    SpcText: {

    }
}));

function createData(SportName, Calories, Heart, RunDistance, RunSpeed) {
    return { SportName, Calories, Heart, RunDistance, RunSpeed };
  }

export default function MainForm() {
    const classes = useStyles();

    const [stepValue, setStepValue] = React.useState("")

    const [user, setUser] = React.useState({
        Email: "",
        Password: ""
    })

    const [userId, setUserId] = React.useState(0)

    const [sport, setSport] = React.useState({
        Calories: 0.0,
        Heart: 0,
        RunDistance: 0.0,
        RunSpeed: 0.0,
        SportName: "",
        SportTrace: "",
        UserId: 0,
        DeviceId: 0
    })

    const [rows , setRows]  = React.useState([
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ])


    const handleRegisterClick = event => {
        document.location.href = "/Register";
    }

    const handleLoginClick = event => {
        axios.post('api/User/Login', user, config)
            .then(response => {

                if (response.data.isSusses) {

                    setSport(oldValues => ({
                        ...oldValues,
                        UserId: response.data.message
                    }));
                    setUserId(response.data.message)
                }
            })
    }

    const handleSportViewClick = event => {
        setStepValue("ViewSport");
    }

    const handleSportAdd = event => {
        axios.post('api/Sport/CreateSportData', sport, config)
            .then(response => {
                if (response.data.isSusses) {
                    console.log(`ttt ${response.data.message}`)
                }
            })
    }

    const handleSportCreateClick = () => {
        setStepValue("CreateSport")
    }

    const handleTextChange = event => {
        event.persist();
        switch (event.target.id) {
            case "Email":
                setUser(oldValues => ({
                    ...oldValues,
                    Email: event.target.value
                }));
                break;
            case 'Password':
                setUser(oldValues => ({
                    ...oldValues,
                    Password: event.target.value
                }));
                break;
            case 'Calories':
                setSport(oldValues => ({
                    ...oldValues,
                    Calories: event.target.value
                }));
                break;
            case 'Heart':
                setSport(oldValues => ({
                    ...oldValues,
                    Heart: event.target.value
                }));
                break;
            case 'RunDistance':
                setSport(oldValues => ({
                    ...oldValues,
                    RunDistance: event.target.value
                }));
                break;
            case 'RunSpeed':
                setSport(oldValues => ({
                    ...oldValues,
                    RunSpeed: event.target.value
                }));
                break;
            case 'SportName':
                setSport(oldValues => ({
                    ...oldValues,
                    SportName: event.target.value
                }));
                break;
            case 'SportTrace':
                setSport(oldValues => ({
                    ...oldValues,
                    SportTrace: event.target.value
                }));
                break;

            default:
                break;

        }
    }

    const handleShowLoginClick = () => {
        setStepValue("Login")
    }


    let ShowForm = (context) => {
        var view = ""
        switch (context) {
            case "Login":
                if (userId == 0) {
                    view = <Box className={classes.basic}>
                        <TextField id="Email" required label="帳號" variant="outlined" helperText="請輸入Email" fullWidth onChange={handleTextChange} /><br />
                        <TextField id="Password" required label="密碼" variant="outlined" type="password" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                        <Button variant="contained" onClick={handleLoginClick} >送出</Button>
                    </Box>
                }
                else {
                    view = <div>登入成功</div>
                }
                break;
            case "CreateSport":
                view = <Box className={classes.basic}>
                    <TextField id="Calories" label="消耗熱量" variant="outlined" fullWidth onChange={handleTextChange} /><br />
                    <TextField id="Heart" label="心跳" variant="outlined" fullWidth onChange={handleTextChange} style={{ "marginTop": "2%" }} /><br />
                    <TextField id="RunDistance" label="跑步距離" variant="outlined" fullWidth onChange={handleTextChange} style={{ "marginTop": "2%" }} /><br />
                    <TextField id="RunSpeed" label="跑步速度" variant="outlined" fullWidth onChange={handleTextChange} style={{ "marginTop": "2%" }} /><br />
                    <TextField id="SportName" label="運動名稱" variant="outlined" fullWidth onChange={handleTextChange} style={{ "marginTop": "2%" }} /><br />
                    <TextField id="SportTrace" label="運動軌跡" variant="outlined" fullWidth onChange={handleTextChange} style={{ "marginTop": "2%" }} />
                    <Button variant="contained" onClick={handleSportAdd} >送出</Button>
                </Box>
                break;
            case "ViewSport":
               view =  <TableContainer component={Paper}>
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

                axios.get(`api/Sport/SportList/${userId}`, config)
                    .then(response => {
                  
                        if (response.data.isSusses) {
                            console.log(response.data)
                            var tempData = []
                            response.data.message.forEach(element => {
                                tempData.push(createData(element.sportName , element.calories , element.heart , element.runDistance ,element.runSpeed ))
                            });
                            console.log(tempData)
                            setRows(tempData)
                        }
                        else {
                            view = <div>沒有運動紀錄</div>
                        }
                    }

                    )
                    .catch(exception => {
                        view = <div>沒有運動紀錄</div>
                    })
                  
                break;
            default:
                break;
        }
        return view
    }

    return (
        <div className={classes.basic}>
            <div style={{ "marginLeft": "25%" }}>
                <Button variant="text" onClick={handleRegisterClick} >註冊</Button>
                <Button variant="contained" onClick={handleShowLoginClick}>登入</Button>
                <Button variant="outlined" onClick={handleSportViewClick}>查詢運動紀錄</Button>
                <Button variant="outlined" onClick={handleSportCreateClick}>寫入運動紀錄</Button>

            </div>
            <div>
                {ShowForm(stepValue)}
            </div>
        </div>
    );
}

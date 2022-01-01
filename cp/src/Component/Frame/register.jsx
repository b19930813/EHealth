import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { config } from '../../api/config'

//畫面css

const useStyles = makeStyles(theme => ({
    basic: {
        //paddingTop : 300,
        paddingTop: "20px"
    },
    context: {
        paddingTop: "2%",
        paddingLeft: "25%",
        paddingRight: "25%",
    },
    txt: {
        marginTop: "2%"
    },
    divBord: {
        borderColor: '#aaaaee',
        borderWidth: '3px',
        borderStyle: 'solid',
        padding: '5px'
    }
}));


export default function Register() {
    const classes = useStyles();


    const [user, setUser] = React.useState({
        Email: "",
        Password: "",
        Name: "",
        Phone: "",
        Sex: "",
        BluetoothName: "",
        BluetoothIdentifier: "",
        BluetoothVersion: "",
        Device_Desc: "",
        Device_Type: ""
    });



    const [confirmPassword, setConfirmPassword] = React.useState("");



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
            case 'ComformPassword':
                setConfirmPassword(event.target.value);
                break;
            case 'Name':
                setUser(oldValues => ({
                    ...oldValues,
                    Name: event.target.value
                }));
                break;
            case 'Phone':
                setUser(oldValues => ({
                    ...oldValues,
                    Phone: event.target.value
                }));
                break;
            case 'Sex':
                setUser(oldValues => ({
                    ...oldValues,
                    Sex: event.target.value
                }));
                break;
            case 'BluetoothName':
                setUser(oldValues => ({
                    ...oldValues,
                    BluetoothName: event.target.value
                }));
                break;
            case 'BluetoothVersion':
                setUser(oldValues => ({
                    ...oldValues,
                    BluetoothVersion: event.target.value
                }));
                break;
            case 'BluetoothIdentifier':
                setUser(oldValues => ({
                    ...oldValues,
                    BluetoothIdentifier: event.target.value
                }));
                break;
            case 'Device_Type':
                setUser(oldValues => ({
                    ...oldValues,
                    Device_Type: event.target.value
                }));
                break;
            case 'Device_Desc':
                setUser(oldValues => ({
                    ...oldValues,
                    Device_Desc: event.target.value
                }));
                break;
            default:
                break;
        }
    }

    const handleSumbitClick = event => {
        if (user.Password == confirmPassword) {
            axios
                .post('/api/User/Register', user, config)
                .then(response => {
                    //if(response.data != "Fail"){
                        console.log(response)
                    if (response.data.isSusses) {
                        alert('註冊成功');
                    }
                    else {
                        alert('註冊失敗，請確認資料是否正確');
                    }
                })
                .catch(exception => {
                    alert('註冊失敗，請確認資料是否正確');
                })
        }
        else {
            alert('密碼跟確認密碼不同')
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed className={classes.basic} >
                <Box className={classes.context}>
                    <h1>使用者</h1>
                    <TextField id="Email" required label="帳號" variant="outlined" helperText="請輸入Email" fullWidth onChange={handleTextChange} />
                    <TextField id="Password" required label="密碼" variant="outlined" type="password" helperText="密碼長度必須大於8個字元，區分大小寫" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <TextField id="ComformPassword" required label="確認密碼" variant="outlined" type="password" helperText="再次輸入密碼做確認" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <TextField id="Name" label="姓名" variant="outlined" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <TextField id="Phone" label="電話" variant="outlined" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <TextField id="Sex" label="性別" variant="outlined" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <h1>設備</h1>
                    <TextField id="BluetoothName" label="設備藍芽名稱" variant="outlined" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <TextField id="BluetoothIdentifier" label="藍芽識別碼" variant="outlined" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <TextField id="BluetoothVersion" label="藍芽版本" variant="outlined" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <TextField id="Device_Desc" label="裝置描述" variant="outlined" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <TextField id="Device_Type" label="裝置類型" variant="outlined" fullWidth style={{ "margin-top": "2%" }} onChange={handleTextChange} />
                    <Button variant="contained" onClick={handleSumbitClick} style={{ "margin-top": "3%" }}>註冊</Button>
                </Box>
            </Container>
        </React.Fragment>
    );
}
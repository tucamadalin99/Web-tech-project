import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {useHistory, withRouter} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();
    localStorage.setItem("isAuth",false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    let cookie = document.cookie.split(";");
    const [isAuth,setIsAuth]=useState(false);
    // const [cookieHook,setCookieHook]=useState([]);
    // console.log('Cookie out:',cookieHook);
    // useEffect( () => {
    //     if(Array.isArray(cookieHook)) {
    //         cookie.forEach(cookie => {
    //             if(cookie.includes("cookieLogin")) {
    //                 setCookieHook(cookie);
    //             }
    //         })
    //     }
    //     else {
    //         setCookieHook(cookieHook);
    //     }
    //
    //     console.log('Cookie in:',cookieHook);
    // },[])

    // if(typeof(cookieHook)==="string") {
    //     localStorage.setItem("isAuth",true);
    // }


    const loginData = {
        email,
        password
    }

    const handleLoginData = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/login`, loginData, {withCredentials:true})
            .then((response) => {
                const {data}=response;
                localStorage.setItem('userId',data.passport.user);
                localStorage.setItem('isAuth',true);
                history.push('/');
            })
            .catch((error) => {
                const values = error.response.data;
                console.log('Error:', values);
                toast.error(values.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });


            })
    }

    return (
        <div className={'waste-app-body'}>
            <Container
                component="main"
                maxWidth="xs"
                className={'waste-app-login-container'}
            >
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={(event => setEmail(event.target.value))}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={password}
                            onChange={(event => setPassword(event.target.value))}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleLoginData}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => history.push('/register')}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <ToastContainer/>

        </div>

    );
}
export default withRouter(Login);

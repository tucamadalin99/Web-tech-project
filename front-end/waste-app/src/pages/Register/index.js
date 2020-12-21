import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import MuiAlert from '@material-ui/lab/Alert';
import {useHistory, withRouter} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {

        minWidth: '100%',
    },
}));

const Register = () => {
    const history = useHistory();
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');

    const [open, setOpen] = useState(false);
    toast.configure();

    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        type: type,
    }

    let Toast = (props) => {
        const {severity, message} = props;
        return (
            <Alert severity={severity} onClose={() => setOpen(false)}>{message}</Alert>
        )
    }
    const handleChange = (event) => {
        setType(event.target.value);
    };


    const handleRegisterData = () => {
        axios.post('http://localhost:8080/api/register', data, {withCredentials:true})
            .then(() => {
                console.log('Data send successfully', data);
                history.push('/');
                setOpen(true);
                // setToastr (<Toast severity={'success'} message={"Register successfully"}/>);
            })
            .catch((error) => {
                const values = error.response.data;
                console.log('Values:', values);
                Object.values(values).map((value) => {
                    toast.error(value, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });

                })

            })
    }
    return (
        <div className={'waste-app-body'}>
            <Container component="main" maxWidth="xs" className={'waste-app-register-container'}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={lastName}
                                    onChange={(event => setLastName(event.target.value))}
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={email}
                                    onChange={(event => setEmail(event.target.value))}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={password}
                                    onChange={(event => setPassword(event.target.value))}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={address}
                                    onChange={(event => setAddress(event.target.value))}
                                    name="adress"
                                    label="Adress"
                                    id="adress"
                                    autoComplete="adress"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={type}
                                        onChange={handleChange}
                                        label="Type"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'Mixed'}>Mixed</MenuItem>
                                        <MenuItem value={'Vegetarian'}>Vegetarian</MenuItem>
                                        <MenuItem value={'Vegan'}>Vegan</MenuItem>
                                        <MenuItem value={'Carnivor'}>Carnivor</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Button

                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleRegisterData}
                        >
                            Register
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => history.push('/login')}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

            </Container>


        </div>

    );
}

export default withRouter(Register);
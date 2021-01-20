import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios';
import './style.scss';
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";

import {toast} from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '30%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Profile = () => {
    const classes = useStyles();
    const [profileData, setProfileData] = useState({});
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [editedData,setEditedData]=useState({});
    const [editedPassword,setEditedPassword]=useState('');
    const [categoryId,setCategoryId]=useState('');

    toast.configure();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/getUser`, {withCredentials: true})
            .then((response) => {
                const {data} = response;
                setProfileData(data);
                console.log('Data:',data);
                setEditedData({firstName:data.firstName, lastName:data.lastName, email:data.email, address:data.address});
                console.log('Set edited data:',editedData);
            })
            .catch((error) => {
                console.log('Error:', error);
            })
    }, [])
    // console.log('Data:', profileData);
    //
    // console.log('Edited data:',editedData);

    const handleModalOpen = () => {
        setIsModalOpened(true);
    };

    const handleModalClose = () => {
        console.log('Closed!')
        setIsModalOpened(false);
    };

    const handleInputChange =(e) =>{
        setEditedData({...editedData,[e.target.name]:e.target.value});
    }

    const handlePasswordChange = (e) => {
        setEditedPassword(e.target.value);
        setEditedData({...editedData,password:e.target.value})
        console.log('Password:',editedPassword);
    }


    const handleEditProfile = () => {
        setEditedData({...editedData,password:editedPassword});
        setProfileData({...editedData,type:type});
        console.log('Sent data:',editedData);
        axios.put('http://localhost:8080/api/updateUser',editedData,{withCredentials:true})
            .then(() => {
                toast.success(`User edited successfully`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
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


    const {id, firstName, lastName, email, address, type} = profileData;



    return (
        <>
            {profileData ? (
                <>
                    <div className="groups-add-group-container">
                        <Button
                            variant="contained"
                            color="primary"
                            className={'add-group-button'}
                            startIcon={<EditIcon/>}
                            onClick={handleModalOpen}
                        >
                            Edit profile
                        </Button>
                    </div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={isModalOpened}
                        onClose={handleModalClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={isModalOpened}>
                            <div className={classes.paper}>
                                <div className="modal-header">Update Profile</div>
                                <form className={classes.form} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First name"
                                                name="firstName"
                                                value={editedData.firstName}
                                                onChange={handleInputChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last name"
                                                name="lastName"
                                                value={editedData.lastName}
                                                onChange={handleInputChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                name="email"
                                                value={editedData.email}
                                                onChange={handleInputChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="adress"
                                                label="Adress"
                                                name="adress"
                                                value={editedData.address}
                                                onChange={handleInputChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                type="password"
                                                label="Password"
                                                name="Password"
                                                value={editedPassword}
                                                onChange={handlePasswordChange}
                                                autoFocus
                                            />
                                        </Grid>

                                        <Grid item xs={12} direction={"row"} justify={"center"} alignItems={"center"}>
                                            <Button

                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                onClick={handleEditProfile}
                                            >
                                                Edit data
                                            </Button>
                                        </Grid>


                                    </Grid>

                                </form>
                            </div>
                        </Fade>
                    </Modal>
                <div className="profile-container">
                    <Avatar className={'profile-container-avatar'}>
                        {firstName}
                    </Avatar>
                    <div className="profile-container-item">
                        <p>First name:</p>
                        <p>{firstName}</p>
                    </div>
                    <div className="profile-container-item">
                        <p>Last name:</p>
                        <p>{lastName}</p>
                    </div>
                    <div className="profile-container-item">
                        <p>Email:</p>
                        <p>{email}</p>
                    </div>
                    <div className="profile-container-item">
                        <p>Adress:</p>
                        <p>{address}</p>
                    </div>
                    <div className="profile-container-item">
                        <p>Type</p>
                        <p>{type}</p>
                    </div>
                </div>
            </>
            ) : <CircularProgress />}

        </>
    )
}
export default Profile;
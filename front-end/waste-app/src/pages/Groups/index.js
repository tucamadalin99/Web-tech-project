import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import {toast} from 'react-toastify';
import './style.scss';
import Typography from "@material-ui/core/Typography";
import Friend from "../../components/Friend";
import CircularProgress from "@material-ui/core/CircularProgress";


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

const Groups = () => {
    const classes = useStyles();

    const [friendsData, setFriendsData] = useState({});
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isModal2Opened, setIsModal2Opened] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [users,setUsers] =useState('');
    const[groupId,setGroupId]=useState('');

    toast.configure();


    const data = {
        name,
        type
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/getAllUsers',{withCredentials:true})
            .then((response)=> {
                const {data}=response;
                console.log('Get all users:',data);
                setFriendsData(data);
            })
    },[])

    const handleModalOpen = () => {
        setIsModalOpened(true);
    };

    const handleModalClose = () => {
        setIsModalOpened(false);
    };

    const handleModal2Open = () => {
        setIsModal2Opened(true);
    };

    const handleModal2Close = () => {
        setIsModal2Opened(false);
    };

    const handleChange = (e) => {
        setType(e.target.value);
    }

    const handleChange2 = (e) => {

    }

    const handleGroup = () => {
        console.log('Data sent:', data);
        axios.post('http://localhost:8080/api/createGroup', data, {withCredentials: true})
            .then(() => {
                toast.success(`Group added successfully`, {
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

    const handleCheckedFriend = (data) => {
        console.log('Users:',users);
        setUsers([...users,data]);
        console.log('Set users array:',users);
    }


    const handleAddToGroup= () => {
        // axios.post('http://localhost:8080/api/addUsersToGroup',{users,})
    }

    return (
        <>
            <div className="groups-add-group-container">
                <Button
                    variant="contained"
                    color="primary"
                    className={'add-group-button'}
                    startIcon={<AddCircleOutlineIcon/>}
                    onClick={handleModalOpen}
                >
                    Add group
                </Button>
                {users.length>=2 && (
                    <Button
                        variant="contained"
                        color="primary"
                        className={'add-group-button'}
                        startIcon={<AddCircleOutlineIcon/>}
                        onClick={handleModalOpen}
                    >
                        Add to group
                    </Button>
                )}
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
                            <div className="modal-header">Add Group</div>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Group name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl variant="outlined" className={'add-food-category'}>
                                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="categoryId"
                                                value={type}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={1}>Normal</MenuItem>
                                                <MenuItem value={2}>Vegetarian</MenuItem>
                                                <MenuItem value={3}>Vegan</MenuItem>
                                                <MenuItem value={4}>Carnivor</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} direction={"row"} justify={"center"} alignItems={"center"}>
                                        <Button

                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleGroup}
                                        >
                                            Add product
                                        </Button>
                                    </Grid>


                                </Grid>

                            </form>
                        </div>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={isModal2Opened}
                    onClose={handleModal2Close}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={isModalOpened}>
                        <div className={classes.paper}>
                            <div className="modal-header">Add Group</div>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="groupId"
                                            label="Group id"
                                            name="groupId"
                                            value={groupId}
                                            onChange={(e) => setGroupId(e.target.value)}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} direction={"row"} justify={"center"} alignItems={"center"}>
                                        <Button

                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleAddToGroup}
                                        >
                                            Add to group
                                        </Button>
                                    </Grid>


                                </Grid>

                            </form>
                        </div>
                    </Fade>
                </Modal>


            </div>
            {friendsData ? (
                <div className={'friends-container'}>
                    <Typography variant="h5" component="h5" className={'friend-name'}>
                        Add Friends
                    </Typography>
                    <Grid container spacing={2} className={'grid-container'}>
                        {Object.values(friendsData).map(el =>{
                            const name=el.firstName+" "+el.lastName;
                            // const initial=el.firstName.substring(0,1);
                            return(
                                <Grid key={el.id} item xs={1}>
                                    <Friend name={name}
                                            // initial={initial}
                                            checkbox={true}
                                            sendData={handleCheckedFriend} id={el.id} />
                                </Grid>
                            )
                        })}

                    </Grid>
                </div>
            ) : (
                <CircularProgress />
            )}

        </>
    )
}
export default Groups;
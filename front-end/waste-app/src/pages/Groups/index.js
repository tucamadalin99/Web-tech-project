import React, {useEffect, useState, useRef} from "react";
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
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";


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
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [users, setUsers] = useState('');
    const [groups,setGroups]=useState([]);
    const [checked,setChecked]=useState([0]);
    const id=useRef([]);
    const userId = localStorage.getItem('userId');

    console.log('User id:', userId);
    toast.configure();


    const data = {
        groupName: name,
        groupType: type
    }
    useEffect(() => {
        axios.get('http://localhost:8080/api/getAllUsers', {withCredentials: true})
            .then((response) => {
                const {data} = response;
                console.log('Get all users:', data);
                setFriendsData(data);

            })
    }, [])

    Object.values(friendsData).map(el => {
        if(el.id === parseInt(userId) && el.groups) {
            console.log('Group line 85:',el.groups)
            if(groups!==el.groups)
            setGroups(el.groups);
            return el.groups;
        }
    });

    let groups2=groups[parseInt(userId)+1];
    console.log('Groups:', groups2);
    const handleModalOpen = () => {
        setIsModalOpened(true);
    };

    const handleModalClose = () => {
        setIsModalOpened(false);
    };


    const handleChange = (e) => {
        setType(e.target.value);
    }



    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        console.log('Checked:',checked);
    };


    const handleAddGroup = () => {
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
        if(!id.current.includes(data)) {
            id.current=[...id.current,data];
        }
        else {
            for(let i=0;i<id.current.length;i++) {
                if(id.current[i]===data) {
                    console.log('i:',i);
                    id.current.splice(i,1);


                }
            }
        }
        setUsers(id.current);
        console.log('Users:',users);
        console.log('Set users array:', id.current);
    }


    const handleAddToGroup = () => {
        const groupId=checked[1];
        console.log('Users:',id.current,'Group id:',groupId);
        axios.post('http://localhost:8080/api/addUsersToGroup',{users,groupId}, {withCredentials:true})
             .then(() => {
                 toast.success(`Users added to group successfully`, {
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
                {users.length>0 && (
                    <Button
                        variant="contained"
                        color="primary"
                        className={'add-group-button'}
                        startIcon={<AddCircleOutlineIcon/>}
                        onClick={handleAddToGroup}
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
                                            onClick={handleAddGroup}
                                        >
                                            Add group
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
                        {Object.values(friendsData).map(el => {
                            const name = el.firstName + " " + el.lastName;
                            // const initial=el.firstName.substring(0,1);
                            return (
                                <Grid key={el.id} item xs={1}>
                                    <Friend name={name}
                                        // initial={initial}
                                            checkbox={true}
                                            sendData={handleCheckedFriend} id={el.id}/>
                                </Grid>
                            )
                        })}

                    </Grid>
                    <Typography variant="h5" component="h5" className={'friend-name'}>
                        Your groups
                    </Typography>
                    <List dense className={classes.root}>
                    {groups?.map(group => {
                        const labelId=`group-${group.id}`;
                        const name=group.groupName;
                        // return <p key={group.id}>{group.groupName} {groupTypeArray[group.groupType]}</p>
                        if(name) {
                            return (
                                <ListItem key={group.id} button>
                                    <ListItemText id={labelId} primary={group.groupName} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(group.id)}
                                             checked={checked.indexOf(group.id) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>

                            )
                        }

                    })}
                    </List>
                </div>
            ) : (
                <CircularProgress/>
            )}

        </>
    )
}
export default Groups;
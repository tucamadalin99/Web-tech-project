import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import './style.scss';
import Checkbox from "@material-ui/core/Checkbox";
import axios from 'axios';
import {toast} from 'react-toastify';




const useStyles = makeStyles({
    root: {
        // minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
const Friend = (props) => {
    toast.configure();
    const {id,name,initial, checkbox,sendData, avatarId}=props;
    const classes = useStyles();
    const [checked,setChecked]=useState(false);

    // useEffect(() => {
    //     console.log('ID :',id)
    //     sendData(id);
    // })

    const handleCheckbox = () => {
        sendData(id);
    }

    const handleAddFriend = () => {
        axios.post(`http://localhost:8080/api/sendInvite/${id}`,{friendId:id},{withCredentials:true})
            .then(() => {
                toast.success(`User ${name} added to friend list successfully`, {
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
        <Card className={'friend-container'} variant="outlined">
            <CardContent className={'card-content'}>
               <Avatar>
                   {avatarId}
               </Avatar>
                <Typography variant="p" component="p" className={'friend-name'}>
                    {name}
                </Typography>

            </CardContent>
            <CardActions className={'card-actions'}>
                {checkbox? (

                            <Checkbox
                                edge="start"
                                // checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                onChange={handleCheckbox}
                                disableRipple
                            />

                ) : (
                    <IconButton color={"primary"} component={"span"} onClick={handleAddFriend} >
                        <AddCircleIcon/>
                    </IconButton>
                )}

            </CardActions>
        </Card>
    )

}

export default Friend;
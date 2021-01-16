import React, {useEffect, useRef, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import './style.scss';
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";



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
    const {id,name,initial, onClick, checkbox,sendData}=props;
    const classes = useStyles();
    const [checked,setChecked]=useState(false);

    useEffect(() => {
        console.log('ID :',id)
        sendData(id);
    },[checked])

    const handleCheckbox = () => {
        console.log('Checked before:',checked);
        setChecked(true)
        console.log('Checked after:',checked);
    }

    return (
        <Card className={'friend-container'} variant="outlined">
            <CardContent className={'card-content'}>
               <Avatar>
                   {initial}
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
                                onChange={() =>{
                                    setChecked(true)}}
                                disableRipple
                            />

                ) : (
                    <IconButton color={"primary"} component={"span"} onClick={onClick} >
                        <AddCircleIcon/>
                    </IconButton>
                )}

            </CardActions>
        </Card>
    )

}

export default Friend;
/**
 *
 * Navigation
 *
 */

import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import KitchenIcon from '@material-ui/icons/Kitchen';
import GroupIcon from '@material-ui/icons/Group';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useHistory, withRouter} from "react-router-dom";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import './style.scss'


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    logoutButton: {
        marginRight: '10px',
    },
});

const Navigation = ({children}) => {
    toast.configure();
    const history = useHistory();


    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });
    const [auth, setAUth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const logout = () => {
    };
    const handleClose = () => {
    };

    const toggleDrawer = (anchor, open) => event => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const drawerOptions = [
        {
            text: 'My food',
            link: '/food',
        },
        {
            text: 'My groups',
            link: '/groups',
        },
        {
            text: 'Friends',
            link: '/friends',
        },
    ];

    const drawerGeneralOptions = [
        {
            text: 'Team',
            link: '/team',
        },
        {
            text: 'Activities',
            link: '/activities',
        },
        {
            text: 'Dashboard',
            link: '/dashboard',
        },
        {
            text: 'Friends',
            link: '/friends',
        },
    ];

    const list = anchor => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Grid container direction="column">
                <Grid item xs={12}>
                    <List>
                        <ListItem button component={Link} to={'/profile'}>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </ListItem>

                    <Divider/>
                    </List>

                </Grid>

                <Grid item xs={12}>
                    <List>
                        <ListItem button component={Link} to={'/'}>
                            <ListItemIcon>
                                <FastfoodIcon/>
                            </ListItemIcon>
                            <ListItemText>All food</ListItemText>
                        </ListItem>
                        {drawerOptions.map((value, index) => (
                            <ListItem
                                button
                                key={value.text}
                                component={Link}
                                to={value.link}
                            >
                                <ListItemIcon>
                                    {/* eslint-disable-next-line no-nested-ternary */}
                                    {index % 4 === 0 ? (
                                        <KitchenIcon/>
                                    ) : index % 4 === 1 ? (
                                        <GroupIcon/>
                                    ) :  (<GroupIcon/>) }
                                </ListItemIcon>
                                <ListItemText primary={value.text}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                </Grid>

            </Grid>
        </div>
    );

    const handleLogout = () => {
        axios.delete(`http://localhost:8080/api/logout`, {withCredentials: true})
            .then(() => {
                console.log('Logout!');
                toast.success(`Logged out successfully`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                document.cookie="cookieLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                history.push('/login');
            })
            .catch((error) => {
                console.log(error);

            })
    };

    return (
        <>
            <AppBar position="static" className={classes.root}>
                <Grid container justify="space-between">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            aria-label="menu"
                            color="inherit"
                            onClick={toggleDrawer('left', true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6"><Link to={"/"} className={'app-title'} >Food waste app</Link></Typography>

                        <Drawer
                            anchor="left"
                            open={state.left}
                            onClose={toggleDrawer('left', false)}
                            className="drawer-container"
                        >
                            {list('left')}
                        </Drawer>
                    </Toolbar>
                    {auth && (
                        <>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleLogout}
                                color="inherit"
                                className={classes.logoutButton}
                            >
                                <ExitToAppIcon/>
                            </IconButton>
                        </>
                    )}
                </Grid>
            </AppBar>


        </>
    );
};


export default Navigation;

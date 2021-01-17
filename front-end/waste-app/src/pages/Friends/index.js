import React, {useEffect, useRef, useState} from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Friend from "../../components/Friend";
import {CircularProgress, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import './style.scss';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from '@material-ui/icons/Inbox';
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from '@material-ui/icons/Person';
import FoodItem from "../../components/FoodItem";


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Friends = () => {
    const [data,setData]=useState({});
    const[currentUserFriends,setCurrentUserFriends]=useState([]);
    const[friendProducts,setFriendProducts]=useState([]);
    const userProducts=useRef();
    const[friendId,setFriendId]=useState(0);
    // const friendId=useRef(0);
    const classes = useStyles();
    const userId=localStorage.getItem('userId');
    // console.log('User id:',userId);

    useEffect(()=> {
        axios.get('http://localhost:8080/api/getAllUsers',{withCredentials:true})
            .then((response)=> {
                const {data}=response;
                console.log('All users:',data);
                setData(data);
                Object.values(data).map(el => {
                    if (el.id === parseInt(userId)) {
                        // console.log('EL ID:',el.id)
                        setCurrentUserFriends(el.friends);
                        // console.log('Current user friends:', currentUserFriends)
                    }
                })

            })
    },[])

    useEffect( () => {
        console.log('Friend id:',friendId);
        userProducts.current=(Object.values(data).filter(user => user.id===friendId).map(el => el.products));
        // setUserProducts(Object.values(data).filter(user => user.id===friendId));
        console.log('User products:',userProducts.current);
    },[friendId,userProducts.current])




    return (
        <>
            {data ? (
                <>
                <div className={'friends-container'}>
                <Typography variant="h5" component="h5" className={'friend-name'}>
                        Add Friends
                </Typography>
                <Grid container spacing={2} className={'grid-container'}>
                    {Object.values(data).map(el =>{
                        const name=el.firstName+" "+el.lastName;
                        const initial=el.firstName.substring(0,1);
                        return(
                            <Grid key={el.id} item xs={1}>
                                <Friend name={name} initial={initial} id={el.id} />
                            </Grid>
                        )
                    })}
                </Grid>
                </div>
                <Grid container justify={"flex-start"}  className={'friend-list'} >
                    <Grid item xs={2} container alignItems={"center"} direction={"column"} >
                        <Typography className={'friend-list-header'}  variant="h5" component="h5" >
                            Friend list
                        </Typography>

                        {Object.values(currentUserFriends).map(el => {
                            // console.log("EL:",el)

                            return (

                                <Grid key={el.id} item xs={8}>
                                    <List component="nav" aria-label="main mailbox folders">
                                        <ListItem button onClick={() => setFriendId(el.id)}>
                                            <ListItemIcon>
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={el.id} />
                                        </ListItem>
                                    </List>
                                </Grid>
                            )
                        })}

                    </Grid>
                    <Grid item xs={10} container justify={"center"}>
                        <Typography align={"center"} className={'friend-list-header'}  variant="h5" component="h5" >
                            Friend items
                        </Typography>
                        {Object.values(data).map(user => {
                            if(user.id===friendId) {
                                // console.log('Friend products:',friendProducts);
                                Object.values(user.products).map(product => {
                                    // console.log('Found product:',product);
                                    return (
                                        <Grid key={product.id} item xs={4} className={'food-item'}>
                                            <p>Item</p>
                                            <FoodItem unclaim={2}
                                                      id={product.id}
                                                      name={product.name}
                                                      expireDate={product.expireDate}
                                                      brand={product.brand}
                                                      price={product.price}
                                                      count={product.count}
                                                      status={product.status}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        })}


                        { (friendId!==0 && userProducts.current[0]) ?
                            Object.values(userProducts.current[0]).map(product => {
                                console.log('Pula');
                            return (
                                <Grid key={product.id} item xs={4} className={'food-item'}>
                                    <p>Item</p>
                                    <FoodItem unclaim={2}
                                              id={product.id}
                                              name={product.name}
                                              expireDate={product.expireDate}
                                              brand={product.brand}
                                              price={product.price}
                                              count={product.count}
                                              status={product.status}
                                    />
                                </Grid>
                            )
                        }) : null}
                    </Grid>

                </Grid>
                    </>
            ) : <CircularProgress/>}


            </>
    )
}

export default Friends;
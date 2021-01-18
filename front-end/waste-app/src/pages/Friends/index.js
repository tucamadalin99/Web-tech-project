import React, {useEffect, useRef, useState} from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Friend from "../../components/Friend";
import {CircularProgress, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import './style.scss';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
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
    const[userNames,setUserNames]=useState([]);
    const userProducts=useRef();
    const[friendId,setFriendId]=useState(0);
    const [name,setName]=useState('');
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
                    const userName=el.firstName+" "+el.lastName;
                    // console.log('User name:',userName);
                    console.log('Usernames:',userNames)
                    setUserNames([...userNames,userName]);
                    if (el.id === parseInt(userId)) {
                        // console.log('EL ID:',el.id)
                        setCurrentUserFriends(el.friends);
                        // console.log('Current user friends:', currentUserFriends)
                    }
                })

            })
    },[])

    useEffect( () => {
        // console.log('Friend id:',friendId);
        userProducts.current=(Object.values(data).filter(user => user.id===friendId).map(el => el.products));
        // setUserProducts(Object.values(data).filter(user => user.id===friendId));
        // console.log('User products:',userProducts.current);
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
                                <Friend name={name} avatarId={initial} initial={initial} id={el.id} />
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
                        <Grid xs={10} container wrap={"nowrap"} direction={"column"} alignItems={"center"}>
                            {Object.values(currentUserFriends).map(el => {
                                console.log('UserNames:',userNames);
                                const name=data.find(user => user.id===el.id).firstName+" "+data.find(user => user.id===el.id).lastName;
                                // console.log("EL:",el)
                                return (

                                    <Grid key={el.id} item  direction={"column"}>
                                        <List component="nav" aria-label="main mailbox folders">
                                            <ListItem button onClick={() => {setName(name); setFriendId(el.id) }}>
                                                <ListItemIcon>
                                                    <PersonIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={name} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                )
                            })}
                        </Grid>


                    </Grid>
                    <Grid item xs={10}  container  justify={"center"} >
                        <Typography align={"center"} className={'friend-list-header'}  variant="h5" component="h5" >
                            {name? (name+'\'s' + " items") : ''}
                        </Typography>
                        <Grid xs={12} container>
                            {Object.values(data).map(user =>{
                                if(user.id===friendId) {
                                    return Object.values(user.products).map(product => (
                                        <Grid key={product.id} item xs={4} className={'food-item'} justify={"center"}>
                                            <FoodItem
                                                      id={product.id}
                                                      name={product.name}
                                                      expireDate={product.expireDate}
                                                      brand={product.brand}
                                                      price={product.price}
                                                      count={product.count}
                                                      status={product.status}
                                            />
                                        </Grid>
                                    ))
                                }
                            })}
                        </Grid>



                        {/*{ (friendId!==0 && userProducts.current[0]) ?*/}
                        {/*    Object.values(userProducts.current[0]).map(product => {*/}
                        {/*        console.log('Product:',product);*/}
                        {/*    return (*/}
                        {/*        <Grid key={product.id} item xs={4} className={'food-item'}>*/}
                        {/*            <p>Item</p>*/}
                        {/*            <FoodItem unclaim={2}*/}
                        {/*                      id={product.id}*/}
                        {/*                      name={product.name}*/}
                        {/*                      expireDate={product.expireDate}*/}
                        {/*                      brand={product.brand}*/}
                        {/*                      price={product.price}*/}
                        {/*                      count={product.count}*/}
                        {/*                      status={product.status}*/}
                        {/*            />*/}
                        {/*        </Grid>*/}
                        {/*    )*/}
                        {/*}) : null}*/}
                    </Grid>

                </Grid>
                    </>
            ) : <CircularProgress/>}


            </>
    )
}

export default Friends;
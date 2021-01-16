import React, {useEffect, useState} from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Friend from "../../components/Friend";
import {CircularProgress, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import './style.scss';

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
    const classes = useStyles();

    useEffect(()=> {
        axios.get('http://localhost:8080/api/getAllUsers',{withCredentials:true})
            .then((response)=> {
                const {data}=response;
                console.log(data);
                setData(data);
            })
    },[])

    return (
        <>
            {data ? (
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
                                <Friend name={name} initial={initial} />
                            </Grid>
                        )
                    })}

                </Grid>
                    </div>
            ) : <CircularProgress/>}


            </>
    )
}

export default Friends;
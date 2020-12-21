import React, {useEffect, useState} from "react";
import FoodItem from "../../components/FoodItem";
import axios from "axios";
import {CircularProgress, Grid} from '@material-ui/core';
import './style.scss';

const Dashboard = () => {
    const [productData, setProductData] = useState({});
    useEffect(() => {
    })
    axios.get(`http://localhost:8080/api/getAllProducts`, {withCredentials: true})
        .then((response) => {
            const {data} = response;
            console.log('Data:', data);
            // setProductData(data);
        },[])
    return (
        <>
            <div>Dashboard page</div>
            {productData ? (
                <Grid container spacing={2} className={'food-item-container'}>
                    <Grid item xs={4}>
                        <FoodItem/>
                    </Grid>
                    <Grid item xs={4}>
                        <FoodItem/>
                    </Grid>
                    <Grid item xs={4}>
                        <FoodItem/>
                    </Grid>
                    <Grid item xs={4}>
                        <FoodItem/>
                    </Grid>
                    <Grid item xs={4}>
                        <FoodItem/>
                    </Grid>

                </Grid>

            ) : <CircularProgress/>}

        </>

    )
}
export default Dashboard;
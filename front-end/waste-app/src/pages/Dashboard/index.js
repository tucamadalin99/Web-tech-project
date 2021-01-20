import React, {useEffect, useState} from "react";
import FoodItem from "../../components/FoodItem";
import axios from "axios";
import {CircularProgress, Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './style.scss';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from "@material-ui/core/Typography";

const Dashboard = () => {
    const [productData, setProductData] = useState([]);
    const [category,setCategory]=useState(0);
    const[filter,setFilter]=useState("");
    const [allUsersData,setAllUsersData]=useState([]);
    const userId = localStorage.getItem('userId');
    console.log('User ID:',userId);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/getAllProducts`, {withCredentials: true})
            .then((response) => {
                const {data} = response;
                const {results} = data;
                console.log('Data:', data);
                setProductData(data);
            })
        axios.get('http://localhost:8080/api/getAllUsers',{withCredentials:true})
            .then((response)=> {
                const {data}=response;
                console.log('All users:',data);
                setAllUsersData(data);

            })
    }, [])

    //Console logs
    console.log('Product data:', productData);


    const handleChange= (event) => {
        setCategory(event.target.value);
    }

    const handleSearchChange=(event) => {
        setFilter(event.target.value);
    }

    return (
        <>

            {productData ? (
                <>
                    <div className="dashboard-category-picker">
                        <TextField className={'dashboard-search'}
                            id="input-with-icon-textfield"
                            label="Search for an item"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleSearchChange}

                        />

                        <FormControl >
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>All items</MenuItem>
                                <MenuItem value={1}>Fruit</MenuItem>
                                <MenuItem value={2}>Vegetable</MenuItem>
                                <MenuItem value={3}>Pastry</MenuItem>
                                <MenuItem value={4}>Canned Food</MenuItem>
                                <MenuItem value={5}>Cooked Food</MenuItem>
                                <MenuItem value={6}>Raw Food</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Typography align={"center"} variant="h5" component="h5" className={'friend-name'}>
                        Available food
                    </Typography>
                <Grid container spacing={2} className={'food-item-container'}>

                    {Object.values(productData).map(product => {
                        let address=''
                        allUsersData.forEach(user => {
                            if(user.id===product.userId) {
                                address=user.address;
                            }
                        })
                        if((product.categoryId===category || category===0) && product.status==='available' && product.userId!==parseInt(userId) && product.name.toLowerCase().includes(filter))
                        return (
                            <Grid key={product.id} item xs={4} className={'food-item'}>
                                <FoodItem unclaim={0}
                                          id={product.id}
                                          name={product.name}
                                          expireDate={product.expireDate}
                                          expireSoon={product.expireSoon}
                                          address={address}
                                          brand={product.brand}
                                          price={product.price}
                                          count={product.count}
                                          objectUserId={product.userId} />
                            </Grid>
                        )


                    })}


                </Grid>
                </>
            ) : <CircularProgress/>}

        </>

    )
}
export default Dashboard;
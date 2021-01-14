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

const Dashboard = () => {
    const [productData, setProductData] = useState([]);
    const [category,setCategory]=useState(1);
    const[filter,setFilter]=useState("");
    useEffect(() => {
        axios.get(`http://localhost:8080/api/getAllProducts`, {withCredentials: true})
            .then((response) => {
                const {data} = response;
                const {results} = data;
                console.log('Data:', data);
                setProductData(data);
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
                                <MenuItem value={1}>Normal</MenuItem>
                                <MenuItem value={2}>Vegetarian</MenuItem>
                                <MenuItem value={3}>Vegan</MenuItem>
                                <MenuItem value={4}>Carnivor</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                <Grid container spacing={2} className={'food-item-container'}>

                    {Object.values(productData).map(product => {
                        if(product.categoryId===category && product.status==='available' && product.name.toLowerCase().includes(filter))
                        return (
                            <Grid key={product.id} item xs={4} className={'food-item'}>
                                <FoodItem id={product.id} name={product.name} expireDate={product.expireDate} brand={product.brand}
                                          price={product.price} count={product.count} objectUserId={product.userId} />
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
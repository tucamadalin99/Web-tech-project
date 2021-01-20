import React, {useEffect, useState} from "react";
import axios from "axios";
import {CircularProgress, Grid} from "@material-ui/core";
import FoodItem from "../../components/FoodItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {makeStyles} from '@material-ui/core/styles';
import {toast} from 'react-toastify';
import './style.scss';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

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

const Food = () => {
    toast.configure();
    const classes = useStyles();
    const [productData, setProductData] = useState({});
    const [category, setCategory] = useState(0);
    const userId = localStorage.getItem('userId');
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [userData,setUserData]=useState({});
    const [allUsersData,setAllUsersData]=useState([]);
    const [foodData, setFoodData] = useState({
        name: '',
        expireDate: '',
        brand: '',
        price: '',
        count: '',
        categoryId: ''
    })


    console.log('User id:', userId);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/getAllProducts`, {withCredentials: true})
            .then((response) => {
                const {data} = response;
                const {results} = data;
                setProductData(data);
                console.log('Product data:',productData);
            })
        axios.get(`http://localhost:8080/api/getUser`, {withCredentials: true})
            .then((response) => {
                const {data} = response;
                setUserData(data);
                console.log('User data:',userData);
            })
            .catch((error) => {
                console.log('Error:', error);
            })
        axios.get('http://localhost:8080/api/getAllUsers',{withCredentials:true})
            .then((response)=> {
                const {data}=response;
                console.log('All users:',data);
                setAllUsersData(data);

            })
    }, [])


    const handleChange = (event) => {
        setCategory(event.target.value);
    }

    const handleModalOpen = () => {
        setIsModalOpened(true);
    };

    const handleModalClose = () => {
        console.log('Closed!')
        setIsModalOpened(false);
    };


    const handleInputChange = (e) => {
        setFoodData({...foodData, [e.target.name]: e.target.value});
    };

    const handleFoodData = () => {
        axios.post(`http://localhost:8080/api/addProduct`, foodData, {withCredentials: true})
            .then((response) => {
                const {data}=response;
                const {obj}=data;
                let newProductData=productData;
                newProductData.push(obj);
               setProductData(newProductData);
                toast.success(`Product added successfully`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });

                setFoodData({
                    name: '',
                    expireDate: '',
                    brand: '',
                    price: '',
                    count: '',
                    categoryId: ''
                })
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
    };

    return (
        <>
            {productData ? (
                <>
                    <div className="dashboard-category-picker">
                        <Button
                            variant="contained"
                            color="primary"
                            className={'my-food-add-button'}
                            startIcon={<AddCircleOutlineIcon/>}
                            onClick={handleModalOpen}
                        >
                            Add food
                        </Button>
                        <FormControl>
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
                                <div className="modal-header">Add food</div>
                                <form className={classes.form} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="name"
                                                label="Name"
                                                name="name"
                                                value={foodData.name}
                                                onChange={handleInputChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="expireDate"
                                                label="Expire Date"
                                                name="expireDate"
                                                value={foodData.expireDate}
                                                onChange={handleInputChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="brand"
                                                label="Brand"
                                                name="brand"
                                                value={foodData.brand}
                                                onChange={handleInputChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="price"
                                                label="Price"
                                                name="price"
                                                value={foodData.price}
                                                onChange={handleInputChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="count"
                                                label="Count"
                                                name="count"
                                                value={foodData.count}
                                                onChange={handleInputChange}
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
                                                    value={foodData.categoryId}
                                                    onChange={handleInputChange}
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
                                        </Grid>
                                        <Grid item xs={12} direction={"row"} justify={"center"} alignItems={"center"}>
                                            <Button

                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                onClick={handleFoodData}
                                            >
                                                Add product
                                            </Button>
                                        </Grid>


                                    </Grid>

                                </form>
                            </div>
                        </Fade>
                    </Modal>
                    <Typography align={"center"} variant="h5" component="h5" className={'friend-name'}>
                        My food
                    </Typography>

                    <Grid container spacing={2} className={'food-item-container'}>
                        {Object.values(productData).map(product => {

                            if (product.userId === parseInt(userId) && (product.categoryId === category || category===0))
                                return (
                                    <Grid key={product.id} item xs={4} className={'food-item'}>
                                        <FoodItem unclaim={2}
                                                  id={product.id}
                                                  name={product.name}
                                                  expireDate={product.expireDate}
                                                  expireSoon={product.expireSoon}
                                                  brand={product.brand}
                                                  price={product.price}
                                                  count={product.count}
                                                  status={product.status}
                                        />
                                    </Grid>
                                )


                        })}


                    </Grid>
                    <Typography align={"center"} variant="h5" component="h5" className={'friend-name'}>
                        Claimed food
                    </Typography>
                    <Grid container spacing={2} className={'food-item-container'}>

                        {Object.values(productData).map(product => {
                            const name=userData.firstName+" "+userData.lastName;
                            let address=''
                            allUsersData.forEach(user => {
                                if(user.id===product.userId) {
                                    address=user.address;
                                }
                            })
                            console.log('Adress:',address)
                            if (product.status===name)
                                return (
                                    <Grid key={product.id} item xs={4} className={'food-item'}>
                                        <FoodItem unclaim={1}
                                                  id={product.id}
                                                  name={product.name}
                                                  expireDate={product.expireDate}
                                                  address={address}
                                                  brand={product.brand}
                                                  price={product.price}
                                                  count={product.count}
                                                  objectUserId={product.userId}
                                        />
                                    </Grid>
                                )


                        })}


                    </Grid>

                </>
            ) : <CircularProgress/>}
        </>
    )
}
export default Food;
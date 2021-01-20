import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from 'react-share';
import axios from 'axios';
import ErrorIcon from '@material-ui/icons/Error';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const FoodItem = (props) => {
    const classes = useStyles();
    const {
        name,
        expireDate,
        brand,
        price,
        count,
        address,
        id,
        objectUserId,
        unclaim,
        status,
        expireSoon
    } = props;
    const [isOpened, setIsOpened] = useState(false);
    const userId = localStorage.getItem('userId');

    const shareUrl = `http://food-waste.com/${id}`;
    // console.log('User id:',userId,'id:',id);
    const postTitle = `Hi everyone! I have some spare ${name} that I want to share with you!`
    toast.configure();
    const handleClaim = () => {
        axios.put(`http://localhost:8080/api/claimProduct/${objectUserId}/${id}`, {
            userId: userId,
            id: id
        }, {withCredentials: true})
            .then(() => {
                toast.success(`Product ${name} claimed succesfully`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                console.log('Product claimed successfully')
            })
            .catch((error) => {
                console.log('User id:', userId, 'id:', id);
                console.log('Error:', error.response.data.message);
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

    const handleUnclaim = () => {
        console.log('Unhandle Claim datA:', userId, id);
        axios.put(`http://localhost:8080/api/unclaimProduct/${objectUserId}/${id}`, {
            userId: objectUserId,
            id: id
        }, {withCredentials: true})
            .then(() => {
                toast.success(`Product ${name} unclaimed succesfully`, {
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
                console.log('User id:', userId, 'id:', id);
                console.log('Error:', error.response.data.message);
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

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/deleteProduct/${id}`, {withCredentials: true})
            .then(() => {
                toast.success(`Product ${name} deleted succesfully`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                console.log('Product claimed successfully')
            })
            .catch((error) => {
                console.log('User id:', userId, 'id:', id);
                console.log('Error:', error.response.data.message);
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
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {name.charAt(0)}
                        {/*{name}*/}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={name}
                subheader={expireDate}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Brand: {brand}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price: {price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Count: {count}
                </Typography>
                {address && (
                    <Typography variant="body2" color="textSecondary" component="p">
                        Address: {address}
                    </Typography>
                )}

                {(status !== 'available' && status) ? (
                    <Typography variant="body2" color="textSecondary" component="p">
                        Claimed by {status}
                    </Typography>
                ) : null}
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title={"Claim this product"}>
                    <IconButton aria-label="add to favorites">
                        <DoneIcon onClick={handleClaim}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Share this product"}>
                    <IconButton aria-label="share">
                        <ShareIcon onClick={() => setIsOpened(!isOpened)}/>
                    </IconButton>
                </Tooltip>


                {isOpened && (
                    <>
                        <IconButton>
                            <FacebookShareButton
                                url={shareUrl}
                                quote={postTitle}
                                className="Demo__some-network__share-button"
                            >
                                <FacebookIcon size={32} round/>
                            </FacebookShareButton>
                        </IconButton>
                        <IconButton>
                            <TwitterShareButton
                                url={shareUrl}
                                title={postTitle}
                                className="Demo__some-network__share-button"
                            >
                                <TwitterIcon size={32} round/>
                            </TwitterShareButton>
                        </IconButton>

                    </>
                )}

                {
                    unclaim === 1 ? (
                            <Tooltip title={"Unclaim this product"}>
                                <IconButton aria-label={"unclaim product"}>
                                    <RemoveCircleIcon onClick={handleUnclaim}/>
                                </IconButton>
                            </Tooltip>)
                        : unclaim === 2 ?
                        (
                            <Tooltip title={"Delete this product"}>
                                <IconButton aria-label={"delete product"}>
                                    <DeleteIcon onClick={handleDelete}/>
                                </IconButton>
                            </Tooltip>) :
                        <></>
                }
                {expireSoon && (
                    <Tooltip title={"This item expires soon!"}>
                        <IconButton color={"#FF0000"} aria-label={"unclaim product"}>
                            <ErrorIcon style={{color: red[500]}}/>
                        </IconButton>
                    </Tooltip>


                )}
            </CardActions>

        </Card>
    )

}

export default FoodItem;
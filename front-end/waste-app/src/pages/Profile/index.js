import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios';
import './style.scss';
import CircularProgress from "@material-ui/core/CircularProgress";

const Profile = () => {
    const [profileData, setProfileData] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8080/api/getUser`, {withCredentials: true})
            .then((response) => {
                const {data} = response;
                setProfileData(data);
            })
            .catch((error) => {
                console.log('Error:', error);
            })
    }, [])
    console.log('Data:', profileData);
    const {id, firstName, lastName, email, adress, type} = profileData;
    return (
        <>
            {profileData ? (
                <div className="profile-container">
                    <Avatar className={'profile-container-avatar'}>
                        {firstName}
                    </Avatar>
                    <div className="profile-container-item">
                        <p>First name:</p>
                        <p>{firstName}</p>
                    </div>
                    <div className="profile-container-item">
                        <p>Last name:</p>
                        <p>{lastName}</p>
                    </div>
                    <div className="profile-container-item">
                        <p>Email:</p>
                        <p>{email}</p>
                    </div>
                    <div className="profile-container-item">
                        <p>Adress:</p>
                        <p>{adress}</p>
                    </div>
                    <div className="profile-container-item">
                        <p>Type</p>
                        <p>{type}</p>
                    </div>
                </div>

            ) : <CircularProgress />}


        </>
    )
}
export default Profile;
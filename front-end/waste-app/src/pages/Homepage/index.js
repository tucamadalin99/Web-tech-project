import React, {useEffect, useState} from 'react';
import Navigation from "../../components/Navigation";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Dashboard from "../Dashboard";
import Food from "../Food";
import Groups from "../Groups";
import Achievements from "../Achievements";
import Profile from "../Profile";
import Login from "../Login";
import Register from "../Register";

const Homepage = () => {
    let cookie = document.cookie.split(";");
    let localStorageIsAuth=localStorage.getItem('isAuth');
    const [isAuth,setIsAuth]=useState(localStorageIsAuth);
    console.log('Is auth:',isAuth);



    console.log('Out is auth:',isAuth);


    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                </Switch>
                <Navigation/>

                <Switch>
                    <Route exact path="/" component={Dashboard}>
                        {isAuth ? <Redirect to={"/"} /> : <Redirect to={"/login"}/>}
                    </Route>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/food" component={Food}/>
                    <Route path="/groups" component={Groups}/>
                    <Route path="/achievements" component={Achievements}/>

                </Switch>
            </>

        </BrowserRouter>
    )
}

export default Homepage;
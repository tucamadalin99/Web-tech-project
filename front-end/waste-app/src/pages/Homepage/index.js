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
    // let cookie = document.cookie.split(";");
    // const [cookieHook,setCookieHook]=useState(cookie);
    // console.log('Cookie out:',cookieHook);
    // useEffect( () => {
    //     setCookieHook(cookie);
    //     console.log('Use effect Cookie:',cookieHook);
    // },cookie)
    // const isAuth=localStorage.getItem("isAuth");
    // console.log('Is auth:',isAuth);


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
                        {/*{isAuth ? <Redirect to={"/"} /> : <Redirect to={"/login"}/>}*/}
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
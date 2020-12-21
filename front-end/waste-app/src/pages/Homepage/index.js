import React, {useEffect, useState} from 'react';
import Navigation from "../../components/Navigation";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from "../Dashboard";
import Food from "../Food";
import Groups from "../Groups";
import Achievements from "../Achievements";
import Profile from "../Profile";
import axios from "axios";
import Login from "../Login";
import Register from "../Register";

const Homepage = () => {

    console.log('test');
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </Switch>
            <Navigation/>

            <Switch>

                <Route exact path="/" component={Dashboard}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/food" component={Food}/>
                <Route path="/groups" component={Groups}/>
                <Route path="/achievements" component={Achievements}/>

            </Switch>
        </BrowserRouter>
    )
}

export default Homepage;
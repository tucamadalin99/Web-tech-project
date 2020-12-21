import React from 'react';
import Navigation from "../../components/Navigation";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from "../Dashboard";
import Food from "../Food";
import Groups from "../Groups";
import Achievements from "../Achievements";
import Profile from "../Profile";

const Homepage = () => {
    return (
        <BrowserRouter>
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
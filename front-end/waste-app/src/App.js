import './style.scss';
import React from 'react';
import Navigation from "./components/Navigation";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Homepage from "./pages/Homepage";

function App() {
    return (
        // <Register />
        <Homepage />
    );
}

export default App;

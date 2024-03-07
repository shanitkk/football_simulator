import logo from '../additives/logo.png';
import '../App.css';
import React from "react";
import LoginPage from "./LoginPage";


class App extends React.Component {


    render() {
        return (
            <div className="App">
                <div className="logo-container">
                    <img src={logo} alt="logo.png" className="logo"/>
                </div>
                <div>
                    ברוכים הבאים!
                    <LoginPage/>
                </div>
            </div>
        );
    }

}

export default App;

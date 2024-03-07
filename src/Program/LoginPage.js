import React from "react";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import axios from "axios";


class LoginPage extends React.Component {

    state = {
        username: "",
        password: "", //
        repeatPassword: "",
        email: "", //
        errorCode: undefined, //
        text: "",
        // success: false,
        // loggedIn: false,
        // users: []
    };

    changeText = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    login2 = () => {
        sendApiPostRequest("http://localhost:9124/sign-up", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            repeatPassword: this.state.password
        }, (response) => {
            if (response.data.success) {
                console.log("התחברת בהצלחה");
                this.setState({text: "התחברת בהצלחה"});
            } else {
                console.log("לא התחברת בהצלחה");
                this.setState({text: "לא התחברת בהצלחה"});
            }
        })
    }


    usernameIsAvailable = () => {
        let isAvailable = true;
        axios.get("http://localhost:9124/user-available?username=" + this.state.username).then(response => {
            isAvailable = response.data;
            console.log("**********" + isAvailable);
        })
        return isAvailable;
    };

    isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    login = () => {
        if (this.isValidEmail(this.state.email)) {
            console.log("is good Email");
        } else {
            console.log("try again");
        }
        this.login2(); // להפעיל בכל מקרה
    }


    render() {
        return (
            <div>
                Im Login Page
                <div className="login">
                    <div>
                        User name: <input type="text" value={this.state.username} onChange={(e) => {
                        this.changeText("username", e)
                    }} onBlur={() => {
                        this.usernameIsAvailable();
                    }} placeholder="הזן שם משתמש"
                    /></div>
                    <div>
                        Password:<input type={"password"} value={this.state.password}
                                        onChange={(e) => this.changeText("password", e)}
                                        placeholder="הזן סיסמא"/>
                    </div>
                    <div>
                        repeat Password:<input type={"password"} value={this.state.repeatPassword}
                                               onChange={(e) => this.changeText("repeatPassword", e)}
                                               placeholder="אימות סיסמא"/>

                    </div>
                    <div>
                        Email:<input value={this.state.email} onChange={(e) => this.changeText("email", e)}
                                     placeholder="הזן אימייל"/>
                    </div>
                    <div>
                        <button onClick={this.login}> {this.usernameIsAvailable() ? 'sign-up' : 'login'} </button>
                    </div>
                    <div>
                        {this.state.text}
                    </div>
                </div>
            </div>

        )
    }
}

export default LoginPage;
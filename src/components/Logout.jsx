import React from "react";
import {Button} from "react-bootstrap";
const Logout = () => {
    const onLogout = () => {
        localStorage.clear();
        window.location="http://localhost:3000";
    };
    return (
        <div className="navbar-loggedout">
            <Button className="login-button" onClick={onLogout}>
                Logout
            </Button>
        </div>
    );
};

export default Logout;
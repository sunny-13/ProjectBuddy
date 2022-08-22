import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import CustomNavbar from "../Navbar/CustomNavbar";
import Login from "../Login";
import Logout from "../Logout";
import "./styles.css";
import VisitProfile from "./VisitProfile";

const Header = () => {
    console.log("header called..");
    const user = useContext(UserContext);
    console.log(user);
    return (
        <div className="header">
            <CustomNavbar />
            <div className="brandname-div">
                <a href="/">
                    <h1 className="brandName">Project Buddy</h1>
                </a>
            </div>
            <div className="navbar-profile">
                {!user && <Login />}
                {user && 
                    <div>
                        <h4>{user.username}</h4>
                        <VisitProfile data={user}/>
                    </div>
                }
            </div>
        </div>
    );
};
export default Header;
import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Logout from "../Logout";
import "./styles.css"
const VisitProfile = (props) => {
    console.log(props.data);
    const [drop,setDrop]=useState(false);
    useEffect(()=>{
        const menu=document.getElementById("dropdown-menu");
        if(!drop){
            menu.style.display="none";
        }else{
            menu.style.display="inline-flex";
        }
    },[drop])
    return (
        <div className="visit-profile-content" onClick={()=>setDrop(drop=>!drop)}>
            <button className="avatar-button">
                <Avatar className="avatar-button">{props.data[0]}</Avatar>
                
            </button>
            <div id="dropdown-menu" className="dropdown-content">
                    <a href="http://localhost:3000/profile">Profile</a>
                    <Logout/>
                    {/* <a href="#">Link 3</a> */}
                </div>
        </div>
    );
};

export default VisitProfile;
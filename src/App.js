import './App.css';
import React, { useState,useEffect, useContext } from 'react';
// import Header from "./components/Header/Header";


export const UserContext = React.createContext();
function App() {

  const [user, setUser] = useState(null);
  // useEffect(() => {
  //     const getUser = async() => {
  //         const token =localStorage.getItem("token");
  //         await axios.get("http://localhost:5000/users/isLogged",{
  //             headers:{
  //                 "Authorization":token
  //             }
  //         })
  //         .then((res)=>{
  //             const user=res.data.data;
  //             if(!user.firstName) setUser(user.username);
  //             else setUser(user.firstName); 
  //         })
  //         .catch((err)=>{
  //             localStorage.clear();
  //             console.log(err);
  //         })
  //     };
  //     getUser();
  // }, []);
    
  
  return (
    <div className="App">
    
    <h1>HELLO !!</h1>

    </div>
  );
}

export default App;

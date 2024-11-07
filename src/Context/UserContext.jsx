import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : null);
  const [username, setUsername] = useState(localStorage.getItem("username") ? localStorage.getItem("username") : null); 
  
  const [userEmail, setuserEmail] = useState(localStorage.getItem("userEmail") ? localStorage.getItem("userEmail") : null); 
  const [userPhone, setuserPhone] = useState(localStorage.getItem("userPhone") ? localStorage.getItem("userPhone") : null); 

  function logOut()  {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setuserLogin(null);
    setUsername(null);
    setuserPhone(null)
    setuserEmail(null)
  };

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin, username, setUsername, logOut ,userPhone, setuserPhone,userEmail,setuserEmail }}>
      {props.children}
    </UserContext.Provider>
  );
}

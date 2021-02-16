import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import  isAuthenticated  from "../helpers/isAuth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "../API/userProfileApi";
import moment from "moment";

const TrasactionHistory = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    

    return (
       
         
        
           
                    <div>
                       
                    </div>
                
        
      
    );
};

export default TrasactionHistory;
import React from "react";
import Layout from "../components/Layout";
import isLoggedIn from "../helpers/isAuth"
import {Link} from "react-router-dom"
import purchaseHistory from "./PurchaseHistory"

const Dashboard = () => {
    const {
        user: { _id, name, email, role }

    } = isLoggedIn();

    if(role===0){

        const userLinks = () => {
            return (
                <div className="card">
                    <h4 className="card-header">Goto</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-link" to="/cart">
                                Your Cart
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to={`/profile/${_id}`}>
                                Update Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            );
        };
    
        const userInfo = () => {
            return (
                <div className="card mb-5">
                    <h3 className="card-header">User Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item">{name}</li>
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">
                            {role === 1 ? "Admin" : "Registered User"}
                        </li>
                    </ul>
                </div>
            );
        };
    
       
    
        return (
            <Layout
                title="Dashboard"
                description={`Hello ${name}!`}
                className="container-fluid"
            >
                <div className="row">
                    <div className="col-3">{userLinks()}</div>
                    <div className="col-9">
                        {userInfo()}
                        {purchaseHistory()}
                    </div>
                </div>
            </Layout>
        );
    }
    else{
        const adminLinks = () => {
            return (
                <div className="card">
                    <h4 className="card-header">Admin Permitted To</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-link" to="/create/category">
                                Create Category
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/add/medicine">
                                Create Product
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/admin/products">
                                Manage Products
                            </Link>
                        </li>
                    </ul>
                </div>
            );
        };
    
        const adminInfo = () => {
            return (
                <div className="card mb-5">
                    <h3 className="card-header">Admin Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item">{name}</li>
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">
                            {role === 1 ? "Admin" : "Registered User"}
                        </li>
                    </ul>
                </div>
            );
        };
    
        return (
            <Layout
                title="Dashboard"
                description={`Hello Admin ${name}!`}
                className="container-fluid"
            >
                <div className="row">
                    <div className="col-3">{adminLinks()}</div>
                    <div className="col-9">{adminInfo()}</div>
                </div>
            </Layout>
        );
    }

    }

    

export default Dashboard;



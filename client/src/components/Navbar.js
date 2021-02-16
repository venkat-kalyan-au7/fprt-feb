import React,{ Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Logout from "../API/logoutApi"
import isActive from "../helpers/isActive"
import isLoggedIn from "../helpers/isAuth"
import {itemTotal} from "../helpers/cartOperations"



const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-info">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    <i class="home icon"></i>
                </Link>
            </li>


            {!isLoggedIn() && (
               <Fragment>
                     <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/login")}
                            to="/login"
                        >
                            Login
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/register")}
                            to="/register"
                        >
                            Register
                        </Link>
                    </li>
               </Fragment>
           )}

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Medicines
                </Link>
            </li>

         

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/dashboard")}
                    to="/dashboard"
                >
                    Dashboard
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    <i class="shopping bag icon"></i>{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>

         

            {isLoggedIn() && (
                <div>
                    <li className="nav-item">
                            <span
                                className="nav-link"
                                style={{ cursor: "pointer", color: "#ffffff" }}
                                onClick={() =>
                                    Logout(() => {
                                        history.push("/");
                                    })
                                }>
                                <i class="sign-out alternate icon"></i>
                            </span>
                    </li>
                </div>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);

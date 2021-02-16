import React,{Component} from "react"
import {Route,Redirect} from "react-router-dom"
import isLoggedIn from "./isAuth"

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() && isLoggedIn().user.role===1 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminRoute;
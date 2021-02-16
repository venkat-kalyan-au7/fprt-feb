import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../components/Layout";
import login from "../API/loginApi"
import storeToLocal from "../helpers/local"
import isLoggedIn from "../helpers/isAuth"


const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    
    const {user} =isLoggedIn()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        login({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                storeToLocal(data,()=>{
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                })
            }
        });
    };

    const loginForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user &&user.role===1){
                return <Redirect to="/dashboard" />;
            }
            if(user && user.role===0){
                return <Redirect to="/dashboard" />;
            }
            
        }
        if(isLoggedIn()){
            return <Redirect to="/dashboard" />;
        }
    };

    return (
        <Layout
            title="Login"
            description="Login To Continue"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {loginForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Login;

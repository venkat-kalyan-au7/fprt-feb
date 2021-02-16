import React, { useState } from "react";
import Layout from "../components/Layout";
import register from "../API/registerApi"
import {Link} from "react-router-dom"

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

  

    const registerUser=(event)=>{
        event.preventDefault()
        setValues({ ...values, error: false });
        register({ name, email, password }).then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        })
    }

    const RegisterForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

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
            <button onClick={registerUser} className="btn btn-primary">Submit</button>
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

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/login">Login Here</Link>
        </div>
    );

    return (
        <Layout
            title="Register"
            description='Register to continue'
            className="container col-md-8 offset-md-2"
        >   {showSuccess()}
            {showError()}
            {RegisterForm()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
};

export default Signup;

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard"
import PrivateRoute from "./helpers/PrivateRoute"
import AdminRoutes from "./helpers/isAdmin"
import AddCategory from "./Pages/AddCategory"
import AddMedicine from "./Pages/AddMedicine"
import Shop from "./Pages/Shop"
import ProductPage from "./Pages/ViewProduct"
import Cart from "./Pages/Cart";
import OrdersPage from "./Pages/Orders"
import ProfilePage from "./Pages/Profile"
import ManageProducts from "./Pages/ManageProducts"


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/register" exact component={RegisterPage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path='/product/:productId' exact component={ProductPage}/>
                <Route path="/cart" exact component={Cart} />
                
                <PrivateRoute path='/dashboard' exact component={Dashboard}/>
                <PrivateRoute path='/profile/:userId' exact component={ProfilePage}/>

                <AdminRoutes path='/create/category' exact component ={AddCategory}/>
                <AdminRoutes path='/add/medicine' exact component ={AddMedicine}/>
                <AdminRoutes path='/admin/orders' exact component ={OrdersPage}/>
                <AdminRoutes path='/admin/products' exact component ={ManageProducts}/>
               
                
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
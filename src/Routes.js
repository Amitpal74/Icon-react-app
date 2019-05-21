import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Containers/Login/login'
import SignIn from './Containers/Login/signIn'
const RoutingComponent = () =>{
    return(
        <switch>
            <Route exact path="/" component={ Login }></Route>
            <Route path='/signin' component={ SignIn }></Route>
        </switch>
    )
}

export default RoutingComponent;




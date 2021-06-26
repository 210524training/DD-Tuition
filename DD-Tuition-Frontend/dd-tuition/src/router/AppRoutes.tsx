import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Register from '../components/RegisterPage/RegisterPage';

import HomePage from '../components/HomePage/HomePage';
import EmployPage from '../components/Employee';
import UserContext from '../context';
// import AllRestaurantsPage from '../components/pages/all-restaurants-page/AllRestaurantsPage';
// import RegisterPage from '../components/pages/register-page/RegisterPage';
// import LoginPage from '../components/pages/login-page/LoginPage';
// import Clicker from '../components/clicker/ClickerClass';

const AppRoutes: React.FC<unknown> = (props) => {
  const context = useContext(UserContext);
  return (
    
    <Switch>
      <Route exact path='/'>
        <HomePage />
       </Route>
       <Route exact path='/register'>
         <Register />
       </Route>
       <Route exact path='/employee'>
         <EmployPage />
       </Route>
    </Switch>
    
  );
  }

export default AppRoutes;
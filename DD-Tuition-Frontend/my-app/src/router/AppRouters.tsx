import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import HomePage from '../components/home-page/HomePage';
import AllRestaurantsPage from '../components/restaurants/all-restaurants-page/AllRestaurantsPage';

const AppRoutes: React.FC<unknown> = (props) => {
    return (
        <>
            <Switch>
                <Route exact path="/" >
                    <HomePage />
                </Route>
                <Route exact path="/reinburstments">
                    <AllRestaurantsPage />
                </Route>
                <Route>
                    <Redirect to="/"></Redirect>
                </Route>
            </Switch>
        </>
    )
}
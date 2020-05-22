import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {DislocationPage} from "./pages/Dislocation/DislocationPage";
import {AuthPage} from "./pages/AuthPage";
import {UserPage} from "./pages/Users/UserPage";
import {HistoryWagonPaje} from "./pages/Dislocation/HistoryWagonPaje";
import {HomePage} from "./pages/HomePage";


// Набор роутов
export const useRoutes = (isAuthenticated,isRoleId) => {
    //Если пользователь авторизован, то видит все эти роуты
    if(isAuthenticated){
        if(isRoleId === 1){
            return(
                <Switch>
                    <Route path="/users" exact>
                        <UserPage/>
                    </Route>
                    <Redirect to="/users"/>
                </Switch>
            )
        }
        if(isRoleId === 2){
            return(
                <Switch>
                    <Route path="/dislocation" exact>
                        <DislocationPage/>
                    </Route>
                    <Route path="/history/:id">
                        <HistoryWagonPaje/>
                    </Route>
                    <Redirect to="/dislocation"/>
                </Switch>
            )
        }
    }
    return(
        <Switch>
            <Route path="/" exact>
                <HomePage/>
            </Route>
            <Route path="/login">
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};
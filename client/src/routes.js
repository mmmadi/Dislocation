import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {DislocationPage} from "./pages/Dislocation/DislocationPage";
import {AddWagonPage} from "./pages/AddWagonPage";
import {AuthPage} from "./pages/AuthPage";
import {UserPage} from "./pages/Users/UserPage";
import {HistoryWagonPaje} from "./pages/Dislocation/HistoryWagonPaje";

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
        } else {
            return(
                <Switch>
                    <Route path="/dislocation" exact>
                        <DislocationPage/>
                    </Route>
                    <Route path="/add_wagon">
                        <AddWagonPage/>
                    </Route>
                    <Route path="/history/:id">
                        <HistoryWagonPaje/>
                    </Route>
                    <Redirect to="/dislocation"/>
                </Switch>
            )
        }
    } else {
        //Иначе редиректится на главную страницу логина
        return(
            <Switch>
                <Route path="/" exact>
                    <AuthPage/>
                </Route>
            </Switch>
        )
    }
};
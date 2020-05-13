import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {DislocationPage} from "./pages/Dislocation/DislocationPage";
import {AddWagonPage} from "./pages/AddWagonPage";
import {AuthPage} from "./pages/AuthPage";
import {UserAddPage} from "./pages/Users/UserAddPage"
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
        }
        return(
            <Switch>
                <Route path="/history/:id" exact>
                    <HistoryWagonPaje/>
                </Route>
                <Route path="/dislocation" exact>
                    <DislocationPage/>
                </Route>
                <Route path="/add_wagon" exact>
                    <AddWagonPage/>
                </Route>
                <Redirect to="/dislocation"/>
            </Switch>
        )
    }
    //Иначе редиректится на главную страницу логина
    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Route path="/registration" exact>
                <UserAddPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};
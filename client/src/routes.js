import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {DislocationPage} from "./pages/DislocationPage";
import {AddWagonPage} from "./pages/AddWagonPage";
import {AuthPage} from "./pages/AuthPage";
import {RegisterPage} from "./pages/RegisterPage"

// Набор роутов
export const useRoutes = (isAuthenticated,isRoleId) => {
    //Если пользователь авторизован, то видит все эти роуты
    if(isAuthenticated){
        if(isRoleId === 1){
            return(
                <Switch>
                    <Route path="/dislocation" exact>
                        <DislocationPage/>
                    </Route>
                    <Route path="/add_wagon" exact>
                        <AddWagonPage/>
                    </Route>
                    {/*<Route path="/registration" exact>*/}
                    {/*    <RegisterPage/>*/}
                    {/*</Route>*/}
                    <Redirect to="/dislocation"/>
                </Switch>
            )
        }
        return(
            <Switch>
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
                <RegisterPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};
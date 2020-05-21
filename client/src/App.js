import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAth} from "./hooks/auth.hook";
import {AuthContext} from './context/auth.context'
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

function App() {
    //забираем данные из hook auth.hook
    const {token, login, logout, userId, roleId, ready, username} = useAth();
    // в данную переменную передаем токен. Это флаг того, что пользователь авторизовать
    const isAuthenticated = !!token;
    // далее этот флаг передаем в файл routes.js, где мы определяем что пользователь видит в браузере
    const routes = useRoutes(isAuthenticated, roleId);//отображаем наши страницы

    const [darkMode, setDarkMode] = useState(getInitialMode());

    const setState = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        localStorage.setItem("dark", JSON.stringify(darkMode));
    }, [darkMode]);

    function getInitialMode() {
        const isReturningUser = "dark" in localStorage;
        const savedMode = JSON.parse(localStorage.getItem("dark"));
        const userPrefersDark = getPrefColorScheme();
        // if mode was saved --> dark / light
        if (isReturningUser) {
            return savedMode;
            // if preferred color scheme is dark --> dark
        } else return !!userPrefersDark;
        // return savedMode || false;
    }

    function getPrefColorScheme() {
        if (!window.matchMedia) return;

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    if(!ready){
        return <Loader/>
    }

    return(
        <AuthContext.Provider value = {{
            token, login, logout, userId, isAuthenticated, roleId, username, darkMode
        }}>
            <Router>
                <div id="wrapper" style={darkMode ? {backgroundColor:"#1e1e1e"} : {backgroundColor:"#fff"}}>
                    {darkMode ? <span className="bg-dark"/> : <span className="bg-light"/>}
                    {isAuthenticated && roleId && <Navbar username={username} change={setState} mode={darkMode}/>}
                    <div className="container">
                        {routes}
                    </div>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;

import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAth} from "./hooks/auth.hook";
import {AuthContext} from './context/auth.context'
import {Navbar} from "./components/Navbar";

function App() {
    //забираем данные из hook auth.hook
    const {token, login, logout, userId, roleId, username} = useAth();
    // в данную переменную передаем токен. Это флаг того, что пользователь авторизовать
    const isAuthenticated = !!token;
    // далее этот флаг передаем в файл routes.js, где мы определяем что пользователь видит в браузере
    const routes = useRoutes(isAuthenticated, roleId);//отображаем наши страницы

    return(
        <AuthContext.Provider value = {{
            token, login, logout, userId, isAuthenticated, roleId, username
        }}>
            <Router>
                {isAuthenticated && roleId && <Navbar/>}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;

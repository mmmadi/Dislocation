import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/auth.context";


export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const roleId = auth.roleId;

    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    if(roleId === 1){
        return(
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <a href="/" className="navbar-brand">Cars Viewer</a>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li>
                            <NavLink to="/users">Пользователи</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/" onClick={logoutHandler}>Выйти</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
    return(
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
            <a href="/" className="navbar-brand">Cars Viewer</a>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <li>
                        <NavLink to="/add_wagon">Добавить вагон</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/dislocation">Дислокация</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/" onClick={logoutHandler}>Выйти</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
};
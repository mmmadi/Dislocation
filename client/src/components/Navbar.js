import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/auth.context";
import {ControlledPopup} from "./popup"


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
            <nav>
                <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                    <a href="/" className="brand-logo">Дислокация вагонного парка</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/add_wagon">Добавить вагон</NavLink></li>
                        <li><NavLink to="/dislocation">Дислокация</NavLink></li>
                        <li><ControlledPopup /></li>
                        {/*<li><NavLink to="/registration">Регистрация пользователя</NavLink></li>*/}
                        <li><NavLink to="/" onClick={logoutHandler}>Выйти</NavLink></li>
                    </ul>
                </div>
            </nav>
        )
    }
    return(
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <a href="/" className="brand-logo">Дислокация вагонного парка</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/add_wagon">Добавить вагон</NavLink></li>
                    <li><NavLink to="/dislocation">Дислокация</NavLink></li>
                    <li><NavLink to="/" onClick={logoutHandler}>Выйти</NavLink></li>
                </ul>
            </div>
        </nav>
    )
};
import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../context/auth.context";
import Button from "react-bootstrap/Button";


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
            <nav className="navbar navbar-expand-sm navbar-dark" style={{background:"#f5f5f5", boxShadow:"0 0 10px rgba(0,0,0,0.3)"}}>
                <a href="/" className="navbar-brand" style={{color: "#000"}}>Cars Viewer</a>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Button className="btn-logout" onClick={logoutHandler}>выйти</Button>
                            {/*<NavLink to="/" onClick={logoutHandler}>Выйти</NavLink>*/}
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
    return(
        <nav className="navbar navbar-expand-sm navbar-dark" style={{background:"#f5f5f5", boxShadow:"0 0 10px rgba(0,0,0,0.3)"}}>
            <a href="/" className="navbar-brand" style={{color: "#000"}}>Cars Viewer</a>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    {/*<li>*/}
                    {/*    <NavLink to="/add_wagon">Добавить вагон</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <NavLink to="/dislocation">Дислокация</NavLink>*/}
                    {/*</li>*/}
                    <li className="nav-item">
                        <Button className="btn-logout" onClick={logoutHandler}>выйти</Button>
                        {/*<NavLink to="/" onClick={logoutHandler}>Выйти</NavLink>*/}
                    </li>
                </ul>
            </div>
        </nav>
    )
};
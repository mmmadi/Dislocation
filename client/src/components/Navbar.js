import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../context/auth.context";
import Button from "react-bootstrap/Button";


export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const roleId = auth.roleId;
    const [check, setCheck] = useState(false);

    const changeToggle = () => {
          if(check === false){
              setCheck(true);
          } else {
              setCheck(false);
          }
    };

    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    if(roleId === 1){
        return(
            <nav className="navbar navbar-expand-sm navbar-dark" style={{background:"#f5f5f5", boxShadow:"0 0 10px rgba(0,0,0,0.3)"}}>
                <a href="/" className="navbar-brand" style={{color: "#000"}}>
                    <i className="fas fa-route" style={{fontSize:28, marginRight:10}}/>
                    Cars Viewer
                </a>
                <div className="navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Button className="btn-logout" onClick={logoutHandler}>Выйти</Button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    } else {
        return(
            <nav className="navbar navbar-expand-sm navbar-dark" style={{background:"#f5f5f5", boxShadow:"0 0 10px rgba(0,0,0,0.3)"}}>
                <a href="/" className="navbar-brand" style={{color: "#000"}}>
                    <i className="fas fa-route" style={{fontSize:28, marginRight:10}}/>
                    Cars Viewer
                </a>
                <div className="navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <label className="switch">
                                <input type="checkbox" id="checkbox" onChange={changeToggle}/>
                                <span className="slider round"/>
                            </label>
                        </li>
                        <li className="nav-item">
                            <Button className="btn-logout" onClick={logoutHandler}>Выйти</Button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
};
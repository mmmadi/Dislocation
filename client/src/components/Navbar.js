import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../context/auth.context";
import UserAccount from "../images/account.a133bf44.png";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    const username = auth.username;

    return(
        <nav className="nav-extended grey lighten-4 z-depth-1">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo" style={{color: "#000", marginLeft:20}}>
                    <i className="fas fa-route" style={{fontSize:28, marginRight:10}}/>
                    <span style={{fontSize:20}}>Cars Viewer</span>
                </a>
                <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons" style={{color:"#000", display:"contents"}}>menu</i>
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <ul id="slide-out" className="sidenav">
                            <li>
                                <div className="user-view" style={{width:"100%", display:"flex", justifyContent:"center"}}>
                                    <img src={UserAccount} alt="account image" style={{width:150, height:150}}/>
                                </div>
                                <div className="username" style={{textAlign:"center"}}>
                                    <span className="black-text name">{username}</span>
                                </div>
                                <div className="divider"></div>
                            </li>
                            <li><a className="waves-effect" href="#!">Link 1</a></li>
                            <li><a className="waves-effect" href="#!">Link 2</a></li>
                            <li><a className="waves-effect" href="#!">Link 3</a></li>
                        </ul>
                        <button className="btn-floating waves-effect waves-light btn-add-user sidenav-trigger tooltipped" data-target="slide-out" data-position="bottom" data-tooltip="Профиль">
                            <i className="material-icons nav-icon" style={{color:"#000"}}>person</i>
                        </button>
                    </li>
                    <li style={{marginRight:20}}>
                        <div className="switch" data-position="bottom" data-tooltip="Смена темы" style={{width:"100%", marginTop:0}}>
                            <label>
                                <input type="checkbox"/>
                                <span className="lever tooltipped" data-position="bottom" data-tooltip="Смена темы"/>
                            </label>
                        </div>
                    </li>
                    <li style={{marginRight:20}}><button className="btn waves-effect waves-light grey lighten-4 z-depth-2 font-weight-bold btn-logout" onClick={logoutHandler}>Выйти</button></li>
                </ul>
            </div>
            <ul className="sidenav" id="mobile-demo">
                <li>
                    <div className="user-view" style={{width:"100%", display:"flex", justifyContent:"center"}}>
                        <img src={UserAccount} alt="account image" style={{width:150, height:150}}/>
                    </div>
                    <div className="username" style={{textAlign:"center"}}>
                        <span className="black-text name">{username}</span>
                    </div>
                    <div className="divider"></div>
                </li>
                <li><a className="waves-effect" href="#!">Link 1</a></li>
                <li><a className="waves-effect" href="#!">Link 2</a></li>
                <li><a className="waves-effect" href="#!">Link 3</a></li>
                <li style={{borderBottom:"1px solid #dee2e6"}}>
                    <div className="switch" style={{width:"100%", marginTop:0}}>
                        <label>
                            <input type="checkbox"/>
                            <span className="lever"/>
                        </label>
                    </div>
                </li>
                <li style={{borderBottom:"1px solid #dee2e6"}}><button className="waves-effect waves-teal btn-flat" onClick={logoutHandler}>Выйти</button></li>
            </ul>
        </nav>
    )
};
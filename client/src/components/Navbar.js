import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../context/auth.context";
import UserAccount from "../images/account.a133bf44.png";

export const Navbar = ({username, change}) => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {darkMode} = useContext(AuthContext);

    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return(
        <nav>
            <div className={darkMode ? "navbar-fixed nav-dark-theme" : "navbar-fixed grey lighten-4 z-depth-1"}>
                <div className="nav-wrapper">
                    <a href="/" className={darkMode ? "brand-logo dark-logo" : "brand-logo light-logo"}>
                        <i className="fas fa-route" style={{fontSize:28, marginRight:10}}/>
                        <span style={{fontSize:20}}>Cars Viewer</span>
                    </a>
                    <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons" style={darkMode ? {color:"#fff", display:"contents"} : {color:"#000", display:"contents"}}>menu</i>
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <button className={darkMode ? "btn-floating waves-effect waves-light btn-add-user-dark sidenav-trigger tooltipped" : "btn-floating waves-effect waves-light btn-add-user sidenav-trigger tooltipped"}
                                    data-target="slide-out" data-position="bottom" data-tooltip="Профиль">
                                <i className="material-icons nav-icon" style={darkMode ? {color:"#fff"} : {color:"#000"}}>person</i>
                            </button>
                        </li>
                        <li style={{marginRight:20}}>
                            <div className="switch" data-position="bottom" data-tooltip="Смена темы" style={{width:"100%", marginTop:0}}>
                                <label>
                                    <input type="checkbox" checked={darkMode} onChange={change}/>
                                    <span className="lever tooltipped" data-position="bottom" data-tooltip="Смена темы"/>
                                </label>
                            </div>
                        </li>
                        <li style={{marginRight:20}}>
                            <button className={darkMode ? "btn waves-effect waves-light btn-logout-dark z-depth-2 font-weight-bold btn-logout" : "btn waves-effect waves-light grey lighten-4 z-depth-2 font-weight-bold btn-logout"}
                                    onClick={logoutHandler}>
                                Выйти
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <ul id="slide-out" className={darkMode ? "sidenav sidenav-dark" : "sidenav"}>
                <li>
                    <div className="user-view" style={{width:"100%", display:"flex", justifyContent:"center"}}>
                        <img src={UserAccount} alt="account" style={{width:150, height:150}}/>
                    </div>
                    <div className="username" style={{textAlign:"center"}}>
                        <span className="black-text name">{username}</span>
                    </div>
                    <div className="divider"/>
                </li>
                <li><a className="waves-effect" href="#!">Link 1</a></li>
                <li><a className="waves-effect" href="#!">Link 2</a></li>
                <li><a className="waves-effect" href="#!">Link 3</a></li>
            </ul>
            <ul className={darkMode ? "sidenav sidenav-dark" : "sidenav"} id="mobile-demo">
                <li>
                    <div className="user-view" style={{width:"100%", display:"flex", justifyContent:"center"}}>
                        <img src={UserAccount} alt="account" style={{width:150, height:150}}/>
                    </div>
                    <div className="username" style={{textAlign:"center"}}>
                        <span className="black-text name">{username}</span>
                    </div>
                    <div className="divider"/>
                </li>
                <li><a className="waves-effect" href="#!">Link 1</a></li>
                <li><a className="waves-effect" href="#!">Link 2</a></li>
                <li><a className="waves-effect" href="#!">Link 3</a></li>
                <li style={{borderBottom:"1px solid #dee2e6"}}>
                    <div className="switch" style={{width:"100%", marginTop:0}}>
                        <label>
                            <input type="checkbox" checked={darkMode} onChange={change}/>
                            <span className="lever"/>
                        </label>
                    </div>
                </li>
                <li style={{borderBottom:"1px solid #dee2e6"}}>
                    <button className={darkMode ? "waves-effect waves-teal btn-flat mobile-side-dark" : "waves-effect waves-teal btn-flat"} onClick={logoutHandler}>Выйти
                    </button>
                </li>
            </ul>
        </nav>
    )
};
import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../context/auth.context";


export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return(
        <nav className="nav-extended grey lighten-4 z-depth-1">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo" style={{color: "#000", marginLeft:20}}>
                    <i className="fas fa-route" style={{fontSize:28, marginRight:10}}/>
                    <span style={{fontSize:20}}>Cars Viewer</span>
                </a>
                <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons" style={{color:"#000"}}>menu</i>
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li style={{marginRight:20}}>
                        <div className="switch" style={{width:"100%", marginTop:0}}>
                            <label>
                                <input type="checkbox"/>
                                <span className="lever"/>
                            </label>
                        </div>
                    </li>
                    <li style={{marginRight:20}}><button className="btn waves-effect waves-light grey lighten-4 z-depth-2 font-weight-bold btn-logout" onClick={logoutHandler}>Выйти</button></li>
                </ul>
            </div>
            <ul className="sidenav" id="mobile-demo">
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
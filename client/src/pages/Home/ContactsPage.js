import React, {useEffect} from "react"
import M from "materialize-css";
import mp4 from "../../videos/petroleum.mp4";
import webm from "../../videos/petroleum.webm";
import ogv from "../../videos/petroleum.ogv";
import {NavLink} from "react-router-dom";

export const ContactsPage = () => {
    useEffect(() => {
        const sidenav = document.getElementById('mobile-demo');
        M.Sidenav.init(sidenav,{edge:'right',draggable: true});

        let instances = M.Sidenav.getInstance(sidenav);
    });

    return (
        <>
            <div className="video">
                <div className="sub_video">
                    <video autoPlay loop muted playsInline className="sub_sub_video">
                        <source src={mp4} type="video/mp4"/>
                        <source src={webm} type="video/webm"/>
                        <source src={ogv} type="video/ogg"/>
                    </video>
                </div>
            </div>
            <div className="overlay"/>
            <ul className="sidenav" id="mobile-demo">
                <li><NavLink to="/">Главная</NavLink></li>
                <li><NavLink to="/services">Услуги</NavLink></li>
                <li><NavLink to="/contacts">Контакты</NavLink></li>
                <li><a href="/login">Войти</a></li>
            </ul>
            <div className="container main">
                <header className="home_page_header">
                    <a href="#!" className="logo_home_page">
                        <i className="fas fa-route" style={{fontSize:28, marginRight:10}}/>
                        Cars Viewer
                    </a>
                    <nav>
                        <ul>
                            <li>
                                <a href="#!" data-target="mobile-demo" className="sidenav-trigger" style={{margin: 0}}>
                                    <i className="material-icons">menu</i>
                                </a>
                            </li>
                        </ul>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink to="/">Главная</NavLink></li>
                            <li><NavLink to="/services">Услуги</NavLink></li>
                            <li><NavLink to="/contacts">Контакты</NavLink></li>
                            <li><NavLink to="/login">Войти</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <section className="home_page_section">
                    <div className="content_box">
                        <h2>Contacts Page</h2>
                        <p>Contacts Page</p>
                    </div>
                </section>
            </div>
        </>
    )
};
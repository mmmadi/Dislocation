import React from "react";
import {NavLink} from 'react-router-dom'
import plm from "../videos/petroleum.mp4";

export const HomePage = () => {
    return (
        <>
            <div className="video">
                <div className="sub_video">
                    <video autoPlay loop muted className="sub_sub_video">
                        <source src={plm} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className="overlay"/>
            <div className="container main">
                <header className="home_page_header">
                    <a href="#!" className="logo_home_page">
                        <i className="fas fa-route" style={{fontSize:28, marginRight:10}}/>
                        Cars Viewer
                    </a>
                    <nav>
                        <ul>
                            <li><NavLink to="/login">Войти</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <section className="home_page_section">
                    <div className="content_box">
                        <h2>Дислокация подвижного состава</h2>
                        <p>Предоставляем дислокацию подвижного состава.</p>
                        <a href="#!" className="waves-effect waves-light btn-large">Оставить заявку</a>
                    </div>
                </section>
            </div>
        </>
    )
};
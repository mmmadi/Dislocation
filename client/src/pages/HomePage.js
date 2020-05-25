import React, {useEffect, useState} from "react";
import {NavLink} from 'react-router-dom'
import mp4 from "../videos/petroleum.mp4";
import webm from "../videos/petroleum.webm";
import ogv from "../videos/petroleum.ogv";
import M from "materialize-css";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const HomePage = () => {
    const [show, setShow] = useState(false);
    const {loading, request} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        username: '', telephone: '', email: ''
    });

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]:event.target.value });
    };

    const sendEmail = async () => {
        try{
            const data = await request('/api/send_email', 'POST', {...form});

            if(data.errors){
                for(let i = 0; i<3;i++){
                    message(data.errors[i].msg);
                }
            } else {
                message(data.message);
            }
        }catch (e) {}
    };

    useEffect(()=>{
        const options = {
            onOpenStart: null,
            onOpenEnd: null,
            onCloseStart: null,
            onCloseEnd: null,
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            preventScrolling: true,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%"
        };

        const modal = document.getElementById('modal-home-page');
        M.Modal.init(modal, options);

        let instance = M.Modal.getInstance(modal);

        if(!show){
            setShow(true);
            instance.open();
        }
    }, [show]);

    const closeModal = () => {
        if(show){
            setShow(false);
        }
    };

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
                        <button className="waves-effect waves-light btn btn-large modal-trigger btn-order" data-target="modal-home-page">Оставить заявку</button>
                        <div id="modal-home-page" className="modal">
                            <div className="modal-content">
                                <div className="card-content">
                                    <div className="modal-header">
                                        <h6>Оставить заявку</h6>
                                        <button className="btn" onClick={closeModal}>
                                            <i className="material-icons">close</i>
                                        </button>
                                    </div>
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">account_circle</i>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="validate"
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor="username">Контактное лицо</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">phone</i>
                                        <input
                                            id="telephone"
                                            name="telephone"
                                            type="tel"
                                            className="validate"
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor="telephone">Контактный номер</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">email</i>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="validate"
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor="email">Контактный Email</label>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="waves-effect waves-green btn"
                                            style={{width:"100%"}}
                                            disabled={!form.username || !form.email || !form.telephone || loading}
                                            onClick={sendEmail}
                                        >
                                            Отправить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
};
import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {useMessage} from "../hooks/message.hook";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    //hook для вывода сообщения M.toast() из файла message.hook.js
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message ,clearError]);

    useEffect(()=>{
        window.M.updateTextFields();
    });

    const changeHandler = event => {
        //оператор spread
        //передаем в форму значения из Input по name в форму
        setForm({ ...form, [event.target.name]:event.target.value })
    };

    const loginHandler = async () => {
        try{
            // отправляем запрос с данными из формы, и если авторизован, получаем в ответ token, userId
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId, data.roleId)
        }catch (e) {}
    };

    const enterLogin = event => {
        if(event.key === 'Enter'){
            loginHandler();
        }
    };

    return(
        <div className="auth">
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title" style={{marginBottom: 30}}>Дислокация вагонов</span>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="red-input"
                                    onChange={changeHandler}
                                    onKeyPress={enterLogin}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="red-input"
                                    onChange={changeHandler}
                                    onKeyPress={enterLogin}
                                />
                                <label htmlFor="email">Пароль</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn white black-text"
                                style={{fontWeight: 600, marginRight: 10}}
                                onClick={loginHandler}
                                disabled={loading}
                            >
                                Вход
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {useMessage} from "../hooks/message.hook";
import 'materialize-css';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {darkMode} = useContext(AuthContext);
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

    const changeHandler = event => {
        //оператор spread
        //передаем в форму значения из Input по name в форму
        setForm({ ...form, [event.target.name]:event.target.value });
    };

    const loginHandler = async () => {
        try{
            // отправляем запрос с данными из формы, и если авторизован, получаем в ответ token, userId
            const data = await request('/api/auth/login', 'POST', {...form});
            localStorage.setItem('Theme', JSON.stringify({theme:'white', ischecked: false}));
            auth.login(data.token, data.userId, data.roleId, data.username);
        }catch (e) {}
    };

    const enterLogin = event => {
        if(event.key === 'Enter'){
            loginHandler();
        }
    };

    return(
        <div className="row myrow">
            <div className="col s6 offset-s3">
                <div className={darkMode ? "card align-content-center card-dark" : "card align-content-center card-light"}>
                    <div className="card-header blue darken-2 white-text" style={{padding:10}}>
                        <i className="fas fa-route" style={{fontSize:28, marginRight:10}}/>
                        <span className="card-title" style={{color:"#fff"}}>Cars Viewer</span>
                    </div>
                    <div className="card-content my-auth-card-content white-text">
                        <div className="input-field myinput-field">
                            <i className={darkMode ? "material-icons prefix prefix-dark" : "material-icons prefix"}>email</i>
                            <input id="email" type="email" className="validate" name="email" onChange={changeHandler} onKeyPress={enterLogin}/>
                                <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field myinput-field">
                            <i className={darkMode ? "material-icons prefix prefix-dark" : "material-icons prefix"}>lock</i>
                            <input id="password" type="password" className="validate myinput" name="password" onChange={changeHandler} onKeyPress={enterLogin}/>
                            <label htmlFor="password" className="mylabel">Пароль</label>
                        </div>
                        <button onClick={loginHandler} disabled={!form.email || !form.password || loading } className="btn waves-effect waves-light w-25 blue darken-2" type="submit" name="action" style={{width:"100%"}}>Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
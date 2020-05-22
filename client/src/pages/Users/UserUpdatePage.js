import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from '../../hooks/message.hook'
import {AuthContext} from "../../context/auth.context";


export const UserUpdatePage = ({userId, close}) => {
    const history = useHistory();
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        username: '', email: '', password: ''
    });
    const {darkMode} = useContext(AuthContext);

    //hook для вывода сообщения M.toast() из файла message.hook.js
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message ,clearError]);

    useEffect(() => {
        document.getElementById("name").value = userId.username;
        document.getElementById("mail").value = userId.email;
        window.M.updateTextFields();
    },[userId.username, userId.email]);

    const changeHandler = event => {
        //оператор spread
        //передаем значения из Input по name в форму
        setForm({ ...form, [event.target.name]:event.target.value })
    };

    //функция регистрации
    const updateHandler = async () => {
        try{
            const data = await request(`/api/users/${userId}`, 'PUT', {...form});
            // передаем сообщение, что пользователь создан
            message(data.message);
            //редиректим на главную страницу после успешной регистрации
            history.push('/');
        }catch (e) {}
    };

    const enterUpdate = event => {
        if(event.key === 'Enter'){
            updateHandler();
        }
    };

    return(
        <div className={darkMode ? "card-content my-card-content white-text modal-card-dark" : "card-content my-card-content white-text modal-card-light"}>
            <div className="input-field myinput-field">
                <input
                    className="validate"
                    type="text"
                    id="name"
                    name="username"
                    onChange={changeHandler}
                    onKeyPress={enterUpdate}
                />
                <label htmlFor="name">Имя пользователя</label>
            </div>
            <div className="input-field myinput-field">
                <input
                    className="validate"
                    type="email"
                    id="mail"
                    name="email"
                    onChange={changeHandler}
                    onKeyPress={enterUpdate}
                />
                <label htmlFor="mail">Email</label>
            </div>
            <div className="input-field myinput-field">
                <input
                    className="validate"
                    type="password"
                    id="pass"
                    name="password"
                    onChange={changeHandler}
                    onKeyPress={enterUpdate}
                />
                <label htmlFor="pass">Пароль</label>
            </div>
            <div className={darkMode ? "modal-footer modal-card-dark" : "modal-footer"}>
                <button onClick={updateHandler} disabled={loading} className="btn waves-effect waves-light w-25 blue darken-2" style={{marginRight:10}}>
                    Добавить
                </button>
                <button className="btn waves-effect waves-light grey lighten-4 z-depth-2 font-weight-bold btn-logout modal-close" onClick={close}>
                    Отмена
                </button>
            </div>
        </div>
    )
};
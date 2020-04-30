import React, {useEffect, useState, useContext, useCallback} from 'react'
import {useHistory} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from "../context/auth.context";

export const RegisterPage = () => {
    // для редиректа на главную страницу
    const history = useHistory();
    const {token} = useContext(AuthContext);
    const [roles,setRoles] = useState([]);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        username: '', email: '', password: '', role: 0
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
        //передаем значения из Input по name в форму
        setForm({ ...form, [event.target.name]:event.target.value })
    };

    //функция регистрации
    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form});
            // передаем сообщение, что пользователь создан
            message(data.message);
            //редиректим на главную страницу после успешной регистрации
            history.push('/');
        }catch (e) {}
    };

    const fetchRoles = useCallback(async () => {
        try{
            const fetched = await request('/api/auth/get_roles', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setRoles(fetched)
        } catch (e) {}
    }, [token, request]);

    useEffect(()=>{
        fetchRoles();
    }, [fetchRoles]);

    const enterRegister = event => {
        if(event.key === 'Enter'){
            registerHandler();
        }
    };

    return(
        <div className="auth">
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title" style={{marginBottom: 30}}>Регистрация</span>
                            <div className="input-field">
                                <input
                                    placeholder="Введите имя пользователя"
                                    id="username"
                                    type="text"
                                    name="username"
                                    className="red-input"
                                    onChange={changeHandler}
                                    onKeyPress={enterRegister}
                                />
                                <label htmlFor="email">Имя пользователя</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="red-input"
                                    onChange={changeHandler}
                                    onKeyPress={enterRegister}
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
                                    onKeyPress={enterRegister}
                                />
                                <label htmlFor="email">Пароль</label>
                            </div>
                            <div className="input-group">
                                <select
                                    className="custom-select"
                                    id="role"
                                    name="role"
                                    onChange={changeHandler}
                                >
                                    {roles.map((role) => {
                                        return(
                                            <option value={role.key}>{role.value}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn white black-text"
                                style={{fontWeight: 600}}
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Регистрация
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
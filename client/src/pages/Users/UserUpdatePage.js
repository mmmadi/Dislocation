import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from '../../hooks/message.hook'

export const UserUpdatePage = ({users}) => {
    const history = useHistory();
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        username: '', email: '', password: ''
    });
    const userId = users;

    //hook для вывода сообщения M.toast() из файла message.hook.js
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message ,clearError]);

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
        <div className="card">
            <div className="card-body" style={{padding: '2 rem'}}>
                <div>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Имя пользователя"
                                onChange={changeHandler}
                                onKeyPress={enterUpdate}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                name="email"
                                placeholder="Email"
                                onChange={changeHandler}
                                onKeyPress={enterUpdate}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Пароль"
                                name="password"
                                onChange={changeHandler}
                                onKeyPress={enterUpdate}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                            onClick={updateHandler}
                            disabled={loading}
                            style={{marginTop: 10}}
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};
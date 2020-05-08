import React, {useEffect, useState, useContext, useCallback} from 'react'
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from '../../hooks/message.hook'
import {AuthContext} from "../../context/auth.context";
import Button from "react-bootstrap/Button";

export const UserAddPage = ({close}) => {
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
        <div>
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
                                onKeyPress={enterRegister}
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
                                onKeyPress={enterRegister}
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
                                onKeyPress={enterRegister}
                            />
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
                        <div className="card-actions">
                            <Button
                                type="submit"
                                className="btn-save"
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                сохранить
                            </Button>
                            <Button className="btn-cancel" onClick={close}>
                                отмена
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};
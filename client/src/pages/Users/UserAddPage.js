import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from '../../hooks/message.hook'
// import {AuthContext} from "../../context/auth.context";

export const UserAddPage = () => {
    // для редиректа на главную страницу
    const history = useHistory();
    // const {token} = useContext(AuthContext);
    // const [roles,setRoles] = useState([]);
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

    // document.addEventListener('DOMContentLoaded', function() {
    //     var elems = document.querySelectorAll('select');
    //     var instances = window.M.FormSelect.init(elems, roles);
    // });

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

    // const fetchRoles = useCallback(async () => {
    //     try{
    //         const fetched = await request('/api/auth/get_roles', 'GET', null, {
    //             Authorization: `Bearer ${token}`
    //         });
    //         setRoles(fetched)
    //     } catch (e) {}
    // }, [token, request]);
    //
    // useEffect(()=>{
    //     fetchRoles();
    // }, [fetchRoles]);

    const enterRegister = event => {
        if(event.key === 'Enter'){
            registerHandler();
        }
    };

    return(
        <div className="card-content my-card-content white-text">
            <div className="input-field myinput-field">
                <input
                    className="validate"
                    type="text"
                    id="username"
                    name="username"
                    onChange={changeHandler}
                    onKeyPress={enterRegister}
                />
                <label htmlFor="username">Имя пользователя</label>
            </div>
            <div className="input-field myinput-field">
                <input
                    className="validate"
                    type="email"
                    id="email"
                    name="email"
                    onChange={changeHandler}
                    onKeyPress={enterRegister}
                />
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-field myinput-field">
                <input
                    className="validate"
                    type="password"
                    id="password"
                    name="password"
                    onChange={changeHandler}
                    onKeyPress={enterRegister}
                />
                <label htmlFor="password">Пароль</label>
            </div>
            <div className="input-field myinput-field">
                <select className="myselect" id="role" name="role" onChange={changeHandler}>
                    <option value="1">Администратор</option>
                    <option value="2">Пользователь</option>
                    {/*{roles.map((role) => {*/}
                    {/*    return(*/}
                    {/*        <option value={role.key} key={role.key}>{role.value}</option>*/}
                    {/*    )*/}
                    {/*})}*/}
                </select>
                <label>Роль</label>
            </div>
            <div className="modal-footer">
                <button onClick={registerHandler} disabled={loading} className="btn waves-effect waves-light w-25 blue darken-2" style={{marginRight:10}}>
                    Добавить
                </button>
                <button className="btn waves-effect waves-light grey lighten-4 z-depth-2 font-weight-bold btn-logout modal-close">
                    Отмена
                </button>
            </div>
        </div>
    )
};
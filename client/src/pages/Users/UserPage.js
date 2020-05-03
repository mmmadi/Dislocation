import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {Loader} from "../../components/Loader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {UserUpdatePage} from "./UserUpdatePage";
import {useMessage} from "../../hooks/message.hook";
import {RegisterPage} from "../RegisterPage";

export const UserPage = () => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const {loading, request} = useHttp();
    const message = useMessage();
    const {token} = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const fetchUsers = useCallback(async () =>{
        try{
            const fetched = await request('/api/users', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setUsers(fetched)
        }catch (e) {}
    }, [token, request]);

    useEffect(() =>{
        fetchUsers();
    }, [fetchUsers]);

    const deleteHandler = async (id) => {
        try{
            message('Вы уверены, что хотите удалить пользователя?');

            const deleteUser = await request(`/api/users/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            });

            message(deleteUser.message);

            history.push('/');

        }  catch (e) {}
    };


    if(loading){
       return <Loader/>
    }

    return(
        <div className="card" style={{marginTop: '5%', borderRadius: 5}}>
            <div className="table-div">
                <>
                    <Button style={{border:'none',background:'none',float:'right'}} onClick={handleShow1}>
                        <i className="fas fa-user-plus" style={{color: 'black'}}/>
                    </Button>
                    <Modal show={show1} onHide={handleClose1} animation={false} centered>
                        <RegisterPage />
                    </Modal>
                </>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Имя пользователя</th>
                        <th scope="col">Email</th>
                        <th scope="col">Роль</th>
                        <th scope="col"/>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user,index) => {
                        return(
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role_name}</td>
                                <td>
                                    <>
                                        <Button style={{ border: 'none', background: 'none' }} onClick={handleShow}>
                                            <i className="fas fa-pen" style={{color: 'deepskyblue'}}/>
                                        </Button>
                                        <Modal show={show} onHide={handleClose} animation={false} centered>
                                            <UserUpdatePage users={user.id} />
                                        </Modal>
                                    </>
                                </td>
                                <td>
                                    <button style={{ border: 'none', background: 'none' }} onClick={() => deleteHandler(user.id)}>
                                        <i className="fas fa-trash" style={{color: 'red'}}/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};
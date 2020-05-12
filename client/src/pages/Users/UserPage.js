import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {Loader} from "../../components/Loader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {UserUpdatePage} from "./UserUpdatePage";
import {useMessage} from "../../hooks/message.hook";
import {UserAddPage} from "./UserAddPage";
import {Pagination} from "../../components/Pagination";

export const UserPage = () => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const {loading, request} = useHttp();
    const message = useMessage();
    const {token} = useContext(AuthContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);

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
            const mess = window.confirm('Вы уверены, что хотите удалить пользователя?');

            if(mess === true){
                const deleteUser = await request(`/api/users/${id}`, 'DELETE', null, {
                    Authorization: `Bearer ${token}`
                });

                message(deleteUser.message);

                history.push('/');
            }
        }  catch (e) {}
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentWagons = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const changeUsersPerPage = selectRowsPerPage => setUsersPerPage(selectRowsPerPage);

    if(loading){
       return <Loader/>
    }

    return(
        <div className="card">
            <div className="card-header-table">
                <div className="table-icon">
                    <div style={{padding:"25px 0", textAlign:"center"}}>
                        <i className="fas fa-users" style={{color:"#ffff", fontSize:36}}/>
                    </div>
                </div>
                <label style={{marginLeft:10, letterSpacing: ".1rem"}}>Управление пользователями</label>
                <div className="div-btn-add-user">
                    <>
                        <Button className="btn-add-user" onClick={handleShow1}>
                            <i className="fas fa-user-plus" style={{color: 'black'}}/>
                        </Button>
                        <Modal show={show1} onHide={handleClose1} animation={false} centered>
                            <UserAddPage close={() => handleClose1()}/>
                        </Modal>
                    </>
                </div>
            </div>
            <div className="table-div table-responsive-xl">
                <table className="table">
                    <thead>
                    <tr style={{borderTop:"hidden"}}>
                        <th scope="col">№</th>
                        <th scope="col">Имя пользователя</th>
                        <th scope="col">Email</th>
                        <th scope="col">Роль</th>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {currentWagons.map((user,index) => {
                        return(
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role_name}</td>
                                <td style={{textAlign:"right"}}>
                                    <>
                                        <Button className="btn-table-users" onClick={handleShow}>
                                            <i className="fas fa-pen" style={{color: 'deepskyblue'}}/>
                                        </Button>
                                        <Modal show={show} onHide={handleClose} animation={false} centered>
                                            <UserUpdatePage users={user.id} close={() => handleClose()}/>
                                        </Modal>
                                    </>
                                    <Button className="btn-table-users" onClick={() => deleteHandler(user.id)}>
                                        <i className="fas fa-trash" style={{color: 'red'}}/>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <Pagination
                    rowsPerPage={usersPerPage}
                    totalRows={users.length}
                    paginate={paginate}
                    selectPerPage={changeUsersPerPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
};
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {Loader} from "../../components/Loader";
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
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const changeUsersPerPage = selectRowsPerPage => setUsersPerPage(selectRowsPerPage);

    if(loading){
       return <Loader/>
    }

    return(
        <div className="card" style={{marginTop:50, borderRadius:5}}>
            <div className="card-header-table">
                <div className="table-icon">
                    <div style={{padding:"25px 0", textAlign:"center"}}>
                        <i className="material-icons" style={{fontSize:36, color:"#fff"}}>supervisor_account</i>
                    </div>
                </div>
                <span style={{marginLeft:10, letterSpacing: ".1rem"}}>Управление пользователями</span>
                <div className="div-btn-add-user">
                    <button className="btn-floating waves-effect waves-light btn-add-user btn modal-trigger" data-target="modal1">
                        <i className="material-icons" style={{color:"#000"}}>group_add</i>
                    </button>
                    <div id="modal1" className="modal">
                        <UserAddPage />
                    </div>
                </div>
            </div>
            <div className="table-div-first">
                <div className="table-div-second">
                    <table className="table">
                        <thead>
                        <tr style={{borderTop:"hidden"}}>
                            <th>№</th>
                            <th>Имя пользователя</th>
                            <th>Email</th>
                            <th>Роль</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {currentUsers.map((user,index) => {
                            return(
                                <tr key={user.id}>
                                    <td>{index+1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role_name}</td>
                                    <td style={{textAlign:"right"}}>
                                        <button className="waves-effect waves-light btn-table-users modal-trigger" data-target="modal2">
                                            <i className="material-icons" style={{color:"#0288d1"}}>edit</i>
                                        </button>
                                        <div id="modal2" className="modal">
                                            <UserUpdatePage userId={user.id}/>
                                        </div>
                                        <button className="waves-effect waves-light btn-table-users" onClick={() => deleteHandler(user.id)}>
                                            <i className="material-icons" style={{color:"red"}}>delete</i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination
                rowsPerPage={usersPerPage}
                totalRows={users.length}
                paginate={paginate}
                selectPerPage={changeUsersPerPage}
                currentPage={currentPage}
            />
        </div>
    )
};
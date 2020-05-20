import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {Loader} from "../../components/Loader";
import {UserUpdatePage} from "./UserUpdatePage";
import {useMessage} from "../../hooks/message.hook";
import {UserAddPage} from "./UserAddPage";
import {Pagination} from "../../components/Pagination";
import M from "materialize-css";

export const UserPage = () => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const {loading, request} = useHttp();
    const message = useMessage();
    const {token, darkMode} = useContext(AuthContext);
    const [userId, setUserId] = useState({
        id: null, username: null, email: null
    });

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

    const getUserInfo = (id,username,email) => {
        setUserId({
            id: id, username:username, email:email
        });
    };

    useEffect(() => {
        const options = {
            onOpenStart: null,
            onOpenEnd: null,
            onCloseStart: null,
            onCloseEnd: null,
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };

        const modal = document.getElementById('modal2');
        M.Modal.init(modal, options);

        const instance = M.Modal.getInstance(modal);

        if(userId.id != null){
            instance.open();
        }
    }, [userId]);

    const closeModal = () => {
        if(userId.id != null){
            setUserId({
                id: null, username: null, email: null
            });
        }
    };

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
        <div className={darkMode ? "card card-dark" : "card card-light"}>
            <div className="card-header-table">
                <div className="row ch">
                    <div className="col l3">
                        <div className="table-icon">
                            <div style={{padding:"25px 0", textAlign:"center"}}>
                                <i className="material-icons" style={{fontSize:36, color:"#fff"}}>supervisor_account</i>
                            </div>
                        </div>
                        <span style={{marginLeft:10, letterSpacing: ".1rem"}}>Управление пользователями</span>
                    </div>
                    <div className="col l7">
                    </div>
                    <div className="col l2">
                        <div className="div-btn-add-user">
                            <button className={darkMode ? "btn-floating waves-effect waves-light btn-add-user-table-dark btn modal-trigger" : "btn-floating waves-effect waves-light btn-add-user btn modal-trigger"}
                                    data-target="modal1">
                                <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>group_add</i>
                            </button>
                            <div id="modal1" className="modal">
                                <UserAddPage />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-div-first">
                <div className={darkMode ? "table-div-second table-dark" : "table-div-second"}>
                    <div id="modal2" className="modal">
                        <UserUpdatePage userId={userId} close={closeModal}/>
                    </div>
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
                                        <button className="waves-effect waves-light btn-table-users" onClick={() => getUserInfo(user.id, user.username,user.email)}>
                                            <i className="material-icons" style={{color:"#0288d1"}}>edit</i>
                                        </button>
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
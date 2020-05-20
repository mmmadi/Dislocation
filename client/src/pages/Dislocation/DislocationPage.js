import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {Loader} from "../../components/Loader";
import {Pagination} from "../../components/Pagination";
import { WagonTrackingPostPage } from './WagonTrakingPostPage';
import "materialize-css";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export const DislocationPage = () => {
    const [wagons, setWagons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [wagonsPerPage, setWagonsPerPage] = useState(50);
    const {loading, request} = useHttp();
    const {token,userId, darkMode} = useContext(AuthContext);

    const fetchDislocation = useCallback(async () =>{
        try{
            const fetched = await request('/api/dislocation', 'POST', {userId:userId}, {
                Authorization: `Bearer ${token}`
            });
            setWagons(fetched)
        }catch (e) {}
    }, [token, userId, request]);

    useEffect(() =>{
        fetchDislocation();
    }, [fetchDislocation]);

    const indexOfLastWagon = currentPage * wagonsPerPage;
    const indexOfFirstWagon = indexOfLastWagon - wagonsPerPage;
    const currentWagons = wagons.slice(indexOfFirstWagon, indexOfLastWagon);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const changeWagonsPerPage = selectRowsPerPage => setWagonsPerPage(selectRowsPerPage);

    if(!wagons.length){
        return (
            <div className={darkMode ? "card card-dark" : "card card-light"}>
                <div className="card-header-table">
                    <div className="row ch">
                        <div className="col l3">
                            <div className="table-icon">
                                <div style={{padding:"25px 0", textAlign:"center"}}>
                                    <i className="material-icons" style={{fontSize:36, color:"#fff"}}>directions_transit</i>
                                </div>
                            </div>
                            <span>Дислокация вагонного парка</span>
                        </div>
                    </div>
                </div>
                <div className="table-div">
                    <Loader/>
                </div>
            </div>
        )
    } else {
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
                                    <i className="material-icons" style={{fontSize:36, color:"#fff"}}>directions_transit</i>
                                </div>
                            </div>
                            <span>Дислокация вагонного парка</span>
                        </div>
                        <div className="col l7">
                            <div className="input-field srch myinput-field">
                                <i className="material-icons prefix">search</i>
                                <input type="text" id="autocomplete-input" className="srch"/>
                                <label htmlFor="autocomplete-input">Поиск</label>
                            </div>
                        </div>
                        <div className="col l2">
                            <div className="div-btn-add-user">
                                <button className={darkMode ? "btn-floating waves-effect waves-light btn-add-user-table-dark btn modal-trigger" : "btn-floating waves-effect waves-light btn-add-user btn modal-trigger"}
                                        data-target="modal1">
                                    <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>add</i>
                                </button>
                                <div id="modal1" className="modal">
                                    <WagonTrackingPostPage />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-div-first">
                    <div className="table-div-second">
                        <TableContainer component={Paper}>
                        <Table className="table-wagons" aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell className="row-number">№</TableCell>
                                <TableCell className="carnumber">Номер вагона</TableCell>
                                <TableCell className="codesstfrom">Станция отправления</TableCell>
                                <TableCell className="codestdest">Станция назначения</TableCell>
                                <TableCell className="departure-date">Дата отправления</TableCell>
                                <TableCell className="codestcurrent">Станция текущей дислокации</TableCell>
                                <TableCell className="oper_date_last">Дата операции</TableCell>
                                <TableCell className="codeoper">Операция</TableCell>
                                <TableCell className="codecargo">Груз</TableCell>
                                <TableCell className="weight">Вес</TableCell>
                                <TableCell className="owner_name">Собственник</TableCell>
                                <TableCell className="operator_name">Оператор</TableCell>
                                <TableCell className="gruz_sender_name">Грузоотправитель</TableCell>
                                <TableCell className="gruz_receiver_name">Грузополучатель</TableCell>
                                <TableCell className="date_ins">Дата добавления на сервер</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {currentWagons.map((wagon) => (
                                <TableRow key={wagon.id}>
                                    <TableCell className="row-number">{wagon.rownumber}</TableCell>
                                    <TableCell className="carnumber"><a target="_blank" rel="noopener noreferrer" href={`/history/${wagon.carnumber}`}>{wagon.carnumber}</a></TableCell>
                                    <TableCell className="codestfrom">{wagon.codestfrom}</TableCell>
                                    <TableCell className="codestdest">{wagon.codestdest}</TableCell>
                                    <TableCell className="departure-date">{wagon.departure_date}</TableCell>
                                    <TableCell className="codestcurrent">{wagon.codestcurrent}</TableCell>
                                    <TableCell className="oper_date_last">{wagon.oper_date_last}</TableCell>
                                    <TableCell className="codeoper">{wagon.codeoper}</TableCell>
                                    <TableCell className="codecargo">{wagon.codecargo}</TableCell>
                                    <TableCell className="weight">{wagon.weight}</TableCell>
                                    <TableCell className="owner_name">{wagon.owner_name}</TableCell>
                                    <TableCell className="operator_name">{wagon.operator_name}</TableCell>
                                    <TableCell className="gruz_sender_name">{wagon.gruz_sender_name}</TableCell>
                                    <TableCell className="gruz_receiver_name">{wagon.gruz_receiver_name}</TableCell>
                                    <TableCell className="date_ins">{wagon.date_ins}</TableCell>

                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>

                    </div>
                </div>
                <Pagination
                     rowsPerPage={wagonsPerPage}
                     totalRows={wagons.length}
                     paginate={paginate}
                     selectPerPage={changeWagonsPerPage}
                     currentPage={currentPage}
                />
            </div>
        )
    }
};
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {Loader} from "../../components/Loader";
import Wagon from "../../images/wagon.png";
import {Pagination} from "../../components/Pagination";
import Modal from 'react-bootstrap/Modal';
import { WagonTrackingPostPage } from './WagonTrakingPostPage';


export const DislocationPage = () => {
    const [wagons, setWagons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [wagonsPerPage, setWagonsPerPage] = useState(50);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchDislocation = useCallback(async () =>{
        try{
            const fetched = await request('/api/dislocation', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setWagons(fetched)
        }catch (e) {}
    }, [token, request]);

    useEffect(() =>{
        fetchDislocation();
    }, [fetchDislocation]);

    const indexOfLastWagon = currentPage * wagonsPerPage;
    const indexOfFirstWagon = indexOfLastWagon - wagonsPerPage;
    const currentWagons = wagons.slice(indexOfFirstWagon, indexOfLastWagon);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const changeWagonsPerPage = selectRowsPerPage => setWagonsPerPage(selectRowsPerPage);

    const [show, setShow] = useState(false);
    const handleWagonTrakingClose = () => setShow(false);
    const handleWagonTrakingShow = () => setShow(true);

    if(!currentWagons.length){
        return (
            <div className="card">
                <div className="card-header-table">
                    <div className="table-icon">
                        <div style={{padding:"25px 0", textAlign:"center"}}>
                        <span>
                            <img src={Wagon} alt="tank"/>
                        </span>
                        </div>
                    </div>
                    <label style={{marginLeft:10, letterSpacing: ".1rem"}}>Дислокация вагонного парка</label>
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
            <div className="card">
                <div className="card-header-table">
                        
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-8">
                            <div className="table-icon">
                                <div style={{padding:"25px 0", textAlign:"center"}}>
                                    <span>
                                        <img src={Wagon} alt="tank"/>
                                    </span>
                                </div>
                            </div>
                                <label style={{marginLeft:10, letterSpacing: ".1rem"}}>Дислокация вагонного парка</label>
                        </div>
                        <div className="col">
                            <div className="center">
                                <button type="button" class="btn btn-secondary btn-circle" onClick={handleWagonTrakingShow}>
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <>
                                <Modal show={show} onHide={handleWagonTrakingClose} animation={false} centered>
                                    <WagonTrackingPostPage close={() => handleWagonTrakingClose()}/> 
                                </Modal>
                            </>
                        </div>
                    </div>
                </div>

                </div>
                <div className="table-div-first table-responsive-xl">
                    <div className="table-div-second">
                        <table className="table table-wagons">
                            <thead>
                            <tr style={{borderTop:"hidden"}}>
                                <td className="row-number">№</td>
                                <td className="carnumber">Номер вагона</td>
                                <td className="codestfrom">Станция отправления</td>
                                <td className="codestdest">Станция назначения</td>
                                <td className="departure-date">Дата отправления</td>
                                <td className="codestcurrent">Станция текущей дислокации</td>
                                <td className="oper_date_last">Дата операции</td>
                                <td className="codeoper">Операция</td>
                                <td className="codecargo">Груз</td>
                                <td className="weight">Вес</td>
                                <td className="owner_name">Собственник</td>
                                <td className="operator_name">Оператор</td>
                                <td className="gruz_sender_name">Грузоотправитель</td>
                                <td className="gruz_receiver_name">Грузополучатель</td>
                                <td className="date_ins">Дата добавления на сервер</td>
                            </tr>
                            </thead>
                            <tbody>
                            {currentWagons.map((wagon) => {
                                return(
                                    <tr key={wagon.id}>
                                        <th className="row-number">{wagon.rownumber}</th>
                                        <th className="carnumber"><Link to={`/history/${wagon.carnumber}`}>{wagon.carnumber}</Link></th>
                                        <th className="codestfrom">{wagon.codestfrom}</th>
                                        <th className="codestdest">{wagon.codestdest}</th>
                                        <th className="departure-date">{wagon.departure_date}</th>
                                        <th className="codestcurrent">{wagon.codestcurrent}</th>
                                        <th className="oper_date_last">{wagon.oper_date_last}</th>
                                        <th className="codeoper">{wagon.codeoper}</th>
                                        <th className="codecargo">{wagon.codecargo}</th>
                                        <th className="weight">{wagon.weight}</th>
                                        <th className="owner_name">{wagon.owner_name}</th>
                                        <th className="operator_name">{wagon.operator_name}</th>
                                        <th className="gruz_sender_name">{wagon.gruz_sender_name}</th>
                                        <th className="gruz_receiver_name">{wagon.gruz_receiver_name}</th>
                                        <th className="date_ins">{wagon.date_ins}</th>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
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
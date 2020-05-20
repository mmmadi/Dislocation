import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {Loader} from "../../components/Loader";
import {Pagination} from "../../components/Pagination";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";

export const HistoryWagonPaje = () =>{
    const [wagons, setWagons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [wagonsPerPage, setWagonsPerPage] = useState(50);
    const {loading, request} = useHttp();
    const {token, darkMode} = useContext(AuthContext);

    const carnum = useParams().id;

    const fetchHistory = useCallback(async () =>{
        try{
            const fetched = await request(`/api/history_wagon/${carnum}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setWagons(fetched)
        }catch (e) {}
    }, [token, carnum, request]);

    useEffect(() =>{
        fetchHistory();
    }, [fetchHistory]);

    const indexOfLastWagon = currentPage * wagonsPerPage;
    const indexOfFirstWagon = indexOfLastWagon - wagonsPerPage;
    const currentWagons = wagons.slice(indexOfFirstWagon, indexOfLastWagon);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const changeWagonsPerPage = selectRowsPerPage => setWagonsPerPage(selectRowsPerPage);


    if(!wagons.length){
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
                            <span>История операций вагона</span>
                        </div>
                    </div>
                </div>
                <div className="table-div">
                    <Loader/>
                </div>
            </div>
        )
    }
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
                        <span>История операций вагона</span>
                    </div>
                </div>
            </div>
            <div className="table-div-first">
                <div className={darkMode ? "table-div-second table-dark" : "table-div-second"}>
                    <table className="table-wagons">
                        <thead>
                        <tr style={{borderTop:"hidden"}}>
                            <th className="row-number">№</th>
                            <th className="carnumber">Номер вагона</th>
                            <th className="codestfrom">Станция отправления</th>
                            <th className="codestdest">Станция назначения</th>
                            <th className="departure-date">Дата отправления</th>
                            <th className="codestcurrent">Станция текущей дислокации</th>
                            <th className="oper_date_last">Дата операции</th>
                            <th className="codeoper">Операция</th>
                            <th className="codecargo">Груз</th>
                            <th className="weight">Вес</th>
                            <th className="owner_name">Собственник</th>
                            <th className="operator_name">Оператор</th>
                            <th className="gruz_sender_name">Грузоотправитель</th>
                            <th className="gruz_receiver_name">Грузополучатель</th>
                            <th className="date_ins">Дата добавления на сервер</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentWagons.map((wagon) => {
                            return(
                                <tr key={wagon.id}>
                                    <td className="row-number">{wagon.rownumber}</td>
                                    <td className="carnumber">{wagon.carnumber}</td>
                                    <td className="codestfrom">{wagon.codestfrom}</td>
                                    <td className="codestdest">{wagon.codestdest}</td>
                                    <td className="departure-date">{wagon.departure_date}</td>
                                    <td className="codestcurrent">{wagon.codestcurrent}</td>
                                    <td className="oper_date_last">{wagon.oper_date_last}</td>
                                    <td className="codeoper">{wagon.codeoper}</td>
                                    <td className="codecargo">{wagon.codecargo}</td>
                                    <td className="weight">{wagon.weight}</td>
                                    <td className="owner_name">{wagon.owner_name}</td>
                                    <td className="operator_name">{wagon.operator_name}</td>
                                    <td className="gruz_sender_name">{wagon.gruz_sender_name}</td>
                                    <td className="gruz_receiver_name">{wagon.gruz_receiver_name}</td>
                                    <td className="date_ins">{wagon.date_ins}</td>
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
};

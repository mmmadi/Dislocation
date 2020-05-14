import React, {useCallback, useContext, useEffect, useState} from 'react'
import Wagon from "../../images/wagon.png";
import {useParams} from "react-router-dom"
import {Loader} from "../../components/Loader";
import {Link} from "react-router-dom";
import {Pagination} from "../../components/Pagination";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";

export const HistoryWagonPaje = () =>{
    const [wagons, setWagons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [wagonsPerPage, setWagonsPerPage] = useState(50);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

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
            <div className="card">
                <div className="card-header-table">
                    <div className="table-icon">
                        <div style={{padding:"25px 0", textAlign:"center"}}>
                        <span>
                            <img src={Wagon} alt="tank"/>
                        </span>
                        </div>
                    </div>
                    <label style={{marginLeft:10, letterSpacing: ".1rem"}}>История операций вагона</label>
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
        <div className="card">
            <div className="card-header-table">
                <div className="table-icon">
                    <div style={{padding:"25px 0", textAlign:"center"}}>
                        <span>
                            <img src={Wagon} alt="tank"/>
                        </span>
                    </div>
                </div>
                <label style={{marginLeft:10, letterSpacing: ".1rem"}}>История операций вагона</label>
            </div>
            <div className="table-div-first">
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
                            <td className="date_ins">Дата добавления на сервер</td>
                            <td className="codeoper">Test1</td>
                            <td className="codeoper">test2</td>
                            <td className="codeoper">test3</td>
                        </tr>
                        </thead>
                        <tbody>
                        {wagons.map((wagon) => {
                            return(
                                <tr key={wagon.id}>
                                    <th className="row-number">{wagon.rownumber}</th>
                                    <th className="carnumber">{wagon.carnumber}</th>
                                    <th className="codestfrom">{wagon.codestfrom}</th>
                                    <th className="codestdest">{wagon.codestdest}</th>
                                    <th className="departure-date">{wagon.departure_date}</th>
                                    <th className="codestcurrent">{wagon.codestcurrent}</th>
                                    <th className="oper_date_last">{wagon.oper_date_last}</th>
                                    <th className="codeoper">{wagon.codeoper}</th>
                                    <th className="codecargo">{wagon.codecargo}</th>
                                    <th className="date_ins">{wagon.date_ins}</th>
                                    <th className="codeoper">test2</th>
                                    <th className="codeoper">test2</th>
                                    <th className="codeoper">test3</th>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    rowsPerPage={wagonsPerPage}
                    totalRows={wagons.length}
                    paginate={paginate}
                    selectPerPage={changeWagonsPerPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
};

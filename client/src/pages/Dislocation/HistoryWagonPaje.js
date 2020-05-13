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
    }, [token,carnum, request]);

    useEffect(() =>{
        fetchHistory();
    }, [fetchHistory]);

    if(!wagons.length){
        return <p>История пустая</p>
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
            <div className="table-div">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Номер вагона</th>
                        <th scope="col">Станция отправления</th>
                        <th scope="col">Станция назначения</th>
                        <th scope="col">Дата отправления</th>
                        <th scope="col">Станция текущей дислокации</th>
                        <th scope="col">Дата операции</th>
                        <th scope="col">Операция</th>
                        <th scope="col">Груз</th>
                        <th scope="col">Дата добавления на сервер</th>
                    </tr>
                    </thead>
                    <tbody>
                    {wagons.map((wagon,index) => {
                        return(
                            <tr key={wagon.id}>
                                <th scope="row">{index+1}</th>
                                <td>{wagon.carnumber}</td>
                                <td>{wagon.codestfrom}</td>
                                <td>{wagon.codestdest}</td>
                                <td>{wagon.departure_date}</td>
                                <td>{wagon.codestcurrent}</td>
                                <td>{wagon.oper_date_last}</td>
                                <td>{wagon.codeoper}</td>
                                <td>{wagon.codecargo}</td>
                                <td>{wagon.date_ins}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {/*<Pagination*/}
                {/*    rowsPerPage={wagonsPerPage}*/}
                {/*    totalRows={wagons.length}*/}
                {/*    paginate={paginate}*/}
                {/*    selectPerPage={changeWagonsPerPage}*/}
                {/*    currentPage={currentPage}*/}
                {/*/>*/}
            </div>
        </div>
    )
};
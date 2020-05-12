import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {Loader} from "../../components/Loader";
import Wagon from "../../images/wagon.png";
import {Pagination} from "../../components/Pagination";

export const DislocationPage = () => {
    const [wagons, setWagons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [wagonsPerPage, setWagonsPerPage] = useState(10);
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

    // const HistoryWagonPage = event =>{
    //     if(event.onClick){
    //         Console.log("Wagon History");
    //     }
    // }

    if(!currentWagons.length){
        return <p style={{textAlign:"center", marginTop: 10}}>Вагонов нет...</p>
    } else {
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
                    <label style={{marginLeft:10, letterSpacing: ".1rem"}}>Дислокация вагонного парка</label>
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
                        {currentWagons.map((wagon,index) => {
                            return(
                                <tr key={wagon.id}>
                                    <th scope="row">{index+1}</th>
                                    <td><Link to={`/history/${wagon.id}`}>{wagon.carnumber}</Link></td>
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
    }
};
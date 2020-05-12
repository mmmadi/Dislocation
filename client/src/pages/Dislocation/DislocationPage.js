import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {Loader} from "../../components/Loader";
import Wagon from "../../images/wagon.png";
import {Pagination} from "../../components/Pagination";

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
                    <table className="table table-wagons">
                        <thead>
                        <tr style={{borderTop:"hidden"}}>
                            <th scope="col" className="row-number">№</th>
                            <th scope="col" className="carnumber">Номер вагона</th>
                            <th scope="col" className="codestfrom">Станция отправления</th>
                            <th scope="col" className="codestdest">Станция назначения</th>
                            <th scope="col" className="departure-date">Дата отправления</th>
                            <th scope="col" className="codestcurrent">Станция текущей дислокации</th>
                            <th scope="col" className="oper_date_last">Дата операции</th>
                            <th scope="col" className="codeoper">Операция</th>
                            <th scope="col" className="codecargo">Груз</th>
                            <th scope="col" className="date_ins">Дата добавления на сервер</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentWagons.map((wagon) => {
                            return(
                                <tr key={wagon.id}>
                                    <th scope="row" className="row-number">{wagon.rownumber}</th>
                                    <td className="carnumber">{wagon.carnumber}</td>
                                    <td className="codestfrom">{wagon.codestfrom}</td>
                                    <td className="codestdest">{wagon.codestdest}</td>
                                    <td className="departure-date">{wagon.departure_date}</td>
                                    <td className="codestcurrent">{wagon.codestcurrent}</td>
                                    <td className="oper_date_last">{wagon.oper_date_last}</td>
                                    <td className="codeoper">{wagon.codeoper}</td>
                                    <td className="codecargo">{wagon.codecargo}</td>
                                    <td className="date_ins">{wagon.date_ins}</td>
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
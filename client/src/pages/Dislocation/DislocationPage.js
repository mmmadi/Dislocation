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
                        </tr>
                        </thead>
                        <tbody>
                        {currentWagons.map((wagon) => {
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
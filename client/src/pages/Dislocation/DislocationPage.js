import React, {useCallback, useContext, useEffect, useState, useMemo} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import {Loader} from "../../components/Loader";
import {Pagination} from "../../components/Pagination";
import { WagonTrackingPostPage } from './WagonTrakingPostPage';

const useSortableData = items => {
    const [sortConfig, setSortConfig] = useState("");
  
    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = key => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort };
  };

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

    const { items, requestSort } = useSortableData(currentWagons);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const changeWagonsPerPage = selectRowsPerPage => setWagonsPerPage(selectRowsPerPage);

    function myFunction() {
        const filter = document.querySelector('#myInput').value.toUpperCase();
        const trs = document.querySelectorAll('#myTable tbody tr');
        trs.forEach(tr => tr.style.display = [...tr.children].find(td => td.innerHTML.toUpperCase().includes(filter)) ? '' : 'none');
    }

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
                                <input type="text" id="myInput" className="srch" onKeyUp={myFunction}/>
                                <label htmlFor="myInput">Поиск</label>
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
                    <div className={darkMode ? "table-div-second table-dark" : "table-div-second"}>
                        <table className="table-wagons" id="myTable">
                            <thead>
                                <tr>
                                    <th className="row-number">№</th>
                                    <th className="carnumber">Номер вагона</th>
                                    <th className="codestfrom">Станция отправления</th>
                                    <th className="codestdest">Станция назначения</th>
                                    <th className="departure-date"><button onClick={()=>requestSort('departure_date')}>Дата отправления</button></th>
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
                            <tbody className={darkMode ? "tbody-dark" : "tbody-light"}>
                            {items.map((wagon) => (
                                <tr key={wagon.id}>
                                    <td className="row-number">{wagon.rownumber}</td>
                                    <td className="carnumber"><a target="_blank" rel="noopener noreferrer" href={`/history/${wagon.carnumber}`}>{wagon.carnumber}</a></td>
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
                            ))}
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
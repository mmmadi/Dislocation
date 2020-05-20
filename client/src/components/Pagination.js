import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/auth.context";
import M from "materialize-css"

export const Pagination = ({ rowsPerPage, totalRows, paginate, selectPerPage, currentPage }) => {
    const pageNumbers = [];
    const [page, setPage] = useState(1);
    const {darkMode} = useContext(AuthContext);

    for(let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++){
        pageNumbers.push(i);
    }

    const first = pageNumbers[0];
    const last = pageNumbers[pageNumbers.length-1];
    const previous = currentPage-1;
    const next = parseInt(currentPage)+1;

    const execFunc = () => {
        const optionState = document.getElementById('selectPag');
        const selectedValue = optionState.options[optionState.selectedIndex].value;

        selectPerPage(selectedValue);
        paginate(1);
    };

    const changeHandler = () => {
        const value = parseInt(document.getElementById("page").value);
        setPage(value);
    };

    const changeNumberOfPage = event => {
        if(event.key === 'Enter'){
            if(page > last){
                paginate(last);
                document.getElementById("page").value = '';
                document.getElementById("page").blur();
            } else {
                paginate(page);
                document.getElementById("page").value = '';
                document.getElementById("page").blur();
            }
        }
    };

    useEffect(()=>{
        M.AutoInit();
    });

    if(first === last){
        return(
            <div className="row">
                <div className="right">
                    <div className="col m4" style={darkMode ? {color:"#fff",paddingTop:11} : {color:"#000",paddingTop:11}}>
                        Строк на странице:
                    </div>
                    <div className={darkMode ? "col m2 dark-select" : "col m2"}>
                        <select id="selectPag" className="myselect" onChange={execFunc}>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value={totalRows}>Все</option>
                        </select>
                    </div>
                    <div className="col m3 input-numberofpage" style={darkMode ? {color:"#fff"} : {color:"#000"}}>
                        <input
                            type="text"
                            id="page"
                            name="page"
                            placeholder={currentPage}
                            style={{width:35}}
                            onChange={changeHandler}
                            onKeyPress={changeNumberOfPage}
                        /> из {last}
                    </div>
                    <div className="col m3" style={{paddingTop:3}}>
                        <button className={darkMode ? "waves-effect waves-light btn-chevron-left-right-dark" : "waves-effect waves-light btn-chevron-left-right"}
                                onClick={() => paginate(previous)} disabled>
                            <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>chevron_left</i>
                        </button>
                        <button className={darkMode ? "waves-effect waves-light btn-chevron-left-right-dark" : "waves-effect waves-light btn-chevron-left-right"}
                                onClick={() => paginate(next)} disabled>
                            <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>chevron_right</i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    else if(currentPage === last){
        return(
            <div className="row">
                <div className="right">
                    <div className="col m4" style={darkMode ? {color:"#fff",paddingTop:11} : {color:"#000",paddingTop:11}}>
                        Строк на странице:
                    </div>
                    <div className={darkMode ? "col m2 dark-select" : "col m2"}>
                        <select id="selectPag" className="myselect" onChange={execFunc}>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value={totalRows}>Все</option>
                        </select>
                    </div>
                    <div className="col m3 input-numberofpage" style={darkMode ? {color:"#fff"} : {color:"#000"}}>
                        <input
                            type="text"
                            id="page"
                            name="page"
                            placeholder={currentPage}
                            style={{width:35}}
                            onChange={changeHandler}
                            onKeyPress={changeNumberOfPage}
                        /> из {last}
                    </div>
                    <div className="col m3" style={{paddingTop:3}}>
                        <button className={darkMode ? "waves-effect waves-light btn-chevron-left-right-dark" : "waves-effect waves-light btn-chevron-left-right"}
                                onClick={() => paginate(previous)}>
                            <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>chevron_left</i>
                        </button>
                        <button className={darkMode ? "waves-effect waves-light btn-chevron-left-right-dark" : "waves-effect waves-light btn-chevron-left-right"}
                                onClick={() => paginate(next)} disabled>
                            <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>chevron_right</i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    else if(currentPage === 1 && currentPage !== last){
        return(
            <div className="row">
                <div className="right">
                    <div className="col m4" style={darkMode ? {color:"#fff",paddingTop:11} : {color:"#000",paddingTop:11}}>
                        Строк на странице:
                    </div>
                    <div className={darkMode ? "col m2 dark-select" : "col m2"}>
                        <select id="selectPag" className="myselect" onChange={execFunc}>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value={totalRows}>Все</option>
                        </select>
                    </div>
                    <div className="col m3 input-numberofpage" style={darkMode ? {color:"#fff"} : {color:"#000"}}>
                        <input
                            type="text"
                            id="page"
                            name="page"
                            placeholder={currentPage}
                            style={{width:35}}
                            onChange={changeHandler}
                            onKeyPress={changeNumberOfPage}
                        /> из {last}
                    </div>
                    <div className="col m3" style={{paddingTop:3}}>
                        <button className={darkMode ? "waves-effect waves-light btn-chevron-left-right-dark" : "waves-effect waves-light btn-chevron-left-right"}
                                onClick={() => paginate(previous)} disabled>
                            <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>chevron_left</i>
                        </button>
                        <button className={darkMode ? "waves-effect waves-light btn-chevron-left-right-dark" : "waves-effect waves-light btn-chevron-left-right"}
                                onClick={() => paginate(next)}>
                            <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>chevron_right</i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="row">
            <div className="right">
                <div className="col m4" style={darkMode ? {color:"#fff",paddingTop:11} : {color:"#000",paddingTop:11}}>
                    Строк на странице:
                </div>
                <div className={darkMode ? "col m2 dark-select" : "col m2"}>
                    <select id="selectPag" className="myselect" onChange={execFunc}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value={totalRows}>Все</option>
                    </select>
                </div>
                <div className="col m3 input-numberofpage" style={darkMode ? {color:"#fff"} : {color:"#000"}}>
                    <input
                        type="text"
                        id="page"
                        name="page"
                        placeholder={currentPage}
                        style={{width:35}}
                        onChange={changeHandler}
                        onKeyPress={changeNumberOfPage}
                    /> из {last}
                </div>
                <div className="col m3" style={{paddingTop:3}}>
                    <button className={darkMode ? "waves-effect waves-light btn-chevron-left-right-dark" : "waves-effect waves-light btn-chevron-left-right"}
                            onClick={() => paginate(previous)}>
                        <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>chevron_left</i>
                    </button>
                    <button className={darkMode ? "waves-effect waves-light btn-chevron-left-right-dark" : "waves-effect waves-light btn-chevron-left-right"}
                            onClick={() => paginate(next)}>
                        <i className="material-icons" style={darkMode ? {color:"#fff"} : {color:"#000"}}>chevron_right</i>
                    </button>
                </div>
            </div>
        </div>
    )
};
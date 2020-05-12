import React, {useState} from 'react';
import Button from "react-bootstrap/Button";

export const Pagination = ({ rowsPerPage, totalRows, paginate, selectPerPage, currentPage }) => {
    const pageNumbers = [];
    const [page, setPage] = useState(1);

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

    if(first === last){
        return(
            <nav>
                <div className="form-inline ml-auto float-right">
                    Строк на странице:
                    <select id="selectPag" className="custom-select" onChange={execFunc} style={{marginLeft:10, marginRight: 10}}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value={totalRows}>Все</option>
                    </select>
                    <input
                        className="form-control"
                        type="text"
                        id="page"
                        name="page"
                        placeholder={currentPage}
                        style={{width:65, marginRight:10}}
                        onChange={changeHandler}
                        onKeyPress={changeNumberOfPage}
                    /> из {last}
                    <div className="div-chevron-left">
                        <Button className="btn-chevron-left-right" onClick={() => paginate(previous)} disabled>
                            <i className="fas fa-chevron-left" style={{color:"black"}}/>
                        </Button>
                    </div>
                    <div className="div-chevron-right">
                        <Button className="btn-chevron-left-right" onClick={() => paginate(next)} disabled>
                            <i className="fas fa-chevron-right" style={{color:"black"}}/>
                        </Button>
                    </div>
                </div>
            </nav>
        )
    }
    else if(currentPage === last){
        return(
            <nav>
                <div className="form-inline ml-auto float-right">
                    Строк на странице:
                    <select id="selectPag" className="custom-select" onChange={execFunc} style={{marginLeft:10, marginRight: 10}}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value={totalRows}>Все</option>
                    </select>
                    <input
                        className="form-control"
                        type="text"
                        id="page"
                        name="page"
                        placeholder={currentPage}
                        style={{width:65, marginRight:10}}
                        onChange={changeHandler}
                        onKeyPress={changeNumberOfPage}
                    /> из {last}
                    <div className="div-chevron-left">
                        <Button className="btn-chevron-left-right" onClick={() => paginate(previous)}>
                            <i className="fas fa-chevron-left" style={{color:"black"}}/>
                        </Button>
                    </div>
                    <div className="div-chevron-right">
                        <Button className="btn-chevron-left-right" onClick={() => paginate(next)} disabled>
                            <i className="fas fa-chevron-right" style={{color:"black"}}/>
                        </Button>
                    </div>
                </div>
            </nav>
        )
    }
    else if(currentPage === 1 && currentPage !== last){
        return(
            <nav>
                <div className="form-inline ml-auto float-right">
                    Строк на странице:
                    <select id="selectPag" className="custom-select" onChange={execFunc} style={{marginLeft:10, marginRight: 10}}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value={totalRows}>Все</option>
                    </select>
                    <input
                        className="form-control"
                        type="text"
                        id="page"
                        name="page"
                        placeholder={currentPage}
                        style={{width:65, marginRight:10}}
                        onChange={changeHandler}
                        onKeyPress={changeNumberOfPage}
                    /> из {last}
                    <div className="div-chevron-left">
                        <Button className="btn-chevron-left-right" onClick={() => paginate(previous)} disabled>
                            <i className="fas fa-chevron-left" style={{color:"black"}}/>
                        </Button>
                    </div>
                    <div className="div-chevron-right">
                        <Button className="btn-chevron-left-right" onClick={() => paginate(next)}>
                            <i className="fas fa-chevron-right" style={{color:"black"}}/>
                        </Button>
                    </div>
                </div>
            </nav>
        )
    }
    return(
        <nav>
            <div className="form-inline ml-auto float-right">
                Строк на странице:
                <select id="selectPag" className="custom-select" onChange={execFunc} style={{marginLeft:10, marginRight: 10}}>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value={totalRows}>Все</option>
                </select>
                <input
                    className="form-control"
                    type="text"
                    id="page"
                    name="page"
                    placeholder={currentPage}
                    style={{width:65, marginRight:10}}
                    onChange={changeHandler}
                    onKeyPress={changeNumberOfPage}
                /> из {last}
                <div className="div-chevron-left">
                    <Button className="btn-chevron-left-right" onClick={() => paginate(previous)}>
                        <i className="fas fa-chevron-left" style={{color:"black"}}/>
                    </Button>
                </div>
                <div className="div-chevron-right">
                    <Button className="btn-chevron-left-right" onClick={() => paginate(next)}>
                        <i className="fas fa-chevron-right" style={{color:"black"}}/>
                    </Button>
                </div>
            </div>
        </nav>
    )
};
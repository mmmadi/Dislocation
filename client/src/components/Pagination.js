import React from 'react';
import Button from "react-bootstrap/Button";

export const Pagination = ({ rowsPerPage, totalRows, paginate, selectPerPage, currentPage }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++){
        pageNumbers.push(i);
    }

    const first = pageNumbers[0];
    const last = pageNumbers[pageNumbers.length-1];
    const next = currentPage+1;
    const previous = currentPage-1;


    const execFunc = () => {
        const optionState = document.getElementById('selectPag');
        const selectedValue = optionState.options[optionState.selectedIndex].value;

        selectPerPage(selectedValue);
    };

    if(first === last){
        return(
            <nav>
                <div className="form-inline ml-auto float-right">
                    Строк на странице:
                    <select id="selectPag" className="custom-select" onChange={execFunc} style={{marginLeft:10, marginRight: 10}}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="999">Все</option>
                    </select>
                    {currentPage} из {last}
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
                    {/*// <ul className="pagination" style={{marginBottom: 0}}>*/}
                    {/*//     {pageNumbers.map(number => (*/}
                    {/*//         <li key={number} className="page-item">*/}
                    {/*//             <a href="#" className="page-link" onClick={() => paginate(number)}>*/}
                    {/*//                 {number}*/}
                    {/*//             </a>*/}
                    {/*//         </li>*/}
                    {/*//     ))}*/}
                    {/*// </ul>*/}
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
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="999">Все</option>
                    </select>
                    {currentPage} из {last}
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
                    {/*// <ul className="pagination" style={{marginBottom: 0}}>*/}
                    {/*//     {pageNumbers.map(number => (*/}
                    {/*//         <li key={number} className="page-item">*/}
                    {/*//             <a href="#" className="page-link" onClick={() => paginate(number)}>*/}
                    {/*//                 {number}*/}
                    {/*//             </a>*/}
                    {/*//         </li>*/}
                    {/*//     ))}*/}
                    {/*// </ul>*/}
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
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="999">Все</option>
                    </select>
                    {currentPage} из {last}
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
                    {/*// <ul className="pagination" style={{marginBottom: 0}}>*/}
                    {/*//     {pageNumbers.map(number => (*/}
                    {/*//         <li key={number} className="page-item">*/}
                    {/*//             <a href="#" className="page-link" onClick={() => paginate(number)}>*/}
                    {/*//                 {number}*/}
                    {/*//             </a>*/}
                    {/*//         </li>*/}
                    {/*//     ))}*/}
                    {/*// </ul>*/}
                </div>
            </nav>
        )
    }
    return(
        <nav>
            <div className="form-inline ml-auto float-right">
                Строк на странице:
                <select id="selectPag" className="custom-select" onChange={execFunc} style={{marginLeft:10, marginRight: 10}}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="999">Все</option>
                </select>
                {currentPage} из {last}
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
                {/*// <ul className="pagination" style={{marginBottom: 0}}>*/}
                {/*//     {pageNumbers.map(number => (*/}
                {/*//         <li key={number} className="page-item">*/}
                {/*//             <a href="#" className="page-link" onClick={() => paginate(number)}>*/}
                {/*//                 {number}*/}
                {/*//             </a>*/}
                {/*//         </li>*/}
                {/*//     ))}*/}
                {/*// </ul>*/}
            </div>
        </nav>
    )
};
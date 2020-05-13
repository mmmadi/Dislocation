import React, {useCallback, useContext, useEffect, useState} from 'react'

export const HistoryWagonPaje = () =>{

    return(
        <div className="card">
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
                    <tr>
                        <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>
    )
}
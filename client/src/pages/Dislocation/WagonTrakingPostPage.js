import React, {useEffect, useState, useContext, useCallback} from 'react'
import { sanitizeCookie } from 'express-validator'

export const WagonTrackingPostPage = ({close}) => {

    return(
        <div className="card-body" style={{padding: '2 rem'}}>
            <div className="form-group">
                <input
                    type="number"
                    className="form-control"
                    id="wagon_id"
                    name="wagon_num"
                    placeholder="Номер вагона"
                />
            </div>
            <div className="form-group">
                <input
                    type="date"
                    className="form-control"
                    id="date_from"
                    name="date_from"
                    placeholder="Дата отбытия"
                />
            </div>
            <div className="form-group">
                <input
                    type="date"
                    className="form-control"
                    id="date_to"
                    name="date_to"
                    placeholder="Дата прибытия"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="station_from"
                    name="station_form"
                    placeholder="Начальная станция прибытия"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="station_to"
                    name="station_to"
                    placeholder="Конечная станция прибытия"
                />
            </div>
                <div className="card-actions">
                    <button
                        type="submit"
                        className="btn-save"
                    >
                        сохранить
                    </button>
                    <button 
                        type="button" 
                        className="btn-cancel" 
                        onClick={close}
                    >
                        отмена
                    </button>
                </div>
            </div>
    )
}
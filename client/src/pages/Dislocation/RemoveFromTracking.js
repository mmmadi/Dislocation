import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/auth.context";

export const RemoveFromTracking = () => {

    const {darkMode} = useContext(AuthContext);

    return(
        <div className={darkMode ? "card-content white-text modal-card-dark" : "card-content white-text modal-card-light"}>
            <div className="input-field myinput-field">
                <input
                    id="client_id"
                    name="wagon_num"
                    type="number"
                    className="validate"
                />
                <label htmlFor="wagon_id">Снятие вагона со слежения</label>
            </div>
            <div className={darkMode ? "modal-footer modal-card-dark" : "modal-footer"}>
                <button className="btn waves-effect waves-light w-25 blue darken-2" style={{marginRight:10}}>
                    Снять
                </button>
                <button className="btn waves-effect waves-light grey lighten-4 z-depth-2 font-weight-bold btn-logout modal-close">
                    Отмена
                </button>
            </div>
        </div>
    );
}
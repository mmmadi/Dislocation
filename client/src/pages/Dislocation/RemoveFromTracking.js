import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/auth.context";

export const RemoveFromTracking = () => {

    const {darkMode} = useContext(AuthContext);

    return(
        <div className={darkMode ? "card-content my-card-content white-text modal-card-dark" : "card-content my-card-content white-text modal-card-light"}>
            <div class="modal-content">
                <div class="input-field col s12">
                    <select multiple>
                        <option value="" disabled selected>Выберите вагоны</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                    <label>Materialize Multiple Select</label>
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
        </div>
    );
}
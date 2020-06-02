import React, {useContext, useState} from 'react'
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";


export const RemoveFromTracking = () => {

    const message = useMessage();
    const {loading, request} = useHttp();
    const [clientId, setClientId] = useState(0);
    const {darkMode} = useContext(AuthContext);
    
    const changeHandler = () =>{
        const value = document.getElementById("wagon_id").value;
        setClientId(value);
        console.log(clientId)
    }

    const removeWagon = async () => {
        try {
            const data = await request('/api/wagon_remove', 'POST', {wagon_ids:clientId});
            message(data);
        } catch (e) {
            console.log(e.message);
        }
    }

    return(
        <div className={darkMode ? "card-content white-text modal-card-dark" : "card-content white-text modal-card-light"}>
            <div className="input-field myinput-field">
                <input
                    id="wagon_id"
                    name="wagon_num"
                    type="number"
                    className="validate"
                    onChange={changeHandler}
                />
                <label htmlFor="wagon_id">Снятие вагона со слежения</label>
            </div>
            <div className={darkMode ? "modal-footer modal-card-dark" : "modal-footer"}>
                <button onClick={removeWagon} disabled={loading} className="btn waves-effect waves-light w-25 blue darken-2" style={{marginRight:10}}>
                    Снять
                </button>
                <button className="btn waves-effect waves-light grey lighten-4 z-depth-2 font-weight-bold btn-logout modal-close">
                    Отмена
                </button>
            </div>
        </div>
    );
}
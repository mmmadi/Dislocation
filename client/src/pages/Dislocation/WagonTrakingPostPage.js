import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";

export const WagonTrackingPostPage = ({close}) => {
    const message = useMessage();
    const {loading,request} = useHttp();
    const [carnum, setCarnum] = useState(0);

    const changeHandler = () => {
        const value = document.getElementById("wagon_id").value;
        setCarnum(value);
    };

    const addWagon = async () => {
        try{
            const data = await request('/api/wagon_tracking', 'POST', {wagon_num:carnum});
            message(data);
        }catch (e) {}
    };

    return(
        <div className="card-body" style={{padding: '2 rem'}}>
            <div className="form-group">
                <input
                    type="number"
                    className="form-control"
                    id="wagon_id"
                    name="wagon_num"
                    placeholder="Номер вагона"
                    onChange={changeHandler}
                />
            </div>
            <div className="card-actions">
                <Button
                    type="submit"
                    className="btn-save"
                    onClick={addWagon}
                    disabled={loading}
                >
                    сохранить
                </Button>
                <Button
                    type="button"
                    className="btn-cancel"
                    onClick={close}
                >
                    отмена
                </Button>
            </div>
        </div>
    )
};
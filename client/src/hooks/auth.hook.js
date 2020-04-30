import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData';

export const useAth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [roleId, setRoleId] = useState(null);

    //функция логин
    const login = useCallback( (jwtToken, id, role_id) => {
        setToken(jwtToken);
        setUserId(id);
        setRoleId(role_id);

        localStorage.setItem(storageName, JSON.stringify({
            userId:id, token:jwtToken, roleId: role_id
        }))
    }, []);

    //функция логаут
    const logout = useCallback( () => {
        setToken(null);
        setUserId(null);
        setRoleId(null);
        localStorage.removeItem(storageName);
    }, []);

    // проверка есть ли данные в localstorage
    // если есть, то токен и userId берем из localStorage
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName));

        if(data && data.token){
            login(data.token, data.userId, data.roleId);
        }
    },[login]);

    return {login, logout, token, userId, roleId}
};
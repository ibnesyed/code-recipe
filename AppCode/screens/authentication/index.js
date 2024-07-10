import React, { useState } from "react";
import Login from "./Login";
import { setToast, signIn } from "../../store/actions";
import { useDispatch, useSelector } from 'react-redux'
import { getUniqueId, getManufacturer } from 'react-native-device-info';

const Authentication = () => {
    const dispatch = useDispatch();
    const [isConfigActive, setIsConfigActive] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [server, setServer] = useState("");
    const [isCustomServer, setIsCustomServer] = useState(false);
    const onSumbit = async () => {
        if (!userName) {
            dispatch(setToast("error", "Please Enter User Name"))
            return
        }
        if (!password) {
            dispatch(setToast("error", "Please Enter Password"))
            return
        }
        let deviceID = await getUniqueId();
        dispatch(signIn({ userName, password, deviceID }))
    }

    return (
        <Login
            isConfigActive={isConfigActive}
            setIsConfigActive={setIsConfigActive}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            userName={userName}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
            server={server}
            setServer={setServer}
            isCustomServer={isCustomServer}
            setIsCustomServer={setIsCustomServer}
            onSumbit={onSumbit}
        />
    )
};

export default React.memo(Authentication);

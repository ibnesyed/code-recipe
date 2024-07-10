// http://web.teletix.pk:1949/api/user/SetFirebaseToken?t=300031002C00340038002C00330038003300350033003100&fbt=abc
import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
import messaging from '@react-native-firebase/messaging'

const { SEND_FCM_TOKEN, FETCH_FCM_TOKEN, REMOVE_FCM_TOKEN, SING_IN } = types

export const getFCMToken = (callback) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_FCM_TOKEN.start });
        messaging()
            .getToken().then((token) => {
                console.log(token)
                dispatch({ type: FETCH_FCM_TOKEN.success, fcmToken: token });
                if (callback) {
                    callback(true)
                }
            }).catch((er) => {
                // console.log(er)
                dispatch({ type: FETCH_FCM_TOKEN.failed });
            })
        return;
    } catch (error) {
        dispatch({ type: FETCH_FCM_TOKEN.failed });
    }
};


export const sendFCMTokenToServer = (data) => async (dispatch) => {
    // const token = await store.getState().auth.token;
    // console.log(data)
    const { userName, password, deviceID, token } = data;
    try {
        const fcmToken = await store.getState().fcm.fcmToken
        dispatch({ type: SEND_FCM_TOKEN.start });
        // console.log(`http://web.teletix.pk:1949/api/User/verify2?uname=${userName}&pwd=${password}&token=${token}&deviceInf=${deviceID}&fbToken=${fcmToken}`)
        const res = await httpRequest.get(`User/verify2?uname=${userName}&pwd=${password}&token=${token}&deviceInf=${deviceID}&fbToken=${fcmToken}`)
        // const res = await httpRequest.get(`user/SetFirebaseToken?t=${token}&fbt=${fcmToken}`)
        // console.log("res=================================", res.data)
        dispatch({ type: SING_IN.success, token });
        dispatch({ type: SEND_FCM_TOKEN.success });
        return;
    } catch (error) {
        dispatch({ type: SEND_FCM_TOKEN.failed });
        dispatch({ type: SING_IN.failed });
    }
};


export const removeFCMTokenFromServer = () => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_FCM_TOKEN.start });
        dispatch({ type: REMOVE_FCM_TOKEN.success });
        return;
    } catch (error) {
        dispatch({ type: REMOVE_FCM_TOKEN.failed });
    }
};



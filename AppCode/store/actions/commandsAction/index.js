import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
const { SEND_COMMAND } = types

export const immoblizerOnCommand = (data) => async (dispatch) => {
    const { cmpId, DeviceId, tpin } = data;
    dispatch({ type: SEND_COMMAND.start });
    const token = await store.getState().auth.token
    try {
        // console.log(`http://web.teletix.pk:1949/api/CmdCtrl/ImoblizerOn?cmpId=${cmpId}&deviceId=${DeviceId}`)
        // console.log(`http://web.teletix.pk:1949/api/mobile/CmdImoblizerOn?t=${token}&deviceId=${DeviceId}&tpin=${tpin}`)
        const res = await httpRequest.get(`mobile/CmdImoblizerOn?t=${token}&deviceId=${DeviceId}&tpin=${tpin}`)
        if (res?.data?.error) {
            throw new Error(res.data.error)
        }
        if (res?.data?.message === "sent") {
            dispatch(setToast("success", "Command Sent"))
            dispatch({ type: SEND_COMMAND.success });
        } else {
            dispatch(setToast("error", res?.data?.message || "Error"))
            dispatch({ type: SEND_COMMAND.failed });
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: SEND_COMMAND.failed });
    }
};

export const locationCommand = (data) => async (dispatch) => {
    const { cmpId, DeviceId, tpin } = data;
    dispatch({ type: SEND_COMMAND.start });
    const token = await store.getState().auth.token
    try {
        // console.log(`http://web.teletix.pk:1949/api/mobile/CmdLocation?t=${token}&deviceId=${DeviceId}&tpin=${tpin}`)
        const res = await httpRequest.get(`mobile/CmdLocation?t=${token}&deviceId=${DeviceId}&tpin=${tpin}`)
        // console.log(`http://web.teletix.pk:1949/api/CmdCtrl/location?cmpId=${cmpId}&deviceId=${DeviceId}`)
        // const res = await httpRequest.get(`CmdCtrl/location?cmpId=${cmpId}&deviceId=${DeviceId}`)
        if (res?.data?.error) {
            throw new Error(res.data.error)
        }
        if (res?.data?.message === "sent") {
            dispatch(setToast("success", "Command Sent"))
            dispatch({ type: SEND_COMMAND.success });
        } else {
            dispatch(setToast("error", res?.data?.message || "Error"))
            dispatch({ type: SEND_COMMAND.failed });
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: SEND_COMMAND.failed });
    }
};

export const immoblizerOffCommand = (data) => async (dispatch) => {
    const { cmpId, DeviceId, tpin } = data;
    dispatch({ type: SEND_COMMAND.start });
    const token = await store.getState().auth.token
    try {
        // console.log(`http://web.teletix.pk:1949/api/mobile/CmdImoblizerOff?t=${token}&deviceId=${DeviceId}&tpin=${tpin}`)
        const res = await httpRequest.get(`mobile/CmdImoblizerOff?t=${token}&deviceId=${DeviceId}&tpin=${tpin}`)
        // console.log(`http://web.teletix.pk:1949/api/CmdCtrl/ImoblizerOff?cmpId=${cmpId}&deviceId=${DeviceId}`)
        // const res = await httpRequest.get(`CmdCtrl/ImoblizerOff?cmpId=${cmpId}&deviceId=${DeviceId}`)
        if (res?.data?.error) {
            throw new Error(res.data.error)
        }
        if (res?.data?.message === "sent") {
            dispatch(setToast("success", "Command Sent"))
            dispatch({ type: SEND_COMMAND.success });
        } else {
            dispatch(setToast("error", res?.data?.message || "Error"))
            dispatch({ type: SEND_COMMAND.failed });
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: SEND_COMMAND.failed });
    }
};
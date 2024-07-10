import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
const { GET_LIVE_DATA, ADD_FILTER, GET_SINGLE_VEHICLE_DATA, GET_TRIP_REPLAY_DATA, GET_DEVICE_DETAILS } = types

export const getDeviceDetailsByID = (DeviceId, callback) => async (dispatch) => {
    dispatch({ type: GET_DEVICE_DETAILS.start });
    try {
        const token = await store.getState().auth.token
        // console.log(`http://web.teletix.pk:1949/api/mobile/DeviceDetail?t=${token}&deviceId=${DeviceId}`)
        const res = await httpRequest.get(`mobile/DeviceDetail?t=${token}&deviceId=${DeviceId}`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            throw new Error(res.data[0].Message)
        }
        if (res && res.data && Array.isArray(res.data)) {
            let deviceDetails = res.data[0]
            dispatch({ type: GET_DEVICE_DETAILS.success, deviceDetails });
            if (callback) {
                callback(true)
            }
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_DEVICE_DETAILS.failed });
    }
};

export const getLiveData = () => async (dispatch) => {
    // console.log("====================")
    dispatch({ type: GET_LIVE_DATA.start });
    try {
        const token = await store.getState().auth.token
        //old
        // http://web.teletix.pk:1949/api/live/status?a=1&t=300031002C00310030002C003100300033003100
        // const res = await httpRequest.get(`live/status?a=1&t=${token}`)
        //new
        // http://web.teletix.pk:1949/api/mobile/FleetStatus?t=300032002C0030002C003100300038003700330038003300&a=1
        const res = await httpRequest.get(`mobile/FleetStatus?t=${token}&a=1`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            throw new Error(res.data[0].Message)
        }
        if (res && res.data && Array.isArray(res.data)) {
            let liveData = res.data
            dispatch({ type: GET_LIVE_DATA.success, liveData });
            dispatch({ type: ADD_FILTER.success, filter: "" });
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_LIVE_DATA.failed });
    }
};


export const addFilterForLiveDataInReducer = (val) => async (dispatch) => {
    dispatch({ type: ADD_FILTER.success, filter: val });
}


export const getSingleVehicleData = (DeviceID, loading, callback) => async (dispatch) => {
    dispatch({ type: GET_SINGLE_VEHICLE_DATA.start, vehicle_loader: loading });
    try {
        const token = await store.getState().auth.token
        //old
        // http://web.teletix.pk:1949/api/live/status?a=1&t=300031002C00310030002C003100300033003100
        // const res = await httpRequest.get(`live/status?a=1&t=${token}`)
        //new
        // http://web.teletix.pk:1949/api/mobile/FleetStatus?t=300032002C0030002C003100300038003700330038003300&a=1
        const res = await httpRequest.get(`mobile/DeviceStatus?t=${token}&deviceId=${DeviceID}`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            throw new Error(res.data[0].Message)
        }
        if (res && res.data && Array.isArray(res.data)) {
            let vehicle_data = res.data[0]
            dispatch({ type: GET_SINGLE_VEHICLE_DATA.success, vehicle_data });
            if (callback) {
                callback(true)
            }
            // dispatch({ type: ADD_FILTER.success, filter: "" });
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_SINGLE_VEHICLE_DATA.failed });
    }
};

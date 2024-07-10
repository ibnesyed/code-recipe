import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
const { GET_TRIP_REPLAY_DATA, GET_HISTORY_REPLAY_DATA, SET_DATE_TIME_FROM, SET_DATE_TIME_TO, CLEAR_DATE_TIME, GET_ONE_TRIP_DETAILS } = types


export const setDateTimeFrom = (value) => async (dispatch) => {
    try {
        dispatch({ type: SET_DATE_TIME_FROM.success, dateTimeFrom: value });
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: CLEAR_DATE_TIME.success });
    }
}

export const setDateTimeTo = (value, callback) => async (dispatch) => {
    try {
        dispatch({ type: SET_DATE_TIME_TO.success, dateTimeTo: value });
        if (callback) {
            callback()
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: CLEAR_DATE_TIME.success });
    }
}

export const clearDateTime = () => async (dispatch) => {
    dispatch({ type: CLEAR_DATE_TIME.success });
}



export const getVehicleHistoryReplayData = (obj, callback) => async (dispatch) => {
    const { VehicleId, dateTimeFrom, dateTimeTo } = obj;
    const token = await store.getState().auth.token

    // const VehicleId = "52225";
    // const dateTimeFrom = "2023-05-03%2000:00:00";
    // const dateTimeTo = "2023-05-03%2023:59:59";
    // http://web.teletix.pk:1949/api/mobile/VehicleHistoryReplay?t=300032002C0030002C003200340033003700310033003300&vehId=22302&dateTime1=2023-05-13 08:03:41&dateTime2=2023-05-13 
    // http://web.teletix.pk:1949/api/mobile/VehicleHistoryReplay?cmpId=1&vehId=52225&dateTime1=2023-05-03%2000:00:00&dateTime2=2023-05-03%2023:59:59
    dispatch({ type: GET_HISTORY_REPLAY_DATA.start });
    try {
        // const token = await store.getState().auth.token
        // const res = await httpRequest.get(`mobile/VehicleHistoryReplay?cmpId=1&vehId=52225&dateTime1=2023-05-03%2000:00:00&dateTime2=2023-05-03%2023:59:59`)
        // console.log(`http://web.teletix.pk:1949/api/mobile/VehicleHistoryReplay?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}`)
        const res = await httpRequest.get(`mobile/VehicleHistoryReplay?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}`)

        if (res && res.data) {
            let { TripReplay } = res.data;
            if (TripReplay && TripReplay.length) {
                dispatch({ type: GET_HISTORY_REPLAY_DATA.success, tripData: res.data });
                if (callback) {
                    callback(true)
                }
            } else {
                dispatch(setToast("error", "Data not found"))
                dispatch({ type: GET_HISTORY_REPLAY_DATA.failed });
                if (callback) {
                    callback(false)
                }
            }
        } else {
            dispatch(setToast("error", "Data not found"))
            dispatch({ type: GET_HISTORY_REPLAY_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_HISTORY_REPLAY_DATA.failed });
    }
}

export const getTripReplayList = (obj, callback) => async (dispatch) => {
    const { VehicleId, dateTimeFrom, dateTimeTo, fuelUnitPrice } = obj;
    const token = await store.getState().auth.token
    // const VehicleId = "52225";
    // const dateTimeFrom = "2023-05-03%2000:00:00";
    // const dateTimeTo = "2023-05-03%2023:59:59";
    // http://web.teletix.pk:1949/api/mobile/VehicleTrips?t=300032002C0030002C003200340033003700310033003300&vehId=22302&dateTime1=2023-05-12%2000:00:00&dateTime2=2023-05-13%2016:40:50&fuelUnitPrice=262
    // http://web.teletix.pk:1949/api/mobile/VehicleTrips?cmpId=1&vehId=52225&dateTime1=2023-05-03%2000:00:00&dateTime2=2023-05-03%2023:59:59
    dispatch({ type: GET_TRIP_REPLAY_DATA.start });
    try {
        // const token = await store.getState().auth.token
        // const res = await httpRequest.get(`mobile/VehicleTrips?cmpId=1&vehId=52225&dateTime1=2023-05-03%2000:00:00&dateTime2=2023-05-03%2023:59:59`)
        const res = await httpRequest.get(`mobile/VehicleTrips?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}&fuelUnitPrice=${fuelUnitPrice}`)

        if (res && res.data && res.data.length) {
            dispatch({ type: GET_TRIP_REPLAY_DATA.success, TripReplayList: res.data });
            if (callback) {
                callback(true)
            }
        } else {
            dispatch(setToast("error", "Data not found"))
            dispatch({ type: GET_TRIP_REPLAY_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_TRIP_REPLAY_DATA.failed });
    }
}

export const getTripReplay = (obj, selectedDataForOneTrip, callback) => async (dispatch) => {
    const { VehicleId, cmp_id, dateTimeFrom, dateTimeTo } = obj;
    const token = await store.getState().auth.token
    // const VehicleId = "52225";
    // const dateTimeFrom = "2023-05-03%2000:00:00";
    // const dateTimeTo = "2023-05-03%2023:59:59";
    // const cmp_id = "1"
    dispatch({ type: GET_ONE_TRIP_DETAILS.start });
    // http://web.teletix.pk:1949/api/mobile/VehicleTripReplay?t=300032002C0030002C003200340033003700310033003300&vehId=22302&dateTime1=2023-05-13%2008:03:41&dateTime2=2023-05-13%2008:24:38
    try {
        const res = await httpRequest.get(`mobile/VehicleTripReplay?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}`)
        if (res && res.data && res.data.length) {
            dispatch({ type: GET_ONE_TRIP_DETAILS.success, OneTripData: res.data, selectedDataForOneTrip });
        } else {
            dispatch(setToast("error", "Data not found"))
            dispatch({ type: GET_ONE_TRIP_DETAILS.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_ONE_TRIP_DETAILS.failed });
    }
}

export const clearOneTripReplay = () => async (dispatch) => {
    dispatch({ type: GET_ONE_TRIP_DETAILS.success, OneTripData: [], selectedDataForOneTrip: {}});
}
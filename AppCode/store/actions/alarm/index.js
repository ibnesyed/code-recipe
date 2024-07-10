import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
const { GET_ALARM_DATA, GET_ALARM_DATA_COUNT } = types;

export const getAlarmData = (callback) => async (dispatch) => {
    const token = await store.getState().auth.token
    if (callback) {
        dispatch({ type: GET_ALARM_DATA.start });
    }
    try {
        const res = await httpRequest.get(`mobile/FleetAlarms?t=${token}&a=${!!callback ? 1 : 0}`)
        if (res?.data && res?.data[0].Message) {
            if (callback) {
                dispatch({ type: GET_ALARM_DATA.failed });
                dispatch(setToast("error", res.data[0].Message))
                callback(false)
            }
        } else if (res?.data) {
            if (callback) {
                dispatch({ type: GET_ALARM_DATA.success, alarms: res.data });
                callback(true)
            } else {
                dispatch({ type: GET_ALARM_DATA_COUNT.success, alarmsCount: res?.data?.length || 0 });
            }
        }
        else {
            if (callback) {
                dispatch(setToast("error", "Data not found"))
                dispatch({ type: GET_ALARM_DATA.failed });
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
            dispatch(setToast("error", error.message))
            dispatch({ type: GET_ALARM_DATA.failed });
        }
    }
}
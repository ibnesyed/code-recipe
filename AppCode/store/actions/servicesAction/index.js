import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
const { GET_SERVICES } = types


export const getServicesByID = (VehicleId, callback) => async (dispatch) => {
    dispatch({ type: GET_SERVICES.start });
    try {
        const token = await store.getState().auth.token
        // console.log(`http://web.teletix.pk:1949/api/mobile/services?t=${token}&vehId=${VehicleId}`)
        const res = await httpRequest.get(`mobile/services?t=${token}&vehId=${VehicleId}`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            throw new Error(res.data[0].Message)
        }
        if (res && res.data && Array.isArray(res.data)) {
            let servicesData = res.data
            dispatch({ type: GET_SERVICES.success, servicesData });
            if (callback) {
                callback(true)
            }
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_SERVICES.failed });
    }
};


export const enableDisableService = (VehicleId, filter, callback) => async (dispatch) => {
    dispatch({ type: GET_SERVICES.start });
    try {
        const token = await store.getState().auth.token
        // console.log(`http://web.teletix.pk:1949/api/mobile/ServicesApply?t=${token}&vehId=${VehicleId}&list=${filter}`) // 90:N,47:N
        const res = await httpRequest.get(`mobile/ServicesApply?t=${token}&vehId=${VehicleId}&list=${filter}`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            if (res.data[0].Message === "Succcess") {
                dispatch(getServicesByID(VehicleId))
            } else {
                throw new Error(res.data[0].Message)
            }
        }

    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_SERVICES.failed });
    }
};
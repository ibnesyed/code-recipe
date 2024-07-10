import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
const { GET_DASHBOARD_DATA, GET_OutOfZone, GET_Today_Trip, GET_OverDue } = types


export const getDashboardData = () => async (dispatch) => {
    dispatch({ type: GET_DASHBOARD_DATA.start });
    try {
        const token = await store.getState().auth.token
        // http://web.teletix.pk:1949/api/mobile/FleetDashboard?t=300032002C0030002C003100300032003700350038003400&fc=274&f=Y
        const res = await httpRequest.get(`mobile/FleetDashboard?t=${token}&fc=274&f=Y`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            throw new Error(res.data[0].Message)
        }
        if (res && res.data) {
            let data = res.data
            dispatch({ type: GET_DASHBOARD_DATA.success, DrivingBehaviour: data.DrivingBehaviour, DashBoard: data.DashBoard[0] });
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_DASHBOARD_DATA.failed });
    }
};


export const getFLeetOutOfZone = () => async (dispatch) => {
    dispatch({ type: GET_OutOfZone.start });
    try {
        const token = await store.getState().auth.token
        // http://web.teletix.pk:1949/api/mobile/FleetFenceOutList?t=300031002C00370035002C00320031003900360035003000

        const res = await httpRequest.get(`mobile/FleetFenceOutList?t=${token}`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            throw new Error(res.data[0].Message)
        }
        if (res && res.data) {
            let data = res.data
            dispatch({ type: GET_OutOfZone.success, OutOfZoneList: data });
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_OutOfZone.failed });
    }
};

export const getTodayTrips = () => async (dispatch) => {
    dispatch({ type: GET_Today_Trip.start });
    try {
        const token = await store.getState().auth.token
        // http://web.teletix.pk:1949/api/mobile/FleetTrips?t=300031002C00360035002C00320031003800360034003800

        const res = await httpRequest.get(`mobile/FleetTrips?t=${token}`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            throw new Error(res.data[0].Message)
        }
        if (res && res.data) {
            let data = res.data
            dispatch({ type: GET_Today_Trip.success, TodayTrips: data });
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_Today_Trip.failed });
    }
};

export const getOverDue = () => async (dispatch) => {
    dispatch({ type: GET_OverDue.start });
    try {
        const token = await store.getState().auth.token
        // http://web.teletix.pk:1949/api/mobile/FleetExpiredList?t=300031002C00360035002C00320031003800360034003800

        const res = await httpRequest.get(`mobile/FleetExpiredList?t=${token}`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            throw new Error(res.data[0].Message)
        }
        if (res && res.data) {
            let data = res.data
            dispatch({ type: GET_OverDue.success, OverDueList: data });
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_OverDue.failed });
    }
};
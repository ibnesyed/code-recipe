import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
const { GET_REPORT_ROLE, GET_HISTORY_REPORT_DATA, GET_TRIP_REPORT_DATA, GET_SUMMARY_REPORT_DATA, GET_AccumulativeTripsFuel_REPORT_DATA, GET_AssetCommands_REPORT_DATA, GET_AssetKilometer_REPORT_DATA, GET_AssetOverSpeed_REPORT_DATA, GET_IdleParked_REPORT_DATA } = types


export const getHistoryReport = (obj, callback) => async (dispatch) => {
    const { VehicleId, dateTimeFrom, dateTimeTo } = obj;
    const token = await store.getState().auth.token
    // dispatch({ type: GET_HISTORY_REPORT_DATA.start });
    // http://web.teletix.pk:1949/api/mobile/ReportAssetHistory?t=300031002C00340037002C0039003400370035003700&vehId=22302&dat eTime1=2023-06-12 00:00:00&dateTime2=2023-06-13 16:40:50 
    try {
        // http://web.teletix.pk:1949/api/mobile/PdfAssetHistory?t=300032002C0030002C00320033003500390037003400&vehId=55514&dateTime1=2023-07-27 00:00:00&dateTime2=2023-07-27 23:59:59

        const res = await httpRequest.get(`mobile/PdfAssetHistory?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}`)
        if (res?.data?.Error && res.data.Error[0]?.Message) {
            dispatch(setToast("error", res?.data?.Error[0]?.Message))
            if (callback) {
                callback(false)
            }
        } else if (res?.data?.text) {
            // dispatch({ type: GET_HISTORY_REPORT_DATA.success, historyReport: res.data });
            if (callback) {
                callback(true, res.data.text)
            }
        }
        else {
            dispatch(setToast("error", "Data not found"))
            // dispatch({ type: GET_HISTORY_REPORT_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        // dispatch({ type: GET_HISTORY_REPORT_DATA.failed });
    }
}

export const getTripReport = (obj, callback) => async (dispatch) => {
    const { VehicleId, cmp_id, dateTimeFrom, dateTimeTo } = obj;
    const token = await store.getState().auth.token
    // dispatch({ type: GET_TRIP_REPORT_DATA.start });
    // http://web.teletix.pk:1949/api/mobile/ReportAssetTrips?t=300031002C00340037002C0039003400370035003700&vehId=22302&dat eTime1=2023-06-12 00:00:00&dateTime2=2023-06-13 16:40:50 
    try {
        const res = await httpRequest.get(`mobile/ReportAssetTrips?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}`)
        if (res?.data?.Error && res.data.Error[0]?.Message) {
            dispatch(setToast("error", res?.data?.Error[0]?.Message))
            if (callback) {
                callback(false)
            }
        } else if (res?.data) {
            // dispatch({ type: GET_TRIP_REPORT_DATA.success, tripReport: res.data });
            if (callback) {
                callback(true, res.data)
            }
        }
        else {
            dispatch(setToast("error", "Data not found"))
            // dispatch({ type: GET_TRIP_REPORT_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        // dispatch({ type: GET_TRIP_REPORT_DATA.failed });
    }
}

export const getSummaryReport = (obj, callback) => async (dispatch) => {
    const { VehicleId, cmp_id, dateTimeFrom, dateTimeTo } = obj;
    const token = await store.getState().auth.token
    // dispatch({ type: GET_SUMMARY_REPORT_DATA.start });
    // http://web.teletix.pk:1949/api/mobile/ReportAssetSummary?t=300031002C00340037002C0039003400370035003700&vehId=22302&dat eTime1=2023-06-12 00:00:00&dateTime2=2023-06-13 16:40:50 
    try {
        const res = await httpRequest.get(`mobile/ReportAssetSummary?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}`)
        if (res?.data?.Error && res.data.Error[0]?.Message) {
            dispatch(setToast("error", res?.data?.Error[0]?.Message))
            if (callback) {
                callback(false)
            }
        } else if (res?.data) {
            // dispatch({ type: GET_SUMMARY_REPORT_DATA.success, assetSummary: res.data });
            if (callback) {
                callback(true, res.data)
            }
        }
        else {
            dispatch(setToast("error", "Data not found"))
            // dispatch({ type: GET_SUMMARY_REPORT_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        // dispatch({ type: GET_SUMMARY_REPORT_DATA.failed });
    }
}

export const getAssetAccumulativeTripsFuelReport = (obj, callback) => async (dispatch) => {
    const { VehicleId, cmp_id, dateTimeFrom, dateTimeTo, unitPrice } = obj;
    const token = await store.getState().auth.token
    // dispatch({ type: GET_AccumulativeTripsFuel_REPORT_DATA.start });
    // http://web.teletix.pk:1949/api/mobile/ReportAssetSummary?t=300031002C00340037002C0039003400370035003700&vehId=22302&dat eTime1=2023-06-12 00:00:00&dateTime2=2023-06-13 16:40:50 
    try {
        const res = await httpRequest.get(`mobile/ReportAssetAccumulativeTripsFuel?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}&unitPrice=${unitPrice}`)
        if (res?.data?.Error && res.data.Error[0]?.Message) {
            dispatch(setToast("error", res?.data?.Error[0]?.Message))
            if (callback) {
                callback(false)
            }
        } else if (res?.data) {
            // dispatch({ type: GET_AccumulativeTripsFuel_REPORT_DATA.success, assetAccumulativeTripsFuelReport: res.data });
            if (callback) {
                callback(true, res.data)
            }
        }
        else {
            dispatch(setToast("error", "Data not found"))
            // dispatch({ type: GET_AccumulativeTripsFuel_REPORT_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        // dispatch({ type: GET_AccumulativeTripsFuel_REPORT_DATA.failed });
    }
}

export const getAssetCommandsReport = (obj, callback) => async (dispatch) => {
    const { VehicleId, cmp_id, dateTimeFrom, dateTimeTo } = obj;
    const token = await store.getState().auth.token
    // dispatch({ type: GET_AssetCommands_REPORT_DATA.start });
    // http://web.teletix.pk:1949/api/mobile/ReportAssetSummary?t=300031002C00340037002C0039003400370035003700&vehId=22302&dat eTime1=2023-06-12 00:00:00&dateTime2=2023-06-13 16:40:50 
    try {
        const res = await httpRequest.get(`mobile/ReportAssetCommands?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}`)
        if (res?.data?.Error && res.data.Error[0]?.Message) {
            dispatch(setToast("error", res?.data?.Error[0]?.Message))
            if (callback) {
                callback(false)
            }
        } else if (res?.data) {
            // dispatch({ type: GET_AssetCommands_REPORT_DATA.success, assetCommands: res.data });
            if (callback) {
                callback(true, res.data)
            }
        } else {
            dispatch(setToast("error", "No Record found"))
            // dispatch({ type: GET_AssetCommands_REPORT_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        // dispatch({ type: GET_AssetCommands_REPORT_DATA.failed });
    }
}

export const getAssetKilometerReport = (obj, callback) => async (dispatch) => {
    const { VehicleId, cmp_id, dateTimeFrom, dateTimeTo } = obj;
    const token = await store.getState().auth.token
    // dispatch({ type: GET_AssetKilometer_REPORT_DATA.start });
    // http://web.teletix.pk:1949/api/mobile/ReportAssetSummary?t=300031002C00340037002C0039003400370035003700&vehId=22302&dat eTime1=2023-06-12 00:00:00&dateTime2=2023-06-13 16:40:50 
    try {
        const res = await httpRequest.get(`mobile/ReportAssetKilometer?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}`)
        if (res?.data?.Error && res.data.Error[0]?.Message) {
            dispatch(setToast("error", res?.data?.Error[0]?.Message))
            if (callback) {
                callback(false)
            }
        } else if (res?.data) {
            // dispatch({ type: GET_AssetKilometer_REPORT_DATA.success, assetKilometer: res.data });
            if (callback) {
                callback(true, res.data)
            }
        }
        else {
            dispatch(setToast("error", "Data not found"))
            // dispatch({ type: GET_AssetKilometer_REPORT_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        // dispatch({ type: GET_AssetKilometer_REPORT_DATA.failed });
    }
}

export const getAssetOverSpeedReport = (obj, callback) => async (dispatch) => {
    const { VehicleId, cmp_id, dateTimeFrom, dateTimeTo, speedLimit } = obj;
    const token = await store.getState().auth.token
    // dispatch({ type: GET_AssetOverSpeed_REPORT_DATA.start });
    // http://web.teletix.pk:1949/api/mobile/ReportAssetSummary?t=300031002C00340037002C0039003400370035003700&vehId=22302&dat eTime1=2023-06-12 00:00:00&dateTime2=2023-06-13 16:40:50 
    try {
        const res = await httpRequest.get(`mobile/ReportAssetOverSpeed?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}&speedLimit=${speedLimit}`)
        if (res?.data?.Error && res.data.Error[0]?.Message) {
            dispatch(setToast("error", res?.data?.Error[0]?.Message))
            if (callback) {
                callback(false)
            }
        } else if (res?.data) {
            // dispatch({ type: GET_AssetOverSpeed_REPORT_DATA.success, assetOverSpeed: res.data });
            if (callback) {
                callback(true, res.data)
            }
        }
        else {
            dispatch(setToast("error", "Data not found"))
            // dispatch({ type: GET_AssetOverSpeed_REPORT_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        // dispatch({ type: GET_AssetOverSpeed_REPORT_DATA.failed });
    }
}

export const getIdleParkedReport = (obj, callback) => async (dispatch) => {
    const { VehicleId, cmp_id, dateTimeFrom, dateTimeTo, duration } = obj;
    const token = await store.getState().auth.token
    // dispatch({ type: GET_IdleParked_REPORT_DATA.start });
    // http://web.teletix.pk:1949/api/mobile/ReportAssetSummary?t=300031002C00340037002C0039003400370035003700&vehId=22302&dat eTime1=2023-06-12 00:00:00&dateTime2=2023-06-13 16:40:50 
    try {
        const res = await httpRequest.get(`mobile/ReportIdleParked?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}&duration=${duration}`)
        if (res?.data?.Error && res.data.Error[0]?.Message) {
            dispatch(setToast("error", res?.data?.Error[0]?.Message))
            if (callback) {
                callback(false)
            }
        } else if (res?.data) {
            // dispatch({ type: GET_IdleParked_REPORT_DATA.success, idleParkedReport: res.data });
            if (callback) {
                callback(true, res.data)
            }
        }
        else {
            dispatch(setToast("error", "Data not found"))
            // dispatch({ type: GET_IdleParked_REPORT_DATA.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        // dispatch({ type: GET_IdleParked_REPORT_DATA.failed });
    }
}

export const removePDFFromDB = (url) => async (dispatch) => {
    // console.log("=======================", url)
    let name = url.replace(/^PdfFiles\\/i, "")
    // console.log("==================3423123=====", name)
    // http://web.teletix.pk:1949/api/mobile/PdfRemove?fileName=AssetHistory20230731073933318.pdf 
    // const token = await store.getState().auth.token
    try {
        const res = await httpRequest.get(`mobile/PdfRemove?fileName=${name}`)
        // console.log("res===========================================>", res)
    } catch (error) {
        // console.log("error========", error)
    }
}

// http://web.teletix.pk:1949/api/user/getrole?t=300031002C00350034002C0035003400360036002C004E004100
export const getReportRole = (callback) => async (dispatch) => {
    const token = await store.getState().auth.token
    // console.log(`http://web.teletix.pk:1949/api/mobile/getrole?t=${token}&vehId=${VehicleId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}`)
    dispatch({ type: GET_REPORT_ROLE.start });
    try {
        const res = await httpRequest.get(`user/getrole?t=${token}`)
        if (res?.data?.Error && res.data.Error[0]?.Message) {
            dispatch(setToast("error", res?.data?.Error[0]?.Message))
            if (callback) {
                callback(false)
            }
        } else if (res?.data) {
            dispatch({ type: GET_REPORT_ROLE.success, reportRole: res.data });
            if (callback) {
                callback(true, res.data)
            }
        } else {
            dispatch(setToast("error", "Data not found"))
            dispatch({ type: GET_REPORT_ROLE.failed });
            if (callback) {
                callback(false)
            }
        }
    } catch (error) {
        if (callback) {
            callback(false)
        }
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_REPORT_ROLE.failed });
    }
}

import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
const { GET_FUEL_DETAILS } = types
// fuelDeatilsData

export const getFuelDetailsData = (data, callback) => async (dispatch) => {
    const { vehId, dateTimeFrom, dateTimeTo } = data;
    dispatch({ type: GET_FUEL_DETAILS.start });
    // 2023-09-25%2000:00:00
    try {
        const { token, fuelPrice } = await store.getState().auth
        // console.log(`http://web.teletix.pk:1949/api/mobile/services?t=${token}&vehId=${VehicleId}`)
        // console.log(`http://web.teletix.pk:1949/api/mobile/ReportAssetAccumulativeTripsFuel?t=${token}&vehId=${vehId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}&unitPrice=${fuelPrice}`)
        const res = await httpRequest.get(`mobile/ReportAssetAccumulativeTripsFuel?t=${token}&vehId=${vehId}&dateTime1=${dateTimeFrom}&dateTime2=${dateTimeTo}&unitPrice=${fuelPrice}`)
        if (res && res.data && res.data.error || res.data.Message) {
            throw new Error(res.data.error || res.data.Message)
        }
        if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
            throw new Error(res.data[0].Message)
        }
        if (res && res.data) {
            // console.log(res)
            let fuelDeatilsData = res?.data
            dispatch({ type: GET_FUEL_DETAILS.success, fuelDeatilsData });
            if (callback) {
                callback(true)
            }
        }
    } catch (error) {
        dispatch(setToast("error", error.message))
        dispatch({ type: GET_FUEL_DETAILS.failed });
    }
};


// export const enableDisableService = (VehicleId, filter, callback) => async (dispatch) => {
//     dispatch({ type: GET_SERVICES.start });
//     try {
//         const token = await store.getState().auth.token
//         // console.log(`http://web.teletix.pk:1949/api/mobile/ServicesApply?t=${token}&vehId=${VehicleId}&list=${filter}`) // 90:N,47:N
//         const res = await httpRequest.get(`mobile/ServicesApply?t=${token}&vehId=${VehicleId}&list=${filter}`)
//         if (res && res.data && res.data.error || res.data.Message) {
//             throw new Error(res.data.error || res.data.Message)
//         }
//         if (res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message) {
//             if (res.data[0].Message === "Succcess") {
//                 dispatch(getServicesByID(VehicleId))
//             } else {
//                 throw new Error(res.data[0].Message)
//             }
//         }

//     } catch (error) {
//         dispatch(setToast("error", error.message))
//         dispatch({ type: GET_SERVICES.failed });
//     }
// };
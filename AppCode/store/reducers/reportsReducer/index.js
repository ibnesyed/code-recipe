import { types } from '../../actionTypes';
const { GET_REPORT_ROLE, GET_HISTORY_REPORT_DATA, GET_TRIP_REPORT_DATA, GET_SUMMARY_REPORT_DATA, GET_AccumulativeTripsFuel_REPORT_DATA, GET_AssetCommands_REPORT_DATA, GET_AssetKilometer_REPORT_DATA, GET_AssetOverSpeed_REPORT_DATA, GET_IdleParked_REPORT_DATA } = types

let initialState = {
    // user: {},
    isLoading: false,
    error: '',
    historyReport: {},
    tripReport: {},
    assetSummary: {},
    assetAccumulativeTripsFuelReport: {},
    assetCommands: {},
    assetKilometer: {},
    assetOverSpeed: {},
    idleParkedReport: {},
    reportRole: []
};

export function reportsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HISTORY_REPORT_DATA.start:
            return { ...state, isLoading: true };
        case GET_HISTORY_REPORT_DATA.success:
            return { ...state, isLoading: false, historyReport: action?.historyReport || {} };
        case GET_HISTORY_REPORT_DATA.failed:
            return { ...state, isLoading: false };

        case GET_TRIP_REPORT_DATA.start:
            return { ...state, isLoading: true };
        case GET_TRIP_REPORT_DATA.success:
            return { ...state, isLoading: false, tripReport: action?.tripReport || {} };
        case GET_TRIP_REPORT_DATA.failed:
            return { ...state, isLoading: false };

        case GET_SUMMARY_REPORT_DATA.start:
            return { ...state, isLoading: true };
        case GET_SUMMARY_REPORT_DATA.success:
            return { ...state, isLoading: false, assetSummary: action?.assetSummary || {} };
        case GET_SUMMARY_REPORT_DATA.failed:
            return { ...state, isLoading: false };

        case GET_AccumulativeTripsFuel_REPORT_DATA.start:
            return { ...state, isLoading: true };
        case GET_AccumulativeTripsFuel_REPORT_DATA.success:
            return { ...state, isLoading: false, assetAccumulativeTripsFuelReport: action?.assetAccumulativeTripsFuelReport || {} };
        case GET_AccumulativeTripsFuel_REPORT_DATA.failed:
            return { ...state, isLoading: false };

        case GET_AssetCommands_REPORT_DATA.start:
            return { ...state, isLoading: true };
        case GET_AssetCommands_REPORT_DATA.success:
            return { ...state, isLoading: false, assetCommands: action?.assetCommands || {} };
        case GET_AssetCommands_REPORT_DATA.failed:
            return { ...state, isLoading: false };

        case GET_AssetKilometer_REPORT_DATA.start:
            return { ...state, isLoading: true };
        case GET_AssetKilometer_REPORT_DATA.success:
            return { ...state, isLoading: false, assetKilometer: action?.assetKilometer || {} };
        case GET_AssetKilometer_REPORT_DATA.failed:
            return { ...state, isLoading: false };

        case GET_AssetOverSpeed_REPORT_DATA.start:
            return { ...state, isLoading: true };
        case GET_AssetOverSpeed_REPORT_DATA.success:
            return { ...state, isLoading: false, assetOverSpeed: action?.assetOverSpeed || {} };
        case GET_AssetOverSpeed_REPORT_DATA.failed:
            return { ...state, isLoading: false };

        case GET_IdleParked_REPORT_DATA.start:
            return { ...state, isLoading: true };
        case GET_IdleParked_REPORT_DATA.success:
            return { ...state, isLoading: false, idleParkedReport: action?.idleParkedReport || {} };
        case GET_IdleParked_REPORT_DATA.failed:
            return { ...state, isLoading: false };

        case GET_REPORT_ROLE.start:
            return { ...state, isLoading: true, reportRole: [] };
        case GET_REPORT_ROLE.success:
            return { ...state, isLoading: false, reportRole: action?.reportRole || [] };
        case GET_REPORT_ROLE.failed:
            return { ...state, isLoading: false, reportRole: [] };

        default:
            return state;
    }
}
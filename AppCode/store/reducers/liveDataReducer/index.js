import { types } from '../../actionTypes';
const { GET_LIVE_DATA, SING_OUT, ADD_FILTER, GET_SINGLE_VEHICLE_DATA, GET_DEVICE_DETAILS } = types

let initialState = {
    // user: {},
    isLoading: false,
    error: '',
    liveDataList: [],
    moving: [],
    idle: [],
    parked: [],
    offline: [],
    online: [],
    inAlarm: [],
    sumTotal: 0,
    liveDataByGroup: {},
    vehicle_data: {},
    vehicle_loader: false,
    filter: "liveDataList",
    deviceDetails: {},
    deviceDetailsLoader: false
};

export function liveData(state = initialState, action) {
    switch (action.type) {
        case GET_LIVE_DATA.start:
            return { ...state, isLoading: true };
        case GET_LIVE_DATA.success:
            const filters = {
                moving: item => item.Status === 'Moving',
                idle: item => item.Status === 'Idle',
                parked: item => item.Status === 'Parked',
                offline: item => item.Online === 'N',
                online: item => item.Online === 'Y',
                inAlarm: item => !!item.Alarm,
            };

            const { sumTotal, ...filterResults } = Object.entries(filters).reduce((result, [key, filterFn]) => {
                result[key] = action.liveData.filter(filterFn);
                return result;
            }, {});

            return { ...state, isLoading: false, liveDataList: action.liveData, ...filterResults, sumTotal };
        case ADD_FILTER.success:
            let tempData = { ...state }
            let filter = action.filter || state.filter || "liveDataList"
            let data = tempData[filter]
            let liveDataByGroup = data.reduce((acc, item) => {
                acc[item.GroupName] = [...(acc[item.GroupName] || []), item];
                return acc;
            }, {});
            return { ...state, isLoading: false, filter, liveDataByGroup };

        case GET_SINGLE_VEHICLE_DATA.start:
            return { ...state, vehicle_loader: action.vehicle_loader, vehicle_data: action.vehicle_loader ? {} : state.vehicle_data }
        case GET_SINGLE_VEHICLE_DATA.success:
            return { ...state, vehicle_data: action.vehicle_data, vehicle_loader: false }
        case GET_SINGLE_VEHICLE_DATA.failed:
            return { ...state, vehicle_loader: false }

        case GET_DEVICE_DETAILS.start:
            return { ...state, deviceDetailsLoader: true, deviceDetails: {} }
        case GET_DEVICE_DETAILS.success:
            return { ...state, deviceDetailsLoader: false, deviceDetails: action.deviceDetails || {} }
        case GET_DEVICE_DETAILS.failed:
            return { ...state, deviceDetailsLoader: false, deviceDetails: {} }

        case GET_LIVE_DATA.failed:
            return { ...state, isLoading: false };
        case SING_OUT.success:
            return { ...state, isLoading: false, liveDataList: [], liveDataByGroup: {}, error: "" };

        default:
            return state;
    }
}
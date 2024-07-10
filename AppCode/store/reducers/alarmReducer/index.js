import { types } from '../../actionTypes';
const { GET_ALARM_DATA, GET_ALARM_DATA_COUNT, SING_OUT } = types

let initialState = {
    // user: {},
    isLoading: false,
    error: '',
    alarms: [],
    alarmsCount: 0
};

export function alarmReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALARM_DATA.start:
            return { ...state, isLoading: true };
        case GET_ALARM_DATA.success:
            return { ...state, isLoading: false, alarms: action?.alarms || [] };
        case GET_ALARM_DATA_COUNT.success:
            return { ...state, alarmsCount: action?.alarmsCount || 0 };
        case GET_ALARM_DATA.failed:
            return { ...state, isLoading: false };
        case SING_OUT.success:
            return { ...state, isLoading: false, alarms: [], alarmsCount: 0, error: "" };

        default:
            return state;
    }
}
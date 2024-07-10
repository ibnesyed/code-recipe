import { types } from '../../actionTypes';
const { CLEAR_ALARM_DATA } = types

let initialState = {
    clearAlarmState: [],
};

export function clearAlarmReducer(state = initialState, action) {
    switch (action.type) {
        case CLEAR_ALARM_DATA.success:
            return { ...state, clearAlarmState: action?.clearAlarmState };
        default:
            return state;
    }
}
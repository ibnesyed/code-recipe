import { types } from '../../actionTypes';
const { CLEAR_ALARM_DATA } = types



export const clearAlarms = (data, callback) => async (dispatch) => {
    dispatch({ type: CLEAR_ALARM_DATA.success, clearAlarmState: data });
}
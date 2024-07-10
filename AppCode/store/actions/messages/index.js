import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
import { store } from "../../../store";
const { GET_MESSAGES, GET_MESSAGES_COUNT } = types


export const getMessages = (callback) => async (dispatch) => {
    if (callback) {
        dispatch({ type: GET_MESSAGES.start });
    }
    try {
        const token = await store.getState().auth.token
        // http://web.teletix.pk:1949/api/live/MessagesEdata?a=0&t=300032002C0030002C00380032003200390039003800
        const res = await httpRequest.get(`live/MessagesEdata?a=${!!callback ? 1 : 0}&t=${token}`)

        if ((res && res.data && res.data.error || res.data.Message)) {
            throw new Error(res.data.error || res.data.Message)
        } else if ((res && res.data && Array.isArray(res.data) && res.data[0] && res.data[0].Message)) {
            throw new Error(res.data[0].Message)
        } else if (res && res.data && Array.isArray(res.data)) {
            let messages = res?.data || []
            if (callback) {
                dispatch({ type: GET_MESSAGES.success, messages });
            } else {
                dispatch({ type: GET_MESSAGES_COUNT.success, messagesCount: messages?.length || 0 });
            }
        }
    } catch (error) {
        if (callback) {
            callback(error.message)
            dispatch(setToast("error", error.message))
            dispatch({ type: GET_MESSAGES.failed });
        }
    }
};
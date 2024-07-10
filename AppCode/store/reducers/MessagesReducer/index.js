import { types } from '../../actionTypes';
const { GET_MESSAGES, SING_OUT, GET_MESSAGES_COUNT } = types

let initialState = {
    // user: {},
    isLoading: false,
    error: '',
    messages: [],
    messagesCount: 0
};

export function messages(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES.start:
            return { ...state, isLoading: true };
        case GET_MESSAGES.success:
            return { ...state, isLoading: false, messages: action.messages };
        case GET_MESSAGES_COUNT.success:
            return { ...state, messagesCount: action?.messagesCount || 0 };
        case GET_MESSAGES.failed:
            return { ...state, isLoading: false };
        case SING_OUT.success:
            return { ...state, isLoading: false, messages: [], messagesCount: 0, error: "" };

        default:
            return state;
    }
}
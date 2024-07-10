import { types } from '../../actionTypes';
const { SEND_COMMAND, SING_OUT } = types

let initialState = {
    isLoading: false,
};

export function commandReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_COMMAND.start:
            return { ...state, isLoading: true };
        case SEND_COMMAND.success:
            return { ...state, isLoading: false };
        case SEND_COMMAND.failed:
            return { ...state, isLoading: false };
        case SING_OUT.success:
            return { ...state, isLoading: false, };

        default:
            return state;
    }
}
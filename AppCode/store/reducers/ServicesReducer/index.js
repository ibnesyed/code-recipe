import { types } from '../../actionTypes';
const { GET_SERVICES, SING_OUT } = types

let initialState = {
    isLoading: false,
    servicesData: [],
};

export function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SERVICES.start:
            return { ...state, isLoading: true };
        case GET_SERVICES.success:
            return { ...state, isLoading: false, servicesData: action.servicesData, };
        case GET_SERVICES.failed:
            return { ...state, isLoading: false };
        case SING_OUT.success:
            return { ...state, isLoading: false, servicesData: [] };

        default:
            return state;
    }
}
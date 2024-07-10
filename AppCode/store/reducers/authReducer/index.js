import { types } from '../../actionTypes';
const { SING_IN, SING_OUT, CHANGE_PASSWORD, SET_FUEL_PRICE } = types

let initialState = {
    user: {},
    isLoading: false,
    error: '',
    token: '',
    isUserExist: false,
    company: "NA",
    fuelPrice: null
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case SING_IN.start:
            return { ...state, isLoading: true, isUserExist: false };
        case SING_IN.success:
            return { ...state, isLoading: false, isUserExist: true, token: action.token, user: action.user, company: action.company };
        case SING_IN.failed:
            return { ...state, isLoading: false, isUserExist: false };

        case SET_FUEL_PRICE.success:
            return { ...state, fuelPrice: action.fuelPrice };

        case CHANGE_PASSWORD.start:
            return { ...state, isLoading: true };
        case CHANGE_PASSWORD.success:
            return { ...state, isLoading: false };
        case CHANGE_PASSWORD.failed:
            return { ...state, isLoading: false };

        case SING_OUT.success:
            return { ...state, isLoading: false, isUserExist: false, user: {}, fuelPrice: null };

        default:
            return state;
    }
}
import { types } from '../../actionTypes';
const { GET_FUEL_DETAILS, SING_OUT } = types

let initialState = {
    isLoading: false,
    fuelDeatilsData: {},
};

export function fuelDetailsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FUEL_DETAILS.start:
            return { ...state, isLoading: true };
        case GET_FUEL_DETAILS.success:
            return { ...state, isLoading: false, fuelDeatilsData: action.fuelDeatilsData, };
        case GET_FUEL_DETAILS.failed:
            return { ...state, isLoading: false, fuelDeatilsData: {} };
        case SING_OUT.success:
            return { ...state, isLoading: false, fuelDeatilsData: {} };

        default:
            return state;
    }
}
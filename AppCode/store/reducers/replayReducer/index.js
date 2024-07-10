import { types } from '../../actionTypes';
const { GET_TRIP_REPLAY_DATA, GET_HISTORY_REPLAY_DATA, SET_DATE_TIME_FROM, SET_DATE_TIME_TO, CLEAR_DATE_TIME, GET_ONE_TRIP_DETAILS } = types

let initialState = {
    // user: {},
    isLoading: false,
    error: '',
    Summery: {},
    HistoryReplay: [],
    TripReplayList: [],
    dateTimeFrom: "",
    dateTimeTo: "",
    OneTripData: [],
    selectedDataForOneTrip: {},
};

export function replayReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HISTORY_REPLAY_DATA.start:
            return { ...state, isLoading: true };
        case GET_HISTORY_REPLAY_DATA.success:
            return { ...state, isLoading: false, Summery: action?.tripData?.Summery[0] || {}, HistoryReplay: action?.tripData?.TripReplay };
        case GET_HISTORY_REPLAY_DATA.failed:
            return { ...state, isLoading: false };


        case GET_TRIP_REPLAY_DATA.start:
            return { ...state, isLoading: true };
        case GET_TRIP_REPLAY_DATA.success:
            return { ...state, isLoading: false, TripReplayList: action?.TripReplayList, };
        case GET_TRIP_REPLAY_DATA.failed:
            return { ...state, isLoading: false };

        case GET_ONE_TRIP_DETAILS.start:
            return { ...state, isLoading: true };
        case GET_ONE_TRIP_DETAILS.success:
            return { ...state, isLoading: false, OneTripData: action?.OneTripData, selectedDataForOneTrip: action?.selectedDataForOneTrip };
        case GET_ONE_TRIP_DETAILS.failed:
            return { ...state, isLoading: false };


        case SET_DATE_TIME_FROM.success:
            return { ...state, dateTimeFrom: action.dateTimeFrom };
        case SET_DATE_TIME_TO.success:
            return { ...state, dateTimeTo: action.dateTimeTo };
        case CLEAR_DATE_TIME.success:
            return { ...state, dateTimeFrom: "", dateTimeTo: "" };

        default:
            return state;
    }
}
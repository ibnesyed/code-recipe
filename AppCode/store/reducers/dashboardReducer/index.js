import { types } from '../../actionTypes';
const { GET_DASHBOARD_DATA, GET_OutOfZone, GET_Today_Trip, GET_OverDue, SING_OUT } = types

let initialState = {
    isLoading: false,
    error: '',
    DashBoard: {},
    DrivingBehaviourObj: {},
    DrivingBehaviour: [],
    OverDueList: [],
    TodayTrips: [],
    OutOfZoneList: []

};

export function dashboardData(state = initialState, action) {
    switch (action.type) {
        case GET_DASHBOARD_DATA.start:
        case GET_OutOfZone.start:
        case GET_Today_Trip.start:
        case GET_OverDue.start:
            return { ...state, isLoading: true };

        case GET_DASHBOARD_DATA.success:
            const DrivingBehaviourObj = action.DrivingBehaviour.length ? action.DrivingBehaviour.reduce((acc, { alm_desc, alm_count }) => {
                acc[alm_desc] = alm_count
                return acc;
            }, {}) : {}
            return { ...state, isLoading: false, DashBoard: action.DashBoard, DrivingBehaviour: action.DrivingBehaviour, DrivingBehaviourObj: DrivingBehaviourObj };

        case GET_OutOfZone.success:
            return { ...state, isLoading: false, OutOfZoneList: action.OutOfZoneList };
        case GET_Today_Trip.success:
            return { ...state, isLoading: false, TodayTrips: action.TodayTrips };
        case GET_OverDue.success:
            return { ...state, isLoading: false, OverDueList: action.OverDueList };


        case GET_DASHBOARD_DATA.failed:
        case GET_OutOfZone.failed:
        case GET_Today_Trip.failed:
        case GET_OverDue.failed:
            return { ...state, isLoading: false };

        case SING_OUT.success:
            return { ...state, isLoading: false, DashBoard: {}, DrivingBehaviour: [] };

        default:
            return state;
    }
}
import { types } from '../../actionTypes'
const { FETCH_FCM_TOKEN, SEND_FCM_TOKEN, REMOVE_FCM_TOKEN } = types

const initialState = {
    isLoading: false,
    fcmToken: null
}

export const fcmReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FCM_TOKEN.start:
            return { ...state, }
        case FETCH_FCM_TOKEN.success:
            return { ...state, fcmToken: action.fcmToken }
        case SEND_FCM_TOKEN.start:
            return { ...state, isLoading: true }
        case SEND_FCM_TOKEN.success:
            return { ...state, isLoading: false }
        case SEND_FCM_TOKEN.failed:
            return { ...state, isLoading: false }
        case REMOVE_FCM_TOKEN.start:
            return { ...state, isLoading: true }
        case REMOVE_FCM_TOKEN.success:
            return { ...state, isLoading: false }
        case REMOVE_FCM_TOKEN.failed:
            return { ...state, isLoading: false }
        default:
            return state
    }

}
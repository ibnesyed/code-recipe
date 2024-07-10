import { types } from '../../actionTypes'
const { TOAST } = types

const initialState = {
	isToastShowing: false,
	config: {}
}

export const toastReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOAST.start:
			return { ...state, isToastShowing: true, config: action.payload }
		case TOAST.success:
			return { ...state, isToastShowing: false, config: {} }
		default:
			return state
	}

}
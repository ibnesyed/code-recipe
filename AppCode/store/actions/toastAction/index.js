import { types } from '../../actionTypes'
const { TOAST } = types

export const setToast = (status, message, duration, callback) => dispatch => {
	try {

		dispatch({
			type: TOAST.start, payload: {
				status,
				message,
				duration
			}
		})
		if(callback){
			callback()
		}
	} catch (error) {
	}
}

export const clearToast = () => dispatch => {
	dispatch({ type: TOAST.success })
}

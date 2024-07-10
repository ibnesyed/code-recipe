import { types } from '../../actionTypes';
import { setToast } from '../toastAction';
import { httpRequest } from "../../../config";
// import { sendFCMTokenToServer } from '../fcm';
import { store } from "../../../store";

const { SING_IN, SING_OUT, CHANGE_PASSWORD, SET_FUEL_PRICE } = types

export const signOut = () => async (dispatch) => {
  const token = await store.getState().auth.token

  try {
    // http://web.teletix.pk:1949/api/user/logout?token=300031002C0030002C0031002C0031003200330034004100
    // console.log("logout===========", `http://web.teletix.pk:1949/api/user/logout?token=${token}`)
    const res = await httpRequest.get(`user/logout?token=${token}`)
    dispatch({ type: SING_OUT.success });
    return;
  } catch (error) {
    dispatch({ type: SING_OUT.failed });
  }
};

export const signIn = (data) => async (dispatch) => {
  const { userName, password, deviceID } = data;

  dispatch({ type: SING_IN.start });
  try {
    const fcmToken = await store.getState().fcm.fcmToken
    const token = await store.getState().auth.token

    // console.log(`logIn===========", https://web.teletix.pk:1950/api/User/verify2?uname=${userName}&pwd=${password}&token=${token || "NA"}&deviceInf=${deviceID}&fbToken=${fcmToken}`)
    // uname=Tpl_admin&pwd=tpltr@kk3r&token=300031002C0030002C0031002C0031003200330034004100&deviceInf=1234A&fbToken=NA
    const res = await httpRequest.get(`User/verify2?uname=${userName}&pwd=${password}&token=${token || "NA"}&deviceInf=${deviceID}&fbToken=${fcmToken}`)

    // const res = await httpRequest.get(`User/verify2?uname=${userName}&pwd=${password}&token=NA`)
    // console.log("res======================", res)
    if (res && res.data && res.data.error) {
      throw new Error(res.data.error)
    }
    if (res && res.data && res.data.token && res.data.token === "NA") {
      throw new Error("Invalid response from server")
    }
    if (res && res.data && res.data.token && res.data.token !== "NA") {
      // console.log("123213123", res.data)
      dispatch({ type: SING_IN.success, token: res.data.token, user: { userName }, company: res?.data?.company || "NA" });

      // dispatch(sendFCMTokenToServer(data))
      // dispatch({ type: SING_IN.success, token });
    }
  } catch (error) {
    // console.log("error===========", error.message)
    dispatch(setToast("error", error.message))
    dispatch({ type: SING_IN.failed });
  }
};


export const changePassword = (data, callback) => async (dispatch) => {
  const { userName, oldPassword, newPassword } = data;
  dispatch({ type: CHANGE_PASSWORD.start });
  try {
    // console.log(`http://web.teletix.pk:1949/api/user/changePwd?uname=${userName}&oldpwd=${oldPassword}&newpwd=${newPassword}`)
    const res = await httpRequest.get(`user/changePwd?uname=${userName}&oldpwd=${oldPassword}&newpwd=${newPassword}`)
    if (res?.data?.toLowerCase().indexOf("success") !== -1) {
      dispatch({ type: CHANGE_PASSWORD.success });
      if (callback) {
        callback()
      }
    } else {
      dispatch({ type: CHANGE_PASSWORD.failed });
      dispatch(setToast("error", res.data))
    }
    return;
  } catch (error) {
    dispatch(setToast("error", error?.message || "Network Error"))
    dispatch({ type: CHANGE_PASSWORD.failed });
  }
};

export const setFuelPrice = (fuelPrice) => async (dispatch) => {
  // console.log(fuelPrice)
  dispatch({ type: SET_FUEL_PRICE.success, fuelPrice });

}
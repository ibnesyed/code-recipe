const manageActionType = type => {
  return {
    start: type + '_START',
    success: type + '_SUCCESS',
    failed: type + '_FAILED',
  };
};

export const types = {

  SET_FUEL_PRICE: manageActionType("SET_FUEL_PRICE"),

  SING_IN: manageActionType("SING_IN"),

  SING_OUT: manageActionType("SING_OUT"),

  CHANGE_PASSWORD: manageActionType("CHANGE_PASSWORD"),

  TOAST: manageActionType("TOAST"),

  GET_LIVE_DATA: manageActionType("GET_LIVE_DATA"),

  GET_MESSAGES: manageActionType("GET_MESSAGES"),

  ADD_FILTER: manageActionType("ADD_FILTER"),

  GET_DASHBOARD_DATA: manageActionType("GET_DASHBOARD_DATA"),

  GET_OutOfZone: manageActionType("GET_OutOfZone"),
  GET_Today_Trip: manageActionType("GET_Today_Trip"),
  GET_OverDue: manageActionType("GET_OverDue"),

  GET_SINGLE_VEHICLE_DATA: manageActionType("GET_SINGLE_VEHICLE_DATA"),

  GET_DEVICE_DETAILS: manageActionType("GET_DEVICE_DETAILS"),

  GET_TRIP_REPLAY_DATA: manageActionType("GET_TRIP_REPLAY_DATA"),

  GET_HISTORY_REPLAY_DATA: manageActionType("GET_HISTORY_REPLAY_DATA"),

  SET_DATE_TIME_FROM: manageActionType("SET_DATE_TIME_FROM"),

  SET_DATE_TIME_TO: manageActionType("SET_DATE_TIME_TO"),

  CLEAR_DATE_TIME: manageActionType("CLEAR_DATE_TIME"),

  GET_ONE_TRIP_DETAILS: manageActionType("GET_ONE_TRIP_DETAILS"),

  GET_HISTORY_REPORT_DATA: manageActionType("GET_HISTORY_REPORT_DATA"),

  GET_TRIP_REPORT_DATA: manageActionType("GET_TRIP_REPORT_DATA"),

  GET_SUMMARY_REPORT_DATA: manageActionType("GET_SUMMARY_REPORT_DATA"),

  GET_AccumulativeTripsFuel_REPORT_DATA: manageActionType("GET_AccumulativeTripsFuel_REPORT_DATA"),

  GET_AssetCommands_REPORT_DATA: manageActionType("GET_AssetCommands_REPORT_DATA"),

  GET_AssetKilometer_REPORT_DATA: manageActionType("GET_AssetKilometer_REPORT_DATA"),

  GET_AssetOverSpeed_REPORT_DATA: manageActionType("GET_AssetOverSpeed_REPORT_DATA"),

  GET_IdleParked_REPORT_DATA: manageActionType("GET_IdleParked_REPORT_DATA"),

  GET_ALARM_DATA: manageActionType("GET_ALARM_DATA"),
  GET_ALARM_DATA_COUNT: manageActionType("GET_ALARM_DATA_COUNT"),

  CLEAR_ALARM_DATA: manageActionType("CLEAR_ALARM_DATA"),

  FETCH_FCM_TOKEN: manageActionType("FETCH_FCM_TOKEN"),
  SEND_FCM_TOKEN: manageActionType("SEND_FCM_TOKEN"),
  REMOVE_FCM_TOKEN: manageActionType("REMOVE_FCM_TOKEN"),

  GET_SERVICES: manageActionType("GET_SERVICES"),
  SEND_COMMAND: manageActionType("SEND_COMMAND"),

  GET_FUEL_DETAILS: manageActionType("GET_FUEL_DETAILS"),

  GET_REPORT_ROLE_DATA: manageActionType("GET_REPORT_ROLE_DATA"),

  GET_REPORT_ROLE: manageActionType("GET_REPORT_ROLE"),

  GET_MESSAGES_COUNT: manageActionType("GET_MESSAGES_COUNT")
};
// export const types = {
//   SING_IN_START: "SING_IN_START",
//   SING_IN_SUCCESS: "SING_IN_SUCCESS",
//   SING_IN_FAILED: "SING_IN_FAILED",

//   SING_OUT_START: "SING_OUT_START",
//   SING_OUT_SUCCESS: "SING_OUT_SUCCESS",
//   SING_OUT_FAILED: "SING_OUT_FAILED",

//   MAIN_LOADER_STATE: "MAIN_LOADER_STATE",

//   SHOW_TOAST: "SHOW_TOAST",
//   HIDE_TOAST: "HIDE_TOAST",

// };


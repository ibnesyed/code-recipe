import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer, toastReducer, liveData, messages, dashboardData, replayReducer, reportsReducer, alarmReducer, clearAlarmReducer, fcmReducer, servicesReducer, fuelDetailsReducer } from "./reducers";
import { commandReducer } from './reducers/commandsReducer';

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     whitelist: ['auth'],
//     // blacklist: ['auth'],
// };
const rootReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
    liveData: liveData,
    messages: messages,
    dashboard: dashboardData,
    replayData: replayReducer,
    reportsData: reportsReducer,
    alarmData: alarmReducer,
    clearAlarms: clearAlarmReducer,
    fcm: fcmReducer,
    services: servicesReducer,
    commands: commandReducer,
    fuelDetails: fuelDetailsReducer,
});

// persist saved redux in storage only whitelist reducer
const persistConfig = { key: 'root', storage: AsyncStorage, whitelist: ['auth', 'clearAlarms', 'fcm'] };
const persistedReducer = persistReducer(persistConfig, rootReducer);
//Redux Thunk middleware allows you to write action creators that return a function instead of an action.
//The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {
    store,
    persistor
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//     reducer: persistedReducer,
//     devTools: true,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
// });
// export const persistor = persistStore(store);
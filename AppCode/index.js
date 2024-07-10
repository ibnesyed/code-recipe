import React, { useEffect } from "react";
import Navigation from "./navigations"
import notifee, { EventType } from "@notifee/react-native"
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging'
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { notificationListner, onDisplayNotification } from "./utils";
const App = () => {
    useEffect(() => {
        const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
                case EventType.PRESS:
                    console.log('User pressed notification', detail.notification);
                    break;
            }
        });

        return unsubscribe;
    }, [])
    useEffect(() => {
        getPermissionAndAccess()
    }, [])
    const getPermissionAndAccess = async () => {
        try {
            if (Platform.OS === "android") {

                await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                notificationListner()
                // messaging()
                //     .getToken().then((token) => {
                //     })
            } else {
                await messaging().requestPermission({
                    sound: true,
                    announcement: true,
                    alert: true,
                    badge: true,

                    // ... other permission settings
                });
                notificationListner()
            }

        } catch (error) {
            console.log("======push notification", error)
        }
    }
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("remotemessage forground", remoteMessage)
            onDisplayNotification(remoteMessage)
        });
        return unsubscribe;
    }, []);
    // useEffect(() => {
    //     const unsubscribed = messaging().setBackgroundMessageHandler(async remoteMessage => {
    //         console.log("remotemessage background", remoteMessage)
    //         onDisplayNotification(remoteMessage)
    //     });
    //     return unsubscribed;
    // }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigation />
            </PersistGate>
        </Provider>
    )
}
export default React.memo(App);
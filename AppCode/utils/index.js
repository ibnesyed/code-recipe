import ICONS from "./icons";
import notifee from "@notifee/react-native"
import messaging from '@react-native-firebase/messaging'
import * as SVG_ICONS from "../assets/icons/index.js"
import * as ASSET_SCREEN_ICONS from "../assets/IconsforAssetList/index.js"
import * as VEHICLE_MAP_ICONS from "../assets/mapicons/index.js"
import * as MARKER_MAP_ICONS from "../assets/mapmarker/index.js"
import * as ENGINE_TEMP_ICONS from "../assets/engineTempretureIcons/index.js"


export * from "./colors";
export * from "./images";
export * from "./fonts";
export { ICONS, SVG_ICONS, ASSET_SCREEN_ICONS, MARKER_MAP_ICONS, VEHICLE_MAP_ICONS, ENGINE_TEMP_ICONS }


export const notificationListner = () => {

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
        // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage,
                );
                // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
            //   setLoading(false);
        });
}

export async function onDisplayNotification(remoteMessage) {
    const { notification, data } = remoteMessage

    const { title, body } = notification

    // console.log(remoteMessage, "======================================")
    // console.log(data, "======================================")
    // data: {
    //     channelId: 'your_channel_id_here',
    //   },
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    // const channelId = await notifee.createChannel({
    //     id: 'default',
    //     name: 'Default Channel',
    // });
    let tempChannelID = await data?.channelId || data?.channel_id || "default_channel";
    let channelID = await (!!(["1", "2", "19", "21", "28", "29"].includes(tempChannelID)) ? tempChannelID : "default_channel");
    const sound = channelID === "1" ? 'accon.wav' : //'default', // Using the default iOS sound
        channelID === "2" ? 'accoff.wav' : //'default', // Using the default iOS sound
            channelID === "19" ? 'poweroff.wav' : //'default', // Using the default iOS sound
                channelID === "21" ? 'overspeed.wav' : //'default', // Using the default iOS sound
                    channelID === "28" ? 'geofencein.wav' : //'default', // Using the default iOS sound
                        channelID === "29" ? 'geofenceout.wav' : "default_channel" //'default', // Using the default iOS sound
    // const sound = 'default_channel'; //'default', // Using the default iOS sound
    // Display a notification
    await notifee.displayNotification({
        title,
        body,
        android: {
            channelId: channelID,
            // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: 'default',
            },
        },
        ios: {
            sound
        },
    });
}

export async function onDisplayLocalNotificationCustom({ title, body, channelId = "default_channel" }) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()
    // const channelIdDefault = await notifee.createChannel({
    //     id: '1234567890',
    //     name: 'General Channel',
    //     android: {
    //         sound: 'default', // Use 'default' to use the user's default notification sound
    //     },
    // });
    let channelIDDone = await (!!(["1", "2", "19", "21", "28", "29"].includes(channelId)) ? channelId : "default_channel");
    // Display a notification
    const sound = channelIDDone === "1" ? 'accon.wav' : //'default', // Using the default iOS sound
        channelIDDone === "2" ? 'accoff.wav' : //'default', // Using the default iOS sound
            channelIDDone === "19" ? 'poweroff.wav' : //'default', // Using the default iOS sound
                channelIDDone === "21" ? 'overspeed.wav' : //'default', // Using the default iOS sound
                    channelIDDone === "28" ? 'geofencein.wav' : //'default', // Using the default iOS sound
                        channelIDDone === "29" ? 'geofenceout.wav' : "default_channel" //'default', // Using the default iOS sound
    // const sound = 'default_channel'; //'default', // Using the default iOS sound
    await notifee.displayNotification({
        "title": title,
        "body": body,
        "android": {
            "channelId": channelIDDone,
            // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            "pressAction": {
                "id": 'default',
            },
        },
        ios: {
            sound,
        },
    });
}
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Screens from "../screens";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from "../Components";
import { clearToast, getLiveData, getMessages, getDashboardData, getFCMToken, getAlarmData } from "../store/actions";
const Stack = createNativeStackNavigator();


const AppStack = () => {
    // const dispatch = useDispatch()
    // const { token } = useSelector(({ auth }) => auth)
    // const [isDataFetched, setIsDataFetched] = useState(false)

    // useEffect(() => {
    //     if (!isDataFetched) {
    //         if (token) {
    //             dispatch(getDashboardData())
    //             dispatch(getLiveData())
    //             dispatch(getMessages())
    //             dispatch(getAlarmData())
    //             setIsDataFetched(true)
    //         }
    //     }
    // }, [token, isDataFetched])

    return <Stack.Navigator
        initialRouteName='Dashboard'
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Dashboard" component={Screens.Dashboard} />
        <Stack.Screen name="Assets" component={Screens.Assets} />
        <Stack.Screen name="Notifications" component={Screens.Notifications} />
        <Stack.Screen name="MainMapView" component={Screens.MainMapView} />
        <Stack.Screen name="TrackOnMap" component={Screens.TrackOnMap} />
        <Stack.Screen name="ShareLocation" component={Screens.ShareLocation} />
        <Stack.Screen name="CommandScreen" component={Screens.CommandScreen} />
        <Stack.Screen name="Reports" component={Screens.Reports} />
        <Stack.Screen name="DeviceDetail" component={Screens.DeviceDetail} />
        <Stack.Screen name="DownloadReports" component={Screens.DownloadReports} />
        <Stack.Screen name="HistoryReplay" component={Screens.HistoryReplay} />
        <Stack.Screen name="TripReplay" component={Screens.TripReplay} />
        <Stack.Screen name="Profile" component={Screens.Profile} />
        <Stack.Screen name="Messages" component={Screens.Messages} />
        <Stack.Screen name="OutOfZone" component={Screens.OutOfZone} />
        <Stack.Screen name="TotalTrip" component={Screens.TotalTrip} />
        <Stack.Screen name="Expired" component={Screens.Expired} />
        <Stack.Screen name="Feedback" component={Screens.Feedback} />
        <Stack.Screen name="Support" component={Screens.Support} />
        <Stack.Screen name="Settings" component={Screens.Settings} />
        <Stack.Screen name="EditProfile" component={Screens.EditProfile} />
        <Stack.Screen name="PDFViewComp" component={Screens.PDFViewComp} />
        <Stack.Screen name="FuelDetail" component={Screens.FuelDetail} />
    </Stack.Navigator>
}

const Navigation = () => {
    const dispatch = useDispatch()
    const [isFCMFetched, setIsFCMFetched] = useState(false)
    const { isUserExist } = useSelector(({ auth }) => auth)
    const { config, isToastShowing } = useSelector(({ toast }) => toast);
    useEffect(() => {
        if (!isFCMFetched) {
            dispatch(getFCMToken((flag) => {
                if (flag) {
                    setIsFCMFetched(true)
                }
            }))
        }
    }, [isFCMFetched])

    return (
        <NavigationContainer>
            {isToastShowing && <Toast {...config} isToastShowing={isToastShowing} clearToast={() => dispatch(clearToast())} />}
            {isUserExist ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

const AuthStack = () => {
    return <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Authentication" component={Screens.Authentication} />
    </Stack.Navigator>
}


export default React.memo(Navigation);
import React, { useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, FlatList, Alert, useWindowDimensions, TextInput } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from "../../Components";
import { FONTS, AlarmGroupIcons, resposiveFontSize, SVG_ICONS, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";
import { getAlarmData, clearAlarms } from "../../store/actions";

const Notifications = ({ route, navigation }) => {
    const [searchText, setSearchText] = React.useState("");
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        linearGradient: {
            height: responsiveSizes(height, width, scale, fontScale, 60),
            width: "100%",
            elevation: 5,
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.01),
            borderBottomColor: "#C9C9C9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: responsiveSizes(height, width, scale, fontScale, 25)
        },
    });
    const AlarmsName = route?.params?.paramForMatching || null;
    const dispatch = useDispatch();
    const { alarms, isLoading } = useSelector(({ alarmData }) => alarmData)
    const clearAlarmState = useSelector(({ clearAlarms }) => clearAlarms.clearAlarmState)
    useEffect(() => {
        dispatch(getAlarmData(() => null))
    }, [])
    const setAlarmIcons = (groupName) => {
        switch (groupName) {
            case "geofence":
                return AlarmGroupIcons.Geofence
            case "battery":
                return AlarmGroupIcons.Battery
            case "acc":
                return AlarmGroupIcons.ACC
            case "driver behaviour":
            case "driverbehaviour":
            case "driver-behaviour":
            case "driver":
                return AlarmGroupIcons.Driver
            case "outpts":
                return AlarmGroupIcons.Outpts
            // case "door":
            //     return AlarmGroupIcons.Door
            // case "engine":
            //     return AlarmGroupIcons.Engine
            // case "excessive":
            //     return AlarmGroupIcons.Excessive
            // case "fuel":
            //     return AlarmGroupIcons.Fuel
            // case "outpts":
            //     return AlarmGroupIcons.Outpts
            // case "poi":
            //     return AlarmGroupIcons.Poi
            // case "rfid":
            //     return AlarmGroupIcons.Rfid
            // case "route":
            //     return AlarmGroupIcons.Route
            // case "voilation":
            //     return AlarmGroupIcons.Violation
            // case "driver behaviour":
            // case "driverbehaviour":
            // case "driver-behaviour":
            //     return AlarmGroupIcons.Driver
            // case "vehicle services":
            // case "vehicleservices":
            // case "vehicle-services":
            //     return AlarmGroupIcons.Vehicle
            // case "inputs":
            // case "slimcover":
            // case "vehicle":
            // case "voltage":
            //     return AlarmGroupIcons.Other
            default:
                return AlarmGroupIcons.Other
        }
    };

    const clearAllAlarms = (list) => {
        const srNoList = list.map(item => item.SrNo);
        Alert.alert(
            "Confirm",
            "Are you sure you want to clear all alarms?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        let newArray = [...new Set([...clearAlarmState, ...srNoList])];
                        dispatch(clearAlarms(newArray));
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const clearOneAlarm = (alarm) => {
        Alert.alert(
            "Confirm",
            "Are you sure you want to clear alarm?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        let newArray = [...clearAlarmState]
                        newArray.push(alarm)
                        dispatch(clearAlarms(newArray));
                    },
                },
            ],
            { cancelable: false }
        );
    };
    // console.log(AlarmsName)
    // alarms.map((e) => {
    //     console.log(e.AlarmName)
    // })
    // let renderAlarmsFiltered = alarms.filter(e => !!AlarmsName ? (AlarmsName.includes(e.AlarmName) && !clearAlarmState.includes(e.SrNo)) : !clearAlarmState.includes(e.SrNo));
    let renderAlarmsFiltered = alarms.filter(e => {
        const isAlarmNameMatch = !!AlarmsName ? AlarmsName.includes(e.AlarmName) : true;
        const isNotCleared = !clearAlarmState.includes(e.SrNo);
        const isTextMatch = searchText.trim() === "" || e.AlarmName.toLowerCase().includes(searchText.toLowerCase());
        return isAlarmNameMatch && isNotCleared && isTextMatch;
    });

    const renderAlarmUi = ({ item, index }) => {
        const { AlarmGroup, AlarmName, VRN, RecDatetime, Location, SrNo } = item;
        return (
            <View key={index} style={{ borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.5), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 20) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginLeft: responsiveSizes(height, width, scale, fontScale, -10) }}>
                        <Image source={setAlarmIcons(AlarmGroup?.toLowerCase() || "")} style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25), resizeMode: "contain", margin: responsiveSizes(height, width, scale, fontScale, 5) }} />
                        <Text style={{ color: "#242424", fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale, 16) }}>{AlarmGroup || "--"}</Text>
                    </View>
                    <Text style={{ color: "#666666", fontFamily: FONTS.interRegular, fontSize: resposiveFontSize(height, width, scale, fontScale, 14), padding: responsiveSizes(height, width, scale, fontScale, 15), paddingRight: 0 }}>{!!AlarmName ? "" : (VRN || "")}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flex: 0.6, marginHorizontal: responsiveSizes(height, width, scale, fontScale, 2.5) }}>
                        <Text style={{ color: "black", fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale, 12) }}>Alarm Name</Text>
                        <View style={{ backgroundColor: "#434343", padding: responsiveSizes(height, width, scale, fontScale, 8), borderRadius: responsiveSizes(height, width, scale, fontScale, 2), alignItems: "center" }}>
                            <Text style={{ color: "#F8F8F8", fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale, 12) }}>{AlarmName || "--"}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: responsiveSizes(height, width, scale, fontScale, 2.5) }}>
                        <Text style={{ color: "black", fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale, 12) }}>DateTime</Text>
                        <View style={{ backgroundColor: "#434343", padding: responsiveSizes(height, width, scale, fontScale, 8), borderRadius: responsiveSizes(height, width, scale, fontScale, 2), alignItems: "center" }}>
                            <Text style={{ color: "#F8F8F8", fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale, 12) }}>{RecDatetime || "--"}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: "#434343", flex: 1, padding: responsiveSizes(height, width, scale, fontScale, 10), borderRadius: responsiveSizes(height, width, scale, fontScale, 2), marginTop: responsiveSizes(height, width, scale, fontScale, 5), flexDirection: "row" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25) }}>
                        <SVG_ICONS.LocationMark />
                    </View>
                    <Text style={{ marginHorizontal: responsiveSizes(height, width, scale, fontScale, 5), color: "#F8F8F8", fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale, 12) }}>{Location || "--"}</Text>
                </View>
                <TouchableOpacity onPress={() => clearOneAlarm(SrNo)} style={{ backgroundColor: "#DC0404", padding: responsiveSizes(height, width, scale, fontScale, 8), justifyContent: "center", alignItems: "center", marginVertical: responsiveSizes(height, width, scale, fontScale, 10), borderColor: "#7B7B7B", borderWidth: responsiveSizes(height, width, scale, fontScale, 1), width: responsiveSizes(height, width, scale, fontScale, 100) }}>
                    <Text style={{ color: "#F1F1F1", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Clear</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {isLoading && <Loader />}
            <LinearGradient colors={["#E5E5E5", "#DADADA"]} style={styles.linearGradient}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", paddingLeft: responsiveSizes(height, width, scale, fontScale, 10), justifyContent: "space-between", flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {!!AlarmsName && <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }} activeOpacity={0.7} onPress={() => navigation.goBack()}><SVG_ICONS.Back /></TouchableOpacity>}
                        <Text style={{ margin: responsiveSizes(height, width, scale, fontScale, !!AlarmsName ? 5 : 0), color: "#5F5F5F", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interBold }}>Alarms</Text>
                    </View>
                    {!!AlarmsName && <Text style={{ color: "#5B5B5B", fontFamily: FONTS.interRegular, fontSize: resposiveFontSize(height, width, scale, fontScale, 14) }}>{"LEC-22-2155"}</Text>}
                </View>
            </LinearGradient>
            <TouchableOpacity onPress={() => clearAllAlarms(renderAlarmsFiltered)} style={{ backgroundColor: "#DC0404", padding: responsiveSizes(height, width, scale, fontScale, 10), justifyContent: "center", alignItems: "center", marginVertical: responsiveSizes(height, width, scale, fontScale, 10), borderColor: "#7B7B7B", borderWidth: responsiveSizes(height, width, scale, fontScale, 1) }}>
                <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 14), fontFamily: FONTS.interRegular }}>Clear All</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 10), marginBottom: responsiveSizes(height, width, scale, fontScale, 10) }}>
                <TextInput
                    style={{ flex: 1, backgroundColor: "#F1F1F1", borderRadius: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 10), marginRight: responsiveSizes(height, width, scale, fontScale, 10) }}
                    placeholder="Search Alarms"
                    value={searchText}
                    onChangeText={(text) => { setSearchText(text) }}
                />
                <TouchableOpacity onPress={() => setSearchText("")} style={{ padding: responsiveSizes(height, width, scale, fontScale, 8), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), backgroundColor: "#DC0404" }}>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Clear</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ flex: 1, padding: responsiveSizes(height, width, scale, fontScale, 10) }}
                contentContainerStyle={{ paddingBottom: responsiveSizes(height, width, scale, fontScale, 100) }}
                data={renderAlarmsFiltered}
                initialNumToRender={5}
                renderItem={renderAlarmUi}
                keyExtractor={item => (((item?.SrNo || "") + (item?.Point || "")) || Date.now())}
            />
            {!AlarmsName && <BottomNavBar activeName="bell" />}
        </SafeAreaView>
    );
};
export default React.memo(Notifications);
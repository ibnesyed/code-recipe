import moment from "moment";
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, useWindowDimensions } from "react-native";
import { FONTS, responsiveSizes, resposiveFontSize, SVG_ICONS, ASSET_SCREEN_ICONS, AlarmIcons, COLORS } from "../../utils";
import { vichelIcon } from "../../helpers";

const AssetCart = ({ navigation, data }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        header: { height: responsiveSizes(height, width, scale, fontScale, 26), backgroundColor: "#1A2961", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 20), marginVertical: responsiveSizes(height, width, scale, fontScale, 3) },
        headings: { fontSize: resposiveFontSize(height, width, scale, fontScale, 14), fontFamily: FONTS.interBold, color: "white" },
        btn: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
        box_1: { display: "flex", flexDirection: "row", justifyContent: "space-between", padding: responsiveSizes(height, width, scale, fontScale, 5) },
        btn_2: { margin: responsiveSizes(height, width, scale, fontScale, 5), marginVertical: responsiveSizes(height, width, scale, fontScale, 10), width: responsiveSizes(height, width, scale, fontScale, 20), height: responsiveSizes(height, width, scale, fontScale, 20) },
        footer: { height: responsiveSizes(height, width, scale, fontScale, 45), borderWidth: responsiveSizes(height, width, scale, fontScale, 1), marginVertical: responsiveSizes(height, width, scale, fontScale, 5), flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 5) },
        movingTxt: { color: "#616161", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interBold },
        idleTxt: { color: "#616161", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interBold, marginLeft: responsiveSizes(height, width, scale, fontScale, 5) },
        btn_3: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
        box_2: { height: responsiveSizes(height, width, scale, fontScale, 40), borderWidth: responsiveSizes(height, width, scale, fontScale, 1), marginVertical: responsiveSizes(height, width, scale, fontScale, 5), flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 15) },
        address: { fontSize: resposiveFontSize(height, width, scale, fontScale, 11), fontFamily: FONTS.interRegular, color: "white", marginHorizontal: responsiveSizes(height, width, scale, fontScale, 10) },
        addressBox: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: responsiveSizes(height, width, scale, fontScale, -10), marginBottom: responsiveSizes(height, width, scale, fontScale, 10), paddingRight: responsiveSizes(height, width, scale, fontScale, 10) },
        fonts: { color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 11), fontFamily: FONTS.interRegular },
        box_3: { backgroundColor: "#E4E4E4", borderRadius: responsiveSizes(height, width, scale, fontScale, 5), justifyContent: "space-evenly", alignItems: "center", height: responsiveSizes(height, width, scale, fontScale, 65), width: responsiveSizes(height, width, scale, fontScale, 65), margin: responsiveSizes(height, width, scale, fontScale, 2) },
        label: { fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular, color: "white" }
    });

    const [isMovingStatusOpen, setIsMovingStatusOpen] = useState(false);

    const [isAlarmStatusOpen, setIsAlarmStatusOpen] = useState(false);

    const onClickGoBtn = () => {
        navigation.navigate("MainMapView", { DeviceID: data.DeviceID || data.deviceId })
    }

    const intBattryIcon = (IntBatPercent) => {
        if (!IntBatPercent) {
            return <ASSET_SCREEN_ICONS.batteryinternalNA />
        }
        if (IntBatPercent > 90) {
            return <ASSET_SCREEN_ICONS.batteryinternalfull />
        } else if (IntBatPercent > 10 && IntBatPercent < 91) {
            return <ASSET_SCREEN_ICONS.batteryinternalmedium />
        } else if (IntBatPercent > 0 && IntBatPercent < 11) {
            return <ASSET_SCREEN_ICONS.batteryinternalLow />
        } else {
            return <ASSET_SCREEN_ICONS.batteryinternalNA />
        }
    }

    const extBattryIcon = (ExtBatV) => {
        if (!ExtBatV) {
            return <ASSET_SCREEN_ICONS.batteryexternalNA />
        }
        if (ExtBatV > 3) {
            return <ASSET_SCREEN_ICONS.batteryexternalfull />
        } else if (ExtBatV > 2 && ExtBatV < 4) {
            return <ASSET_SCREEN_ICONS.batteryexternalmedium />
        } else if (ExtBatV > 0 && ExtBatV < 3) {
            return <ASSET_SCREEN_ICONS.batteryexternalLow />
        } else {
            return <ASSET_SCREEN_ICONS.batteryexternalNA />
        }
    }

    const signolsIcon = (GsmSignal) => {
        if (!GsmSignal) {
            return <ASSET_SCREEN_ICONS.gsmNA />
        }
        if (GsmSignal > 3) {
            return <ASSET_SCREEN_ICONS.gsmfull />
        } else if (GsmSignal > 1) {
            return <ASSET_SCREEN_ICONS.gsmmedium />
        } else if (GsmSignal === 1) {
            return <ASSET_SCREEN_ICONS.gsmlow />
        } else {
            return <ASSET_SCREEN_ICONS.gsmNA />
        }
    }

    const gpsIcon = (GPS) => {
        if (GPS && GPS.toLowerCase() === "av") {
            return <ASSET_SCREEN_ICONS.gpsconnected />
        } else {
            return <ASSET_SCREEN_ICONS.gpsNA />
        }
    }

    const imobilizerIcon = (Immoblizer) => {
        if (Immoblizer && (Immoblizer === "On" || Immoblizer.toLowerCase() === "on")) {
            return <ASSET_SCREEN_ICONS.immobilizerON />
        } else {
            return <ASSET_SCREEN_ICONS.immobilizerOff />
        }

    }

    const fuelPumpIcon = (Sensors) => {
        if (Sensors && (Sensors === "AV" || Sensors.toLowerCase() === "av")) {
            return <ASSET_SCREEN_ICONS.fuelsensor />
        } else {
            return <ASSET_SCREEN_ICONS.fuelsensorNA />
        }
    }

    const alarmIcon = (AlarmsCount) => {
        if (AlarmsCount) {
            return <ASSET_SCREEN_ICONS.activebellicon />
        } else {
            return <ASSET_SCREEN_ICONS.noalarmsicon />
        }

    }

    const setColorAsPerStatus = (Status) => {
        if (Status.includes("Parked")) {
            return "#FFB800"
            // return "#FA7800"
        } else if (Status.includes("Moving")) {
            return "#0BAC08"
        } else if (Status.includes("Idle")) {
            return "#0057FF"
        } else {
            return "#595959"
        }
    }

    const movingStatusSection = (StatusPrev, Status) => {
        // let sinceTime = "";
        // if (StatusTime) {
        //     const moment = require('moment');
        //     const currentTime = moment();
        //     const statusTimeMoment = moment(StatusTime);
        //     const duration = moment.duration(currentTime.diff(statusTimeMoment));
        //     sinceTime = `${duration.hours()} : ${duration.minutes()} : ${duration.seconds()}`
        // }
        return <View style={styles.box_2}>
            <View style={styles.btn_3}>
                <View style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25) }}>
                    <SVG_ICONS.TimeMachine />
                </View>
                <Text style={styles.idleTxt}>{StatusPrev || ""}</Text>
            </View>
            {/* <Text style={styles.movingTxt}><Text style={{ color: setColorAsPerStatus(Status) }}>{Status || ""}</Text> since {sinceTime || "00"}</Text> */}
            <Text style={styles.movingTxt}><Text style={{ color: setColorAsPerStatus(Status) }}>{Status || ""}</Text></Text>
        </View>
    }

    const alarmStatusSection = (Alarm) => {
        let icons = [];
        if (Alarm) {
            // Geofence/Power/ACC/Immobilizer/driverbehaviour 
            let geofence = ["Geofence In", "Geofence Out", "Geofence"]
            if (geofence.some(value => Alarm.includes(value))) {
                icons.push(
                    <TouchableOpacity key={geofence[0]} activeOpacity={0.7} onPress={() => navigation.navigate("Notifications", { paramForMatching: geofence })}>
                        <Image source={AlarmIcons.geofence} style={{ height: responsiveSizes(height, width, scale, fontScale, 45), width: responsiveSizes(height, width, scale, fontScale, 45), margin: responsiveSizes(height, width, scale, fontScale, 2) }} />
                    </TouchableOpacity>
                )
            }
            let power = ["Power Off", "Low External Battery", "Low Backup Battery", "Battery"]
            if (power.some(value => Alarm.includes(value))) {
                icons.push(
                    <TouchableOpacity key={power[0]} activeOpacity={0.7} onPress={() => navigation.navigate("Notifications", { paramForMatching: power })}>
                        <Image source={AlarmIcons.power} style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 30), margin: responsiveSizes(height, width, scale, fontScale, 8) }} />
                    </TouchableOpacity>
                )
            }
            let key = ["ACC On", "ACC Off", "ACC On or ACC Off", "ACC"]
            if (key.some(value => Alarm.includes(value))) {
                icons.push(
                    <TouchableOpacity key={key[0]} activeOpacity={0.7} onPress={() => navigation.navigate("Notifications", { paramForMatching: key })}>
                        <Image source={AlarmIcons.key} style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 30), margin: responsiveSizes(height, width, scale, fontScale, 5) }} />
                    </TouchableOpacity>
                )
            }
            let drivingbehaviour = ["Accident", "Harsh Acceleration", "Harsh Break", "Harsh Cornering", "Over Speed", "Driver", "Behaviour", "Driver Behaviour"]
            if (drivingbehaviour.some(value => Alarm.includes(value))) {
                icons.push(
                    <TouchableOpacity key={drivingbehaviour[0]} activeOpacity={0.7} onPress={() => navigation.navigate("Notifications", { paramForMatching: drivingbehaviour })}>
                        <Image source={AlarmIcons.drivingbehaviour} style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 30), margin: responsiveSizes(height, width, scale, fontScale, 5) }} />
                    </TouchableOpacity>
                )
            }
            let Immobilizer = ["Immobilizer", "Immobilizer On", "Immobilizer Off", "outpts"]
            if (Immobilizer.some(value => Alarm.includes(value))) {
                icons.push(
                    <TouchableOpacity key={Immobilizer[0]} activeOpacity={0.7} onPress={() => navigation.navigate("Notifications", { paramForMatching: Immobilizer })}>
                        <Image source={AlarmIcons.Immobilizer} style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 30), margin: responsiveSizes(height, width, scale, fontScale, 5) }} />
                    </TouchableOpacity>
                )
            }
            let others = [
                "Excess Idle",
                "Excess Parking",
                "Fuel Sudden Drop",
                "Low Fuel Level",
                "N-IN2(Rob) Off",
                "N-IN2(Rob) On",
                "POI In",
                "POI Out",
                "Attach",
                "Detach",
                "Route Deviation",
                "Route End",
                "Route Speed Violation",
                "Route Start",
                "Unusual Stopage",
                "SimCover Close",
                "SimCover Open",
                "Moving",
                "Air Filter",
                "Engine Service",
                "Oil Filter",
                "Tyre Change",
                "Temprature Limit Voilation",
                "Device Charging",
                "Device low Voltage",
                "Device Under Voltage",
                "Towing",
                "Turn Over",
                "Engine Off",
                "Engine On",
                "Excess Driving",
                "Engine",
                "Excessive",
                "Fuel",
                "Inputs",
                "POI",
                "RFID",
                "Route",
                "SimCover",
                "Vehicle",
                "Vehicle Service",
                "Voilation",
                "Voltage"
            ];
            if ((others.some(value => Alarm.includes(value)))) {
                icons.push(
                    <TouchableOpacity activeOpacity={0.7} key={others[0]} onPress={() => navigation.navigate("Notifications", { paramForMatching: others })}>
                        <Image source={AlarmIcons.warning} style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 30), margin: responsiveSizes(height, width, scale, fontScale, 5) }} />
                    </TouchableOpacity>
                )
            }
        }
        if (!icons.length) {
            setTimeout(() => {
                setIsAlarmStatusOpen(!isAlarmStatusOpen)
            }, 2500)
        }
        return <View style={[styles.footer]}>
            {!!icons.length ?
                icons
                : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale, 22), color: COLORS.Grey }}>No data found</Text>
                </View>
            }
        </View>
    }

    return (
        <View style={{ marginVertical: 1.5, width: width }}>
            <View style={{ backgroundColor: "#434343", padding: responsiveSizes(height, width, scale, fontScale, 5) }}>
                <View style={styles.box_1}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headings} numberOfLines={1}>{data.VRN || ""}</Text>
                        <Text style={styles.label}>{data.Model || ""}</Text>
                        <Text style={[styles.label, { color: "#BEBEBE" }]}>{data.GpsDateTime ? moment(data.GpsDateTime).format("DD-MMM-YYYY hh:mm:ss A") || "" : ""}</Text>
                        <View style={styles.btn}>
                            <View style={styles.btn_2}>
                                {signolsIcon(data.GsmSignal)}
                            </View>
                            <View style={styles.btn_2}>
                                {gpsIcon(data.GPS)}
                            </View>
                            <View style={styles.btn_2}>
                                {extBattryIcon(data.ExtBatV)}
                            </View>
                            <View style={styles.btn_2}>
                                {intBattryIcon(data.IntBatPercent)}
                            </View>
                            <View style={styles.btn_2}>
                                {fuelPumpIcon(data.Sensors)}
                            </View>
                            <View style={styles.btn_2}>
                                {imobilizerIcon(data.Immoblizer)}
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setIsMovingStatusOpen(!isMovingStatusOpen)} style={[styles.box_3, isMovingStatusOpen ? { backgroundColor: "#B6B6B6" } : {}]}>
                            {/* <View style={{ height: responsiveSizes(height, width, scale, fontScale, 60), width: responsiveSizes(height, width, scale, fontScale, 60), alignItems: "center", justifyContent: "center" }}> */}
                            {/* {vichelIcon(data.AssetType, data.Status)} */}
                            <Image source={vichelIcon(data.AssetType, data.Status)} style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40), resizeMode: "contain", marginVertical: responsiveSizes(height, width, scale, fontScale, 10) }} />
                            {/* </View> */}
                            <Text style={[styles.fonts, { marginBottom: responsiveSizes(height, width, scale, fontScale, 20), marginTop: responsiveSizes(height, width, scale, fontScale, -5) }]}>{`${data.ACC}/${data.Status}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setIsAlarmStatusOpen(!isAlarmStatusOpen)} style={[styles.box_3, isAlarmStatusOpen ? { backgroundColor: "#B6B6B6" } : {}]}>
                            <View style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 30) }}>
                                {alarmIcon(data.AlarmsCount)}
                            </View>
                            <Text style={[styles.fonts, { marginBottom: responsiveSizes(height, width, scale, fontScale, 5), marginTop: responsiveSizes(height, width, scale, fontScale, -2.5) }]}>{data.AlarmsCount || "No"} Alarm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={!(data.DeviceID || data.deviceId)} activeOpacity={0.8} onPress={() => onClickGoBtn()} style={styles.box_3}>
                            <View style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }}>
                                <SVG_ICONS.SignolsRed />
                            </View>
                            <Text style={[styles.fonts, { marginBottom: responsiveSizes(height, width, scale, fontScale, 5), marginTop: responsiveSizes(height, width, scale, fontScale, -10) }]}>GO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {!!data.Location && <View style={styles.addressBox}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25) }}>
                        <SVG_ICONS.LocationMark />
                    </View>
                    <Text style={styles.address}>{data.Location}</Text>
                </View>}
            </View>
            {isMovingStatusOpen && movingStatusSection(data.StatusPrev, data.StatusCurr)}
            {isAlarmStatusOpen && alarmStatusSection(data.Alarm)}
        </View>
    );
};
export default React.memo(AssetCart);
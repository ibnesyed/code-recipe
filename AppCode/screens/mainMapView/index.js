import React, { useEffect, useState, useRef } from "react";
import { FlatList, Text, Pressable, SafeAreaView, View, StyleSheet, TouchableOpacity, TextInput, BackHandler, Modal, TouchableWithoutFeedback, useWindowDimensions, TouchableHighlight, Image } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { DateTimeModal, Loader, MainMapViewComp } from "../../Components";
import { FONTS, SVG_ICONS, resposiveFontSize, responsiveSizes, ENGINE_TEMP_ICONS, ICONS } from "../../utils";
import BottomNavBar from "../../navigations/bottomNavBar";
import { getSingleVehicleData, getVehicleHistoryReplayData, clearDateTime, setDateTimeFrom, setDateTimeTo, getDeviceDetailsByID, getServicesByID, getFuelDetailsData } from "../../store/actions";
import moment from "moment";
import { vichelIcon } from "../../helpers";
import DatePicker from 'react-native-date-picker';
import { useFocusEffect } from '@react-navigation/native';
import { AnimatedRegion } from "react-native-maps";
import { ScrollView } from "react-native";

// let num = 1
const MainMapView = ({ route, navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        linearGradient: {
            height: responsiveSizes(height, width, scale, fontScale, 80),
            width: "100%",
            elevation: 5,
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.01),
            borderBottomColor: "#C9C9C9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: responsiveSizes(height, width, scale, fontScale, 25)
        },
        overlay: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContainer: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            width: responsiveSizes(height, width, scale, fontScale, 240),
            backgroundColor: 'white',
            borderRadius: 10,
            padding: responsiveSizes(height, width, scale, fontScale, 16),
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5, // for Android
        },
        modalTitle: {
            fontSize: resposiveFontSize(height, width, scale, fontScale, 18),
            fontWeight: 'bold',
            marginBottom: responsiveSizes(height, width, scale, fontScale, 10),
            color: "black"
        },
        modalText: {
            color: "black",
            fontSize: resposiveFontSize(height, width, scale, fontScale, 16)
        },
        option: {
            padding: 10,
        },
    });
    const dispatch = useDispatch();
    const DeviceID = route?.params?.DeviceID || null;
    const DeviceIDRef = useRef();
    DeviceIDRef.current = DeviceID;
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [selectedDeviceID, setSelectedDeviceID] = useState(null);
    const { vehicle_data, liveDataByGroup, vehicle_loader, deviceDetailsLoader } = useSelector(({ liveData }) => liveData)
    const { token } = useSelector(({ auth }) => auth)
    const rightMenuItems = Object.keys(liveDataByGroup) || [];
    const [leftMenu, setLeftMenu] = useState(false);
    const [rightMenu, setRightMenu] = useState(false);
    const [bottomMenu, setBottomMenu] = useState(false);
    const [rightMenuVal, setRightMenuVal] = useState("");
    const [leftMenuVal, setLeftMenuVal] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDateFromModalVisible, setIsDateFromModalVisible] = useState(false)
    const [isDateToModalVisible, setIsDateToModalVisible] = useState(false)
    // const [deviceOrigin, setdeviceOrigin] = useState(null)
    const [deviceOrigin, setDeviceOrigin] = useState(new AnimatedRegion({
        latitude: Number(vehicle_data?.Point?.split(",")[0] || 0),
        longitude: Number(vehicle_data?.Point?.split(",")[1] || 0),
        // latitudeDelta: 0.009,
        // longitudeDelta: 0.009,
    }));
    const [trackScreen, setTrackScreen] = useState({ tracking: false, visible: false })
    const [mapControllsFlags, setmapControllsFlags] = useState({ traffic: true, modes: true, share: true, tracking: true })
    const [secondMetter, setSecondMetter] = useState({ visible: true, value: "60 s" })
    const [distance, setDistance] = useState("0 km")
    const [time, setTime] = useState("0 min")

    const { dateTimeFrom, dateTimeTo, isLoading } = useSelector(({ replayData }) => replayData)
    // Ref to store the latest value of selectedDeviceID
    const selectedDeviceIDRef = useRef();

    useEffect(() => {
        // Update the ref whenever selectedDeviceID changes
        selectedDeviceIDRef.current = selectedDeviceID;
        if (selectedDeviceID) {
            fetchVehicleData(selectedDeviceID, true);
        }
    }, [selectedDeviceID]);

    const handelDateTimeForTripReply = (name, val) => {
        // console.log(name, val)
        if (!name) {
            setIsDateFromModalVisible(false)
            setIsDateToModalVisible(false)
            dispatch(clearDateTime())
            return
        }
        if (name === "from") {
            dispatch(setDateTimeFrom(val))
            // setDateTimeForTripReply({ ...dateTimeForTripReply, dateTimeFrom: val })
            setIsDateFromModalVisible(false)
            setIsDateToModalVisible(true)
            return
        }
        if (name === "to") {
            // setDateTimeForTripReply({ ...dateTimeForTripReply, dateTimeTo: val })
            // setIsDateFromModalVisible(false)
            // setIsDateToModalVisible(false)
            dispatch(setDateTimeTo(val, () => {
                dispatchDataAndChangeRoute(val)
            }))
        }
    }

    const dispatchDataAndChangeRoute = (val) => {
        const { VehicleId, cmp_id } = vehicle_data;
        // 2023-05-03%2000:00:00
        let obj = {
            VehicleId,
            cmp_id,
            dateTimeFrom: moment(dateTimeFrom).format("YYYY-MM-DD%20HH:mm:ss"),
            dateTimeTo: moment(val).format("YYYY-MM-DD%20HH:mm:ss")
        }
        dispatch(getVehicleHistoryReplayData(obj, (flag) => {
            setIsDateFromModalVisible(false)
            setIsDateToModalVisible(false)
            // setDateTimeForTripReply({
            //     dateTimeFrom: "", dateTimeTo: ""
            // })
            if (flag) {
                navigation.navigate("HistoryReplay")
            }
        }))
    }

    const fetchVehicleData = (deviceId, loading) => {
        dispatch(getSingleVehicleData(deviceId, loading));
    };

    let intervalRef = useRef();

    useFocusEffect(
        React.useCallback(() => {
            clearInterval(intervalRef.current);
            intervalRef.current = null
            if (!selectedDeviceIDRef.current && !DeviceIDRef.current) {
                navigation.goBack();
            } else {
                fetchVehicleData(selectedDeviceIDRef.current || DeviceIDRef.current, true);
                intervalRef.current = setInterval(() => {
                    // console.log("deviceID", DeviceIDRef.current, "Selected device ID", selectedDeviceIDRef.current, num++)
                    fetchVehicleData(selectedDeviceIDRef.current || DeviceIDRef.current);
                }, 20000); // 20 seconds interval (20,000 milliseconds)
            }
            return () => {
                clearIntervalState()
            };
        }, []));

    const clearIntervalState = () => {
        // console.log("============= clear chala")
        clearInterval(intervalRef.current);
        intervalRef.current = null
    }

    useEffect(() => {
        if (vehicle_data) {
            setLeftMenuVal(vehicle_data?.VRN)
            setRightMenuVal(vehicle_data?.GroupName)
        }
    }, [vehicle_data])

    useEffect(() => {
        if (vehicle_data) {
            const newDeviceOrigin = {
                latitude: Number(vehicle_data?.Point?.split(",")[0] || 0),
                longitude: Number(vehicle_data?.Point?.split(",")[1] || 0),
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
            };

            // Update deviceOrigin using the timing method
            // deviceOrigin.timing(newDeviceOrigin, { duration: 500 });
            setDeviceOrigin(newDeviceOrigin)
        }
    }, [vehicle_data])

    const setColorAsPerStatus = (Status) => {
        if (Status) {
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
        } else {
            return "#595959"
        }
    }

    const movingStatusSection = (Status) => {
        // let sinceTime = "";
        // if (StatusTime) {
        //     const moment = require('moment');
        //     const currentTime = moment();
        //     const statusTimeMoment = moment(StatusTime);
        //     const duration = moment.duration(currentTime.diff(statusTimeMoment));
        //     sinceTime = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
        // }
        return <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interBold, color: "#E1E1E1" }}><Text style={{ color: setColorAsPerStatus(Status), fontSize: resposiveFontSize(height, width, scale, fontScale, 14) }}>{Status}</Text></Text>
    }

    const onOkPressed = (val) => {
        setIsModalVisible(false)
        dispatch(getVehicleHistoryReplayData(false, (flag) => {
            if (flag) {
                navigation.navigate("HistoryReplay")
            }
        }))
    }

    const onCancelPressed = () => {
        setIsModalVisible(false)
    }

    const onCustomPress = () => {
        setIsModalVisible(false)
    }

    const handleGoBack = () => {
        if (trackScreen.tracking) {
            setTrackScreen(prevState => ({ ...prevState, tracking: false }))
            return true
        }
        if (trackScreen.visible) {
            setTrackScreen(prevState => ({ ...prevState, visible: false }))
            return true
        }
        return false
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleGoBack
        );

        return () => backHandler.remove();
    }, [trackScreen]);
    // const leftMenuComp = () => {
    //     let arr = [];
    //     if (rightMenuVal) {
    //         arr = liveDataByGroup[rightMenuVal]
    //     }
    //     if (!arr.length) {
    //         return
    //     }
    //     return <View style={{ zIndex: 100, position: "absolute", top: responsiveSizes(height, width, scale, fontScale, -5), left: responsiveSizes(height, width, scale, fontScale, 16), width: responsiveSizes(height, width, scale, fontScale, 120), backgroundColor: "white", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.3), borderRadius: responsiveSizes(height, width, scale, fontScale, 3), elevation: 5 }}>
    //         {arr.map((e, i) => (<TouchableOpacity key={e?.VRN + i} activeOpacity={0.7} onPress={() => { setSelectedDeviceID(e?.deviceId); setLeftMenuVal(e?.VRN); setLeftMenu(false) }} style={{ padding: responsiveSizes(height, width, scale, fontScale, 5), borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.5), flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
    //             <View style={{ width: responsiveSizes(height, width, scale, fontScale, 10), height: responsiveSizes(height, width, scale, fontScale, 10), backgroundColor: setColorAsPerStatus(e?.Status), borderRadius: 100 }} />
    //             <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), marginLeft: responsiveSizes(height, width, scale, fontScale, 3), color: "#4F4F4F", fontFamily: e.VRN === leftMenuVal ? FONTS.interBold : FONTS.interRegular }}>{e?.VRN}</Text>
    //         </TouchableOpacity>))}
    //     </View>
    // }
    const leftMenuComp = () => {
        let arr = [];
        if (rightMenuVal) {
            arr = liveDataByGroup[rightMenuVal];
        }
        if (!arr.length) {
            return null;
        }

        return (
            <FlatList
                style={{
                    zIndex: 100,
                    position: "relative",
                    top: responsiveSizes(height, width, scale, fontScale, -5),
                    left: responsiveSizes(height, width, scale, fontScale, 16),
                    width: responsiveSizes(height, width, scale, fontScale, 120),
                    backgroundColor: "white",
                    borderWidth: responsiveSizes(height, width, scale, fontScale, 0.3),
                    borderRadius: responsiveSizes(height, width, scale, fontScale, 3),
                    elevation: 5,
                    maxHeight: height / 2.5,
                }}
                data={arr}
                keyExtractor={(item, index) => item?.VRN + index}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item?.VRN}
                        activeOpacity={0.7}
                        onPress={() => {
                            setSelectedDeviceID(item?.deviceId);
                            setLeftMenuVal(item?.VRN);
                            setLeftMenu(false);
                        }}
                        style={{
                            padding: responsiveSizes(height, width, scale, fontScale, 5),
                            borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.5),
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: responsiveSizes(height, width, scale, fontScale, 10),
                                height: responsiveSizes(height, width, scale, fontScale, 10),
                                backgroundColor: setColorAsPerStatus(item?.Status),
                                borderRadius: 100,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: resposiveFontSize(height, width, scale, fontScale, 10),
                                marginLeft: responsiveSizes(height, width, scale, fontScale, 3),
                                color: "#4F4F4F",
                                fontFamily: item.VRN === leftMenuVal ? FONTS.interBold : FONTS.interRegular,
                            }}
                        >
                            {item?.VRN}
                        </Text>
                    </TouchableOpacity>
                )}
            />

        );
    };

    const rightMenuComp = () => {
        return <FlatList
            style={{
                zIndex: 120,
                position: "relative",
                top: responsiveSizes(height, width, scale, fontScale, -5),
                left: responsiveSizes(height, width, scale, fontScale, (width - (120 + 16))),
                width: responsiveSizes(height, width, scale, fontScale, 120),
                backgroundColor: "white",
                borderWidth: responsiveSizes(height, width, scale, fontScale, 0.3),
                borderRadius: responsiveSizes(height, width, scale, fontScale, 3),
                elevation: 5,
                maxHeight: height / 2.5,
            }}
            data={rightMenuItems}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
                <TouchableOpacity
                    key={item}
                    activeOpacity={0.7}
                    onPress={() => {
                        setRightMenuVal(item);
                        setRightMenu(false);
                    }}
                    style={{
                        padding: responsiveSizes(height, width, scale, fontScale, 5),
                        borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.5),
                    }}
                >
                    <Text
                        style={{
                            fontSize: resposiveFontSize(height, width, scale, fontScale, 10),
                            color: "#4F4F4F",
                            fontFamily: item === rightMenuVal ? FONTS.interBold : FONTS.interRegular,
                        }}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>
            )}
        />

        // return <View style={{ position: "absolute", top: responsiveSizes(height, width, scale, fontScale, -5), right: responsiveSizes(height, width, scale, fontScale, 16), width: responsiveSizes(height, width, scale, fontScale, 120), backgroundColor: "white", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.3), borderRadius: responsiveSizes(height, width, scale, fontScale, 3), elevation: 5 }}>
        //     {rightMenuItems?.length && rightMenuItems.map((name, id) => (
        //         <TouchableOpacity key={name + id} activeOpacity={0.7} onPress={() => { setRightMenuVal(name), setRightMenu(false) }} style={{ padding: responsiveSizes(height, width, scale, fontScale, 5), borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.5) }}>
        //             <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), color: "#4F4F4F", fontFamily: name === rightMenuVal ? FONTS.interBold : FONTS.interRegular }}>{name}</Text>
        //         </TouchableOpacity>
        //     ))}
        // </View>
    }

    const setOverSpeedFontColor = (deviceStatus) => {
        if (deviceStatus) {
            try {
                var cleanedDeviceStatus = deviceStatus.toLowerCase().replace(/\s/g, "");
                if (cleanedDeviceStatus.includes("overspeed")) {
                    return "#F80000"
                } else {
                    return "white"
                }
            } catch (error) {
                return "white"
            }
        } else {
            return "white"
        }
    }

    const handleDateSelection = (param) => {
        const { VehicleId, cmp_id } = vehicle_data;
        // 2023-05-03%2000:00:00

        let tempDateTimeFrom, tempDateTimeTo;

        if (param === "today") {
            tempDateTimeFrom = new Date(moment().startOf('day'));
            tempDateTimeTo = new Date();
        } else if (param === "yesterday") {
            tempDateTimeFrom = new Date(moment().subtract(1, 'days').startOf('day'));
            tempDateTimeTo = new Date(moment().subtract(1, 'days').endOf('day'));

        } else if (param === "week") {
            tempDateTimeFrom = new Date(moment().subtract(1, 'weeks'));
            tempDateTimeTo = new Date();
        }
        dispatch(setDateTimeFrom(tempDateTimeFrom))
        dispatch(setDateTimeTo(tempDateTimeTo))
        const obj = {
            VehicleId,
            cmp_id,
            dateTimeFrom: moment(tempDateTimeFrom).format('YYYY-MM-DD%20HH:mm:ss'),
            dateTimeTo: moment(tempDateTimeTo).format('YYYY-MM-DD%20HH:mm:ss'),
        };
        setDateModalVisible(false)
        dispatch(getVehicleHistoryReplayData(obj, (flag) => {

            if (flag) {
                // console.log("===========================")
                navigation.navigate("HistoryReplay")
            }
        }))
    }

    const services = useSelector(({ services }) => services);

    const fetchDataBeforeNavigate = (nav, obj) => {
        if (nav === "DeviceDetail") {
            dispatch(getDeviceDetailsByID(obj.DeviceID, (flag) => {
                if (flag) {
                    navigation.navigate(nav, obj)
                }
            }))
        } else if (nav === "Settings") {
            dispatch(getServicesByID(obj.VehicleId, (flag) => {
                if (flag) {
                    navigation.navigate(nav, obj)
                }
            }))

        }
        // navigation.navigate("Settings", { VehicleId: vehicle_data?.VehicleId })
    }

    const fuelDeatilLoader = useSelector(({ fuelDetails }) => fuelDetails.isLoading)

    const goToFuelDetails = () => {
        let obj = {
            vehId: vehicle_data?.VehicleId,
            dateTimeFrom: moment().startOf('day').format('YYYY-MM-DD%20HH:mm:ss'),
            dateTimeTo: moment().format('YYYY-MM-DD%20HH:mm:ss')
        }
        dispatch(getFuelDetailsData(obj, (flag) => {
            if (flag) {
                navigation.navigate("FuelDetail")
            }
        }))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Modal
                transparent={true}
                animationType="slide"
                visible={dateModalVisible}
                onRequestClose={() => setDateModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setDateModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Select Date</Text>
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => handleDateSelection('today')}
                            >
                                <Text style={styles.modalText}>Today</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => handleDateSelection('yesterday')}
                            >
                                <Text style={styles.modalText}>Yesterday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => handleDateSelection('week')}
                            >
                                <Text style={styles.modalText}>This Week</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => {
                                    setDateModalVisible(false)
                                    setIsDateFromModalVisible(true)
                                }}
                            >
                                <Text style={styles.modalText}>Custom Date</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {(vehicle_loader || isLoading || deviceDetailsLoader || services.isLoading || fuelDeatilLoader) && <Loader />}
            {!trackScreen?.visible && !!DeviceID && <View style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 500 }}>
                <View style={{ height: responsiveSizes(height, width, scale, fontScale, 80), backgroundColor: "#D4D4D4", flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => { setRightMenu(false); setLeftMenu(!leftMenu) }} activeOpacity={0.7} style={{ marginLeft: responsiveSizes(height, width, scale, fontScale, 20), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 5), width: responsiveSizes(height, width, scale, fontScale, 120), height: responsiveSizes(height, width, scale, fontScale, 25), backgroundColor: "white", marginBottom: responsiveSizes(height, width, scale, fontScale, 10), flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 5, borderRadius: responsiveSizes(height, width, scale, fontScale, 3) }}>
                        <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 12), color: "black", fontFamily: FONTS.interBold }}>
                            {/* {vehicle_data?.VRN || "--"} */}
                            {leftMenuVal}
                        </Text>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale, 20), width: responsiveSizes(height, width, scale, fontScale, 20) }}>
                            <SVG_ICONS.DarkDown />
                        </View>
                    </TouchableOpacity>
                    <View style={{ justifyContent: "center", alignItems: "center", width: responsiveSizes(height, width, scale, fontScale, 140), overflow: "hidden" }}>
                        {/* <View style={{ height: responsiveSizes(height, width, scale, fontScale, 60), width: responsiveSizes(height, width, scale, fontScale, 60), alignItems: "center", justifyContent: "center" }}> */}
                        <Image source={vichelIcon(vehicle_data?.AssetType, vehicle_data?.Status)}
                            style={{
                                height: responsiveSizes(height, width, scale, fontScale, 60),
                                width: responsiveSizes(height, width, scale, fontScale, 60),
                                marginBottom: responsiveSizes(height, width, scale, fontScale, 5),
                                resizeMode: "contain",
                            }}
                        />
                        {/* {vichelIcon(vehicle_data?.AssetType, vehicle_data?.Status)} */}
                        {/* </View> */}
                        <Text style={{ backgroundColor: setColorAsPerStatus(vehicle_data?.Status || ""), padding: responsiveSizes(height, width, scale, fontScale, 2), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 10), marginTop: responsiveSizes(height, width, scale, fontScale, -10), fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular, color: "white" }}>
                            {`${vehicle_data?.ACC || ""}/${vehicle_data?.Status || ""}`}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => { setLeftMenu(false); setRightMenu(!rightMenu) }} activeOpacity={0.7} style={{ marginRight: responsiveSizes(height, width, scale, fontScale, 20), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 5), width: responsiveSizes(height, width, scale, fontScale, 120), height: responsiveSizes(height, width, scale, fontScale, 25), backgroundColor: "white", marginBottom: responsiveSizes(height, width, scale, fontScale, 10), flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: responsiveSizes(height, width, scale, fontScale, 3), elevation: 5 }}>
                        <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), color: "#4F4F4F", fontFamily: FONTS.interRegular, flex: 1 }} numberOfLines={2}>
                            {/* {vehicle_data?.GroupName || "--"} */}
                            {rightMenuVal}
                        </Text>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale, 20), width: responsiveSizes(height, width, scale, fontScale, 20) }}>
                            <SVG_ICONS.DarkDown />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    {!!leftMenu && leftMenuComp()}
                    {!!rightMenu && rightMenuComp()}
                </View>
            </View>}
            {trackScreen?.visible && (trackScreen?.tracking ?
                <View style={{ height: responsiveSizes(height, width, scale, fontScale, 49), zIndex: 150, width: responsiveSizes(height, width, scale, fontScale, 300), alignSelf: "center", position: "absolute", top: responsiveSizes(height, width, scale, fontScale, 20), backgroundColor: "#0F6601", borderRadius: responsiveSizes(height, width, scale, fontScale, 10), elevation: 4, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interRegular }}>Jimi Technologies Bilal Road</Text>
                </View>
                :
                <View style={{ height: responsiveSizes(height, width, scale, fontScale, 60), zIndex: 150, backgroundColor: "#D4D4D4", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }} onPress={handleGoBack} activeOpacity={0.7}>
                        <SVG_ICONS.Back />
                    </TouchableOpacity>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25) }}>
                        <SVG_ICONS.Blue />
                    </View>
                    <TextInput
                        editable={false}
                        value={""}
                        // onChangeText={(e) => setLocation(e)}
                        placeholder="Your Location"
                        placeholderTextColor={"#9A9A9A"}
                        style={{ backgroundColor: "white", color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 14), fontFamily: FONTS.interRegular, height: responsiveSizes(height, width, scale, fontScale, 34), padding: responsiveSizes(height, width, scale, fontScale, 5), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 10), width: responsiveSizes(height, width, scale, fontScale, 260), borderRadius: responsiveSizes(height, width, scale, fontScale, 7), borderWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderColor: "black" }}
                    />
                </View>)
            }
            {deviceOrigin && <MainMapViewComp
                styles={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
                deviceOrigin={deviceOrigin}
                deviceDirAngle={Number(vehicle_data?.DirAngle || 0)}
                deviceStatus={vehicle_data?.Status}
                deviceType={vehicle_data?.AssetType}
                navigation={navigation}
                mapControllsFlags={mapControllsFlags}
                secondMetter={secondMetter}
                setTrackScreen={setTrackScreen}
                trackScreen={trackScreen}
                setDistance={setDistance}
                setTime={setTime}
                shareMessage={`https://web.teletix.pk:1950/?token=${token}&deviceId=${selectedDeviceID || DeviceID}`}
            />}
            {!trackScreen?.visible && !!DeviceID && <View style={{ position: "absolute", bottom: responsiveSizes(height, width, scale, fontScale, 60), left: 0, right: 0, backgroundColor: "#434343", paddingBottom: responsiveSizes(height, width, scale, fontScale, 20) }}>
                {!!bottomMenu && <TouchableOpacity activeOpacity={0.7} onPress={() => setBottomMenu(false)} style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 30), position: "absolute", top: responsiveSizes(height, width, scale, fontScale, -30), left: responsiveSizes(height, width, scale, fontScale, 20), backgroundColor: "#676767", borderTopRightRadius: responsiveSizes(height, width, scale, fontScale, 5), borderTopLeftRadius: responsiveSizes(height, width, scale, fontScale, 5), alignItems: "center", justifyContent: "center" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25) }}>
                        <SVG_ICONS.DownArrow />
                    </View>
                </TouchableOpacity>}
                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setBottomMenu(!bottomMenu)}>
                        <ICONS.Entypo name={`chevron-thin-${!!bottomMenu ? "down" : "up"}`} color="white" size={responsiveSizes(height, width, scale, fontScale, 25)} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 5 }}>
                        <Text onPress={() => goToFuelDetails()} style={{ color: "#5E77F9", fontSize: 15 }}>Fuel Detail</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: responsiveSizes(height, width, scale, fontScale, 4) }}>
                    <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 11), fontFamily: FONTS.interRegular, color: "white" }}>Last Position: {(vehicle_data?.GpsDateTime && vehicle_data.GpsDateTime !== "NA") ? moment(vehicle_data.GpsDateTime).format('YYYY-MM-DD hh:mm:ss A') : "NA"} </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: responsiveSizes(height, width, scale, fontScale, 5) }}>
                    <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 11), fontFamily: FONTS.interRegular, color: "white" }}>Last Update: {(vehicle_data?.RecDateTime && vehicle_data.RecDateTime !== "NA") ? moment(vehicle_data.RecDateTime).format('YYYY-MM-DD hh:mm:ss A') : "NA"} </Text>
                    {movingStatusSection(vehicle_data?.StatusCurr)}
                </View>
                <View style={{ height: responsiveSizes(height, width, scale, fontScale, 70), borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderColor: "white", flexDirection: "row", flex: 1 }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 70), borderColor: "white", flex: 1.5 }}>
                        <View style={{ borderColor: "white", flex: 1.5, flexDirection: "row" }}>
                            <View style={{ borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderColor: "white", flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <View style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 30) }}>
                                    {!!vehicle_data?.EngineTmp ? ((vehicle_data.EngineTmp > 100) ? <ENGINE_TEMP_ICONS.engineTempRed /> : <ENGINE_TEMP_ICONS.engineTempBlue />) : <ENGINE_TEMP_ICONS.engineTempGrey />}
                                </View>
                            </View>
                            <View style={{ borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderColor: "white", flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "#BFBFBF", fontSize: resposiveFontSize(height, width, scale, fontScale, 30), fontFamily: FONTS.interRegular }}>{vehicle_data?.EngineTmp || 0}</Text>
                            </View>
                        </View>
                        <View style={{ borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderColor: "white", flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 20), fontFamily: FONTS.interBold }}>{vehicle_data?.RPM || 0}</Text>
                            <Text style={{ color: "#ACACAC", fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interBold }}>RPM</Text>
                        </View>
                    </View>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 70), flex: 1, alignItems: "center" }}>
                        <Text style={{ marginTop: responsiveSizes(height, width, scale, fontScale, -5), color: setOverSpeedFontColor(vehicle_data?.DeviceStatus), fontFamily: FONTS.interRegular, fontSize: resposiveFontSize(height, width, scale, fontScale, 40) }}>{vehicle_data?.Speed || 0}</Text>
                        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: responsiveSizes(height, width, scale, fontScale, 20), backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#636363", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>km/h</Text>
                        </View>
                    </View>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 70), borderColor: "white", flex: 1.5 }}>
                        <View style={{ borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderColor: "white", flex: 1.2, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interRegular }}>{vehicle_data?.Mileage || 0}</Text>
                            <Text style={{ color: "#ACACAC", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interRegular }}>Km</Text>
                        </View>
                        <View style={{ borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderColor: "white", flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <Text style={{ color: "#ACACAC", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Top Speed</Text>
                            <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>{vehicle_data?.TopSpeed || "0 Km/Hr"}</Text>
                            {/* <Text style={{ color: "#ACACAC", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interRegular }}>KML</Text> */}
                        </View>
                        <View style={{ borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderColor: "white", flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <Text style={{ color: "#ACACAC", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}> Fuel Avg</Text>
                            <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>{vehicle_data?.FuelAvg || "0 Km/Ltr"}</Text>
                            {/* <Text style={{ color: "#ACACAC", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interRegular }}>KML</Text> */}
                        </View>
                    </View>
                </View>
                {<ScrollView horizontal={true} style={{ width: "100%", backgroundColor: "#C01717" }}>
                    <TouchableOpacity disabled={!vehicle_data?.AlarmsCount} activeOpacity={0.7} onPress={() => { navigation.navigate("Notifications") }} style={{ paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 15), flexDirection: "row", alignItems: "center", backgroundColor: "#C01717" }}>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 30) }}>
                            <SVG_ICONS.LightBell />
                        </View>
                        <Text style={{ color: !!vehicle_data?.AlarmsCount ? "white" : "#B5B5B5", fontSize: responsiveSizes(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }} >{!!vehicle_data?.AlarmsCount ? vehicle_data?.Alarm || "No Alerts Today" : "No Alerts Today"}</Text>
                    </TouchableOpacity>
                </ScrollView>}
                {!!bottomMenu && <>
                {vehicle_data?.Location && <View style={{ marginHorizontal: responsiveSizes(height, width, scale, fontScale, 20), marginVertical: responsiveSizes(height, width, scale, fontScale, 10), flexDirection: "row", alignItems: "center" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 20), width: responsiveSizes(height, width, scale, fontScale, 20) }}>
                        <SVG_ICONS.LocationMark />
                    </View>
                    <Text style={{ color: "white", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 10), fontSize: responsiveSizes(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>{vehicle_data?.Location}</Text>
                </View>}
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", borderTopColor: "white", borderTopWidth: responsiveSizes(height, width, scale, fontScale, 0.5), paddingTop: responsiveSizes(height, width, scale, fontScale, 10) }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.navigate("CommandScreen", { DeviceID: selectedDeviceID || DeviceID, cmp_id: vehicle_data?.cmp_id, VRN: vehicle_data?.VRN }) }} style={{ alignItems: "center" }}>
                            <View style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }}>
                                <SVG_ICONS.Adjust />
                            </View>
                            <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular, color: "white" }}>Command</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => { fetchDataBeforeNavigate("Settings", { VehicleId: vehicle_data?.VehicleId }) }} style={{ alignItems: "center" }}>
                            <View style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }}>
                                <SVG_ICONS.SettingsWhite />
                            </View>
                            <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular, color: "white" }}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => { fetchDataBeforeNavigate("DeviceDetail", { DeviceID: selectedDeviceID || DeviceID }) }} style={{ alignItems: "center" }}>
                            <View style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }}>
                                <SVG_ICONS.SearchInList />
                            </View>
                            <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular, color: "white" }}>Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setDateModalVisible(true)} style={{ alignItems: "center" }}>
                            <View style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }}>
                                <SVG_ICONS.WavyArrowUp />
                            </View>
                            <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular, color: "white" }}>Playback</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.navigate("Reports") }} style={{ alignItems: "center" }}>
                            <View style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }}>
                                <SVG_ICONS.Documents />
                            </View>
                            <Text style={{ marginTop: -5, marginBottom: 5, fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular, color: "white" }}>Reports</Text>
                        </TouchableOpacity>

                    </View></>}
            </View>}
            {/* <DatePicker /> */}
            <DatePicker
                title="Select From Date & Time"
                modal
                mode="datetime"
                maximumDate={moment().subtract(0.5, 'hour').toDate()}
                open={isDateFromModalVisible}
                date={dateTimeFrom || moment().subtract(0.5, 'hour').toDate()}
                onConfirm={(date) => {
                    handelDateTimeForTripReply("from", date)
                }}
                onCancel={() => {
                    handelDateTimeForTripReply(false)
                }}
            />
            <DatePicker
                title="Select To Date & Time"
                modal
                mode="datetime"
                minimumDate={!!dateTimeFrom ? moment(dateTimeFrom).add(5, 'minutes').toDate() : null}
                maximumDate={(!!dateTimeFrom && moment(dateTimeFrom).isBefore(moment().subtract(7, 'days'))) ? moment(dateTimeFrom).add(7, 'days').toDate() : new Date()}
                open={isDateToModalVisible}
                date={dateTimeTo || ((!!dateTimeFrom && moment(dateTimeFrom).isBefore(moment().subtract(7, 'days'))) ? moment(dateTimeFrom).add(7, 'days').toDate() : new Date())}
                onConfirm={(date) => {
                    handelDateTimeForTripReply("to", date)
                }}
                onCancel={() => {
                    handelDateTimeForTripReply(false)
                }}
            />


            {/* <DateTimeModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                onOkPressed={onOkPressed}
                onCancelPressed={onCancelPressed}
                onCustomPress={onCustomPress}
            /> */}
            {trackScreen?.visible ?
                <>
                    {trackScreen?.tracking ?
                        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFFFFF", elevation: 10, height: responsiveSizes(height, width, scale, fontScale, 65), borderTopWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderTopColor: "#9F9F9F", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }} onPress={() => setTrackScreen(prevState => ({ ...prevState, tracking: false }))}>
                                <SVG_ICONS.CloseWindow />
                            </TouchableOpacity>
                            <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 20), fontFamily: FONTS.interBold }}>{time}</Text>
                            <View></View>
                            <Text style={{ color: "#5B5B5B", fontSize: resposiveFontSize(height, width, scale, fontScale, 15), fontFamily: FONTS.interRegular }}>{distance}</Text>
                            <Text style={{ color: "#5B5B5B", fontSize: resposiveFontSize(height, width, scale, fontScale, 15), fontFamily: FONTS.interRegular }}>{moment().format("hh:mm:ss A")}</Text>
                        </View>
                        :
                        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#676767", height: responsiveSizes(height, width, scale, fontScale, 65), flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ flex: 1, fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interRegular, color: "#FFFFFF", textAlign: "center" }}>{time}<Text style={{ color: "#D8D8D8" }}>({distance})</Text></Text>
                            <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 30), width: responsiveSizes(height, width, scale, fontScale, 60), borderRadius: responsiveSizes(height, width, scale, fontScale, 20), elevation: 5, backgroundColor: "#F1F1F1", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderColor: "black", justifyContent: "center", alignItems: "center" }} activeOpacity={0.7} onPress={() => setTrackScreen(prevState => ({ ...prevState, tracking: true }))}>
                                <Text style={{ color: "#3D3D3D", fontSize: resposiveFontSize(height, width, scale, fontScale, 14), fontFamily: FONTS.interRegular }}>Start</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}></View>
                        </View>
                    }
                </>
                :
                <BottomNavBar activeName="radio" />}
        </SafeAreaView>
    );
};

export default React.memo(MainMapView);
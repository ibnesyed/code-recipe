import React, { useEffect, useState, useRef } from "react";
import { Text, SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Modal, Button, useWindowDimensions, Platform } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { FONTS, SVG_ICONS, resposiveFontSize, responsiveSizes, MARKER_MAP_ICONS, ICONS } from "../../utils";
import MapView, { Callout, Marker, PROVIDER_GOOGLE,PROVIDER_DEFAULT, Polyline } from "react-native-maps";
import Slider from '@react-native-community/slider';
import { markerIconForMap } from "../../helpers";
import { getTripReplayList, getVehicleHistoryReplayData, setDateTimeFrom, setDateTimeTo } from "../../store/actions";
import moment from "moment";
import { Loader } from "../../Components";
import DatePicker from "react-native-date-picker";

const HistoryReplay = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const fuelPrice = useSelector(({ auth }) => auth.fuelPrice)
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const dispatch = useDispatch()
    const [isDateFromModalVisible, setIsDateFromModalVisible] = useState(false)
    const [isDateToModalVisible, setIsDateToModalVisible] = useState(false)
    const [startMark, setStartMark] = useState(null);
    const [endMark, setEndMark] = useState(null);
    const [polyLine, setPolyLine] = useState(null);
    const [allMarkers, setAllMarkers] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const { Summery, HistoryReplay, dateTimeFrom, dateTimeTo, isLoading } = useSelector(({ replayData }) => replayData)
    const { vehicle_data } = useSelector(({ liveData }) => liveData)

    const [currentRegion, setCurrentRegion] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    // const [fuelPrice, setFuelPrice] = useState('');


    const handelDateTimeForTripReply = (name, val) => {
        if (!name) {
            setIsDateFromModalVisible(false)
            setIsDateToModalVisible(false)
            return
        }
        if (name === "from") {
            // dispatch(setDateTimeFrom(val, () => { }))
            setIsDateFromModalVisible(false)
        }
        if (name === "to") {
            // dispatch(setDateTimeTo(val, () => { }))
            setIsDateToModalVisible(false)
        }
        dispatchDataAndChangeRoute(name, val)
    }
    const dispatchDataAndChangeRoute = (name, val) => {
        const { VehicleId, cmp_id } = vehicle_data;
        // 2023-05-03%2000:00:00
        let obj = {
            VehicleId,
            cmp_id,
            dateTimeFrom: name === "from" ? moment(val).format("YYYY-MM-DD%20HH:mm:ss") : moment(dateTimeFrom).format("YYYY-MM-DD%20HH:mm:ss"),
            dateTimeTo: name === "to" ? moment(val).format("YYYY-MM-DD%20HH:mm:ss") : moment(dateTimeTo).format("YYYY-MM-DD%20HH:mm:ss")
        }
        dispatch(getVehicleHistoryReplayData(obj, (flag) => {
            if (flag) {
                if (name === "from") {
                    dispatch(setDateTimeFrom(val, () => { }))
                }
                if (name === "to") {
                    dispatch(setDateTimeTo(val, () => { }))
                }
            }
        }))
    }


    // const handleOkPress = () => {
    //     getTripList(parseFloat(fuelPrice));
    //     // setModalVisible(false);
    // };

    // const handleCancelPress = () => {
    //     setModalVisible(false);
    // };

    const getTripList = (fuelUnitPrice) => {
        const { VehicleId, cmp_id } = vehicle_data;
        // 2023-05-03%2000:00:00
        let obj = {
            VehicleId,
            cmp_id,
            dateTimeFrom: moment(dateTimeFrom).format("YYYY-MM-DD%20HH:mm:ss"),
            dateTimeTo: moment(dateTimeTo).format("YYYY-MM-DD%20HH:mm:ss"),
            fuelUnitPrice
        }

        dispatch(getTripReplayList(obj, () => {
            setCurrentIndex(0)
            navigation.navigate("TripReplay")
        }))
    };

    const handleRegionChange = (region) => {
        setCurrentRegion(region)
    };

    useEffect(() => {
        if (HistoryReplay?.length) {
            setCurrentRegion({
                latitude: (HistoryReplay[0].latitude + HistoryReplay[HistoryReplay.length - 1].latitude) / 2,
                longitude: (HistoryReplay[0].longitude + HistoryReplay[HistoryReplay.length - 1].longitude) / 2,
                latitudeDelta: Math.abs(HistoryReplay[HistoryReplay.length - 1].latitude - HistoryReplay[0].latitude) * 1.5,
                longitudeDelta: Math.abs(HistoryReplay[HistoryReplay.length - 1].longitude - HistoryReplay[0].longitude) * 1.5,
            })
            setStartMark(<Marker
                coordinate={HistoryReplay[0]}
                flat={true}
            >
                <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }} onPress={() => null} activeOpacity={0.7}>
                    <MARKER_MAP_ICONS.startIcon />
                </TouchableOpacity>
            </Marker>);
            setEndMark(<Marker
                coordinate={HistoryReplay[HistoryReplay.length - 1]}
                flat={true}
            >
                <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }} onPress={() => null} activeOpacity={0.7}>
                    <MARKER_MAP_ICONS.endIcon />
                </TouchableOpacity>
            </Marker>);
            setPolyLine(<Polyline
                coordinates={HistoryReplay}
                strokeWidth={4}
                strokeColor="#3A66FF"
            />)
            setAllMarkers(HistoryReplay.map((e, i) => {
                if (e.Status === "Idle" || e.Status === "Parked") {
                    let data = e?.Remarks?.split("|") || []
                    return <Marker
                        key={i + e.Status + "===="}
                        coordinate={e}
                        flat={true}
                    >
                        <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }} onPress={() => null} activeOpacity={0.7}>
                            {e.Status === "Parked" ? <MARKER_MAP_ICONS.parkedIcon /> : <MARKER_MAP_ICONS.idleicon />}
                        </TouchableOpacity>
                        <Callout tooltip style={{ width: responsiveSizes(height, width, scale, fontScale, 200), justifyContent: "center", alignItems: "center" }}>
                            <ScrollView style={{ width: responsiveSizes(height, width, scale, fontScale, 200), height: responsiveSizes(height, width, scale, fontScale, 90), borderRadius: responsiveSizes(height, width, scale, fontScale, 15), backgroundColor: "#565656" }}>
                                <View style={{ margin: responsiveSizes(height, width, scale, fontScale, 15) }}>
                                    <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), color: "white", fontFamily: FONTS.interBlack }}>{e.Status}</Text>
                                    <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), color: "white", fontFamily: FONTS.interBlack }}>{`Start: ${moment(data[0]).format("MM-DD-YYYY hh:mm:ss A")}`}</Text>
                                    <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 10), color: "white", fontFamily: FONTS.interBlack }}>{`End:  ${moment(data[1]).format("MM-DD-YYYY hh:mm:ss A")}`}</Text>
                                    <Text style={{ marginTop: responsiveSizes(height, width, scale, fontScale, 10), fontSize: resposiveFontSize(height, width, scale, fontScale, 10), color: "white", fontFamily: FONTS.interBlack }}>{`Duration: ${data[2]}`}</Text>
                                </View>
                            </ScrollView>
                        </Callout>
                    </Marker>
                }
            }))
        }
    }, [HistoryReplay])


    const intervalFlagRef = useRef(null);
    useEffect(() => {
        if (isPlaying) {
            intervalFlagRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % HistoryReplay.length);
            }, 600 / playbackSpeed);
        } else {
            clearInterval(intervalFlagRef.current);
        }
        return () => clearInterval(intervalFlagRef.current);
    }, [isPlaying]);
    const changePlaybackSpeed = (multiplier) => {
        // Calculate the new speed based on the multiplier
        const newSpeed = 600 / multiplier;
        setPlaybackSpeed(multiplier);
        // console.log(multiplier, newSpeed)
        // Clear the existing interval and set a new one with the updated speed
        clearInterval(intervalFlagRef.current);
        intervalFlagRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % HistoryReplay.length);
        }, newSpeed);
    };
    useEffect(() => {
        if (currentIndex === (HistoryReplay.length - 1)) {
            setIsPlaying(false); // Stop auto-play when it reaches the end
        }
    }, [currentIndex])
    // const modalForFulePrice = () => {
    //     return <Modal
    //         animationType="slide"
    //         transparent={true}
    //         visible={modalVisible}
    //         onRequestClose={() => setModalVisible(false)}
    //     >
    //         <View
    //             style={{
    //                 flex: 1,
    //                 justifyContent: 'center',
    //                 // alignItems: 'center',
    //                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //                 padding: responsiveSizes(height, width, scale, fontScale,10),
    //             }}
    //         >
    //             <View
    //                 style={{
    //                     backgroundColor: 'white',
    //                     padding: responsiveSizes(height, width, scale, fontScale,20),
    //                     borderRadius: responsiveSizes(height, width, scale, fontScale,10),
    //                 }}
    //             >
    //                 <Text style={{ marginBottom: responsiveSizes(height, width, scale, fontScale,10), color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,18), textAlign: "center" }}>Enter fuel price</Text>
    //                 <TextInput
    //                     style={{
    //                         borderWidth: 1,
    //                         borderColor: 'gray',
    //                         padding: responsiveSizes(height, width, scale, fontScale,10),
    //                         marginBottom: responsiveSizes(height, width, scale, fontScale,10),
    //                         textAlign: "center",
    //                         fontSize: resposiveFontSize(height, width, scale, fontScale,18),
    //                         borderRadius: responsiveSizes(height, width, scale, fontScale,20),
    //                         color: "black"
    //                     }}
    //                     placeholderTextColor={"grey"}
    //                     placeholder="0"
    //                     keyboardType="numeric"
    //                     value={fuelPrice}
    //                     onChangeText={(text) => setFuelPrice(text)}
    //                 />
    //                 <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
    //                     <View></View>
    //                     <View style={{ display: "flex", flexDirection: "row" }}>
    //                         <View style={{ width: 100, marginHorizontal: 5 }}>
    //                             <Button title="Cancel" onPress={handleCancelPress} />
    //                         </View>
    //                         <View style={{ width: 100, marginHorizontal: 5 }}>
    //                             <Button title="OK" onPress={handleOkPress} />
    //                         </View>
    //                     </View>
    //                 </View>
    //             </View>
    //         </View>
    //     </Modal>
    // }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {isLoading && <Loader />}
            {/* {modalForFulePrice()} */}
            <View style={{ height: responsiveSizes(height, width, scale, fontScale, 49), width: responsiveSizes(height, width, scale, fontScale, 300), zIndex: 1000, alignSelf: "center", flexDirection: "row", position: "absolute", top: responsiveSizes(height, width, scale, fontScale, 20), backgroundColor: "#737373", borderRadius: responsiveSizes(height, width, scale, fontScale, 50), elevation: 4, justifyContent: "space-between", alignItems: "center", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 20) }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: responsiveSizes(height, width, scale, fontScale, -20) }}>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 35), width: responsiveSizes(height, width, scale, fontScale, 35) }} onPress={() => { setIsPlaying(false); setCurrentIndex(0); navigation.goBack() }}>
                        <SVG_ICONS.BackWhite />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interBold }}>{Summery.assetName || ""}</Text>
                </View>
                <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interExtraBold }}>History</Text>
            </View>
            {!!HistoryReplay?.length && !!currentRegion && <MapView
                zoomEnabled={true}
                mapType="standard"
                provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
                // provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={isPlaying ? {
                    ...HistoryReplay[currentIndex], latitudeDelta: currentRegion.latitudeDelta,
                    longitudeDelta: currentRegion.longitudeDelta,
                } : currentRegion}
                onRegionChangeComplete={handleRegionChange}
                rotateEnabled={true}
            >
                {HistoryReplay?.length && <Marker
                    coordinate={HistoryReplay[currentIndex]}
                    flat={true}
                    rotation={HistoryReplay[currentIndex].Dir}
                >
                    <View style={[(Platform.OS === "ios" ? { transform: [{ rotate: `${HistoryReplay[currentIndex].Dir}deg` }] } : {} ),{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }]}>
                        {markerIconForMap(vehicle_data?.AssetType, HistoryReplay[currentIndex].Status)}
                    </View>
                </Marker>}
                {startMark}
                {endMark}
                {polyLine}
                {allMarkers}
            </MapView>}
            <View style={{ backgroundColor: "#575757" }}>
                <View style={{ flexDirection: "row", padding: responsiveSizes(height, width, scale, fontScale, 10) }}>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>From</Text>
                        <TouchableOpacity style={{ backgroundColor: "#AED9AB", padding: responsiveSizes(height, width, scale, fontScale, 10), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 15) }} activeOpacity={0.7} onPress={() => { setIsPlaying(false); setIsDateFromModalVisible(true) }}>
                            <Text style={{ color: "#656565", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{moment(dateTimeFrom).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>To</Text>
                        <TouchableOpacity style={{ backgroundColor: "#F0F0F0", padding: responsiveSizes(height, width, scale, fontScale, 10), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 15) }} activeOpacity={0.7} onPress={() => { setIsPlaying(false); setIsDateToModalVisible(true) }}>
                            <Text style={{ color: "#656565", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{moment(dateTimeTo).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Slider
                    style={{ width: "90%", height: responsiveSizes(height, width, scale, fontScale, 40), alignSelf: "center" }}
                    minimumValue={0}
                    maximumValue={HistoryReplay.length - 1}
                    value={currentIndex}
                    minimumTrackTintColor="#70B2FF"
                    maximumTrackTintColor="black"
                />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: responsiveSizes(height, width, scale, fontScale, 5) }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setIsPlaying(!isPlaying)} style={{ height: responsiveSizes(height, width, scale, fontScale, 45), width: responsiveSizes(height, width, scale, fontScale, 45), backgroundColor: "#00E016", borderWidth: responsiveSizes(height, width, scale, fontScale, 4), borderColor: "grey", elevation: 10, borderRadius: responsiveSizes(height, width, scale, fontScale, 100), justifyContent: "center", alignItems: "center" }}>
                        <ICONS.Ionicons name={isPlaying ? "pause" : "play"} color="white" size={22} />
                    </TouchableOpacity>
                    <View style={{ borderWidth: responsiveSizes(height, width, scale, fontScale, 2), backgroundColor: "#EEEEEE", borderColor: "#EEEEEE", width: responsiveSizes(height, width, scale, fontScale, 30), height: 0, marginHorizontal: responsiveSizes(height, width, scale, fontScale, 10) }} />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => { setIsPlaying(false); getTripList(parseFloat(fuelPrice)) }} style={{ height: responsiveSizes(height, width, scale, fontScale, 45), width: responsiveSizes(height, width, scale, fontScale, 45), backgroundColor: "#2D2D2D", borderWidth: responsiveSizes(height, width, scale, fontScale, 4), borderColor: "grey", elevation: 10, borderRadius: responsiveSizes(height, width, scale, fontScale, 100), justifyContent: "center", alignItems: "center", padding: responsiveSizes(height, width, scale, fontScale, 7) }}>
                        <SVG_ICONS.Information />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!isPlaying} onPress={() => {
                        if (playbackSpeed === 5) {
                            changePlaybackSpeed(1)
                        } else {
                            changePlaybackSpeed(playbackSpeed + 1)
                        }
                    }} style={{ marginLeft: responsiveSizes(height, width, scale, fontScale, 25) }}>
                        <Text style={{ color: "white" }}>{playbackSpeed + "x"}</Text>
                        <ICONS.Ionicons name="play-forward" size={responsiveSizes(height, width, scale, fontScale, 22)} color={"white"} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: responsiveSizes(height, width, scale, fontScale, 5), marginHorizontal: responsiveSizes(height, width, scale, fontScale, 10) }}>
                    <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 8), fontFamily: FONTS.interLight }}>{Summery.total_mileage || 0} KM</Text>
                    <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 8), fontFamily: FONTS.interLight }}>Speed(km/h): Avg.{Summery?.avg_speed?.replace(" Km/Hr", "") || ""} Max.{Summery?.max_speed?.replace(" Km/Hr", "") || ""} </Text>
                    <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 8), fontFamily: FONTS.interLight }}>Time {Summery.totalTime}</Text>
                </View>
                <View style={{ padding: responsiveSizes(height, width, scale, fontScale, 10), borderTopColor: "grey", borderTopWidth: 0.5 }}>

                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingVertical: responsiveSizes(height, width, scale, fontScale, 5) }}>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25) }}>
                            <SVG_ICONS.MapPinBlue />
                        </View>
                        <View>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{moment(dateTimeFrom).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{HistoryReplay[0]?.Location || ""}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingVertical: responsiveSizes(height, width, scale, fontScale, 5) }}>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25) }}>
                            <SVG_ICONS.MapPinYellow />
                        </View>
                        <View>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{moment(dateTimeTo).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{HistoryReplay[HistoryReplay.length - 1]?.Location || ""}</Text>
                        </View>
                    </View>
                </View>
                <DatePicker
                    title="Select From Date & Time"
                    modal
                    mode="datetime"
                    minimumDate={moment(dateTimeTo).subtract(7, 'days').toDate()}
                    maximumDate={dateTimeTo}
                    open={isDateFromModalVisible}
                    date={dateTimeFrom}
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
                {/* <View style={{ backgroundColor: "#A2A2A2", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1, padding: responsiveSizes(height, width, scale, fontScale,3), borderWidth: responsiveSizes(height, width, scale, fontScale,0.5), borderColor: "white", marginVertical: responsiveSizes(height, width, scale, fontScale,5) }}>
                    <View style={{ backgroundColor: "#FFFFFF", flexDirection: "row", justifyContent: "space-evenly", flex: 1, padding: responsiveSizes(height, width, scale, fontScale,3), marginLeft: responsiveSizes(height, width, scale, fontScale,-5), borderRadius: responsiveSizes(height, width, scale, fontScale,5) }}>
                        <Text style={{ color: "#696969", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular }}>Trip 3</Text>
                        <Text style={{ color: "#696969", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular }}>KM  20</Text>
                        <Text style={{ color: "#696969", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular }}>Speed(km/h):</Text>
                        <Text style={{ color: "#696969", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular }}>Avg. 40</Text>
                        <Text style={{ color: "#696969", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular }}>Max. 60</Text>
                    </View>
                    <Text style={{ color: "#0A0A0A", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular, flex: 0.35, textAlign: "right" }}>Time  00:35:40</Text>
                </View> */}
                {/* {detailsFlag && <>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: responsiveSizes(height, width, scale, fontScale,5) }}>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale,25), width: responsiveSizes(height, width, scale, fontScale,25) }}>
                            <SVG_ICONS.MapPinBlue />
                        </View>
                        <View>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular }}>2022-04-18  09:45:30 AM</Text>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular }}>Plot # 218, G-IV Block G-4 Phase 2 Johar Town, Lahore, Punjab </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: responsiveSizes(height, width, scale, fontScale,5) }}>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale,25), width: responsiveSizes(height, width, scale, fontScale,25) }}>
                            <SVG_ICONS.MapPinYellow />
                        </View>
                        <View>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular }}>2022-04-18  09:45:30 AM</Text>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale,11), fontFamily: FONTS.interRegular }}>Plot # 218, G-IV Block G-4 Phase 2 Johar Town, Lahore, Punjab </Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#D1D1D1", width: "90%", alignSelf: "center", padding: responsiveSizes(height, width, scale, fontScale,5), borderRadius: responsiveSizes(height, width, scale, fontScale,10), elevation: 5, paddingHorizontal: responsiveSizes(height, width, scale, fontScale,15), marginVertical: responsiveSizes(height, width, scale, fontScale,5) }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                            <Text style={{ color: "#444444", fontSize: resposiveFontSize(height, width, scale, fontScale,9), fontFamily: FONTS.interRegular, marginRight: responsiveSizes(height, width, scale, fontScale,20) }}>KM 15</Text>
                            <Text style={{ color: "#444444", fontSize: resposiveFontSize(height, width, scale, fontScale,9), fontFamily: FONTS.interRegular }}>Time 00:30:10</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ height: responsiveSizes(height, width, scale, fontScale,25), width: responsiveSizes(height, width, scale, fontScale,25) }}>
                                <SVG_ICONS.PlayBlack />
                            </View>
                            <View style={{ marginHorizontal: responsiveSizes(height, width, scale, fontScale,10) }}>
                                <Text style={{ color: "#444444", fontSize: resposiveFontSize(height, width, scale, fontScale,9), fontFamily: FONTS.interRegular, lineHeight: responsiveSizes(height, width, scale, fontScale,18) }}>2022-04-18  09:45:30 AM</Text>
                                <Text style={{ color: "#444444", fontSize: resposiveFontSize(height, width, scale, fontScale,9), fontFamily: FONTS.interRegular }}>Plot # 218, G-IV Block G-4 Phase 2 Johar Town, Lahore, Punjab</Text>
                                <Text style={{ color: "#444444", fontSize: resposiveFontSize(height, width, scale, fontScale,9), fontFamily: FONTS.interRegular, lineHeight: responsiveSizes(height, width, scale, fontScale,18) }}>2022-04-18  09:45:30 AM</Text>
                                <Text style={{ color: "#444444", fontSize: resposiveFontSize(height, width, scale, fontScale,9), fontFamily: FONTS.interRegular }}>Plot # 218, G-IV Block G-4 Phase 2 Johar Town, Lahore, Punjab</Text>
                            </View>
                        </View>
                    </View>
                </>} */}
            </View>
        </SafeAreaView>
    );
};

export default React.memo(HistoryReplay);

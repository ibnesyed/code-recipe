import React, { useEffect, useState, memo, useRef } from "react";
import { Text, SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity, BackHandler, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { FONTS, SVG_ICONS, resposiveFontSize, responsiveSizes, MARKER_MAP_ICONS, ICONS } from "../../utils";
import MapView, { Callout, Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Polyline } from "react-native-maps";
import Slider from '@react-native-community/slider';
import { markerIconForMap } from "../../helpers";
import TripReplayList from "./tripList";
import { clearOneTripReplay } from "../../store/actions";
import { Loader } from "../../Components";
import moment from "moment";

const TripReplay = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const dispatch = useDispatch();
    const [startMark, setStartMark] = useState(null);
    const [endMark, setEndMark] = useState(null);
    const [polyLine, setPolyLine] = useState(null);
    // const [allMarkers, setAllMarkers] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [tripData, setTripData] = useState(null)
    // const TripReplayList = useSelector(({ replayData }) => replayData.TripReplayList)
    const { Summery, selectedDataForOneTrip, OneTripData, isLoading } = useSelector(({ replayData }) => replayData)
    const [currentRegion, setCurrentRegion] = useState(null);
    const { vehicle_data } = useSelector(({ liveData }) => liveData)

    const handleGoBack = () => {
        if (OneTripData.length) {
            dispatch(clearOneTripReplay());
            return true
        } else {
            return false
        }
    }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleGoBack
        );

        return () => backHandler.remove();
    }, [OneTripData]);
    const handleRegionChange = (region) => {
        setCurrentRegion(region)
    };
    useEffect(() => {
        if (OneTripData.length) {
            setCurrentIndex(0)
            setCurrentRegion({
                latitude: (OneTripData[0].latitude + OneTripData[OneTripData.length - 1].latitude) / 2,
                longitude: (OneTripData[0].longitude + OneTripData[OneTripData.length - 1].longitude) / 2,
                latitudeDelta: Math.abs((OneTripData[OneTripData.length - 1].latitude - OneTripData[0].latitude)) * 1.5,
                longitudeDelta: Math.abs((OneTripData[OneTripData.length - 1].longitude - OneTripData[0].longitude) * 1.5),
            })
            setStartMark(<Marker
                coordinate={OneTripData[0]}
                flat={true}
            >
                <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }} onPress={() => null} activeOpacity={0.7}>
                    <MARKER_MAP_ICONS.startIcon />
                </TouchableOpacity>
            </Marker>);
            setEndMark(<Marker
                coordinate={OneTripData[OneTripData.length - 1]}
                flat={true}
            >
                <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }} onPress={() => null} activeOpacity={0.7}>
                    <MARKER_MAP_ICONS.endIcon />
                </TouchableOpacity>
            </Marker>);
            setPolyLine(<Polyline
                coordinates={OneTripData}
                strokeWidth={4}
                strokeColor="#3A66FF"
            />)
        }
    }, [OneTripData, OneTripData.length])

    const intervalFlagRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            intervalFlagRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % OneTripData.length);
            }, 600 / playbackSpeed);
        } else {
            clearInterval(intervalFlagRef.current);
        }
        return () => clearInterval(intervalFlagRef.current);
    }, [isPlaying]);

    useEffect(() => {
        if (currentIndex === (OneTripData.length - 1)) {
            setIsPlaying(false); // Stop auto-play when it reaches the end
        }
    }, [currentIndex])

    const changePlaybackSpeed = (multiplier) => {
        // Calculate the new speed based on the multiplier
        const newSpeed = 600 / multiplier;
        setPlaybackSpeed(multiplier);
        // console.log(multiplier, newSpeed)
        // Clear the existing interval and set a new one with the updated speed
        clearInterval(intervalFlagRef.current);
        intervalFlagRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % OneTripData.length);
        }, newSpeed);
    };
    // return <TripReplayList navigation={navigation} setTripData={setTripData} />;
    return !OneTripData.length ? <TripReplayList navigation={navigation} setTripData={setTripData} /> : (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {isLoading && <Loader />}
            <View style={{ height: responsiveSizes(height, width, scale, fontScale, 45), zIndex: 1000, width: responsiveSizes(height, width, scale, fontScale, 300), alignSelf: "center", flexDirection: "row", position: "absolute", top: responsiveSizes(height, width, scale, fontScale, 20), backgroundColor: "#737373", borderRadius: responsiveSizes(height, width, scale, fontScale, 50), elevation: 4, justifyContent: "space-between", alignItems: "center", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 20) }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: responsiveSizes(height, width, scale, fontScale, -20) }}>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 35), width: responsiveSizes(height, width, scale, fontScale, 35) }} onPress={() => { setIsPlaying(false); handleGoBack() }}>
                        <SVG_ICONS.BackWhite />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interBold }}>{Summery.assetName || ""}</Text>
                </View>
                <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interExtraBold }}>Trip</Text>
            </View>
            {!!OneTripData.length && !!currentRegion && <MapView
                mapType="standard"
                provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={isPlaying ? {
                    ...OneTripData[currentIndex], latitudeDelta: currentRegion.latitudeDelta,
                    longitudeDelta: currentRegion.longitudeDelta,
                } : currentRegion}
                onRegionChangeComplete={handleRegionChange}
                rotateEnabled={true}
            >
                {OneTripData?.length && <Marker
                    coordinate={OneTripData[currentIndex]}
                    flat={true}
                    rotation={OneTripData[currentIndex].Dir}
                >
                    <View style={[(Platform.OS === "ios" ? { transform: [{ rotate: `${OneTripData[currentIndex].Dir}deg` }] } : {}), { height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }]}>
                        {markerIconForMap(vehicle_data?.AssetType, OneTripData[currentIndex].Status)}
                    </View>
                </Marker>}
                {startMark}
                {endMark}
                {polyLine}
            </MapView>}
            <View style={{ backgroundColor: "#575757" }}>
                <View style={{ flexDirection: "row", padding: responsiveSizes(height, width, scale, fontScale, 10) }}>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>From</Text>
                        <View style={{ backgroundColor: "#AED9AB", padding: responsiveSizes(height, width, scale, fontScale, 10), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 15) }}>
                            <Text style={{ color: "#656565", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{moment(selectedDataForOneTrip.start_at).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>To</Text>
                        <View style={{ backgroundColor: "#F0F0F0", padding: responsiveSizes(height, width, scale, fontScale, 10), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 15) }}>
                            <Text style={{ color: "#656565", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{moment(selectedDataForOneTrip.end_at).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                        </View>
                    </View>
                </View>
                <Slider
                    style={{ width: "90%", height: responsiveSizes(height, width, scale, fontScale, 40), alignSelf: "center" }}
                    minimumValue={0}
                    maximumValue={OneTripData.length - 1}
                    value={currentIndex}
                    minimumTrackTintColor="#70B2FF"
                    maximumTrackTintColor="black"
                />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: responsiveSizes(height, width, scale, fontScale, 5) }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setIsPlaying(!isPlaying)} style={{ height: responsiveSizes(height, width, scale, fontScale, 45), width: responsiveSizes(height, width, scale, fontScale, 45), backgroundColor: "#00E016", borderWidth: responsiveSizes(height, width, scale, fontScale, 4), borderColor: "grey", elevation: 10, borderRadius: responsiveSizes(height, width, scale, fontScale, 100), justifyContent: "center", alignItems: "center" }}>
                        <ICONS.Ionicons name={isPlaying ? "pause" : "play"} color="white" size={22} />
                    </TouchableOpacity>
                    <View style={{ borderWidth: responsiveSizes(height, width, scale, fontScale, 2), backgroundColor: "#EEEEEE", borderColor: "#EEEEEE", width: responsiveSizes(height, width, scale, fontScale, 30), height: 0, marginHorizontal: responsiveSizes(height, width, scale, fontScale, 10) }} />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => { setCurrentIndex(0); setIsPlaying(false); dispatch(clearOneTripReplay()) }} style={{ height: responsiveSizes(height, width, scale, fontScale, 45), width: responsiveSizes(height, width, scale, fontScale, 45), backgroundColor: "#2D2D2D", borderWidth: responsiveSizes(height, width, scale, fontScale, 4), borderColor: "grey", elevation: 10, borderRadius: responsiveSizes(height, width, scale, fontScale, 100), justifyContent: "center", alignItems: "center", padding: responsiveSizes(height, width, scale, fontScale, 7) }}>
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
                    <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 8), fontFamily: FONTS.interLight }}>{selectedDataForOneTrip.distance || 0} KM</Text>
                    <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 8), fontFamily: FONTS.interLight }}>Speed(km/h): Avg.{selectedDataForOneTrip.avg_speed.replace(" Km/Hr", "")} Max.{selectedDataForOneTrip.max_speed.replace(" Km/Hr", "")} </Text>
                    <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 8), fontFamily: FONTS.interLight }}>Time {selectedDataForOneTrip.trip_time}</Text>
                </View>
                <View style={{ padding: responsiveSizes(height, width, scale, fontScale, 10), borderTopColor: "grey", borderTopWidth: 0.5 }}>

                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingVertical: responsiveSizes(height, width, scale, fontScale, 5) }}>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25) }}>
                            <SVG_ICONS.MapPinBlue />
                        </View>
                        <View>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{moment(selectedDataForOneTrip.start_at).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{selectedDataForOneTrip.start_loc}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingVertical: responsiveSizes(height, width, scale, fontScale, 5) }}>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale, 25), width: responsiveSizes(height, width, scale, fontScale, 25) }}>
                            <SVG_ICONS.MapPinYellow />
                        </View>
                        <View>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{moment(selectedDataForOneTrip.end_at).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 10), fontFamily: FONTS.interRegular }}>{selectedDataForOneTrip.end_loc}</Text>
                        </View>
                    </View>
                </View>
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
export default React.memo(TripReplay);
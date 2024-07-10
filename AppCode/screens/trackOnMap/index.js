import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, PermissionsAndroid, Platform, DeviceEventEmitter, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { TestChart } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, SVG_ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { markerIconForMap } from "../../helpers";
import MapViewDirections from 'react-native-maps-directions';

const TrackOnMap = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const [directions, setDirections] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [heading, setHeading] = useState(0);
    const [watchId, setWatchId] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [trackFlag, setTrackFlag] = useState(false);
    const [location, setLocation] = useState(false);
    const [deviceLocation, setDeviceLocation] = useState({
        latitude: 30.034525,
        longitude: 70.640778,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
    })
    const getCurrentLocation = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 10,
            useSignificantChanges: false,
            showsBackgroundLocationIndicator: true,
            headingFilter: 1,
        };

        setWatchId(
            Geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                },
                (error) => {
                    console.warn(error.code, error.message);
                },
                options
            )
        );
        startWatchingHeading();
        // Geolocation.watchHeading((heading) => {
        //   setHeading(heading.trueHeading || heading.magneticHeading);
        // });
    };
    const startWatchingHeading = () => {
        DeviceEventEmitter.addListener('headingUpdated', ({ heading }) => {
            setHeading(heading);
        });
    };

    const stopWatchingHeading = () => {
        DeviceEventEmitter.removeAllListeners('headingUpdated');
    };
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };
    useEffect(() => {
        requestLocationPermission();
    }, []);
    useEffect(() => {
        return () => {
            if (watchId !== null) {
                Geolocation.clearWatch(watchId);
            }
            stopWatchingHeading();
        };
    }, [watchId]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {<View>
                {trackFlag ?
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,60) }}>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale,49), width: responsiveSizes(height, width, scale, fontScale,300), alignSelf: "center", position: "absolute", top: responsiveSizes(height, width, scale, fontScale,20), backgroundColor: "#0F6601", borderRadius: responsiveSizes(height, width, scale, fontScale,10), elevation: 4, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale,18), fontFamily: FONTS.interRegular }}>Jimi Technologies Bilal Road</Text>
                        </View>
                    </View>
                    :
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,60), backgroundColor: "#D4D4D4", flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale,40), width: responsiveSizes(height, width, scale, fontScale,40) }} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                            <SVG_ICONS.Back />
                        </TouchableOpacity>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale,25), width: responsiveSizes(height, width, scale, fontScale,25) }}>
                            <SVG_ICONS.Blue />
                        </View>
                        <TextInput
                            value={location || ""}
                            onChangeText={(e) => setLocation(e)}
                            placeholder="Your Location"
                            placeholderTextColor={"#9A9A9A"}
                            style={{ backgroundColor: "white", color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, height: responsiveSizes(height, width, scale, fontScale,34), padding: responsiveSizes(height, width, scale, fontScale,5), paddingHorizontal: responsiveSizes(height, width, scale, fontScale,10), width: responsiveSizes(height, width, scale, fontScale,260), borderRadius: responsiveSizes(height, width, scale, fontScale,7), borderWidth: responsiveSizes(height, width, scale, fontScale,0.5), borderColor: "black" }}
                        />
                    </View>
                }
                <View>
                    <View style={{ position: "absolute", top: responsiveSizes(height, width, scale, fontScale,110), left: responsiveSizes(height, width, scale, fontScale,20) }}>
                        <TouchableOpacity activeOpacity={0.7} style={{ height: responsiveSizes(height, width, scale, fontScale,40), padding: responsiveSizes(height, width, scale, fontScale,5), marginBottom: responsiveSizes(height, width, scale, fontScale,5), width: responsiveSizes(height, width, scale, fontScale,40), padding: responsiveSizes(height, width, scale, fontScale,5), elevation: 5, backgroundColor: "white", borderColor: "#000000", borderWidth: responsiveSizes(height, width, scale, fontScale,0.4), borderRadius: responsiveSizes(height, width, scale, fontScale,5), justifyContent: "center", alignItems: "center" }}>
                            <SVG_ICONS.TrafficLight />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={{ height: responsiveSizes(height, width, scale, fontScale,40), padding: responsiveSizes(height, width, scale, fontScale,5), marginBottom: responsiveSizes(height, width, scale, fontScale,5), width: responsiveSizes(height, width, scale, fontScale,40), padding: responsiveSizes(height, width, scale, fontScale,5), elevation: 5, backgroundColor: "white", borderColor: "#000000", borderWidth: responsiveSizes(height, width, scale, fontScale,0.4), borderRadius: responsiveSizes(height, width, scale, fontScale,5), justifyContent: "center", alignItems: "center" }}>
                            <SVG_ICONS.Layers />
                        </TouchableOpacity>
                        {!trackFlag && <TouchableOpacity activeOpacity={0.7} style={{ height: responsiveSizes(height, width, scale, fontScale,40), padding: responsiveSizes(height, width, scale, fontScale,5), marginBottom: responsiveSizes(height, width, scale, fontScale,5), width: responsiveSizes(height, width, scale, fontScale,40), padding: responsiveSizes(height, width, scale, fontScale,5), elevation: 5, backgroundColor: "white", borderColor: "#000000", borderWidth: responsiveSizes(height, width, scale, fontScale,0.4), borderRadius: responsiveSizes(height, width, scale, fontScale,5), justifyContent: "center", alignItems: "center" }}>
                            <SVG_ICONS.Connect />
                        </TouchableOpacity>}
                        {!trackFlag && <TouchableOpacity activeOpacity={0.7} style={{ height: responsiveSizes(height, width, scale, fontScale,40), padding: responsiveSizes(height, width, scale, fontScale,5), marginBottom: responsiveSizes(height, width, scale, fontScale,5), width: responsiveSizes(height, width, scale, fontScale,40), padding: responsiveSizes(height, width, scale, fontScale,5), elevation: 5, backgroundColor: "white", borderColor: "#000000", borderWidth: responsiveSizes(height, width, scale, fontScale,0.4), borderRadius: responsiveSizes(height, width, scale, fontScale,5), justifyContent: "center", alignItems: "center" }}>
                            <SVG_ICONS.LocationUpdate />
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>}
            {<MapView
                mapType={typeOfMap[mapTypeNumber]}
                provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
                // provider={PROVIDER_GOOGLE}
                style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: -100 }}
                region={{
                    latitude: currentLocation ? currentLocation.latitude : 0,
                    longitude: currentLocation ? currentLocation.longitude : 0,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                }}
            >
                {currentLocation && (
                    <Marker coordinate={currentLocation} title="Your Location" />
                )}
                {deviceLocation && (
                    <Marker
                        coordinate={deviceLocation}
                    >
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale,40), width: responsiveSizes(height, width, scale, fontScale,40) }}>
                            {markerIconForMap("Car", "Parked", true)}
                        </View>
                    </Marker>
                )}
                {currentLocation && deviceLocation && (
                    <MapViewDirections
                        origin={{ latitude: currentLocation?.latitude || 0, longitude: currentLocation?.longitude || 0 }}
                        destination={{ latitude: deviceLocation?.latitude || 0, longitude: deviceLocation?.longitude || 0 }}
                        apikey={"AIzaSyAiRbJHSsHy9Y2tp4-yjOHXouUc98IjkOk"}
                        strokeWidth={5}
                        strokeColor="#FF0000"
                        mode="DRIVING"
                        onError={(error) => console.error("Directions API Error:", error)}
                    />
                )}

            </MapView>}
            {trackFlag ?
                <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFFFFF", elevation: 10, height: responsiveSizes(height, width, scale, fontScale,65), borderTopWidth: responsiveSizes(height, width, scale, fontScale,0.5), borderTopColor: "#9F9F9F", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale,50), width: responsiveSizes(height, width, scale, fontScale,50) }} onPress={() => navigation.goBack()}>
                        <SVG_ICONS.CloseWindow />
                    </TouchableOpacity>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,20), fontFamily: FONTS.interBold }}>20 <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale,18), fontFamily: FONTS.interRegular }}>min</Text></Text>
                    <View></View>
                    <Text style={{ color: "#5B5B5B", fontSize: resposiveFontSize(height, width, scale, fontScale,15), fontFamily: FONTS.interRegular }}>5.5 km</Text>
                    <Text style={{ color: "#5B5B5B", fontSize: resposiveFontSize(height, width, scale, fontScale,15), fontFamily: FONTS.interRegular }}>12:15 PM</Text>
                </View>
                :
                <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#676767", height: responsiveSizes(height, width, scale, fontScale,65), flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1, fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interRegular, color: "#FFFFFF", textAlign: "center" }}>23 min <Text style={{ color: "#D8D8D8" }}>(10 km)</Text></Text>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale,30), width: responsiveSizes(height, width, scale, fontScale,60), borderRadius: responsiveSizes(height, width, scale, fontScale,20), elevation: 5, backgroundColor: "#F1F1F1", borderWidth: responsiveSizes(height, width, scale, fontScale,0.5), borderColor: "black", justifyContent: "center", alignItems: "center" }} activeOpacity={0.7} onPress={() => setTrackFlag(true)}>
                        <Text style={{ color: "#3D3D3D", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular }}>Start</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                </View>
            }
        </SafeAreaView>
    );
};
export default React.memo(TrackOnMap);
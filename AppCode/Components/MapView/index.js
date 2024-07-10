import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, Platform, DeviceEventEmitter, PermissionsAndroid, Image, useWindowDimensions } from "react-native";
import { FONTS, SVG_ICONS, resposiveFontSize, responsiveSizes, IMAGES } from "../../utils";
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { markerIconForMap, sendEmail, sendWhatsAppMessage } from "../../helpers";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from '@react-native-community/geolocation';

// const GOOGLE_MAPS_APIKEY = "AIzaSyAiRbJHSsHy9Y2tp4-yjOHXouUc98IjkOk"

const MainMapViewComp = ({
    deviceOrigin,
    deviceDirAngle,
    deviceType,
    deviceStatus,
    navigation,
    styles,
    mapControllsFlags,
    secondMetter,
    trackScreen,
    setTrackScreen,
    setDistance,
    setTime,
    shareMessage,
}) => {
    const { fontScale, height, scale, width } = useWindowDimensions();

    let typeOfMap = ["standard", "terrain", "satellite"]
    const [mapTypeNumber, setMapTypeNumber] = useState(0)
    const [showTrafic, setShowTrafic] = useState(false)
    const [heading, setHeading] = useState(0);
    const [watchId, setWatchId] = useState(null);
    // const [currentLocation, setCurrentLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const openShareAlertModal = () => {
        Alert.alert(
            'Share',
            'Choose how you want to share:',
            [
                {
                    text: 'Email',
                    onPress: () => {
                        sendEmail(`Check out this location: ${shareMessage}`)
                    },
                },
                {
                    text: 'WhatsApp',
                    onPress: () => {
                        sendWhatsAppMessage(`Check out this location: ${shareMessage}`)
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );

    }
    const requestLocationPermission = async (flag) => {
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
                    if (flag) {
                        getCurrentLocationRealtime();
                    } else {
                        getCurrentLocationOneTime();
                    }
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };
    const getCurrentLocationRealtime = () => {
        const options = {
            interval: 5000,
            fastestInterval: 2500,
            timeout: 15000,
            maximumAge: 10000,
            enableHighAccuracy: true,
            distanceFilter: 10,
            useSignificantChanges: false
        };
        setWatchId(Geolocation.watchPosition(
            ({ coords }) => {
                setCurrentLocation({
                    ...coords, latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                });
            },
            (error) => {
                console.warn(error.code, error.message);
            },
            options
        ))

    }
    const getCurrentLocationOneTime = () => {
        const options = {
            timeout: 25000,
            maximumAge: 15000,
            enableHighAccuracy: true,
        }

        Geolocation.getCurrentPosition(
            ({ coords }) => {
                setCurrentLocation({
                    ...coords,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                });
            },
            (error) => {
                console.warn(error.code, error.message);
            },
            options
        )
        // startWatchingHeading();
    };

    useEffect(() => {
        if (!trackScreen.tracking && trackScreen.visible) {
            if (watchId !== null) {
                Geolocation.clearWatch(watchId);
                setWatchId(null)
            }
            requestLocationPermission(false);
        } else if (trackScreen.tracking) {
            if (watchId !== null) {
                Geolocation.clearWatch(watchId);
                setWatchId(null)
            }
            requestLocationPermission(true);
        }
    }, [trackScreen]);

    useEffect(() => {
        setTimeAndDistanceAsParLocations()
    }, [currentLocation])
    const setTimeAndDistanceAsParLocations = () => {
        if (currentLocation && deviceOrigin) {
            const distance = haversineDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                deviceOrigin.latitude,
                deviceOrigin.longitude
            );
            const averageSpeed = currentLocation.speed || 50;
            const time = calculateTime(distance, averageSpeed);
            setTime(`${time.toFixed(2)} HH`)
            setDistance(`${distance.toFixed(2)} KM`)
        }
    }
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (value) => (value * Math.PI) / 180;
        const R = 6371; // Earth's radius in kilometers

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distance in kilometers
        return distance;
    };
    const calculateTime = (distance, speed) => {
        // Distance in kilometers, speed in kilometers per hour
        const time = distance / speed; // Time in hours
        return time;
    };
    return (
        <View style={styles}>
            {!trackScreen?.visible && secondMetter?.visible && <View style={{ zIndex: 90, position: "absolute", top: responsiveSizes(height, width, scale, fontScale, 90), left: responsiveSizes(height, width, scale, fontScale, 20), width: responsiveSizes(height, width, scale, fontScale, 80), height: responsiveSizes(height, width, scale, fontScale, 40), borderRadius: responsiveSizes(height, width, scale, fontScale, 20), borderWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderColor: "", elevation: 5, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interBold, color: "#5E77F9" }}>{secondMetter?.value || ""}</Text>
            </View>}
            {mapControllsFlags && <View style={{ position: "absolute", top: responsiveSizes(height, width, scale, fontScale, trackScreen?.visible ? 120 : 140), left: responsiveSizes(height, width, scale, fontScale, 20), zIndex: 100 }}>
                {mapControllsFlags.traffic && <TouchableOpacity onPress={() => setShowTrafic(!showTrafic)} activeOpacity={0.7} style={{ height: responsiveSizes(height, width, scale, fontScale, 40), marginBottom: responsiveSizes(height, width, scale, fontScale, 5), width: responsiveSizes(height, width, scale, fontScale, 40), padding: responsiveSizes(height, width, scale, fontScale, 5), elevation: 5, backgroundColor: "white", borderColor: "#000000", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), justifyContent: "center", alignItems: "center" }}>
                    <SVG_ICONS.TrafficLight />
                </TouchableOpacity>}
                {mapControllsFlags.modes && <TouchableOpacity onPress={() => setMapTypeNumber((mapTypeNumber > 1) ? 0 : (mapTypeNumber + 1))} activeOpacity={0.7} style={{ height: responsiveSizes(height, width, scale, fontScale, 40), marginBottom: responsiveSizes(height, width, scale, fontScale, 5), width: responsiveSizes(height, width, scale, fontScale, 40), padding: responsiveSizes(height, width, scale, fontScale, 5), elevation: 5, backgroundColor: "white", borderColor: "#000000", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), justifyContent: "center", alignItems: "center" }}>
                    <SVG_ICONS.Layers />
                </TouchableOpacity>}
                {mapControllsFlags.share && !trackScreen?.tracking && <TouchableOpacity activeOpacity={0.7} onPress={() => true ? openShareAlertModal() : navigation.navigate("ShareLocation", { deviceOrigin: deviceOrigin })} style={{ height: responsiveSizes(height, width, scale, fontScale, 40), marginBottom: responsiveSizes(height, width, scale, fontScale, 5), width: responsiveSizes(height, width, scale, fontScale, 40), padding: responsiveSizes(height, width, scale, fontScale, 5), elevation: 5, backgroundColor: "white", borderColor: "#000000", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), justifyContent: "center", alignItems: "center" }}>
                    <SVG_ICONS.Connect />
                </TouchableOpacity>}
                {mapControllsFlags.tracking && !trackScreen?.tracking && <TouchableOpacity activeOpacity={0.7} onPress={() => true ? setTrackScreen(prevState => ({ ...prevState, visible: true })) : navigation.navigate("TrackOnMap")} style={{ height: responsiveSizes(height, width, scale, fontScale, 40), marginBottom: responsiveSizes(height, width, scale, fontScale, 5), width: responsiveSizes(height, width, scale, fontScale, 40), padding: responsiveSizes(height, width, scale, fontScale, 5), elevation: 5, backgroundColor: "white", borderColor: "#000000", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.4), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), justifyContent: "center", alignItems: "center" }}>
                    <SVG_ICONS.LocationUpdate />
                </TouchableOpacity>}
            </View>}
            {(!trackScreen?.visible || (!!currentLocation)) ? <MapView
                mapType={typeOfMap[mapTypeNumber]}
                provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={trackScreen?.visible ? currentLocation : deviceOrigin}
                showsTraffic={showTrafic}
                rotateEnabled={true}
            >
                {trackScreen?.visible && currentLocation && (
                    <Marker coordinate={currentLocation} flat={true} image={IMAGES.currentLocMarker} />
                )}
                {deviceOrigin && (
                    <Marker
                        coordinate={deviceOrigin}
                        rotation={deviceDirAngle}
                        flat={true}
                    >
                        <View style={[(Platform.OS === "ios" ? { transform: [{ rotate: `${deviceDirAngle}deg` }] } : {} ),{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }]}>
                            {markerIconForMap(deviceType, deviceStatus)}
                        </View>
                    </Marker>
                )}
                {trackScreen?.visible && currentLocation && deviceOrigin && (
                    <MapViewDirections
                        origin={{ latitude: currentLocation?.latitude || 0, longitude: currentLocation?.longitude || 0 }}
                        // origin={{ latitude: 37.3318456, longitude: -122.0296002 }}
                        // destination={{ latitude: 37.771707, longitude: -122.4053769 }}
                        destination={{ latitude: deviceOrigin?.latitude || 0, longitude: deviceOrigin?.longitude || 0 }}
                        apikey={"AIzaSyAiRbJHSsHy9Y2tp4-yjOHXouUc98IjkOk"}
                        strokeWidth={7}
                        strokeColor="#3A66FF"
                        mode="DRIVING"
                        // lineDashPattern={[0]}
                        onError={(err) => console.log(err)}
                    />
                )}
            </MapView> : <View><Text>Loading......</Text></View>}
        </View>
    );
};

export default React.memo(MainMapViewComp);

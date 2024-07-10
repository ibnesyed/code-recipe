import React, { useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from "../../Components";
import { FONTS, SVG_ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
// import { getDeviceDetailsByID } from "../../store/actions";

const DeviceDetail = ({ route, navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    // const dispatch = useDispatch();
    // const DeviceID = route?.params?.DeviceID || null;
    const { deviceDetailsLoader, deviceDetails } = useSelector(({ liveData }) => liveData);

    // useEffect(() => {
    //     if (!DeviceID) {
    //         navigation.goBack();
    //     } else {
    //         fechDeviceDetailsData()
    //     }
    // }, [])
    // const fechDeviceDetailsData = () => {
    //     dispatch(getDeviceDetailsByID(DeviceID))
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: responsiveSizes(height, width, scale, fontScale,60) }}>
            {!!deviceDetailsLoader && <Loader />}
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: responsiveSizes(height, width, scale, fontScale,60), backgroundColor: "#E5E5E5", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: responsiveSizes(height, width, scale, fontScale,10), elevation: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale,40), width: responsiveSizes(height, width, scale, fontScale,40) }} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <SVG_ICONS.Back />
                    </TouchableOpacity>
                    <Text style={{ color: "#383838", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Device Detail</Text>
                </View>
            </View>
            <ScrollView>
                {Object.entries(deviceDetails).map(([key, value]) => {
                    return (
                        <View key={key} style={{ borderBottomWidth: responsiveSizes(height, width, scale, fontScale,!!key ? 0.4 : 0), flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: responsiveSizes(height, width, scale, fontScale,25), paddingVertical: responsiveSizes(height, width, scale, fontScale,12) }}>
                            <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interRegular }}>{key}</Text>
                            <Text style={{ color: "#808080", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interRegular }}>{value}</Text>
                        </View>
                    );
                })}
                {/* <View style={{ height: responsiveSizes(height, width, scale, fontScale,12), backgroundColor: "#F4F4F4" }} />
                {Object.entries(detailObj2nd).map(([key, value]) => {
                    return (
                        <View key={key} style={{ borderBottomWidth: responsiveSizes(height, width, scale, fontScale,0.4), flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: responsiveSizes(height, width, scale, fontScale,20), paddingVertical: responsiveSizes(height, width, scale, fontScale,5) }}>
                            <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interRegular }}>{key}</Text>
                            <Text style={{ marginHorizontal: responsiveSizes(height, width, scale, fontScale,key === "Location" ? 10 : 0), color: "#808080", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interRegular }}>{value}</Text>
                        </View>
                    );
                })} */}
            </ScrollView>
        </SafeAreaView>
    );
};
export default React.memo(DeviceDetail);
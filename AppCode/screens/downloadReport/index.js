import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { TestChart, DateTimeModal } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, SVG_ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";

const DownloadReports = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: responsiveSizes(height, width, scale, fontScale,70) }}>
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: responsiveSizes(height, width, scale, fontScale,60), backgroundColor: "#E5E5E5", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: responsiveSizes(height, width, scale, fontScale,10), paddingRight: responsiveSizes(height, width, scale, fontScale,15), elevation: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingBottom: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale,35), width: responsiveSizes(height, width, scale, fontScale,35) }} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <SVG_ICONS.Back />
                    </TouchableOpacity>
                    <Text style={{ color: "#383838", fontSize: resposiveFontSize(height, width, scale, fontScale,18), fontFamily: FONTS.interBold }}>Report View</Text>
                </View>
                <Text style={{ color: "#242424", fontSize: resposiveFontSize(height, width, scale, fontScale,18), fontFamily: FONTS.interRegular, marginBottom: responsiveSizes(height, width, scale, fontScale,10) }}>LEC-12A-2522</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "space-between", padding: responsiveSizes(height, width, scale, fontScale,20) }}>
                <View style={{ height: responsiveSizes(height, width, scale, fontScale,200), width: responsiveSizes(height, width, scale, fontScale,300) }}>
                    <SVG_ICONS.Tabel />
                </View>
                <View style={{ alignSelf: "flex-end" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,70), width: responsiveSizes(height, width, scale, fontScale,70) }}>
                        <SVG_ICONS.Download />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default React.memo(DownloadReports);
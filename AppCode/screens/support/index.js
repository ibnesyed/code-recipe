import React from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { TestChart } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";

const Support = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        linearGradient: {
            height: responsiveSizes(height, width, scale, fontScale,60),
            width: "100%",
            elevation: 5,
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale,0.01),
            borderBottomColor: "#C9C9C9",
            flexDirection: "row",
            alignItems: "flex-end",
            paddingBottom: responsiveSizes(height, width, scale, fontScale,10),
            justifyContent: "space-between",
            paddingRight: responsiveSizes(height, width, scale, fontScale,25)
        },
    });
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <LinearGradient colors={["#E5E5E5", "#DADADA"]} style={styles.linearGradient}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", paddingLeft: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ICONS.AntDesign name="left" size={responsiveSizes(height, width, scale, fontScale,35)} color="#3C3C3C" />
                    </TouchableOpacity>
                    <Text style={{ margin: responsiveSizes(height, width, scale, fontScale,5), color: "#3C3C3C", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Support</Text>
                </View>
            </LinearGradient>
            <ScrollView style={{ flex: 1, padding: responsiveSizes(height, width, scale, fontScale,25) }}>
                <View style={{ borderBottomWidth: responsiveSizes(height, width, scale, fontScale,0.5), paddingBottom: responsiveSizes(height, width, scale, fontScale,5), marginHorizontal: responsiveSizes(height, width, scale, fontScale,10), marginBottom: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <Text style={{ color: "#909090", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular }}>HelpLIne:</Text>
                    <Text style={{ color: "#1E1E1E", fontSize: resposiveFontSize(height, width, scale, fontScale,14), marginLeft: responsiveSizes(height, width, scale, fontScale,15), fontFamily: FONTS.interRegular, lineHeight: responsiveSizes(height, width, scale, fontScale,25) }}>923111122883</Text>
                </View>
                <View style={{ borderBottomWidth: responsiveSizes(height, width, scale, fontScale,0.5), paddingBottom: responsiveSizes(height, width, scale, fontScale,5), marginHorizontal: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <Text style={{ color: "#909090", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular }}>Email:</Text>
                    <Text style={{ color: "#1E1E1E", fontSize: resposiveFontSize(height, width, scale, fontScale,14), marginLeft: responsiveSizes(height, width, scale, fontScale,15), fontFamily: FONTS.interRegular, lineHeight: responsiveSizes(height, width, scale, fontScale,25) }}>jimi@pk.com</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => null} style={{ backgroundColor: "#626262", height: responsiveSizes(height, width, scale, fontScale,35), width: responsiveSizes(height, width, scale, fontScale,61), borderRadius: responsiveSizes(height, width, scale, fontScale,5), justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: responsiveSizes(height, width, scale, fontScale,80) }}>
                    <ICONS.AntDesign name="arrowright" size={responsiveSizes(height, width, scale, fontScale,25)} color="white" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
export default React.memo(Support);

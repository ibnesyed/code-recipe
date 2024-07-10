import React from "react";
import { Text, SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { signOut } from "../../store/actions";
import { useDispatch, useSelector } from 'react-redux'
import { FONTS, responsiveSizes, resposiveFontSize, SVG_ICONS } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";

const Profile = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        linearGradient: {
            height: responsiveSizes(height, width, scale, fontScale,329),
            // flex: 0.5,
            // width: "100%",
            elevation: 5,
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale,0.1),
            borderBottomColor: "#C9C9C9",
            justifyContent: "center",
            alignItems: "center"
        },
    });
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <LinearGradient colors={["#C3C3C3", "#E5E5E5"]} style={styles.linearGradient}>
                <TouchableOpacity onPress={() => dispatch(signOut())} style={{ position: "absolute", top: responsiveSizes(height, width, scale, fontScale,20), right: responsiveSizes(height, width, scale, fontScale,20) }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,50), width: responsiveSizes(height, width, scale, fontScale,50) }}>
                        <SVG_ICONS.Logout />
                    </View>
                </TouchableOpacity>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ marginBottom: responsiveSizes(height, width, scale, fontScale,10), height: responsiveSizes(height, width, scale, fontScale,100), width: responsiveSizes(height, width, scale, fontScale,100), backgroundColor: "#F1F1F1", borderRadius: responsiveSizes(height, width, scale, fontScale,100), justifyContent: "center", alignItems: "center", borderWidth: responsiveSizes(height, width, scale, fontScale,1), borderColor: "black" }}>
                        <View style={{ height: responsiveSizes(height, width, scale, fontScale,60), width: responsiveSizes(height, width, scale, fontScale,60) }}>
                            <SVG_ICONS.Avatar />
                        </View>
                    </View>
                    <Text onPress={() => navigation.navigate("EditProfile")} style={{ fontSize: resposiveFontSize(height, width, scale, fontScale,18), color: "#4A4A4A", fontFamily: FONTS.interRegular }}>{user?.userName || "---"}</Text>
                </View>
            </LinearGradient>
            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Support")} activeOpacity={0.5} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: responsiveSizes(height, width, scale, fontScale,15), borderBottomColor: "Black", borderBottomWidth: responsiveSizes(height, width, scale, fontScale,1) }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,40), width: responsiveSizes(height, width, scale, fontScale,40) }}>
                        <SVG_ICONS.User />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, marginLeft: responsiveSizes(height, width, scale, fontScale,15) }}>Support</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Feedback")} activeOpacity={0.5} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: responsiveSizes(height, width, scale, fontScale,15), borderBottomColor: "Black", borderBottomWidth: responsiveSizes(height, width, scale, fontScale,1) }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,35), width: responsiveSizes(height, width, scale, fontScale,35) }}>
                        <SVG_ICONS.HandWithPen />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, marginLeft: responsiveSizes(height, width, scale, fontScale,15) }}>Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Settings")} activeOpacity={0.5} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: responsiveSizes(height, width, scale, fontScale,15), borderBottomColor: "Black", borderBottomWidth: responsiveSizes(height, width, scale, fontScale,1) }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,30), width: responsiveSizes(height, width, scale, fontScale,30) }}>
                        <SVG_ICONS.Settings />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, marginLeft: responsiveSizes(height, width, scale, fontScale,15) }}>Settings</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={{ flex: 0.35, justifyContent: "center", alignItems: "center", marginBottom: responsiveSizes(height, width, scale, fontScale,50), flexDirection: "row" }}>
                <View style={{ height: responsiveSizes(height, width, scale, fontScale,40), width: responsiveSizes(height, width, scale, fontScale,40) }}>
                    <SVG_ICONS.Versions />
                </View>
                <Text style={{ color: "#646464", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interRegular, marginLeft: responsiveSizes(height, width, scale, fontScale,5) }}>Version: 2031.03</Text>
            </View>
            <BottomNavBar activeName="user" />
        </SafeAreaView>
    );
};
export default React.memo(Profile);
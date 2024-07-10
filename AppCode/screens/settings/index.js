import React from "react";
import { Text, SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { Loader, } from "../../Components";
import { FONTS, ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import { enableDisableService } from "../../store/actions";

const Settings = ({ route, navigation }) => {
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
    const VehicleId = route?.params?.VehicleId || null;
    const { servicesData, isLoading } = useSelector(({ services }) => services);
    const changeFlag = (data) => {
        let filter = `${data.svr_id}:${(data.svr_notify === "y" || data.svr_notify === "Y") ? "N" : "Y"}`
        dispatch(enableDisableService(VehicleId, filter))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {!!isLoading && <Loader />}
            <LinearGradient colors={["#E5E5E5", "#DADADA"]} style={styles.linearGradient}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", paddingLeft: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ICONS.AntDesign name="left" size={responsiveSizes(height, width, scale, fontScale,35)} color="#3C3C3C" />
                    </TouchableOpacity>
                    <Text style={{ margin: responsiveSizes(height, width, scale, fontScale,5), color: "#3C3C3C", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Settings</Text>
                </View>
            </LinearGradient>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ backgroundColor: "#7C7C7C", padding: responsiveSizes(height, width, scale, fontScale,7), alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interRegular }}>Notification Settings</Text>
                </View>
                <View>
                    {!!servicesData?.length && servicesData.map((e, i) => {
                        return (
                            <View key={e.svr_id + i} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 30), paddingVertical: responsiveSizes(height, width, scale, fontScale, 10), borderBottomWidth: 0.5, borderBottomColor: "grey" }}>
                                <Text style={{ color: "#666666", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular }}>{e.svr_name || "--"}</Text>
                                <TouchableOpacity onPress={() => changeFlag(e)}>
                                    <ICONS.MaterialCommunityIcons size={responsiveSizes(height, width, scale, fontScale,40)} name={`toggle-switch${(e?.svr_notify === "Y" || e?.svr_notify === "y") ? "" : "-off-outline"}`} color={(e?.svr_notify === "Y" || e?.svr_notify === "y") ? "grey" : "grey"} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default React.memo(Settings);
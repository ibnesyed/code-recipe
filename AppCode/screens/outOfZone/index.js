import React, { useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, FlatList, RefreshControl, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { FONTS, ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import { getFLeetOutOfZone } from "../../store/actions";
import moment from "moment/moment";

const OutOfZone = ({ navigation }) => {
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
    const { OutOfZoneList, isLoading } = useSelector(({ dashboard }) => dashboard)
    useEffect(() => {
        dispatch(getFLeetOutOfZone())
    }, [])
    // [{ "deviceId": "352503094240741", "deviceStatus": "ACC Off,Immobilizer Off,Parked", "gpsDateTime": "2023-09-29T00:48:12", "location": "0.991KM FROM CHAK MUSLIM GUJRANWALA", "recDateTime": "2023-09-29T00:53:14", "vrn": "ADJ-21-019" }]
    const Item = ({ item }) => {
        return (
            <>
                <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium, marginLeft: responsiveSizes(height, width, scale, fontScale,20) }}>{item.vrn}</Text>
                <View style={{ backgroundColor: "#7D7D7D", borderRadius: responsiveSizes(height, width, scale, fontScale,10), padding: responsiveSizes(height, width, scale, fontScale,10), marginHorizontal: responsiveSizes(height, width, scale, fontScale,10), marginBottom: responsiveSizes(height, width, scale, fontScale,5) }}>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium }}>{item.deviceStatus}</Text>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium, marginVertical: responsiveSizes(height, width, scale, fontScale,2) }}>{moment(item.gpsDateTime).format("DD-MMM-YYYY hh:mm:ss A")}</Text>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium }}>{item.location}</Text>
                </View>
            </>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <LinearGradient colors={["#E5E5E5", "#DADADA"]} style={styles.linearGradient}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", paddingLeft: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ICONS.AntDesign name="left" size={responsiveSizes(height, width, scale, fontScale,35)} color="#3C3C3C" />
                    </TouchableOpacity>
                    <Text style={{ margin: responsiveSizes(height, width, scale, fontScale,5), color: "#3C3C3C", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Out of Zone</Text>
                </View>
                <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interBlack }}>Total: {OutOfZoneList?.length || 0}</Text>
            </LinearGradient>
            <FlatList
                style={{ flex: 1, padding: responsiveSizes(height, width, scale, fontScale,10) }}
                contentContainerStyle={{ paddingBottom: responsiveSizes(height, width, scale, fontScale,25) }}
                data={OutOfZoneList}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.deviceId + item.gpsDateTime}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => {
                            dispatch(getFLeetOutOfZone())
                        }}
                    />
                }
            />
        </SafeAreaView>
    );
};
export default React.memo(OutOfZone);

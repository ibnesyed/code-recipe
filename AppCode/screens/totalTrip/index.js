import React, { useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, RefreshControl, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { FONTS, ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import { getTodayTrips } from "../../store/actions";
import moment from "moment";

const TotalTrip = ({ navigation }) => {
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
    const { TodayTrips, isLoading } = useSelector(({ dashboard }) => dashboard)
    useEffect(() => {
        dispatch(getTodayTrips())
    }, [])
    // let obj = {
    //     "avg_speed": "24 Km/Hr",
    //     "distance": 8.048,
    //     "drive_time": "00:19:53",
    //     "ed_lat": 27.63426,
    //     "ed_lng": 68.01152,
    //     "end_at": "2023-09-28T17:45:50",
    //     "end_km": 77222.96,
    //     "end_loc": "4.063km away from GULZAR RICE MILL Kambar",
    //     "idle_time": "00:00:22",
    //     "max_speed": "58 Km/Hr",
    //     "st_lat": 27.591712,
    //     "st_lng": 68.001778,
    //     "start_at": "2023-09-28T17:25:34",
    //     "start_km": 77214.912,
    //     "start_loc": "at MASJID SYEDEN HUSSAIN Kambar",
    //     "trip_time": "00:20:15",
    //     "used_litter": 0,
    //     "vrn": "AEB-21-869"
    // }
    const Item = ({ item }) => {
        return (
            <>
                <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium, marginLeft: responsiveSizes(height, width, scale, fontScale,20) }}>{item.vrn}</Text>
                <View style={{ backgroundColor: "#7D7D7D", borderRadius: responsiveSizes(height, width, scale, fontScale,10), padding: responsiveSizes(height, width, scale, fontScale,10), marginHorizontal: responsiveSizes(height, width, scale, fontScale,10), marginBottom: responsiveSizes(height, width, scale, fontScale,5) }}>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium, marginVertical: responsiveSizes(height, width, scale, fontScale,2) }}>{moment(item.start_at).format("DD-MMM-YYYY hh:mm:ss A")}</Text>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium }}>{item.start_loc}</Text>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium, marginVertical: responsiveSizes(height, width, scale, fontScale,2) }}>{moment(item.end_at).format("DD-MMM-YYYY hh:mm:ss A")}</Text>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium }}>{item.end_loc}</Text>
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
                    <Text style={{ margin: responsiveSizes(height, width, scale, fontScale,5), color: "#3C3C3C", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Total Trip</Text>
                </View>
                <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interBlack }}>Total: {TodayTrips?.length || 0}</Text>
            </LinearGradient>
            <FlatList
                style={{ flex: 1, padding: responsiveSizes(height, width, scale, fontScale,10) }}
                contentContainerStyle={{ paddingBottom: responsiveSizes(height, width, scale, fontScale,25) }}
                data={TodayTrips}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.end_at + item.start_at}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => {
                            dispatch(getTodayTrips())
                        }}
                    />
                }
            />
        </SafeAreaView>
    );
};
export default React.memo(TotalTrip);
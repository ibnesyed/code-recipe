import React from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { FONTS, COLORS, ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import moment from "moment";
import { getTripReplay } from "../../store/actions";
import { Loader } from "../../Components";
import { useWindowDimensions } from "react-native";
// let num = 1;
const TripReplayList = ({ navigation, setTripData }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        linearGradient: {
            height: responsiveSizes(height, width, scale, fontScale,50),
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
    // console.log("=========")
    const dispatch = useDispatch();
    const vehicle_data = useSelector(({ liveData }) => liveData.vehicle_data)
    const { TripReplayList, dateTimeFrom, dateTimeTo, isLoading } = useSelector(({ replayData }) => replayData)
    const getTripData = (item) => {
        const { VehicleId, cmp_id } = vehicle_data;
        let obj = {
            VehicleId,
            cmp_id,
            dateTimeFrom: moment(item.start_at).format("YYYY-MM-DD%20HH:mm:ss"),
            dateTimeTo: moment(item.end_at).format("YYYY-MM-DD%20HH:mm:ss")
        }
        dispatch(getTripReplay(obj, item))
    }
    const Item = ({ item }) => {
        // console.log(num++)
        if (!item.Message) {
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => getTripData(item)} style={{ backgroundColor: "#434343", margin: responsiveSizes(height, width, scale, fontScale,5), padding: responsiveSizes(height, width, scale, fontScale,10), paddingHorizontal: responsiveSizes(height, width, scale, fontScale,20), borderRadius: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale,10), color: "#FFBD59" }}>Fuel Cost: {item?.fuel_cost || 0} Rs.</Text>
                        <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale,10), color: "#F4F4F4" }}>{item?.distance} km</Text>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                        <View style={{ paddingTop: responsiveSizes(height, width, scale, fontScale,20) }}>
                            <View style={{ borderRadius: responsiveSizes(height, width, scale, fontScale,100), height: responsiveSizes(height, width, scale, fontScale,12), width: responsiveSizes(height, width, scale, fontScale,12), backgroundColor: "#22ED01" }} />
                        </View>
                        <View style={{ margin: responsiveSizes(height, width, scale, fontScale,10), paddingBottom: responsiveSizes(height, width, scale, fontScale,10), borderBottomColor: "grey", borderBottomWidth: responsiveSizes(height, width, scale, fontScale,1) }}>
                            <Text style={{ color: "#B4B4B4", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontWeight: 400 }}><Text style={{ fontWeight: "bold" }}>Start</Text> : {moment(item?.start_at).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                            <Text style={{ color: "#B4B4B4", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontWeight: 400 }}>{item?.start_loc}</Text>
                        </View>
                    </View>


                    <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                        <View style={{ paddingTop: responsiveSizes(height, width, scale, fontScale,10) }}>
                            <View style={{ borderRadius: responsiveSizes(height, width, scale, fontScale,100), height: responsiveSizes(height, width, scale, fontScale,12), width: responsiveSizes(height, width, scale, fontScale,12), backgroundColor: "#FF5050" }} />
                        </View>
                        <View style={{ margin: responsiveSizes(height, width, scale, fontScale,10), marginTop: 0, borderBottomColor: "grey", }}>
                            <Text style={{ color: "#B4B4B4", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontWeight: 400 }}><Text style={{ fontWeight: "bold" }}>End</Text> : {moment(item?.end_at).format("DD-MM-YYYY hh:mm:ss A")}</Text>
                            <Text style={{ color: "#B4B4B4", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontWeight: 400 }}>{item?.end_loc}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    const HeaderComp = () => {
        return (
            <View style={{ display: "flex", flexDirection: "row", flex: 1, height: responsiveSizes(height, width, scale, fontScale,50) }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale,12), color: "#868686" }}>From</Text>
                    <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale,10), color: "#868686" }}>{moment(dateTimeFrom).format("DD/MM/YYYY hh:mm:ss A")}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale,12), color: "#868686" }}>To</Text>
                    <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale,10), color: "#868686" }}>{moment(dateTimeTo).format("DD/MM/YYYY hh:mm:ss A")}</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {isLoading && <Loader />}
            <LinearGradient colors={["#E5E5E5", "#DADADA"]} style={styles.linearGradient}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", paddingLeft: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ICONS.AntDesign name="left" size={responsiveSizes(height, width, scale, fontScale,30)} color="#3C3C3C" />
                    </TouchableOpacity>
                    <Text style={{ margin: responsiveSizes(height, width, scale, fontScale,5), color: "#3C3C3C", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Trips</Text>
                </View>
                {!!TripReplayList.length && <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interBlack }}>Total: {TripReplayList.length || 0}</Text>}
            </LinearGradient>
            {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <Text>To</Text> <Text>From</Text>
            </View> */}

            {!!TripReplayList.length ? <FlatList
                style={{ flex: 1, padding: responsiveSizes(height, width, scale, fontScale,10) }}
                ListHeaderComponent={HeaderComp}
                contentContainerStyle={{ paddingBottom: responsiveSizes(height, width, scale, fontScale,25) }}
                data={TripReplayList}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.start_at}
                maxToRenderPerBatch={3}
                initialNumToRender={3}

            // refreshing={false}
            // onRefresh={() => dispatch(getMessages())}
            /> :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale,26), marginTop: responsiveSizes(height, width, scale, fontScale,-100), color: COLORS.Grey }}>No data found</Text>
                </View>
            }
        </SafeAreaView>
    );
};
export default React.memo(TripReplayList);
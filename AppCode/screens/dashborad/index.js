import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, RefreshControl, Modal, TextInput } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { Loader, TestChart } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";
import {
    LineChart,
} from "react-native-chart-kit";
import { getAlarmData, getDashboardData, getLiveData, getMessages, setFuelPrice } from "../../store/actions";
import { useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// setFuelPrice
const Dashboard = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const fuelPrice = useSelector(({ auth }) => auth.fuelPrice)
    const [enteredFuelPrice, setEnteredFuelPrice] = useState(0);
    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        },

        modalContent: {
            backgroundColor: "white",
            padding: responsiveSizes(height, width, scale, fontScale, 20),
            borderRadius: responsiveSizes(height, width, scale, fontScale, 10),
            width: responsiveSizes(height, width, scale, fontScale, 300),
        },

        modalCaption: {
            fontSize: resposiveFontSize(height, width, scale, fontScale, 18),
            fontWeight: "bold",
            marginBottom: responsiveSizes(height, width, scale, fontScale, 10),
        },

        modalInput: {
            height: responsiveSizes(height, width, scale, fontScale, 40),
            borderColor: "gray",
            borderWidth: responsiveSizes(height, width, scale, fontScale, 1),
            marginBottom: responsiveSizes(height, width, scale, fontScale, 10),
            paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 10),
        },

        modalButton: {
            backgroundColor: (!enteredFuelPrice || enteredFuelPrice <= 0) ? "#C9C9C9" : "blue",
            padding: responsiveSizes(height, width, scale, fontScale, 10),
            borderRadius: responsiveSizes(height, width, scale, fontScale, 5),
            alignItems: "center",
        },

        modalButtonText: {
            color: "white",
            fontSize: resposiveFontSize(height, width, scale, fontScale, 16),
            fontWeight: "bold",
        },
        linearGradient: {
            height: responsiveSizes(height, width, scale, fontScale, 80),
            width: "100%",
            elevation: 5,
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.01),
            borderBottomColor: "#C9C9C9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: responsiveSizes(height, width, scale, fontScale, 25)
        },
    });
    const dispatch = useDispatch();
    const messagesCount = useSelector(({ messages }) => messages.messagesCount)
    const { DashBoard, DrivingBehaviourObj, isLoading } = useSelector(({ dashboard }) => dashboard)
    const mainPageRefresh = () => {
        dispatch(getDashboardData())
        dispatch(getLiveData())
        dispatch(getMessages())
        dispatch(getAlarmData())
    }

    useFocusEffect(React.useCallback(() => {
        mainPageRefresh()
    }, []))
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {isLoading && <Loader />}
            <LinearGradient colors={["#E5E5E5", "#DADADA"]} style={styles.linearGradient}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={IMAGES.logo} style={{ height: responsiveSizes(height, width, scale, fontScale, 45), width: responsiveSizes(height, width, scale, fontScale, 45), marginHorizontal: responsiveSizes(height, width, scale, fontScale, 10) }} resizeMode="contain" />
                    <Text style={{ color: "#4D4D4D", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interBold }}>Dashboard:</Text>
                </View>
                <View style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }}>
                    {!!messagesCount && <View style={{ backgroundColor: "red", borderRadius: responsiveSizes(height, width, scale, fontScale, 100), alignItems: "center", justifyContent: "center", position: "absolute", top: responsiveSizes(height, width, scale, fontScale, -5), right: responsiveSizes(height, width, scale, fontScale, -2), zIndex: 100, padding: responsiveSizes(height, width, scale, fontScale, 2) }}>
                        <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 11), color: "#FFFFFF", fontFamily: FONTS.interRegular }}>{messagesCount}</Text>
                    </View>}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Messages")}>
                        <Image source={ICON_IMAGES.ChatMessage} style={{ height: responsiveSizes(height, width, scale, fontScale, 35), width: responsiveSizes(height, width, scale, fontScale, 35) }} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={mainPageRefresh} />
                }
                style={{ flex: 1, marginBottom: responsiveSizes(height, width, scale, fontScale, 60) }}>
                <Text style={{ marginHorizontal: responsiveSizes(height, width, scale, fontScale, 20), marginTop: responsiveSizes(height, width, scale, fontScale, 20), color: "#656565", fontSize: resposiveFontSize(height, width, scale, fontScale, 14), fontFamily: FONTS.interRegular }}>Asset</Text>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: responsiveSizes(height, width, scale, fontScale, 15), alignItems: "center" }}>
                    <TestChart
                        green={Number(DashBoard?.Moving || 0)}
                        yellow={Number(DashBoard?.Parked || 0)}
                        red={Number(DashBoard?.InAlarm || 0)}
                        blue={Number(DashBoard?.Idle || 0)}
                        grey={Number(DashBoard?.Offline || 0)}
                        total={Number(DashBoard?.FleetCount || 0)}
                        onClickTotal={() => navigation.navigate("Assets")}
                    />
                    <View>
                        <View style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), alignItems: "center", justifyContent: "center", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.5), height: responsiveSizes(height, width, scale, fontScale, 37), width: responsiveSizes(height, width, scale, fontScale, 72), borderRadius: responsiveSizes(height, width, scale, fontScale, 10), borderBottomLeftRadius: responsiveSizes(height, width, scale, fontScale, 0), backgroundColor: "#A1FC8A" }}>
                            <Text style={{ color: "#057602", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Moving</Text>
                        </View>
                        <View style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), alignItems: "center", justifyContent: "center", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.5), height: responsiveSizes(height, width, scale, fontScale, 37), width: responsiveSizes(height, width, scale, fontScale, 72), borderRadius: responsiveSizes(height, width, scale, fontScale, 10), borderBottomLeftRadius: responsiveSizes(height, width, scale, fontScale, 0), backgroundColor: "#9DD0FF" }}>
                            <Text style={{ color: "#0027B1", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Idle</Text>
                        </View>
                        <View style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), alignItems: "center", justifyContent: "center", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.5), height: responsiveSizes(height, width, scale, fontScale, 37), width: responsiveSizes(height, width, scale, fontScale, 72), borderRadius: responsiveSizes(height, width, scale, fontScale, 10), borderBottomLeftRadius: responsiveSizes(height, width, scale, fontScale, 0), backgroundColor: "#FFE974" }}>
                            <Text style={{ color: "#8E6F00", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Parked</Text>
                        </View>
                        <View style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), alignItems: "center", justifyContent: "center", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.5), height: responsiveSizes(height, width, scale, fontScale, 37), width: responsiveSizes(height, width, scale, fontScale, 72), borderRadius: responsiveSizes(height, width, scale, fontScale, 10), borderBottomLeftRadius: responsiveSizes(height, width, scale, fontScale, 0), backgroundColor: "#E1E1E1" }}>
                            <Text style={{ color: "#383838", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Offline</Text>
                        </View>
                        <View style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), alignItems: "center", justifyContent: "center", borderWidth: responsiveSizes(height, width, scale, fontScale, 0.5), height: responsiveSizes(height, width, scale, fontScale, 37), width: responsiveSizes(height, width, scale, fontScale, 72), borderRadius: responsiveSizes(height, width, scale, fontScale, 10), borderBottomLeftRadius: responsiveSizes(height, width, scale, fontScale, 0), backgroundColor: "#FF9F9F" }}>
                            <Text style={{ color: "#9B0000", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>InAlarm</Text>
                        </View>
                    </View>
                </View>
                <View style={{ borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderBottomColor: "grey", marginHorizontal: responsiveSizes(height, width, scale, fontScale, 20), marginVertical: responsiveSizes(height, width, scale, fontScale, 10) }} />
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("OutOfZone")} style={{ padding: responsiveSizes(height, width, scale, fontScale, 10), alignItems: "center", width: responsiveSizes(height, width, scale, fontScale, 120) }}>
                        <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 16), color: "black", fontFamily: FONTS.interMedium }}>Out of Zone</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 16), color: "black", fontFamily: FONTS.interBold }}>{DashBoard.OutZone || 0}</Text>
                            <View style={{ marginLeft: responsiveSizes(height, width, scale, fontScale, 15) }}>
                                <ICONS.MaterialIcons name="arrow-forward-ios" color="#A5A3A3" size={responsiveSizes(height, width, scale, fontScale, 15)} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderRightWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderBottomColor: "grey", height: "100%" }} />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("TotalTrip")} style={{ padding: responsiveSizes(height, width, scale, fontScale, 10), alignItems: "center", width: responsiveSizes(height, width, scale, fontScale, 120) }}>
                        <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 16), color: "black", fontFamily: FONTS.interMedium }}>Today Trips</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 16), color: "black", fontFamily: FONTS.interBold }}>{DashBoard.TripCount || 0}</Text>
                            <View style={{ marginLeft: responsiveSizes(height, width, scale, fontScale, 15) }}>
                                <ICONS.MaterialIcons name="arrow-forward-ios" color="#A5A3A3" size={responsiveSizes(height, width, scale, fontScale, 15)} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderRightWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderBottomColor: "grey", height: "100%" }} />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Expired")} style={{ padding: responsiveSizes(height, width, scale, fontScale, 10), alignItems: "center", width: responsiveSizes(height, width, scale, fontScale, 120) }}>
                        <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 16), color: "black", fontFamily: FONTS.interMedium }}>Overdue</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 16), color: "black", fontFamily: FONTS.interBold }}>{DashBoard.OverDue || 0}</Text>
                            <View style={{ marginLeft: responsiveSizes(height, width, scale, fontScale, 15) }}>
                                <ICONS.MaterialIcons name="arrow-forward-ios" color="#A5A3A3" size={responsiveSizes(height, width, scale, fontScale, 15)} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <LinearGradient colors={["#CB7A00", "#FFBA09"]} style={{ margin: responsiveSizes(height, width, scale, fontScale, 10), marginTop: responsiveSizes(height, width, scale, fontScale, 20), borderRadius: responsiveSizes(height, width, scale, fontScale, 10) }}>
                    <View style={{ paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 15), paddingVertical: responsiveSizes(height, width, scale, fontScale, 5) }}>
                        <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interExtraBold }}>Fuel Consumption</Text>
                        <View style={{ flexDirection: "row", paddingVertical: responsiveSizes(height, width, scale, fontScale, 15), paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 25) }}>
                            <Image source={ICON_IMAGES.GasPump} style={{ width: responsiveSizes(height, width, scale, fontScale, 70), height: responsiveSizes(height, width, scale, fontScale, 73), marginRight: responsiveSizes(height, width, scale, fontScale, 20) }} />
                            <View>
                                <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 45), fontFamily: FONTS.interExtraBold, color: "white" }}>{DashBoard.FuelConsume || 0} <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interRegular, }}> Liter</Text></Text>
                                <Text style={{ fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interRegular, color: "white" }}>{DashBoard.FuelAverage || 0} -km/L</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderTopWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderTopColor: "#FFFFFF", flexDirection: "row", flex: 1 }}>
                        <View style={{ flex: 1, borderRightWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderRightColor: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 20), fontFamily: FONTS.interBold }}>{DashBoard.TripDistance || 0} <Text style={{ color: "#AE6900", fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interMedium }}> KM</Text></Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ padding: responsiveSizes(height, width, scale, fontScale, 5), flex: 1, borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.5), borderBottomColor: "#FFFFFF", alignItems: "flex-start", justifyContent: "center", paddingLeft: responsiveSizes(height, width, scale, fontScale, 25) }}>
                                <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interBold }}>{DashBoard.TravelTime || ""} <Text style={{ color: "#AE6900" }}> Drive</Text></Text>
                            </View>
                            <View style={{ padding: responsiveSizes(height, width, scale, fontScale, 5), flex: 1, alignItems: "flex-start", justifyContent: "center", paddingLeft: responsiveSizes(height, width, scale, fontScale, 25) }}>
                                <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interBold }}>{DashBoard.IdleTime || ""} <Text style={{ color: "#AE6900" }}> Idle</Text></Text>
                            </View>
                        </View>

                    </View>
                </LinearGradient>
                <Text style={{ alignSelf: "center", textAlign: "center", color: "orange", fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale, 16) }}>Driver Behavior</Text>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <LineChart
                        data={{
                            // labels: ["Over Speed", "Harsh Break", "Accident", "Harsh Acceleration", "Harsh Cornering"],
                            labels: ["Cornering", "Breaking", "Accelerating", "OverSpeed"],
                            datasets: [
                                {
                                    data: [
                                        // DrivingBehaviourObj["Accident"] || 0,
                                        DrivingBehaviourObj["Harsh Cornering"] || 0,
                                        DrivingBehaviourObj["Harsh Break"] || 0,
                                        DrivingBehaviourObj["Harsh Acceleration"] || 0,
                                        DrivingBehaviourObj["Over Speed"] || 0,
                                    ]
                                }
                            ]
                        }}
                        width={width - responsiveSizes(height, width, scale, fontScale, 20)} // from react-native
                        height={responsiveSizes(height, width, scale, fontScale, 220)}
                        yAxisInterval={4} // optional, defaults to 1
                        withShadow={true}
                        withInnerLines={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        chartConfig={{
                            backgroundColor: "#0F52BA",
                            backgroundGradientFrom: "#0F52BA",
                            backgroundGradientTo: "#0F52BA",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            propsForLabels: {
                                alignmentBaseline: "text-top",
                                fontFamily: FONTS.interMedium,

                            },
                            style: {
                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "#0F52BA"
                            }
                        }}
                        style={{
                            marginVertical: responsiveSizes(height, width, scale, fontScale, 10),
                            marginBottom: responsiveSizes(height, width, scale, fontScale, 25),
                            borderRadius: responsiveSizes(height, width, scale, fontScale, 10),

                        }}
                    />
                </View>

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={(!fuelPrice || fuelPrice <= 0)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalCaption}>Add Current Fuel Price</Text>
                        <TextInput
                            style={styles.modalInput}
                            keyboardType="numeric"
                            onChangeText={(text) => setEnteredFuelPrice(text)}
                        />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => dispatch(setFuelPrice(enteredFuelPrice))}
                            disabled={enteredFuelPrice <= 0}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <BottomNavBar activeName="home" />
        </SafeAreaView>
    );
};
export default React.memo(Dashboard);
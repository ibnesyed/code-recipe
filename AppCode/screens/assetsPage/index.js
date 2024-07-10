import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, ScrollView, FlatList, TextInput, RefreshControl, TouchableOpacity, useWindowDimensions } from "react-native";
import { FONTS, SVG_ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import BottomNavBar from "../../navigations/bottomNavBar";
import AssetGroup from "./assetGroups"
import { useDispatch, useSelector } from "react-redux";
import { addFilterForLiveDataInReducer, getLiveData } from "../../store/actions";
import { Loader } from "../../Components";

// let num = 1
const Assets = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: "white" },
        scrollView: { flex: 1, marginBottom: responsiveSizes(height, width, scale, fontScale,60) },
        subContainer: { backgroundColor: "#D9D9D9", height: responsiveSizes(height, width, scale, fontScale,180), elevation: 10, paddingHorizontal: responsiveSizes(height, width, scale, fontScale,15), padding: responsiveSizes(height, width, scale, fontScale,10) },
        box: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
        div: { justifyContent: "center", alignItems: "center" },
        numbers: { fontSize: resposiveFontSize(height, width, scale, fontScale,18), fontFamily: FONTS.interBold, color: "#3F3F3F" },
        heading: { color: "#656565", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold, marginLeft: responsiveSizes(height, width, scale, fontScale,5) },
        InputBox: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F0EEEE',
            borderRadius: responsiveSizes(height, width, scale, fontScale,50),
            marginVertical: responsiveSizes(height, width, scale, fontScale,10),
            width: responsiveSizes(height, width, scale, fontScale,300),
            height: responsiveSizes(height, width, scale, fontScale,42),
            alignSelf: "center",
            paddingHorizontal: responsiveSizes(height, width, scale, fontScale,10),
            backgroundColor: "white",
            elevation: 5,
    
        },
        input: {
            flex: 1,
            padding: responsiveSizes(height, width, scale, fontScale,10),
            fontSize: resposiveFontSize(height, width, scale, fontScale,14),
            color: "#808080"
        },
    });
    const dispatch = useDispatch();
    const { liveDataList, vehicle_loader, moving, idle, parked, offline, online, filter, inAlarm, sumTotal, liveDataByGroup } = useSelector(({ liveData }) => liveData)
    // const { DashBoard, DrivingBehaviourObj } = useSelector(({ dashboard }) => dashboard)

    const [searchInput, setSearchInput] = useState("")

    const addFilterForLiveData = (v) => {
        dispatch(addFilterForLiveDataInReducer(v))
    }
    useEffect(() => {
        dispatch(getLiveData())
        return () => dispatch(addFilterForLiveDataInReducer("liveDataList"))
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            {vehicle_loader && <Loader />}
            <View style={styles.subContainer}>
                <Text style={styles.heading}>Assets</Text>
                <View style={styles.box}>
                    <TouchableOpacity onPress={() => addFilterForLiveData("liveDataList")} style={[styles.div]}>
                        <View style={[filter === "liveDataList" ? { backgroundColor: "#B6B6B6", borderRadius: 5 } : {}]}>
                            <SVG_ICONS.Filterall size={responsiveSizes(height, width, scale, fontScale,50)} />
                        </View>
                        <Text style={styles.numbers}>{liveDataList.length || sumTotal}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addFilterForLiveData("online")} style={[styles.div]}>
                        <View style={[filter === "online" ? { backgroundColor: "#B6B6B6", borderRadius: 5 } : {}]}>
                            <SVG_ICONS.FilterOnline size={responsiveSizes(height, width, scale, fontScale,45)} />
                        </View>
                        <Text style={styles.numbers}>{online.length || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addFilterForLiveData("offline")} style={[styles.div]}>
                        <View style={[{ height: responsiveSizes(height, width, scale, fontScale,45), width: responsiveSizes(height, width, scale, fontScale,45) }, filter === "offline" ? { backgroundColor: "#B6B6B6", borderRadius: 5 } : {}]}>
                            <SVG_ICONS.Filteroffline />
                        </View>
                        <Text style={styles.numbers}>{offline.length || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addFilterForLiveData("moving")} style={[styles.div]}>
                        <View style={[{ height: responsiveSizes(height, width, scale, fontScale,43), width: responsiveSizes(height, width, scale, fontScale,43) }, filter === "moving" ? { backgroundColor: "#B6B6B6", borderRadius: 5 } : {}]}>
                            <SVG_ICONS.Filtermoving />
                        </View>
                        <Text style={styles.numbers}>{moving.length || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addFilterForLiveData("idle")} style={[styles.div]}>
                        <View style={[{ height: responsiveSizes(height, width, scale, fontScale,43), width: responsiveSizes(height, width, scale, fontScale,43) }, filter === "idle" ? { backgroundColor: "#B6B6B6", borderRadius: 5 } : {}]}>
                            <SVG_ICONS.Filteridle />
                        </View>
                        <Text style={styles.numbers}>{idle.length || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addFilterForLiveData("parked")} style={[styles.div]}>
                        <View style={[{ height: responsiveSizes(height, width, scale, fontScale,43), width: responsiveSizes(height, width, scale, fontScale,43) }, filter === "parked" ? { backgroundColor: "#B6B6B6", borderRadius: 5 } : {}]}>
                            <SVG_ICONS.Filterparked />
                        </View>
                        <Text style={styles.numbers}>{parked.length || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addFilterForLiveData("inAlarm")} style={[styles.div]}>
                        <View style={[{ height: responsiveSizes(height, width, scale, fontScale,43), width: responsiveSizes(height, width, scale, fontScale,43), justifyContent: "center", alignItems: "center" }, filter === "inAlarm" ? { backgroundColor: "#B6B6B6", borderRadius: 5 } : {}]}>
                            <View style={[{ height: responsiveSizes(height, width, scale, fontScale,35), width: responsiveSizes(height, width, scale, fontScale,35), borderRadius: responsiveSizes(height, width, scale, fontScale,10), borderColor: "red", borderWidth: responsiveSizes(height, width, scale, fontScale,3) }, filter === "inAlarm" ? { backgroundColor: "#B6B6B6", borderRadius: 5 } : {}]}>
                                <SVG_ICONS.Bell />
                            </View>
                        </View>
                        <Text style={styles.numbers}>{inAlarm.length || 0}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.InputBox}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,30), width: responsiveSizes(height, width, scale, fontScale,30) }}>
                        <SVG_ICONS.Search />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setSearchInput(e)}
                        value={searchInput}
                        placeholder="Search Vehicles"
                        placeholderTextColor="#808080"
                    />
                </View>
            </View>
            {/* <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={() => dispatch(getLiveData())} />
                }
                style={styles.scrollView}> */}
            <View style={styles.scrollView}>
                <FlatList
                    data={Object.keys(liveDataByGroup)} // Use group names as keys
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    renderItem={({ item }) => {
                        const groupName = item;
                        const items = liveDataByGroup[groupName];
                        const arrayOfItems = !!searchInput ? items.filter((e) => e.VRN.toUpperCase().includes(searchInput.toUpperCase())) : items;

                        if (arrayOfItems.length > 0) {
                            return <AssetGroup data={arrayOfItems} groupName={groupName} navigation={navigation} key={groupName} />;
                        } else {
                            return null; // Render nothing for groups with no matching items
                        }
                    }}
                    keyExtractor={(item) => item}
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={() => dispatch(getLiveData())} />
                    }
                />
                {/* {!!liveDataByGroup && !!Object.keys(liveDataByGroup).length &&
                        Object.entries(liveDataByGroup).map(([groupName, items]) => {
                            // if()
                            let arrayOfItems = !!searchInput ? items.filter((e) => e.VRN.toUpperCase().includes(searchInput.toUpperCase())) : items
                            if (arrayOfItems.length) {
                                return <AssetGroup key={groupName} data={arrayOfItems} groupName={groupName} navigation={navigation} />
                            }
                        })
                    } */}
            </View>
            {/* </ScrollView> */}
            <BottomNavBar activeName="car" />
        </SafeAreaView>
    );
};
export default React.memo(Assets);
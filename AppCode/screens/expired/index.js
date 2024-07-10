import React, { useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, RefreshControl, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { FONTS, ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import { getOverDue } from "../../store/actions";

const Expired = ({ navigation }) => {
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
    const { OverDueList, isLoading } = useSelector(({ dashboard }) => dashboard)
    useEffect(() => {
        dispatch(getOverDue())
    }, [])
    // {"deviceId": "865784051196544", "expiryDate": "No expiry", "installDate": "2022-03-28", "vrn": "APL-SPORTAGE-2"}
    const Item = ({ item }) => {
        return (
            <>
                <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium, marginLeft: responsiveSizes(height, width, scale, fontScale,20) }}>{item.deviceId}</Text>
                <View style={{ backgroundColor: "#7D7D7D", borderRadius: responsiveSizes(height, width, scale, fontScale,10), padding: responsiveSizes(height, width, scale, fontScale,10), marginHorizontal: responsiveSizes(height, width, scale, fontScale,10), marginBottom: responsiveSizes(height, width, scale, fontScale,5) }}>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interMedium }}>{item.vrn}</Text>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium, marginVertical: responsiveSizes(height, width, scale, fontScale,2) }}>{item.installDate}</Text>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interMedium }}>{item.expiryDate}</Text>
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
                    <Text style={{ margin: responsiveSizes(height, width, scale, fontScale,5), color: "#3C3C3C", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Expired</Text>
                </View>
                <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interBlack }}>Total: {OverDueList?.length || 0}</Text>
            </LinearGradient>
            <FlatList
                style={{ flex: 1, padding: responsiveSizes(height, width, scale, fontScale,10) }}
                contentContainerStyle={{ paddingBottom: responsiveSizes(height, width, scale, fontScale,25) }}
                data={OverDueList}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => JSON.stringify(item)}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => {
                            dispatch(getOverDue())
                        }}
                    />
                }
            />
        </SafeAreaView>
    );
};
export default React.memo(Expired);
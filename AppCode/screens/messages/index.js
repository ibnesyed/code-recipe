import React, { useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { TestChart } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";
import { getMessages } from "../../store/actions/messages";

const Messages = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();

    const styles = StyleSheet.create({
        linearGradient: {
            height: responsiveSizes(height, width, scale, fontScale, 60),
            width: "100%",
            elevation: 5,
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.01),
            borderBottomColor: "#C9C9C9",
            flexDirection: "row",
            alignItems: "flex-end",
            paddingBottom: responsiveSizes(height, width, scale, fontScale, 10),
            justifyContent: "space-between",
            paddingRight: responsiveSizes(height, width, scale, fontScale, 25)
        },
    });
    const messages = useSelector(({ messages }) => messages.messages)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMessages(() => null))
    }, [])

    const Item = ({ item }) => {
        return (
            <>
                <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interMedium, marginLeft: responsiveSizes(height, width, scale, fontScale, 20) }}>{`+${item.ReceiverNo}`}</Text>
                <View style={{ backgroundColor: "#7D7D7D", borderRadius: responsiveSizes(height, width, scale, fontScale, 10), padding: responsiveSizes(height, width, scale, fontScale, 10), marginHorizontal: responsiveSizes(height, width, scale, fontScale, 10), marginBottom: responsiveSizes(height, width, scale, fontScale, 5) }}>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interMedium }}>{item.Event}</Text>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interMedium, marginVertical: responsiveSizes(height, width, scale, fontScale, 2) }}>{item.RecDateTime}</Text>
                    <Text style={{ color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interMedium }}>{item.Location}</Text>
                </View>
            </>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <LinearGradient colors={["#E5E5E5", "#DADADA"]} style={styles.linearGradient}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", paddingLeft: responsiveSizes(height, width, scale, fontScale, 10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ICONS.AntDesign name="left" size={responsiveSizes(height, width, scale, fontScale, 35)} color="#3C3C3C" />
                    </TouchableOpacity>
                    <Text style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), color: "#3C3C3C", fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interBold }}>Messages</Text>
                </View>
                {!!messages.length && <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interBlack }}>Total: {messages.length || 0}</Text>}
            </LinearGradient>
            {/* {console.log(messages)} */}
            {!!messages.length ? <FlatList
                style={{ flex: 1, padding: responsiveSizes(height, width, scale, fontScale, 10) }}
                contentContainerStyle={{ paddingBottom: responsiveSizes(height, width, scale, fontScale, 25) }}
                data={messages}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.RecNo}
                refreshing={false}
                onRefresh={() => dispatch(getMessages(() => null))}
            /> :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontFamily: FONTS.interBold, fontSize: resposiveFontSize(height, width, scale, fontScale, 26), marginTop: responsiveSizes(height, width, scale, fontScale, -100), color: COLORS.Grey }}>No data found</Text>
                </View>
            }
        </SafeAreaView>
    );
};
export default React.memo(Messages);
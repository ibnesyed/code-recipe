import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, TextInput, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { TestChart } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";

const Feedback = ({ navigation }) => {
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
        inputStyle: {
            color: "black",
            borderWidth: responsiveSizes(height, width, scale, fontScale,0.5),
            borderRadius: responsiveSizes(height, width, scale, fontScale,5),
            padding: responsiveSizes(height, width, scale, fontScale,5),
            fontSize: resposiveFontSize(height, width, scale, fontScale,14),
            fontFamily: FONTS.interRegular,
        },
        inputStyleBox: {
            marginHorizontal: responsiveSizes(height, width, scale, fontScale,15),
            marginBottom: responsiveSizes(height, width, scale, fontScale,20),
        },
    });
    const [problemType, setProblemType] = useState("")
    const [desc, setDesc] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <LinearGradient colors={["#E5E5E5", "#DADADA"]} style={styles.linearGradient}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", paddingLeft: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ICONS.AntDesign name="left" size={responsiveSizes(height, width, scale, fontScale,35)} color="#3C3C3C" />
                    </TouchableOpacity>
                    <Text style={{ margin: responsiveSizes(height, width, scale, fontScale,5), color: "#3C3C3C", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Feedback</Text>
                </View>
            </LinearGradient>
            <ScrollView style={{ flex: 1, padding: responsiveSizes(height, width, scale, fontScale,10) }}>
                <View style={styles.inputStyleBox}>
                    <Text style={{ color: "#181818", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, marginBottom: responsiveSizes(height, width, scale, fontScale,5) }}>
                        Problem Type
                    </Text>
                    <TextInput
                        placeholderTextColor="#AFAFAF"
                        value={problemType}
                        onChangeText={(e) => setProblemType(e)}
                        placeholder="Title"
                        style={styles.inputStyle}
                    />
                </View>
                <View style={styles.inputStyleBox}>
                    <Text style={{ color: "#181818", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, marginBottom: responsiveSizes(height, width, scale, fontScale,5) }}>
                        Description
                    </Text>
                    <TextInput
                        // placeholderTextColor="#AFAFAF"
                        value={desc}
                        onChangeText={(e) => setDesc(e)}
                        // placeholder="Old Password"
                        multiline={true}
                        numberOfLines={10}

                        style={[styles.inputStyle, { textAlignVertical: "top" }]}
                    />
                </View>
                <View style={styles.inputStyleBox}>
                    <Text style={{ color: "#181818", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, marginBottom: responsiveSizes(height, width, scale, fontScale,5) }}>
                        Your Email
                    </Text>
                    <TextInput
                        // placeholderTextColor="#AFAFAF"
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                        // placeholder="Old Password"
                        style={styles.inputStyle}
                    />
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => null} style={{ backgroundColor: "#626262", height: responsiveSizes(height, width, scale, fontScale,40), width: responsiveSizes(height, width, scale, fontScale,140), borderRadius: responsiveSizes(height, width, scale, fontScale,5), justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: responsiveSizes(height, width, scale, fontScale,80) }}>
                    <ICONS.AntDesign name="arrowright" size={responsiveSizes(height, width, scale, fontScale,25)} color="white" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
export default React.memo(Feedback);
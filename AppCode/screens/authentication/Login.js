import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, useWindowDimensions, Button } from "react-native";
import { CompleteLogo, Loader } from "../../Components";
import { COLORS, FONTS, ICONS, ICON_IMAGES, IMAGES, responsiveSizes, resposiveFontSize } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from "react-redux";
import { onDisplayLocalNotificationCustom } from "../../utils";

const Login = ({
    isConfigActive,
    setIsConfigActive,
    rememberMe,
    setRememberMe,
    userName,
    setUserName,
    password,
    setPassword,
    server,
    setServer,
    isCustomServer,
    setIsCustomServer,
    onSumbit
}) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.light
        },
        footer4rdTxt: { color: "#dba309", fontFamily: FONTS.interMedium },
        footer3rdTxt: { color: "#D80606", fontFamily: FONTS.interMedium },
        footer2ndTxt: { color: "black", fontWeight: "bold", fontFamily: FONTS.interBold },
        mainFooterDiv: { backgroundColor: "#EBEBEB", padding: responsiveSizes(height, width, scale, fontScale,4), paddingHorizontal: responsiveSizes(height, width, scale, fontScale,10), alignItems: "center", marginHorizontal: responsiveSizes(height, width, scale, fontScale,10), marginVertical: responsiveSizes(height, width, scale, fontScale,5), flexDirection: "row", justifyContent: "center" },
        mainFooter: { position: "relative", bottom: 0, left: 0, right: 0, padding: responsiveSizes(height, width, scale, fontScale,10) },
        rememberTxt: { color: "#243880", fontSize: resposiveFontSize(height, width, scale, fontScale,12), fontFamily: FONTS.interRegular },
        div: { display: "flex", flexDirection: "row", alignItems: "center" },
        rememberBox: { display: "flex", flexDirection: "row", marginHorizontal: responsiveSizes(height, width, scale, fontScale,30), justifyContent: "space-between" },
        header_label_text: { fontFamily: FONTS.interRegular, marginHorizontal: responsiveSizes(height, width, scale, fontScale,10), marginTop: responsiveSizes(height, width, scale, fontScale,10), fontSize: resposiveFontSize(height, width, scale, fontScale,20), color: "#606060" },
        footer_box: { borderBottomWidth: responsiveSizes(height, width, scale, fontScale,4), borderBottomColor: "#27479A" },
        footerText: { fontFamily: FONTS.interRegular, color: "#515151", fontSize: resposiveFontSize(height, width, scale, fontScale,12) },
        login_box: { backgroundColor: "white", paddingBottom: responsiveSizes(height, width, scale, fontScale,60), marginTop: responsiveSizes(height, width, scale, fontScale,30), marginBottom: responsiveSizes(height, width, scale, fontScale,50), marginHorizontal: responsiveSizes(height, width, scale, fontScale,15), borderRadius: responsiveSizes(height, width, scale, fontScale,12), elevation: 5, },
        loginBox_header: { display: "flex", flexDirection: "row", padding: responsiveSizes(height, width, scale, fontScale,10) },
        loginBox_HeaderLabel: { fontFamily: FONTS.interSemiBold, paddingHorizontal: responsiveSizes(height, width, scale, fontScale,10), fontSize: resposiveFontSize(height, width, scale, fontScale,18), },
        login_button_box: { position: "absolute", bottom: responsiveSizes(height, width, scale, fontScale,-25), left: 0, right: 0, alignItems: "center" },
        login_btn: { backgroundColor: "#848484", elevation: 10, borderWidth: responsiveSizes(height, width, scale, fontScale,4), borderColor: "#FFFFFF", height: responsiveSizes(height, width, scale, fontScale,60), width: responsiveSizes(height, width, scale, fontScale,60), justifyContent: "center", alignItems: "center", borderRadius: responsiveSizes(height, width, scale, fontScale,100) },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: responsiveSizes(height, width, scale, fontScale,1),
            borderColor: "grey",
            paddingHorizontal: responsiveSizes(height, width, scale, fontScale,10),
            borderRadius: responsiveSizes(height, width, scale, fontScale,50),
            height: responsiveSizes(height, width, scale, fontScale,48),
            marginHorizontal: responsiveSizes(height, width, scale, fontScale,20),
            marginVertical: responsiveSizes(height, width, scale, fontScale,5)
        },
        icon: {
            width: responsiveSizes(height, width, scale, fontScale,24),
            height: responsiveSizes(height, width, scale, fontScale,24),
            marginHorizontal: responsiveSizes(height, width, scale, fontScale,10),
        },
        input: {
            flex: 1,
            padding: responsiveSizes(height, width, scale, fontScale,10),
            fontSize: resposiveFontSize(height, width, scale, fontScale,18),
            color: "grey",
            fontFamily: FONTS.interRegular,
            justifyContent: "center",
        },
        checkboxContainer: {
            width: responsiveSizes(height, width, scale, fontScale,20),
            height: responsiveSizes(height, width, scale, fontScale,20),
            borderRadius: responsiveSizes(height, width, scale, fontScale,2),
            borderWidth: responsiveSizes(height, width, scale, fontScale,1),
            borderColor: '#333',
            alignItems: 'center',
            justifyContent: 'center',
        },
        checked: {
            width: responsiveSizes(height, width, scale, fontScale,10),
            height: responsiveSizes(height, width, scale, fontScale,10),
            borderRadius: responsiveSizes(height, width, scale, fontScale,2),
            backgroundColor: '#333',
        },
        unchecked: {
            width: responsiveSizes(height, width, scale, fontScale,0),
            height: responsiveSizes(height, width, scale, fontScale,0),
        },
        linearGradient: {
            flex: 1,
            paddingLeft: responsiveSizes(height, width, scale, fontScale,15),
            paddingRight: responsiveSizes(height, width, scale, fontScale,15),
            borderRadius: responsiveSizes(height, width, scale, fontScale,5)
        },
        box_1: { display: "flex", flexDirection: "row", marginHorizontal: responsiveSizes(height, width, scale, fontScale,30) },
        miniBox: { display: "flex", flexDirection: "row", marginHorizontal: responsiveSizes(height, width, scale, fontScale,10), alignItems: "center" },
        text: { color: "#243880", fontSize: resposiveFontSize(height, width, scale, fontScale,12), marginTop: responsiveSizes(height, width, scale, fontScale,-1.5), fontFamily: FONTS.interRegular },


    });
    const isLoading = useSelector(({ auth }) => auth.isLoading)
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };
    return (
        <SafeAreaView style={styles.container}>
            {isLoading && <Loader />}
            <LinearGradient colors={[COLORS.light, "#FFFFFF", "#FFFFFF"]} style={styles.linearGradient}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text style={styles.header_label_text} >Welcome !</Text>
                    <CompleteLogo />
                    <View style={styles.login_box}>
                        <View style={styles.loginBox_header}>
                            <Text style={[styles.loginBox_HeaderLabel, { color: isConfigActive ? "#9D9D9D" : "#4A4A4A" }]} onPress={() => setIsConfigActive(false)}>Login</Text>
                            <Text style={[styles.loginBox_HeaderLabel, { color: !isConfigActive ? "#9D9D9D" : "#4A4A4A" }]} onPress={() => setIsConfigActive(true)}>Configuration</Text>
                        </View>
                        {isConfigActive ?
                            <View style={{ marginTop: responsiveSizes(height, width, scale, fontScale,30) }}>
                                <View style={styles.box_1}>
                                    <View style={[styles.miniBox, { marginHorizontal: responsiveSizes(height, width, scale, fontScale,5) }]}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsCustomServer(true)} style={{ marginRight: responsiveSizes(height, width, scale, fontScale,5) }}>
                                            {isCustomServer ? (
                                                <ICONS.Ionicons name="radio-button-on" color="#27479A" size={responsiveSizes(height, width, scale, fontScale,20)} />
                                            ) : (
                                                <ICONS.Ionicons name="radio-button-off" color="#27479A" size={responsiveSizes(height, width, scale, fontScale,20)} />
                                            )}
                                        </TouchableOpacity>
                                        <Text style={styles.text}>Custom Server</Text>
                                    </View>
                                    <View style={styles.miniBox}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsCustomServer(false)} style={{ marginRight: responsiveSizes(height, width, scale, fontScale,5) }}>
                                            {!isCustomServer ? (
                                                <ICONS.Ionicons name="radio-button-on" color="#27479A" size={responsiveSizes(height, width, scale, fontScale,20)} />
                                            ) : (
                                                <ICONS.Ionicons name="radio-button-off" color="#27479A" size={responsiveSizes(height, width, scale, fontScale,20)} />
                                            )}
                                        </TouchableOpacity>
                                        <Text style={styles.text}>Default Server</Text>
                                    </View>

                                </View>
                                <View style={styles.inputContainer}>
                                    <Image source={ICON_IMAGES.Server} style={styles.icon} />
                                    <TextInput placeholderTextColor={"grey"} placeholder="Server" style={styles.input} value={server} onChangeText={(e) => setServer(e)} />
                                </View>
                            </View>
                            :
                            <View style={{ marginTop: responsiveSizes(height, width, scale, fontScale,30) }}>
                                <View style={styles.inputContainer}>
                                    <Image source={ICON_IMAGES.User} style={styles.icon} />
                                    <TextInput placeholderTextColor={"grey"} placeholder="User" style={styles.input} value={userName} onChangeText={(e) => setUserName(e)} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Image source={ICON_IMAGES.Password_key} style={styles.icon} />

                                    <TextInput placeholderTextColor={"grey"} secureTextEntry={!isPasswordVisible} placeholder="Password" style={styles.input} value={password} onChangeText={(e) => setPassword(e)} />
                                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ backgroundColor: "white" }}>
                                        {/* You can use an icon or text to toggle password visibility */}
                                        <ICONS.Ionicons name={isPasswordVisible ? "eye" : "eye-off"} color="grey" size={responsiveSizes(height, width, scale, fontScale,25)} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rememberBox}>
                                    <View style={styles.div}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => setRememberMe(!rememberMe)} style={{ marginRight: 2.5 }}>
                                            {rememberMe ? (
                                                <ICONS.MaterialIcons name="check-box" color="#27479A" size={responsiveSizes(height, width, scale, fontScale,20)} />
                                            ) : (
                                                <ICONS.MaterialIcons name="check-box-outline-blank" color="#27479A" size={responsiveSizes(height, width, scale, fontScale,20)} />
                                            )}
                                        </TouchableOpacity>
                                        <Text style={styles.rememberTxt}>Remember me</Text>
                                    </View>
                                    <Text style={[styles.rememberTxt, { marginTop: responsiveSizes(height, width, scale, fontScale,1.5) }]}>Forgot Password?</Text>
                                </View>
                            </View>
                        }
                        <View style={styles.login_button_box}>
                            <TouchableOpacity activeOpacity={0.7} style={styles.login_btn} onPress={onSumbit}>
                                <Image source={ICON_IMAGES.right_arrow} style={{ height: responsiveSizes(height, width, scale, fontScale,25), width: responsiveSizes(height, width, scale, fontScale,25) }} />
                            </TouchableOpacity>
                        </View>
                        {/* "1", "2", "19", "21", "28", "29" */}
{/* <Button title="Notify" onPress={() => {
onDisplayLocalNotificationCustom({ title:"done", body: "asdasdsadsad", channelId: "20" })
}} /> */}
                    </View>
                </ScrollView>
                <View style={styles.mainFooter}>
                    <View style={styles.mainFooterDiv}>
                        <Text style={styles.footerText}>Project of <Text style={styles.footer2ndTxt}>Timeline </Text>
                            <Text style={styles.footer3rdTxt}>Telematics </Text>
                            Powered by
                            <Text style={styles.footer4rdTxt}> Halcon </Text>
                        </Text>
                        <Image source={IMAGES.halconLogo} style={{ height: responsiveSizes(height, width, scale, fontScale,15), width: responsiveSizes(height, width, scale, fontScale,15) }} />
                    </View>
                    <View style={styles.footer_box} />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};
export default React.memo(Login);
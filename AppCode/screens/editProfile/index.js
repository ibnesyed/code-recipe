import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, TextInput, Linking, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { Loader, TestChart } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import { changePassword, setToast } from "../../store/actions";
import BottomNavBar from "../../navigations/bottomNavBar";

const EditProfile = ({ navigation }) => {
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
            paddingRight: responsiveSizes(height, width, scale, fontScale,25),
        },
        inputStyle: {
            color: "black",
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale,0.5),
            marginHorizontal: responsiveSizes(height, width, scale, fontScale,20),
            marginVertical: responsiveSizes(height, width, scale, fontScale,10),
            padding: responsiveSizes(height, width, scale, fontScale,5),
            fontSize: resposiveFontSize(height, width, scale, fontScale,14),
            fontFamily: FONTS.interRegular
        },
        input: {
            flex: 1,
            padding: responsiveSizes(height, width, scale, fontScale,10),
            fontSize: resposiveFontSize(height, width, scale, fontScale,18),
            color: "grey",
            fontFamily: FONTS.interRegular,
            justifyContent: "center",
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: responsiveSizes(height, width, scale, fontScale,1),
            // borderColor: "grey",
            borderBottomColor: "grey",
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale,1),
            paddingHorizontal: responsiveSizes(height, width, scale, fontScale,10),
            // borderRadius: responsiveSizes(height, width, scale, fontScale,50),
            height: responsiveSizes(height, width, scale, fontScale,48),
            marginHorizontal: responsiveSizes(height, width, scale, fontScale,20),
            marginVertical: responsiveSizes(height, width, scale, fontScale,5)
        },
    });
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [newPasswordVisible, setNewPasswordVisible] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector(({ auth }) => auth);
    // console.log(user)
    const changePasswordBtn = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            dispatch(setToast("error", "Please fill all fields"))
            return
        }
        if (newPassword !== confirmPassword) {
            dispatch(setToast("error", "New & Comfirm Password not match"))
            return
        }
        let data = {
            userName: user?.userName,
            newPassword,
            oldPassword
        }
        dispatch(changePassword(data, () => {
            dispatch(setToast("success", "Password changed"))
            // setNewPassword("")
            // setOldPassword("")
            // setConfirmPassword("")
        }))
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {isLoading && <Loader />}
            <LinearGradient colors={["#E5E5E5", "#DADADA"]} style={styles.linearGradient}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", paddingLeft: responsiveSizes(height, width, scale, fontScale,10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ICONS.AntDesign name="left" size={responsiveSizes(height, width, scale, fontScale,35)} color="#3C3C3C" />
                    </TouchableOpacity>
                    <Text style={{ margin: responsiveSizes(height, width, scale, fontScale,5), color: "#3C3C3C", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Profile</Text>
                </View>
            </LinearGradient>
            <ScrollView style={{ flex: 1, padding: responsiveSizes(height, width, scale, fontScale,15) }}>
                <Text style={{ color: "#5F5F5F", fontSize: resposiveFontSize(height, width, scale, fontScale,18), fontFamily: FONTS.interBold, textAlign: "center", marginBottom: responsiveSizes(height, width, scale, fontScale,10) }}>Timeline</Text>
                <View style={styles.inputContainer}>
                    <Image source={ICON_IMAGES.Password_key} style={styles.icon} />
                    <TextInput
                        placeholderTextColor={"grey"}
                        secureTextEntry={!oldPasswordVisible}
                        placeholder="Old Password"
                        style={styles.input}
                        value={oldPassword}
                        onChangeText={(e) => setOldPassword(e)}
                    />
                    <TouchableOpacity
                        onPress={() => setOldPasswordVisible(!oldPasswordVisible)}
                        style={{ backgroundColor: "white" }}>
                        {/* You can use an icon or text to toggle password visibility */}
                        <ICONS.Ionicons name={oldPasswordVisible ? "eye" : "eye-off"} color="grey" size={responsiveSizes(height, width, scale, fontScale,25)} />
                        {/* <Text>{oldPasswordVisible ? 'Hide' : 'Show'} Password</Text> */}
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={ICON_IMAGES.Password_key} style={styles.icon} />
                    <TextInput
                        placeholderTextColor={"grey"}
                        secureTextEntry={!newPasswordVisible}
                        placeholder="New Password"
                        style={styles.input}
                        value={newPassword}
                        onChangeText={(e) => setNewPassword(e)}
                    />
                    <TouchableOpacity
                        onPress={() => setNewPasswordVisible(!newPasswordVisible)}
                        // onPress={togglePasswordVisibility} 
                        style={{ backgroundColor: "white" }}>
                        {/* You can use an icon or text to toggle password visibility */}
                        <ICONS.Ionicons name={newPasswordVisible ? "eye" : "eye-off"} color="grey" size={responsiveSizes(height, width, scale, fontScale,25)} />
                        {/* <Text>{isPasswordVisible ? 'Hide' : 'Show'} Password</Text> */}
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={ICON_IMAGES.Password_key} style={styles.icon} />
                    <TextInput
                        placeholderTextColor={"grey"}
                        secureTextEntry={!confirmPasswordVisible}
                        placeholder="Confirm Password"
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={(e) => setConfirmPassword(e)}
                    />
                    <TouchableOpacity
                        onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        // onPress={togglePasswordVisibility} 
                        style={{ backgroundColor: "white" }}>
                        {/* You can use an icon or text to toggle password visibility */}
                        <ICONS.Ionicons name={confirmPasswordVisible ? "eye" : "eye-off"} color="grey" size={responsiveSizes(height, width, scale, fontScale,25)} />
                        {/* <Text>{isPasswordVisible ? 'Hide' : 'Show'} Password</Text> */}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => changePasswordBtn()} style={{ backgroundColor: "#626262", height: responsiveSizes(height, width, scale, fontScale,35), width: responsiveSizes(height, width, scale, fontScale,61), borderRadius: responsiveSizes(height, width, scale, fontScale,5), justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: responsiveSizes(height, width, scale, fontScale,80) }}>
                    <ICONS.AntDesign name="arrowright" size={responsiveSizes(height, width, scale, fontScale,25)} color="white" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
export default React.memo(EditProfile);
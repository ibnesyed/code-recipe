import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { TestChart } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, SVG_ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";
import Share from 'react-native-share';

const ShareLocation = ({ navigation ,route}) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const [duration, setDuration] = useState(1);

    const shareLocationOnWhatsapp = () => {
    }
    const sendWhatsAppMessage = async (message) => {
        const message2 = `Check out this location: https://maps.google.com/?q=${37.32131},${67.324421}`;
        try {
            const shareOptions = await checkIsWhatsappInstalled(message2)
            Share.shareSingle(shareOptions)
                .then((res) => { console.log(res) })
                .catch((err) => { err && console.log(err); });
        } catch (error) {

        }
    };
    const checkIsWhatsappInstalled = (message) => {
        return new Promise((resolve, reject) => {
            Share.isPackageInstalled('com.whatsapp.w4b')
                .then((response) => {
                    if (response?.isInstalled) {
                        resolve({
                            message,
                            social: Share.Social.WHATSAPPBUSINESS
                        })
                    } else {
                        resolve({
                            message,
                            social: Share.Social.WHATSAPP
                        })
                    }
                    // { isInstalled: true/false, message: 'Package is Installed' }
                })
                .catch(() => {
                    resolve({
                        message,
                        social: Share.Social.WHATSAPP
                    })
                });
        });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: responsiveSizes(height, width, scale, fontScale,60), paddingBottom: responsiveSizes(height, width, scale, fontScale,70) }}>
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: responsiveSizes(height, width, scale, fontScale,60), backgroundColor: "#E5E5E5", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: responsiveSizes(height, width, scale, fontScale,10), paddingRight: responsiveSizes(height, width, scale, fontScale,15), elevation: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingBottom: responsiveSizes(height, width, scale, fontScale,15) }}>
                    <TouchableOpacity style={{ marginTop: responsiveSizes(height, width, scale, fontScale,-2), height: responsiveSizes(height, width, scale, fontScale,30), width: responsiveSizes(height, width, scale, fontScale,50) }} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <SVG_ICONS.Back />
                    </TouchableOpacity>
                    <Text style={{ color: "#383838", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold }}>Share Location</Text>
                </View>
                <Text style={{ color: "#242424", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, marginBottom: responsiveSizes(height, width, scale, fontScale,10) }}>LEC-12A-2522</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: responsiveSizes(height, width, scale, fontScale,0.4), flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: responsiveSizes(height, width, scale, fontScale,20), paddingVertical: responsiveSizes(height, width, scale, fontScale,30) }}>
                    <Text style={{ color: "#6B6B6B", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold, flex: 0.2 }}>Email:</Text>
                    <Text style={{ flex: 1, color: "#000000", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular }}>abc@gmail.com</Text>
                </View>
                <View style={{ borderBottomWidth: responsiveSizes(height, width, scale, fontScale,0.4), flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: responsiveSizes(height, width, scale, fontScale,20), paddingVertical: responsiveSizes(height, width, scale, fontScale,30) }}>
                    <Text style={{ color: "#6B6B6B", fontSize: resposiveFontSize(height, width, scale, fontScale,16), fontFamily: FONTS.interBold, flex: 0.2 }}>Mob#</Text>
                    <Text style={{ flex: 1, color: "#000000", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular }}>923111122883</Text>
                </View>
                <View style={{ borderBottomWidth: responsiveSizes(height, width, scale, fontScale,0.4), flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", padding: responsiveSizes(height, width, scale, fontScale,20), paddingVertical: responsiveSizes(height, width, scale, fontScale,30) }}>
                    <Text style={{ color: "#424242", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, flex: 0.3 }}>Duration:</Text>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setDuration(1)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginVertical: responsiveSizes(height, width, scale, fontScale,2.5) }}>
                            {duration === 1 ?
                                <ICONS.MaterialCommunityIcons name="checkbox-outline" size={responsiveSizes(height, width, scale, fontScale,20)} color={"black"} />
                                :
                                <ICONS.MaterialIcons name="check-box-outline-blank" size={responsiveSizes(height, width, scale, fontScale,20)} color={"black"} />
                            }
                            <Text style={{ marginLeft: responsiveSizes(height, width, scale, fontScale,10), color: "#000000", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular }}>For 1 Hour</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setDuration(12)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginVertical: responsiveSizes(height, width, scale, fontScale,2.5) }}>
                            {duration === 12 ?
                                <ICONS.MaterialCommunityIcons name="checkbox-outline" size={responsiveSizes(height, width, scale, fontScale,20)} color={"black"} />
                                :
                                <ICONS.MaterialIcons name="check-box-outline-blank" size={responsiveSizes(height, width, scale, fontScale,20)} color={"black"} />
                            }
                            <Text style={{ marginLeft: responsiveSizes(height, width, scale, fontScale,10), color: "#000000", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular }}>For 12 Hour</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setDuration(24)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginVertical: responsiveSizes(height, width, scale, fontScale,2.5) }}>
                            {duration === 24 ?
                                <ICONS.MaterialCommunityIcons name="checkbox-outline" size={responsiveSizes(height, width, scale, fontScale,20)} color={"black"} />
                                :
                                <ICONS.MaterialIcons name="check-box-outline-blank" size={responsiveSizes(height, width, scale, fontScale,20)} color={"black"} />
                            }
                            <Text style={{ marginLeft: responsiveSizes(height, width, scale, fontScale,10), color: "#000000", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular }}>For 24 Hour</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", padding: responsiveSizes(height, width, scale, fontScale,10), paddingBottom: responsiveSizes(height, width, scale, fontScale,20) }}>
                <View style={{ height: responsiveSizes(height, width, scale, fontScale,30), width: responsiveSizes(height, width, scale, fontScale,30) }}>
                    <SVG_ICONS.LocationBlack />
                </View>
                <Text numberOfLines={3} style={{ color: "#4A4A4A", fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interRegular, marginRight: responsiveSizes(height, width, scale, fontScale,30), marginLeft: responsiveSizes(height, width, scale, fontScale,10) }}>Plot # 218, G-IV Block G-4 Phase 2 Johar Town, Lahore, Punjab 54600, Pakistan Micro soft private limited chat 11.</Text>
            </View>
            <TouchableOpacity onPress={sendWhatsAppMessage} activeOpacity={0.7} style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#4F4F4F", height: responsiveSizes(height, width, scale, fontScale,70), alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#F5F5F5", fontSize: resposiveFontSize(height, width, scale, fontScale,20), fontFamily: FONTS.interBold }}>Share</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
export default React.memo(ShareLocation);
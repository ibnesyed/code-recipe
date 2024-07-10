import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Modal, Button, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { Loader, TestChart } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, SVG_ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";
import { immoblizerOffCommand, immoblizerOnCommand, locationCommand } from "../../store/actions";

const CommandScreen = ({ route, navigation }) => {
    const [tpin, setTpin] = useState("");

    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        modalBackground: {
            flex: 1,
            justifyContent: 'flex-end', // To display at the bottom
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        bottomSheet: {
            backgroundColor: 'white',
            padding: responsiveSizes(height, width, scale, fontScale, 20),
            width: "100%",
            alignItems: 'center', // Center the content horizontally
        },
        modalContent: {
            backgroundColor: "white",
            padding: responsiveSizes(height, width, scale, fontScale, 20),
            borderRadius: responsiveSizes(height, width, scale, fontScale, 10),
            width: "100%",
        },
        modalTitle: {
            fontSize: resposiveFontSize(height, width, scale, fontScale, 20),
            fontWeight: "bold",
            marginBottom: responsiveSizes(height, width, scale, fontScale, 10),
        },
        textInput: {
            width: "80%",
            height: responsiveSizes(height, width, scale, fontScale, 40),
            borderColor: "gray",
            borderWidth: responsiveSizes(height, width, scale, fontScale, 1),
            marginBottom: responsiveSizes(height, width, scale, fontScale, 20),
            backgroundColor: "white",
            fontFamily: FONTS.interRegular,
            fontSize: resposiveFontSize(height, width, scale, fontScale, 14),
            color: "black",
            borderRadius: responsiveSizes(height, width, scale, fontScale, 5),
        },
        modalButtons: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
        },
        buttonText: {
            color: "black",
            fontFamily: FONTS.interRegular,
            fontSize: resposiveFontSize(height, width, scale, fontScale, 16),
            marginHorizontal: responsiveSizes(height, width, scale, fontScale, 15),
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
        modalBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: responsiveSizes(height, width, scale, fontScale, 20),
            borderRadius: responsiveSizes(height, width, scale, fontScale, 10),
            width: "100%"
            // alignItems: 'center',
        },
        modalTitle: {
            fontSize: resposiveFontSize(height, width, scale, fontScale, 20),
            fontWeight: 'bold',
            marginBottom: responsiveSizes(height, width, scale, fontScale, 10),
        },
        textInput: {
            width: '80%',
            height: responsiveSizes(height, width, scale, fontScale, 40),
            borderColor: 'gray',
            borderWidth: responsiveSizes(height, width, scale, fontScale, 1),
            marginBottom: responsiveSizes(height, width, scale, fontScale, 20),
            backgroundColor: "white",
            fontFamily: FONTS.interRegular,
            fontSize: resposiveFontSize(height, width, scale, fontScale, 14),
            color: "black",
            borderRadius: responsiveSizes(height, width, scale, fontScale, 5)
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
    });
    const DeviceId = route?.params?.DeviceID || null;
    const cmpId = route?.params?.cmp_id || route?.params?.cmp_id === 0 ? 0 : null;
    const VRN = route?.params?.VRN || null;
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTextInputValue, setModalTextInputValue] = useState('');
    const isLoading = useSelector(({ commands }) => commands.isLoading);
    const onOkPressed = (tpin) => {
        const data = {
            cmpId, DeviceId, tpin
        }
        if (isModalVisible === "immobilizerOn") {
            dispatch(immoblizerOnCommand(data))
        } else if (isModalVisible === "immobilizerOff") {
            dispatch(immoblizerOffCommand(data))
        } else if (isModalVisible === "location") {
            dispatch(locationCommand(data))
        }
        setIsModalVisible(false);
    };

    const onCancelPressed = () => {
        setTpin("");
        setIsModalVisible(false);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: responsiveSizes(height, width, scale, fontScale, 60) }}>
            {isLoading && <Loader />}
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: responsiveSizes(height, width, scale, fontScale, 60), backgroundColor: "#E5E5E5", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 10), paddingRight: responsiveSizes(height, width, scale, fontScale, 15), elevation: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingBottom: responsiveSizes(height, width, scale, fontScale, 15) }}>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <SVG_ICONS.Back />
                    </TouchableOpacity>
                    <Text style={{ color: "#383838", fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interBold }}>Commands</Text>
                </View>
                <Text style={{ color: "#242424", fontSize: resposiveFontSize(height, width, scale, fontScale, 14), fontFamily: FONTS.interRegular, marginBottom: responsiveSizes(height, width, scale, fontScale, 10) }}>{VRN || ""}</Text>
            </View>
            <View style={{ backgroundColor: "#FAFAFA", borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.4), flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: responsiveSizes(height, width, scale, fontScale, 20) }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 35), width: responsiveSizes(height, width, scale, fontScale, 35) }}>
                        <SVG_ICONS.EngineBlack />
                    </View>
                    <Text style={{ color: "#000000", fontSize: resposiveFontSize(height, width, scale, fontScale, 14), fontFamily: FONTS.interRegular, marginLeft: responsiveSizes(height, width, scale, fontScale, 10) }}>Immobilizer: on</Text>
                </View>
                <TouchableOpacity onPress={() => setIsModalVisible("immobilizerOn")} style={{ backgroundColor: "#636363", height: responsiveSizes(height, width, scale, fontScale, 31), width: responsiveSizes(height, width, scale, fontScale, 61), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Send</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "#FAFAFA", borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.4), flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: responsiveSizes(height, width, scale, fontScale, 20) }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 35), width: responsiveSizes(height, width, scale, fontScale, 35) }}>
                        <SVG_ICONS.EngineBlack />
                    </View>
                    <Text style={{ color: "#000000", fontSize: resposiveFontSize(height, width, scale, fontScale, 14), fontFamily: FONTS.interRegular, marginLeft: responsiveSizes(height, width, scale, fontScale, 10) }}>Immobilizer: off</Text>
                </View>
                <TouchableOpacity onPress={() => setIsModalVisible("immobilizerOff")} style={{ backgroundColor: "#636363", height: responsiveSizes(height, width, scale, fontScale, 31), width: responsiveSizes(height, width, scale, fontScale, 61), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Send</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "#FAFAFA", borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.4), flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: responsiveSizes(height, width, scale, fontScale, 20) }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 35), width: responsiveSizes(height, width, scale, fontScale, 35) }}>
                        <SVG_ICONS.LocationBlack />
                    </View>
                    <Text style={{ color: "#000000", fontSize: resposiveFontSize(height, width, scale, fontScale, 14), fontFamily: FONTS.interRegular, marginLeft: responsiveSizes(height, width, scale, fontScale, 10) }}>Location</Text>
                </View>
                <TouchableOpacity onPress={() => setIsModalVisible("location")} style={{ backgroundColor: "#636363", height: responsiveSizes(height, width, scale, fontScale, 31), width: responsiveSizes(height, width, scale, fontScale, 61), borderRadius: responsiveSizes(height, width, scale, fontScale, 5), justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#FFFFFF", fontSize: resposiveFontSize(height, width, scale, fontScale, 12), fontFamily: FONTS.interRegular }}>Send</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={!!isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.bottomSheet}>
                        <Text style={styles.modalTitle}>Please enter your TPIN code</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter TPIN"
                            onChangeText={(value) => setTpin(value)}
                            value={tpin}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={onCancelPressed}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { onOkPressed(tpin), setTpin("") }}>
                                <Text style={styles.buttonText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};
export default React.memo(CommandScreen);
import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions
} from 'react-native';
import { FONTS, ICONS, responsiveSizes, resposiveFontSize } from '../utils';

const DateTimeModal = ({
    isModalVisible = false,
    onOkPressed = null,
    onCancelPressed = null,
    onCustomPress = null
}) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        modalBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            backgroundColor: '#434343',
            borderRadius: responsiveSizes(height, width, scale, fontScale,5),
            width: responsiveSizes(height, width, scale, fontScale,200)
        },
        label: { marginVertical: responsiveSizes(height, width, scale, fontScale,7), flexDirection: "row", alignItems: "center" },
        text: { color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale,18), fontFamily: FONTS.interRegular, marginHorizontal: responsiveSizes(height, width, scale, fontScale,10) },
        footer: { borderTopWidth: responsiveSizes(height, width, scale, fontScale,0.5), borderTopColor: "white", padding: responsiveSizes(height, width, scale, fontScale,15), flexDirection: "row", justifyContent: "flex-end" },
        cancel: { color: "#C7C7C7", fontSize: resposiveFontSize(height, width, scale, fontScale,18), fontFamily: FONTS.interRegular, marginHorizontal: responsiveSizes(height, width, scale, fontScale,20) },
        ok: { color: "#79A7FF", fontSize: resposiveFontSize(height, width, scale, fontScale,18), fontFamily: FONTS.interRegular },

    });
    const [selection, setSelection] = useState("Today")
    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <View style={{ padding: responsiveSizes(height, width, scale, fontScale,15) }}>
                        <TouchableOpacity style={styles.label} activeOpacity={0.7}
                            onPress={() => setSelection("Today")}
                        >
                            <ICONS.MaterialIcons name={`radio-button-${selection === "Today" ? "on" : "off"}`} size={responsiveSizes(height, width, scale, fontScale,18)} color="white" />
                            <Text style={styles.text}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.label} activeOpacity={0.7}
                            onPress={() => setSelection("Yesterday")}
                        >
                            <ICONS.MaterialIcons name={`radio-button-${selection === "Yesterday" ? "on" : "off"}`} size={responsiveSizes(height, width, scale, fontScale,18)} color="white" />
                            <Text style={styles.text}>Yesterday</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.label} activeOpacity={0.7}
                            onPress={() => setSelection("Week")}
                        >
                            <ICONS.MaterialIcons name={`radio-button-${selection === "Week" ? "on" : "off"}`} size={responsiveSizes(height, width, scale, fontScale,18)} color="white" />
                            <Text style={styles.text}>Week</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.label} activeOpacity={0.7}
                            onPress={onCustomPress}
                        >
                            <View style={{ height: responsiveSizes(height, width, scale, fontScale,18), width: responsiveSizes(height, width, scale, fontScale,18) }} />
                            <Text style={styles.text}>Custom</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <Text
                            onPress={onCancelPressed}
                            style={styles.cancel}>Cancel</Text>
                        <Text
                            onPress={() => !!onOkPressed ? onOkPressed(selection) : null}
                            style={styles.ok}>OK</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default React.memo(DateTimeModal);
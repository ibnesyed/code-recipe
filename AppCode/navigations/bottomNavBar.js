import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, useWindowDimensions, Text, Image } from 'react-native';
import { COLORS, ICONS, responsiveSizes, tabNavigation } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const BottomNavBar = ({
    activeName = "home"
}) => {
    const alarmsCount = useSelector(({ alarmData }) => alarmData.alarmsCount)

    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        container: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5, // for Android
            position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "white", height: responsiveSizes(height, width, scale, fontScale, 60), display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"
        },
        bellIcon: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5, // for Android
            borderRadius: responsiveSizes(height, width, scale, fontScale, 100), padding: responsiveSizes(height, width, scale, fontScale, 5), marginTop: responsiveSizes(height, width, scale, fontScale, -50), backgroundColor: "white"
        },
        iconSize: { height: responsiveSizes(height, width, scale, fontScale, 20), width: responsiveSizes(height, width, scale, fontScale, 20) },
        boxSize: { flex: 1, height: responsiveSizes(height, width, scale, fontScale, 60), justifyContent: "center", alignItems: "center" }
    });

    const { liveDataByGroup } = useSelector(({ liveData }) => liveData)


    const navigation = useNavigation();
    const goToMainMapView = async () => {
        const rightMenuItems = await Object.keys(liveDataByGroup) || [];
        if (rightMenuItems && rightMenuItems.length && liveDataByGroup && liveDataByGroup[rightMenuItems[0]] && liveDataByGroup[rightMenuItems[0]][0] && (liveDataByGroup[rightMenuItems[0]][0].DeviceID || liveDataByGroup[rightMenuItems[0]][0].deviceId)) {
            navigation.navigate("MainMapView", { DeviceID: liveDataByGroup[rightMenuItems[0]][0].DeviceID || liveDataByGroup[rightMenuItems[0]][0].deviceId })
        }
        // navigation.navigate("MainMapView")
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => activeName === "home" ? null : navigation.navigate("Dashboard")}
                style={[styles.boxSize, activeName === "home" ? { borderTopWidth: 1, borderTopColor: "red" } : {}]}
            >
                <Image
                    source={tabNavigation[`${activeName === "home" ? "activeTab" : "nonActiveTab"}`].dashboard}
                    style={[styles.iconSize]}
                />
                {/* <ICONS.Octicons
                    name="home"
                    color={activeName === "home" ? "#797979" : COLORS.light}
                    size={responsiveSizes(height, width, scale, fontScale, 35)}
                /> */}
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => activeName === "car" ? null : navigation.navigate("Assets")}
                style={[styles.boxSize, activeName === "car" ? { borderTopWidth: 1, borderTopColor: "red" } : {}]}
            >
                <Image
                    source={tabNavigation[`${activeName === "car" ? "activeTab" : "nonActiveTab"}`].car}
                    style={styles.iconSize}
                />
                {/* <ICONS.Ionicons
                    name="car-sport-outline"
                    color={activeName === "car" ? "#797979" : COLORS.light}
                    size={responsiveSizes(height, width, scale, fontScale, 35)}
                /> */}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bellIcon, activeName === "bell" ? { backgroundColor: "red" } : {}]}
                activeOpacity={0.7}
                onPress={() => activeName === "bell" ? null : navigation.navigate("Notifications")}
            // style={styles.boxSize}
            >
                {!!alarmsCount && <View style={{ backgroundColor: "blue", position: "absolute", top: 0, right: 0, height: 18, width: 18, borderRadius: 100, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "white", fontSize: 10 }}>{alarmsCount || ""}</Text></View>}
                <Image
                    source={tabNavigation[`${activeName === "bell" ? "activeTab" : "nonActiveTab"}`].alrm}
                    style={[styles.iconSize, { margin: responsiveSizes(height, width, scale, fontScale, 8) }]}
                />
                {/* <ICONS.MaterialCommunityIcons
                    name="bell-outline"
                    color={activeName === "bell" ? "#797979" : COLORS.light}
                    size={responsiveSizes(height, width, scale, fontScale, 35)}
                /> */}
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => activeName === "radio" ? null : goToMainMapView()}
                style={[styles.boxSize, activeName === "radio" ? { borderTopWidth: 1, borderTopColor: "red" } : {}]}
            >
                <Image
                    source={tabNavigation[`${activeName === "radio" ? "activeTab" : "nonActiveTab"}`].mark}
                    style={styles.iconSize}
                />
                {/* <ICONS.Feather
                    name="radio"
                    color={activeName === "radio" ? "#797979" : COLORS.light}
                    size={responsiveSizes(height, width, scale, fontScale, 35)}
                /> */}
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => activeName === "user" ? null : navigation.navigate("Profile")}
                style={[styles.boxSize, activeName === "user" ? { borderTopWidth: 1, borderTopColor: "red" } : {}]}
            >
                <Image
                    source={tabNavigation[`${activeName === "user" ? "activeTab" : "nonActiveTab"}`].profile}
                    style={styles.iconSize}
                />
                {/* <ICONS.Entypo
                    name="user"
                    color={activeName === "user" ? "#797979" : COLORS.light}
                    size={responsiveSizes(height, width, scale, fontScale, 35)}
                /> */}
            </TouchableOpacity>
        </View>
    );
}
export default React.memo(BottomNavBar);
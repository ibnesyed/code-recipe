import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity , FlatList, useWindowDimensions} from "react-native";
import { FONTS, responsiveSizes, resposiveFontSize, SVG_ICONS } from "../../utils";
import AssetCart from "./assetCart";

// let num = 1;
const AssetGroup = ({ navigation, data = [], groupName = "" }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        header: { height: responsiveSizes(height, width, scale, fontScale,26), backgroundColor: "#1A2961", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: responsiveSizes(height, width, scale, fontScale,20), marginVertical: responsiveSizes(height, width, scale, fontScale,3) },
        headings: { fontSize: resposiveFontSize(height, width, scale, fontScale,14), fontFamily: FONTS.interBold, color: "white" },
        btn: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
    });
    const [isOpen, setIsOpen] = useState(false);
    return (
        <View style={{ backgroundColor: "white" }}>
            <View style={styles.header}>
                <Text style={styles.headings}>{groupName || ""}</Text>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => setIsOpen(!isOpen)}
                    style={styles.btn}
                >
                    <Text style={styles.headings}>{data.length || 0}</Text>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,25), width: responsiveSizes(height, width, scale, fontScale,25) }}>
                        {isOpen ? <SVG_ICONS.BoldUp /> : <SVG_ICONS.BoldDown />}
                    </View>
                </TouchableOpacity>
            </View>
            {!!isOpen &&
                !!data.length &&
                <FlatList
                    data={data}
                    scrollEnabled={false}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    renderItem={({ item }) => (
                        <AssetCart data={item} navigation={navigation} />
                    )}
                    keyExtractor={(item) => item.deviceId.toString()}
                />
                // data.map((e, i) => (
                //     <AssetCart key={i} data={e} navigation={navigation} />
                // ))
            }
        </View>
    );
};
export default React.memo(AssetGroup);
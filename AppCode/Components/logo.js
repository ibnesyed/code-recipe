import React from "react";
import { View, StyleSheet, Image, useWindowDimensions } from "react-native";
import { IMAGES, responsiveSizes } from "../utils";

const CompleteLogo = () => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        logo_container: {
            alignItems: "center"
        },
        logo: {
            width: responsiveSizes(height, width, scale, fontScale,50),
            height: responsiveSizes(height, width, scale, fontScale,50),
        },
        logo_name: {
            width: responsiveSizes(height, width, scale, fontScale,200),
            height: responsiveSizes(height, width, scale, fontScale,60)
        }
    });
    return (
        <View style={styles.logo_container}>
            <Image resizeMode="contain" source={IMAGES.logo} style={styles.logo} />
            <Image resizeMode="contain" source={IMAGES.logo_name} style={styles.logo_name} />
        </View>
    );
};
export default React.memo(CompleteLogo);
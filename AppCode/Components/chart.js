import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native';
import { FONTS, IMAGES, responsiveSizes, resposiveFontSize } from '../utils';

const TestChart = ({
    widthAndHeight = 240,
    green = 0,
    yellow = 0,
    red = 0,
    blue = 0,
    grey = 0,
    total = 0,
    onClickTotal = null
}) => {
    // const sliceColor = ['#FEDE49', '#F38C82', '#47ABF3', '#D2C7B5', '#31F238']
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        container: { alignItems: "center", justifyContent: "center", borderWidth: responsiveSizes(height, width, scale, fontScale, 1), borderColor: "#E0E2D0", borderRadius: responsiveSizes(height, width, scale, fontScale, 220) },
        chartBoxes: { color: "white", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interBold, position: "absolute", },
        circleChart: { position: "absolute", top: 0, bottom: 0, right: 0, left: 0, justifyContent: "center", alignItems: "center" },
        label: { textAlign: "center", color: "#717171", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interRegular },
        value: { marginTop: responsiveSizes(height, width, scale, fontScale, -5), textAlign: "center", fontSize: resposiveFontSize(height, width, scale, fontScale, 30), color: "#424242", fontFamily: FONTS.interBold },
    });

    return (
        <TouchableOpacity activeOpacity={onClickTotal ? 0.7 : 1}
            onPress={() => onClickTotal ? onClickTotal() : null} style={[styles.container, { width: responsiveSizes(height, width, scale, fontScale, widthAndHeight + 12), height: responsiveSizes(height, width, scale, fontScale, widthAndHeight + 12) }]}>
            <ImageBackground source={IMAGES.circleChart} style={styles.circleChart} >
                <Text style={[styles.chartBoxes, { top: responsiveSizes(height, width, scale, fontScale, 30), left: responsiveSizes(height, width, scale, fontScale, 80) }]}>
                    {green}
                </Text>
                <Text style={[styles.chartBoxes, { top: responsiveSizes(height, width, scale, fontScale, 55), right: responsiveSizes(height, width, scale, fontScale, 55) }]}>
                    {yellow}
                </Text>
                <Text style={[styles.chartBoxes, { bottom: responsiveSizes(height, width, scale, fontScale, 70), right: responsiveSizes(height, width, scale, fontScale, 45) }]}>
                    {red}
                </Text>
                <Text style={[styles.chartBoxes, { bottom: responsiveSizes(height, width, scale, fontScale, 30), left: responsiveSizes(height, width, scale, fontScale, 100) }]}>
                    {blue}
                </Text>
                <Text style={[styles.chartBoxes, { bottom: responsiveSizes(height, width, scale, fontScale, 110), left: responsiveSizes(height, width, scale, fontScale, 25) }]}>
                    {grey}
                </Text>
                {/* <TouchableOpacity activeOpacity={0.7}
                    onPress={() => onClickTotal ? onClickTotal() : null}
                > */}
                <Text style={styles.label}>
                    {"Total"}
                </Text>
                <Text style={styles.value}>
                    {total || 0}
                </Text>
                {/* </TouchableOpacity> */}
            </ImageBackground>
        </TouchableOpacity>
    );
}
export default React.memo(TestChart);
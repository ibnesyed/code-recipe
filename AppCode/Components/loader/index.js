import React from 'react';
import { View, ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS, responsiveSizes } from '../../utils';

const Loader = () => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <ActivityIndicator size={responsiveSizes(height, width, scale, fontScale,100)} color={COLORS.Pacific_Blue} />
        </View>
    );
};
export default React.memo(Loader);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 5000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

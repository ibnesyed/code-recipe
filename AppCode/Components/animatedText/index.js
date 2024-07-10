import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, View, Dimensions, useWindowDimensions } from 'react-native';
import { FONTS, SVG_ICONS, responsiveSizes } from '../../utils';

const SlideText = ({ text }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const translationX = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translationX, {
        toValue: -Dimensions.get('window').width,
        duration: 3000, // Adjust the duration as needed
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
    //   onPress={() => navigation.navigate("Notifications")}
      style={{
        paddingHorizontal: responsiveSizes(height, width, scale, fontScale,15),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#C01717",
        height: responsiveSizes(height, width, scale, fontScale,30),
        overflow: "hidden",
      }}
    >
      <View style={{ height: responsiveSizes(height, width, scale, fontScale,30), width: responsiveSizes(height, width, scale, fontScale,30) }}>
        <SVG_ICONS.LightBell />
      </View>
      <Animated.Text
        style={{
          color: "white",
          fontSize: responsiveSizes(height, width, scale, fontScale,12),
          fontFamily: FONTS.interRegular,
          transform: [{ translateX: translationX }],
        }}
      >
        {text}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default React.memo(SlideText);

import React, { useState, useEffect } from 'react';
import {
	StyleSheet
	, Text, View, Platform, TouchableHighlight
} from 'react-native';
import { ICONS, COLORS, FONTS } from "../../utils";
import * as Animatable from 'react-native-animatable';

const Toast = ({ status, message, clearToast }) => {
	const [show, setShow] = useState(false);
	const [animationStyle, setanimationStyle] = useState('bounceInRight')

	useEffect(() => {
		//show toast true if message exist
		setShow(message ? true : false)

		// if the animation is existAnimation that is bounceOutRight
		// then after 2secs clear the toast and setShowFalse
		let timer;
		if (animationStyle === 'bounceOutRight') {
			timer = setTimeout(() => {
				setShow(false);
				clearToast();
			}, 2000);
		}
		return () => {
			clearTimeout(timer);
			setExitAnimation(true);
		};
	}, [animationStyle.length]);

	const setExitAnimation = (reset) => {
		let timer;
		if (!reset) {
			setTimeout(() => {
				timer = setanimationStyle('bounceOutRight')
			}, 3000)
		} else {
			clearTimeout(timer)
			// setExitAnimation(true)
		}
	}

	const styles = StyleSheet.create({
		toast: {
			minHeight: 60,
			height: 'auto',
			// width: 'auto',
			width: !!message && message.length <= 14 ? '60%' : '80%',
			borderLeftColor: COLORS.white,
			backgroundColor: COLORS.Very_Light_Grey_Text,
			borderLeftWidth: 4,
			borderLeftColor:
				status === 'success' ? "green" :
					status === 'error' ? "red" :
						status === 'warning' ? "yellow" :
							status === 'info' ? "grey" : COLORS.black,
			paddingHorizontal: '4%',
			justifyContent: 'center',
			position: 'absolute',
			// alignItems: 'center',
			right: 10,
			top: Platform.OS === 'android' ? 20 : 40,
			zIndex: 5,
			elevation: 2
		},
		_icon: { marginRight: '3%', marginTop: '2%', flex: 0.15, alignItems: 'center' },
		message: {
			// ...FONTS.h2_r.Poppins, 
			color: COLORS.white, lineHeight: 18, letterSpacing: 0.16
		},
		_message: { flex: 0.8, paddingVertical: '4%' }
	});

	return (
		show ?
			<Animatable.View
				animation={animationStyle}
				iterationCount={1}
				//when the first animation end and the toast visible then after 3 secs 
				// change the animation to exist animation
				onAnimationEnd={(endState) => endState.finished && show && setExitAnimation()}
				style={styles.toast}>
				<TouchableHighlight
				>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles._icon}>
							{status === 'warning' ?
								<ICONS.FontAwesome name={'warning'} color={"yellow"} size={30} />
								: status === 'error' ?
									<ICONS.AntDesign name="closecircle" color={"red"} size={25} /> :
									<ICONS.MaterialIcons
										name={status === 'success' ? 'check-circle' : 'info'}
										color={status === 'success' ? "green" : COLORS.Very_Light_Grey_Text}
										backgroundColor={COLORS.white}
										size={30} />}
						</View>
						<View style={styles._message}>
							<Text style={styles.message}>{message}</Text>
						</View>
						<View>
							<View>
								<ICONS.AntDesign name="close" color={COLORS.white} size={20} style={{ paddingTop: '4%' }} />
							</View>
						</View>
					</View>
				</TouchableHighlight>
			</Animatable.View> : null
	);

}

export default React.memo(Toast);

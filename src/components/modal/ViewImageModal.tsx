import React, { useEffect, useRef } from 'react';
import {
    Animated,
    TouchableOpacity
} from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { ZoomableImageProps } from '../../interface/Props.interface';
import { rootStyle } from '../../style';
import { ProdLight } from '../StyledComponents';
import { BlurView } from 'expo-blur';
import { colors } from '../../style/Colors';
const ZoomableImage: React.FC<ZoomableImageProps> = ({ uri, onClose, fadeInOut}) => {
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale } }],
        { useNativeDriver: false }
    );

    const onPinchHandlerStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: false,
              }).start();
        }
        fadeInOut(false);
    };

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, []);


    return (
        <Animated.View style={[rootStyle.centralize, { flex: 1, opacity }]}>
            <PinchGestureHandler
                onGestureEvent={onPinchGestureEvent}
                onHandlerStateChange={onPinchHandlerStateChange}
            >
                <BlurView  intensity={50} style={[rootStyle.centralize, rootStyle.w100, { flex: 1, backgroundColor: colors.blackOp}]}>
                    <Animated.Image
                        source={{ uri: uri }}
                        resizeMode="contain"
                        style={[{
                            width: '100%',
                            height: '90%',
                            // maxHeight: 700,
                            transform: [{ scale }],
                        }]}
                    />
                    <TouchableOpacity onPress={onClose}>
                        <ProdLight>Toggle View</ProdLight>
                    </TouchableOpacity>

                </BlurView>
            </PinchGestureHandler>
        </Animated.View>

    );
};
export default ZoomableImage;
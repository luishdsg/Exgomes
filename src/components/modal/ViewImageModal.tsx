import React, { useRef, useState } from 'react';
import {
    View,
    Image,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Modal,
    StatusBar,
} from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { ProdLight } from '../StyledComponents';
import { rootStyle } from '../../style';
import { ZoomableImageProps } from '../../interface/Props.interface';
const ZoomableImage: React.FC<ZoomableImageProps> = ({ uri, onClose }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale } }],
        { useNativeDriver: false }
    );

    const onPinchHandlerStateChange = (event: { nativeEvent: { oldState: number; }; }) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
        }
    };

    return (
        <PinchGestureHandler
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={onPinchHandlerStateChange}
        >
            <Animated.View style={[rootStyle.justifyStart, rootStyle.w100, { flex: 1, backgroundColor: 'orange' }]}>
                <Animated.Image
                    source={{ uri: uri }}
                    style={[{
                        width: '100%',
                        maxHeight: 400,
                        minHeight: 200,
                        backgroundColor: 'black',
                        transform: [{ scale }],
                    }]}
                />
                <TouchableOpacity onPress={onClose}>
                    <ProdLight>Toggle View</ProdLight>
                </TouchableOpacity>

            </Animated.View>
        </PinchGestureHandler>
    );
};
export default ZoomableImage;
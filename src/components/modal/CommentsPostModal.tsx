import { Animated, Dimensions, PanResponder, Text, TouchableOpacity, StyleSheet, View, Modal, Pressable, Easing, StatusBar } from "react-native";
import { colors } from "../../style/Colors"
import { ProdBold } from "../StyledComponents"
import { useEffect, useRef, useState, } from "react";
import { CommentsPostProps } from "../../interface/Props.interface";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { rootStyle } from "../../style";
import { useThemeController } from "../../constants/Themed";

const CommentsPostModal: React.FC<CommentsPostProps> = ({ onClose }) => {
    const screenHeight = Dimensions.get('window').height;
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeOpacityBW, themeBW, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
    const screen90Percent = screenHeight * 0.9;

    const [modalHeight, setModalHeight] = useState(screenHeight * 0.6);
    const [modalOpacity] = useState(new Animated.Value(0));


    const [animatedModalHeight] = useState(new Animated.Value(screenHeight * 0.6));
    const animatedModalBottom = useRef(new Animated.Value(-modalHeight)).current;

    useEffect(() => {
        Animated.timing(animatedModalBottom, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        Animated.timing(modalOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }).start();
        }, [modalHeight]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                const newHeight = modalHeight - gestureState.dy;
                console.log('ATUALIZOU >>>   ' + modalHeight)

                if (newHeight >= screenHeight * 0.3 && newHeight <= screen90Percent) {
                    console.log('ATUALIZOU PRIMEIRO >>>  ' + newHeight)
                    setModalHeight(newHeight);
                    animatedModalHeight.setValue(newHeight);
                } else if (newHeight < screenHeight * 0.3) {
                    console.log('ATUALIZOU segundo' + modalHeight)
                    Animated.timing(animatedModalHeight, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }).start(() => onClose());

                }
            },
            onPanResponderRelease: (_, gestureState) => {
                Animated.timing(animatedModalHeight, {
                    toValue: modalHeight + (gestureState.dy > 0 ? 5 : -5),
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }).start();
            },
        })
    ).current;

    return (
        <Modal transparent visible={true} animationType="fade">
            <View style={[rootStyle.view, { backgroundColor: colors.blackOp }]}>
                <Animated.View style={[styles.draggableContainer, { height: animatedModalHeight,bottom: animatedModalBottom, opacity: modalOpacity }]}>
                    <View  {...panResponder.panHandlers} style={styles.draggableBar} />
                    <ScrollView
                        style={[{ backgroundColor: 'red' }]}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={0}>
                        <View style={[{ height: 2000, width: '100%' }]}>
                            <Text>Conteúdo do Modal</Text>

                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text>Fechar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <StatusBar hidden={true} />

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgb(40,30,240,220)',
        justifyContent: 'flex-end',
    },
    draggableContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 16,
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
    draggableBar: {
        height: 10,
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        marginVertical: 8,
        width: 40,
        borderRadius: 5,
    },
    closeButton: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
    },
});

export {
    CommentsPostModal
}
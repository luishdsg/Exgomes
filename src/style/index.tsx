import { StyleSheet } from 'react-native';
import { colors } from '../constants/Colors';
export const rootStyle = StyleSheet.create({
    mt01: {
        marginTop: '2%'
    },
    mt02: {
        marginTop: '5%'
    },
    mt03: {
        marginTop: '10%'
    },
    mt04: {
        marginTop: '15%'
    },
    centralize: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    centralizeText: {
        textAlign: 'center',
    },
    textGray: {
        color: colors.gray
    },
    px2: {
        paddingHorizontal: '5%',
    },
    px1: {
        paddingHorizontal: '3%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    col: {
        marginHorizontal: 5,
        padding: 10,
        alignItems: 'center',
    },
});

export const Images = StyleSheet.create({
    MediumImage: {
        width: '95%',
        height: '80%',
        // backgroundColor: 'blue',
        // aspectRatio: 1,
        borderRadius: 30
    },
});

export const text = StyleSheet.create({
    fz10: {
        fontSize: 10,
    },
    fz20: {
        fontSize: 20,
    },
    fz30: {
        fontSize: 30,
    },
    fz40: {
        fontSize: 40,
    },
    fz50: {
        fontSize: 50,
    },
    fz60: {
        fontSize: 60,
    },
    fz70: {
        fontSize: 80,
    },
    fz80: {
        fontSize: 90,
    },
});
export const loginStyle = StyleSheet.create({
    loginImage: {
        width: '100%',
        justifyContent: 'flex-end',
        // backgroundColor: 'blue',
        border: 1,
        alignItems: 'center',
        height: '100%',
        maxHeight: 250,
    },
    profile:{
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
        fill: colors.patternColor,
        borderRadius: 100,
        padding: 2,
        borderColor: colors.patternColor,
        borderWidth: 2,

    },
    pass: {
        width: '20%',
        height: '100%',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        height: 55,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: '5%',
        marginHorizontal: '4%',
    },
    input: {
        fontFamily: 'ProdRegular',
        borderWidth: 1,
        height: 55,
        width: '80%',
    },
  
    ScrollView: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
    },
    scrollContainer: {
        flexGrow: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        height: '100%',
        flex: 1,
        width: '100%',
        backgroundColor: colors.whiteIce
    },
    buttonArea: {
        flex: 0,
        backgroundColor: 'red',
        width: '100%',
        alignItems: 'center',
    },

});
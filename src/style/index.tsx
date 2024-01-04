import { StyleSheet } from 'react-native';
import { colors } from './Colors';
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
    leftText: {
        textAlign: 'left',
    },
    rightText: {
        textAlign: 'right',
    },
    textGray: {
        color: colors.gray
    },
    p1: {
        paddingHorizontal: '3%',
        paddingVertical: '3%',
    },
    p2: {
        paddingVertical: '5%',
        paddingHorizontal: '5%',
    },
    pt1: {
        paddingTop: '3%',
    },
    pt2: {
        paddingTop: '5%',
    },
    px2: {
        paddingHorizontal: '5%',
    },
    px1: {
        paddingHorizontal: '3%',
    },
    py2: {
        paddingVertical: '5%',
    },
    py1: {
        paddingVertical: '3%',
    },
   
    mt1: {
        marginTop: '3%',
    },
    mt2: {
        marginTop: '5%',
    },
    mx2: {
        marginHorizontal: '5%',
    },

    mx1: {
        marginHorizontal: '3%',
    },
    my2: {
        marginVertical: '5%',
    },
    my1: {
        marginVertical: '3%',
    },
    m1: {
        marginHorizontal: '3%',
        marginVertical: '3%',
    },
    m2: {
        marginVertical: '5%',
        marginHorizontal: '5%',
    },
    view: {
        //   backgroundColor: colors.patternColor,
        height: '100%',
        width: '100%',
    },
    halfview: {
        // backgroundColor: colors.patternColor,
        justifyContent: 'flex-end',
        height: 490,
        width: '100%',
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
    btnPatter: {
        borderRadius: 15,
        backgroundColor: colors.patternColor,
        width: '100%',
        height: 70,
    },
    btnPatterpass: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.patternColor,
        backgroundColor: colors.whiteIce,
        width: '100%',
        height: 70,
    },
    inputError: {
        borderColor: 'red',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'left',
        paddingHorizontal: '5%',
        fontFamily: 'ProdBold',
        marginBottom: 10,
    },
    lineIOS:{
        width: '39%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: colors.black,
        borderRadius: 100,
        height: 5
    }
});



export const Images = StyleSheet.create({
    MediumImage: {
        width: '95%',
        height: '80%',
        maxWidth: 500,
        // backgroundColor: 'blue',
        // aspectRatio: 1,
        borderRadius: 30
    },
    MinImage: {
        width: 100,
        height: 100,
        marginTop: '3%',
        // backgroundColor: 'blue',
        aspectRatio: 1,
        borderRadius: 100
    },
    iconImage:{
        width: 24,
        height: 24,
        resizeMode: 'contain'
    }
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
    fontRegular: {
        fontFamily: 'ProdRegular',
    },
    fontThin: {
        fontFamily: 'ProdThin',
    },
    fontBold: {
        fontFamily: 'ProdBold',
    },
    fontLight: {
        fontFamily: 'ProdLight',
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
        maxHeight: 300,
    },
    profile: {
        width: 'auto',
        height: 'auto',
        // backgroundColor: 'blue',
        marginStart: '2%',
        justifyContent: 'center',
        borderRadius: 100,
        padding: 2,
        borderColor: colors.whiteIce,
        borderWidth: 2,

    },
    pass: {
        marginStart: '2%',
        width: '20%',
        height: '100%',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        height: 55,
        marginBottom: 10,
        borderRadius: 15,
        paddingLeft: '5%',
        marginHorizontal: '4%',
    },
    input: {
        fontFamily: 'ProdRegular',
        // backgroundColor: 'blue',
        height: 55,
        width: '80%',
    },

    ScrollView: {
        width: '100%',
        flex: 1,

    },
    container: {
        flex: 1,
        width: '100%',
        position: 'relative',
        // backgroundColor: colors.whiteIce,

    },
    scrollContainer: {
        flexGrow: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonArea: {
        // backgroundColor: 'red',
        width: '100%',
        paddingBottom: '20%',
        alignItems: 'center',
    },

});
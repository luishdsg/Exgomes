import { Platform, StyleSheet } from 'react-native';
import { colors } from './Colors';

export const rootStyle = StyleSheet.create({

    centralize: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    alignCenter: {
        alignItems: 'center',
    },
    alignRight: {
        alignItems: 'flex-end',
    },
    alignBase: {
        alignItems: 'baseline'
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    justifyStart: {
        justifyContent: 'flex-start',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    z10: {
        zIndex: 10000,
    },
    z_1: {
        zIndex: -1,
    },
    container: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },

    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
    boxShadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 29,
            },
        }),
    },
    maxW50: {
        maxWidth: 65
    },
    maxW60: {
        maxWidth: 60
    },
    maxW100: {
        maxWidth: 100
    },
    br100: {
        borderRadius: 100,
    },
    br10: {
        borderRadius: 10,
    },
    br30: {
        borderRadius: 30,
    },
    brTop: {
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    borderTop: {
        borderTopWidth: 1
    },
    borderBottom: {
        borderBottomWidth: 1
    },
    borderHorizontal: {
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    p1: {
        padding: '3%',
    },
    p2: {
        padding: '5%',
    },
    p3: {
        padding: '7%',
    },
    p4: {
        padding: '10%',
    },
    p16: {
        padding: 16
    },
    p10: {
        padding: 10
    },
    pt1: {
        paddingTop: '3%',
    },
    pt2: {
        paddingTop: '5%',
    },
    pt3: {
        paddingTop: '7%',
    },
    pb1: {
        paddingBottom: '3%',
    },
    pb2: {
        paddingBottom: '5%',
    },
    pb3: {
        paddingBottom: '7%',
    },
    pb4: {
        paddingBottom: '10%',
    },

    px1: {
        paddingHorizontal: '3%',
    },
    px2: {
        paddingHorizontal: '5%',
    },
    px3: {
        paddingHorizontal: '7%',
    },
    px4: {
        paddingHorizontal: '10%',
    },

    py1: {
        paddingVertical: '3%',
    },
    py2: {
        paddingVertical: '5%',
    },
    py3: {
        paddingVertical: '7%',
    },
    py4: {
        paddingVertical: '10%',
    },
    pl1: {
        paddingLeft: '3%',
    },
    pl2: {
        paddingLeft: '5%',
    },
    pl3: {
        paddingLeft: '10%',
    },
    pl4: {
        paddingLeft: '14%',
    },
    pl5: {
        paddingLeft: '15%',
    },
    pr1: {
        paddingRight: '3%',
    },
    pr2: {
        paddingRight: '5%',
    },
    pr3: {
        paddingRight: '10%',
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
    my3: {
        marginVertical: '7%',
    },
    my4: {
        marginVertical: '10%',
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
    mr1: {
        marginRight: '3%'
    },
    mr2: {
        marginRight: '5%'
    },
    mr3: {
        marginRight: '7%'
    },
    mr4: {
        marginRight: '10%'
    },
    mb1: {
        marginBottom: '3%'
    },
    mb2: {
        marginBottom: '5%'
    },
    mb3: {
        marginBottom: '7%'
    },
    mb4: {
        marginBottom: '10%'
    },
    mb5: {
        marginBottom: '15%'
    },
    mb6: {
        marginBottom: '20%'
    },
    ml1: {
        marginLeft: '3%'
    },
    ml2: {
        marginLeft: '5%'
    },
    ml3: {
        marginLeft: '7%'
    },
    h20: {
        height: 20
    },
    h30: {
        height: 30
    },
    h40: {
        height: 40
    },
    h45: {
        height: 45
    },
    h50: {
        height: 50
    },
    h60: {
        height: 60
    },
    h70: {
        height: 70
    },
    h100: {
        height: 100
    },
    h200: {
        height: 200
    },
    Pabsolute: {
        position: 'absolute'
    },
    iconVerified: {
        width: 15,
        height: 15,
    },
    view: {
        //   backgroundColor: colors.patternColor,
        height: '100%',
        width: '100%',
    },
    w100hauto: {
        height: 'auto', width: '100%'
    },
    w100: {
        width: '100%',
    },
    w75: {
        width: '75%'
    },
    w85: {
        width: '85%'
    },
    maxH500: {
        maxHeight: 500
    },
    maxW500: {
        maxWidth: 500
    },
    overflowH: {
        overflow: 'hidden'
    },
    halfview: {
        // backgroundColor: colors.patternColor,
        justifyContent: 'flex-end',
        height: 490,
        width: '100%',
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
        backgroundColor: 'transparent',
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
    lineIOS: {
        width: 40,
        backgroundColor: colors.gray,
        borderRadius: 1000,
        height: 5
    },

});
export const rowstyle = StyleSheet.create({

    app: {
        flex: 1,
        marginHorizontal: "auto",
        height: 200,
        width: '100%',
    },
    row: {
        flexDirection: "row"
    },
    col: {
        flexDirection: "column",
        flex: 1,
    },
    "1col": {
        flex: 1
    },
    "2col": {
        flex: 2
    },
    "3col": {
        flex: 3
    },
    "4col": {
        flex: 4
    },
    "5col": {
        flex: 5
    },
    "6col": {
        flex: 6
    },
    "7col": {
        flex: 7
    },
    "8col": {
        flex: 8
    },
    "9col": {
        flex: 9
    },
    "10col": {
        flex: 10
    },
    "11col": {
        flex: 11
    },
    "12col": {
        flex: 12
    },
});

export const Images = StyleSheet.create({
    MaxImage: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        // right: 0,
        // bottom: 0
    },
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
        aspectRatio: 1,
        borderRadius: 100
    },
    iconImage: {
        width: 29,
        height: 29,
        resizeMode: 'contain'
    },
    profileIcon: {
        width: 29,
        height: 29,
        borderRadius: 200,
        borderWidth: 1,
        resizeMode: 'contain'
    },
    PostProfileIco: {
        width: 45,
        height: 45,
        borderRadius: 200,
        // borderWidth: 1,
        resizeMode: 'contain'
    }
});
export const text = StyleSheet.create({
    shadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
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
    centralizeText: {
        textAlign: 'center',
    },
    fz10: {
        fontSize: 10,
    },
    fz12: {
        fontSize: 12,
    },
    fz13: {
        fontSize: 13,
    },

    fz15: {
        fontSize: 15,
    },
    fz17: {
        fontSize: 17,
    },
    fz20: {
        fontSize: 20,
    },
    fz25: {
        fontSize: 25,
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
        position: 'absolute',
        right: 55,
        justifyContent: 'center',
        borderRadius: 100,
        padding: 2,
        borderColor: colors.whiteIce,
        borderWidth: 2,

    },
    pass: {
        marginStart: '2%',
        width: 'auto',
        // backgroundColor: 'blue',
        height: 'auto',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.white,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 15,
        paddingLeft: 15,
        marginHorizontal: 20,
    },
    input: {
        fontFamily: 'ProdBold',
        // backgroundColor: 'blue',
        width: '80%',
    },

    buttonArea: {
        // backgroundColor: 'red',
        width: '100%',
        paddingBottom: '20%',
        alignItems: 'center',
    },

});
export const profileStyle = StyleSheet.create({
    seasonView: {
        width: '100%',
        height: 180
    },
    pressableBtn: {
        borderRadius: 100,
        marginVertical: 10,
        marginLeft: 10,
        transition: '.7s',
    },
    settingspopup: {
        width: 155, height: 200, right: 0, borderRadius: 30
    },
    swipeableContent: {
        width: 200,
        height: 50,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        overflow: 'hidden',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export const popUpStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

    },
    body: {
        height: '100%',
        maxHeight: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 0,
        paddingTop: 16,
    }
});



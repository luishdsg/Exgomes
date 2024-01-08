import { StyleSheet } from 'react-native';
import { colors } from './Colors';
 
export const rootStyle = StyleSheet.create({
   
    centralize: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    alignCenter:{
        alignItems: 'center',
    },
    justifyCenter:{
        justifyContent: 'center',
    },
    justifyBetween:{
        justifyContent: 'space-between',
    },
   
    container: {
        flex: 1,
        width: '100%',
        position: 'relative',
        // backgroundColor: colors.whiteIce,
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
    pb1: {
        paddingBottom: '3%',
    },
    pb2: {
        paddingBottom: '5%',
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
    pl1:{
        paddingLeft: '3%',
    },
    pl2:{
        paddingLeft: '5%',
    },
    pl3:{
        paddingLeft: '10%',
    },
    pr1:{
        paddingRight: '3%',
    },
    pr2:{
        paddingRight: '5%',
    },
    pr3:{
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
    h20:{
        height: 20
    },
    h30:{
        height: 30
    },
    h50:{
        height: 50
    },
    h60:{
        height: 60
    },
    h70:{
        height: 70
    },
    h100:{
        height: 100
    },
    h200:{
        height: 200
    },
    view: {
        //   backgroundColor: colors.patternColor,
        height: '100%',
        width: '100%',
    },
    w100:{
        width: '100%',
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
        width: '39%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: colors.black,
        borderRadius: 100,
        height: 5
    },
    
});
export const Rowstyle = StyleSheet.create({

    app: {
        flex: 4,
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
    }
});
export const text = StyleSheet.create({
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
    fz15: {
        fontSize: 15,
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
        marginStart: '2%',
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
        paddingLeft: '5%',
        marginHorizontal: '4%',
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
    pressableBtn:{
        borderRadius: 100,
        paddingVertical: 10,
        marginVertical: 10,
        marginLeft: 10,
        transition: '.7s',
        paddingHorizontal: 10,
       
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
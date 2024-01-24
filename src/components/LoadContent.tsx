import { ProdBold } from "./StyledComponents";
import { AlternativeProps } from "../interface/AlternativeProps.interface";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from 'expo-linear-gradient';
import { View } from "react-native";
import { Images, rootStyle, rowstyle } from "../style";
import { useThemeController } from "../constants/Themed";
import { colors } from "../style/Colors";

const LoadProfilePost: React.FC<AlternativeProps> = ({ showLoad }) => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const { themeWB, themeGD, themeTDWI, themeTDD, themeOpacityWB, themeWITD, themeGLTD, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

    return (
        <View style={[rootStyle.view, rootStyle.px1, {}]}>
            <View style={[rowstyle.row, {}]}>
                <View style={[rowstyle["1col"], {}]}>
                    <ShimmerPlaceholder shimmerColors={[themeGLD, themeOpacityWB, themeGLD]} style={[Images.PostProfileIco, {}]} />
                </View>
                <View style={[rowstyle["5col"], {}]}>
                    <ShimmerPlaceholder shimmerColors={[themeGLD, themeOpacityWB, themeGLD]} style={[rootStyle.br10, rootStyle.view, { flex: 1 }]} />
                </View>
            </View>
            <View style={[rootStyle.view, rootStyle.py2, { height: 200 }]}>
                <ShimmerPlaceholder shimmerColors={[themeGLD, themeOpacityWB, themeGLD]} style={[rootStyle.br10, rootStyle.view, { flex: 1, color: 'red' }]} />
            </View>
            <View style={[rowstyle.row, {}]}>
                <View style={[rowstyle["1col"], {}]}>
                    <ShimmerPlaceholder shimmerColors={[themeGLD, themeOpacityWB, themeGLD]} style={[Images.PostProfileIco, {}]} />
                </View>
                <View style={[rowstyle["5col"], {}]}>
                    <ShimmerPlaceholder shimmerColors={[themeGLD, themeOpacityWB, themeGLD]} style={[rootStyle.br10, rootStyle.view, { flex: 1 }]} />
                </View>
            </View>
            <View style={[rootStyle.view, rootStyle.py2, { height: 200 }]}>
                <ShimmerPlaceholder shimmerColors={[themeGLD, themeOpacityWB, themeGLD]} style={[rootStyle.br10, rootStyle.view, { flex: 1, color: 'red' }]} />
            </View>
            <View style={[rowstyle.row, {}]}>
                <View style={[rowstyle["1col"], {}]}>
                    <ShimmerPlaceholder shimmerColors={[themeGLD, themeOpacityWB, themeGLD]} style={[Images.PostProfileIco, {}]} />
                </View>
                <View style={[rowstyle["5col"], {}]}>
                    <ShimmerPlaceholder shimmerColors={[themeGLD, themeOpacityWB, themeGLD]} style={[rootStyle.br10, rootStyle.view, { flex: 1 }]} />
                </View>
            </View>
            <View style={[rootStyle.view, rootStyle.py2, { height: 200 }]}>
                <ShimmerPlaceholder shimmerColors={[themeGLD, themeOpacityWB, themeGLD]} style={[rootStyle.br10, rootStyle.view, { flex: 1, color: 'red' }]} />
            </View>
        </View>


    );
}

export {
    LoadProfilePost
}
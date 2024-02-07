import { LinearGradient } from 'expo-linear-gradient';
import { View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { useThemeController } from "../style/Themed";
import { AlternativeProps } from "../interface/AlternativeProps.interface";
import { Images, rootStyle, rowstyle } from "../style";

const LoadProfilePost: React.FC<AlternativeProps> = ({ showLoad }) => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const { themeWIB, themeGD, themeTDWI, themeTDD, themeOpacityWB, themeWITD, themeGLTD, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

    return (
        <View style={[rootStyle.view, rootStyle.px1, {backgroundColor: themeWIB}]}>
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

const LoadBlocked: React.FC<AlternativeProps> = ({ showLoad }) => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const { themeWIB, themeGD, themeTDWI, themeTDD, themeOpacityWB, themeWITD, themeGLTD, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

    return (
        <View style={[rootStyle.view, rootStyle.px1, {backgroundColor: themeWIB}]}>
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
    LoadProfilePost,
    LoadBlocked
};

export const FONTS = {
    interBlack: "Inter-Black",
    interBold: "Inter-Bold",
    interExtraBold: "Inter-ExtraBold",
    interExtraLight: "Inter-ExtraLight",
    interLight: "Inter-Light",
    interMedium: "Inter-Medium",
    interRegular: "Inter-Regular",
    interSemiBold: "Inter-SemiBold",
    interThin: "Inter-Thin",
}

// koi bhi fontsize is function ko call karwaty huy dena ha
export const resposiveFontSize = (height = 500, width = 249, scale = 2.625, fontScale = 0.800000011920929, fontSize = 0) => {
    return responsiveSizes(height, width, scale, fontScale, fontSize) / fontScale;
}

let num = 0;
// koi bh size siway border radias k saary sizes pading margin sab kuch is me pass karna ha
export const responsiveSizes = (height = 500, width = 249, scale = 2.625, fontScale = 0.800000011920929, size = 0) => {
    const is1080pSupported = width * 2 >= 720 && height * 2 >= 1080;
    if (is1080pSupported) {
        return size
    } else {
        return scale * (size / (width < 300 ? 4 : width < 400 ? 3 : 2))
    }
}
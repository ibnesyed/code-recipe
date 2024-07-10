import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Platform, ToastAndroid, NativeModules } from 'react-native'
import { FONTS, ICONS, SVG_ICONS, responsiveSizes, resposiveFontSize } from '../../utils';
import PDFView from 'react-native-pdf';
import RNFS from 'react-native-fs';
// import RNFetchBlob from "rn-fetch-blob";
import { Loader } from '../../Components';
import Share from 'react-native-share';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { removePDFFromDB, setToast } from "../../store/actions";
import { base_url } from '../../config';
import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import ReactNativeBlobUtil from "react-native-blob-util";

const PDFViewComp = ({ navigation, route }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const { params } = route;
    const temporaryFilePath = params?.pdf?.filePath;
    const tempFileName = (params?.name || "") + moment().format("DDMMYYYYHHmmss")
    // console.log(tempFileName)
    const PDFUrl = params?.URL || "";
// console.log(PDFUrl)
    let completeURL = "";
    if (PDFUrl) {
        completeURL = `${base_url}/${PDFUrl}`
        // console.log("completeURL==============", completeURL)
    }
    useEffect(() => {
        if (PDFUrl) {
            dispatch(removePDFFromDB(PDFUrl))
        }
    }, [])
    // console.log("completeURL", completeURL)

    const downloadAssetHistoryReportPDF = async () => {
        // Need Setup
        setIsLoading(true)
        const source = completeURL
        console.log(source)
        let dirs = ReactNativeBlobUtil.fs.dirs;
        ReactNativeBlobUtil.config({
            fileCache: true,
            appendExt: 'pdf',
            path: `${dirs.DocumentDir}/${tempFileName}.pdf`,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: tempFileName,
                description: 'File downloaded by download manager.',
                mime: 'application/pdf',
            },
        })
            .fetch('GET', source)
            .then((res) => {
                // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
                // whereas in android, the download manager is handling the download for us.
                if (Platform.OS === 'ios') {
                    const filePath = res.path();
                    let options = {
                        type: 'application/pdf',
                        url: filePath,
                        saveToFiles: true,
                    };
                    Share.open(options)
                        .then((resp) => console.log(resp))
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log('BLOB ERROR -> ', err));

    }
    const downloadPDF = async () => {
        setIsLoading(true)
        try {
            // const dirs = RNFS.DownloadDirectoryPath; // Use RNFS.DownloadDirectoryPath for Android or RNFS.DocumentDirectoryPath for iOS
            const dirs = Platform.OS === "ios" ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath; // Use RNFS.DownloadDirectoryPath for Android or RNFS.DocumentDirectoryPath for iOS
            const destinationPath = `${dirs}/${tempFileName}.pdf`;

            // Copy the file from the temporary path to the destination path
            await RNFS.copyFile(temporaryFilePath, destinationPath);
            if (Platform.OS !== "ios") {
                dispatch(setToast("success", "PDF downloaded successfully"))
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
            console.error('Error downloading PDF:', error);
        }
    };
    const sharePDF = async () => {
        // Show a native notification (cross-platform)
        const notificationOptions = {
            // title: 'Share',
            // message: 'PDF downloaded successfully',

            url: `file://${temporaryFilePath}`,
            type: 'application/pdf',
        };
        Share.open(notificationOptions)
            .then((res) => {
                console.log(res)
            })
            .catch((e) => {
                console.log("error", e)
            })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: responsiveSizes(height, width, scale, fontScale, 70) }}>
            {isLoading && <Loader />}
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: responsiveSizes(height, width, scale, fontScale, 60), backgroundColor: "#E5E5E5", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 10), paddingRight: responsiveSizes(height, width, scale, fontScale, 15), elevation: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingBottom: responsiveSizes(height, width, scale, fontScale, 10) }}>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <SVG_ICONS.Back />
                    </TouchableOpacity>
                    <Text style={{ color: "#383838", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interBold }}>{"Report"}</Text>
                </View>
            </View>
            <PDFView
                style={{ flex: 1 }}
                trustAllCerts={false}
                source={{ uri: !!PDFUrl ? completeURL : `file://${temporaryFilePath}` }}
                onError={(error) => console.log('PDFView error:', error)}
            />
            {/* <TouchableOpacity onPress={() => !!PDFUrl ? downloadAssetHistoryReportPDF() : downloadPDF()} activeOpacity={0.7} style={{ position: "absolute", bottom: responsiveSizes(height, width, scale, fontScale,!!PDFUrl ? 30 : 90), right: responsiveSizes(height, width, scale, fontScale,20) }}>
                <ICONS.MaterialCommunityIcons name="file-download" color={"green"} size={responsiveSizes(height, width, scale, fontScale,60)} />
            </TouchableOpacity>
            {!PDFUrl && <TouchableOpacity onPress={() => sharePDF()} activeOpacity={0.7} style={{ position: "absolute", bottom: responsiveSizes(height, width, scale, fontScale,30), right: responsiveSizes(height, width, scale, fontScale,20) }}>
                <ICONS.FontAwesome name="share-square-o" color={"green"} size={responsiveSizes(height, width, scale, fontScale,50)} />
            </TouchableOpacity>} */}
        </SafeAreaView>
    )
}
export default React.memo(PDFViewComp);

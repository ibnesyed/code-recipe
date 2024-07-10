import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity, TextInput, Platform, Modal, Button, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { TestChart, DateTimeModal, assetHistoryReportPDF, Loader, tripReportPDF, summeryReportPDF, fuelReportPDF, commandsReportPDF, kilometerReportPDF, overSpeedReportPDF, idleParkedReportPDF } from "../../Components";
import { FONTS, COLORS, IMAGES, ICONS, ICON_IMAGES, SVG_ICONS, resposiveFontSize, responsiveSizes } from "../../utils";
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from "../../navigations/bottomNavBar";
import { setToast, getAssetAccumulativeTripsFuelReport, getAssetCommandsReport, getAssetKilometerReport, getAssetOverSpeedReport, getHistoryReport, getIdleParkedReport, getSummaryReport, getTripReport, removePDFFromDB, getReportRole } from "../../store/actions";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import DatePicker from 'react-native-date-picker';
import moment, { duration } from "moment";
import { base_url } from "../../config";
// import RNFetchBlob from "rn-fetch-blob";
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from "react-native-blob-util";
// getReportRole

const Reports = ({ navigation }) => {
    const { fontScale, height, scale, width } = useWindowDimensions();
    const styles = StyleSheet.create({
        linearGradient: {
            height: responsiveSizes(height, width, scale, fontScale, 80),
            width: "100%",
            elevation: 5,
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.01),
            borderBottomColor: "#C9C9C9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: responsiveSizes(height, width, scale, fontScale, 25)
        },
        linearGradient: {
            height: responsiveSizes(height, width, scale, fontScale, 80),
            width: "100%",
            elevation: 5,
            borderBottomWidth: responsiveSizes(height, width, scale, fontScale, 0.01),
            borderBottomColor: "#C9C9C9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: responsiveSizes(height, width, scale, fontScale, 25)
        },
        overlay: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContainer: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            width: responsiveSizes(height, width, scale, fontScale, 240),
            backgroundColor: 'white',
            borderRadius: 10,
            padding: responsiveSizes(height, width, scale, fontScale, 16),
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5, // for Android
        },
        modalTitle: {
            fontSize: resposiveFontSize(height, width, scale, fontScale, 18),
            fontWeight: 'bold',
            marginBottom: responsiveSizes(height, width, scale, fontScale, 10),
            color: "black"
        },
        modalText: {
            color: "black",
            fontSize: resposiveFontSize(height, width, scale, fontScale, 16)
        },
        option: {
            padding: 10,
        },
    });
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReportRole())
    }, [])
    const { reportRole, isLoading: loader } = useSelector(({ reportsData }) => reportsData)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isFinalModalVisible, setIsFinalModalVisible] = useState(false)
    const [reportModal, setReportModal] = useState("")
    const [historyReportDateTime, setHistoryReportDateTime] = useState({ toDate: "", fromDate: "" })
    const [tripReportDateTime, settripReportDateTime] = useState({ toDate: "", fromDate: "" })
    const [summaryReportDateTime, setSummaryReportDateTime] = useState({ toDate: "", fromDate: "" })
    const [fuelReportDateTime, setFuelReportDateTime] = useState({ toDate: "", fromDate: "", unitPrice: "" })
    const [idleParkedReportDateTime, setIdleParkedReportDateTime] = useState({ toDate: "", fromDate: "", duration: "" })
    const [kmReportDateTime, setKmReportDateTime] = useState({ toDate: "", fromDate: "" })
    const [commandReportDateTime, setCommandReportDateTime] = useState({ toDate: "", fromDate: "" })
    const [overSpeedReportDateTime, setOverSpeedReportDateTime] = useState({ toDate: "", fromDate: "", speedLimit: "" })
    const { VehicleId, VRN } = useSelector(({ liveData }) => liveData.vehicle_data)
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const company = useSelector(({ auth }) => auth.company)

    const generateAndSharePDF = async (fileName, pdf, isDownloadFile) => {
        try {
            const options = {
                html: pdf,
                fileName: fileName,
                directory: 'Documents',
                height: 841.890,
                width: 595.276
            };
            const file = await RNHTMLtoPDF.convert(options);
            if (!isDownloadFile) {
                setIsLoading(false)
                navigation.navigate("PDFViewComp", { pdf: file, name: fileName })
            } else {
                const tempFileName = fileName + moment().format("DDMMYYYYHHmmss")
                const temporaryFilePath = file.filePath;

                const dirs = Platform.OS === "ios" ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath; // Use RNFS.DownloadDirectoryPath for Android or RNFS.DocumentDirectoryPath for iOS
                const destinationPath = `${dirs}/${tempFileName}.pdf`;

                // Copy the file from the temporary path to the destination path
                await RNFS.copyFile(temporaryFilePath, destinationPath);
                if (Platform.OS !== "ios") {
                    dispatch(setToast("success", "PDF downloaded successfully"))
                }

                const notificationOptions = {
                    // title: 'Share',
                    // message: 'PDF downloaded successfully',

                    url: `file://${temporaryFilePath}`,
                    type: 'application/pdf',
                };
                setTimeout(() => {
                    setIsLoading(false);

                    Share.open(notificationOptions)
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((e) => {
                            console.log("error", e)
                        })
                }, 1000)
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Error generating PDF:', error);
        }
    };
    const downloadPDFFromURLFunc = async (name, url) => {
        // NeedSetup
        const tempFileName = name + moment().format("DDMMYYYYHHmmss")
        const source = `${base_url}/${url}`
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
        // const tempFileName = name + moment().format("DDMMYYYYHHmmss")
        // const completeURL = `${base_url}/${url}`
        // const { config, fs } = RNFetchBlob;
        // const downloads = fs.dirs?.DownloadDir;
        // return config({
        //     fileCache: true,
        //     addAndroidDownloads: {
        //         useDownloadManager: true,
        //         notification: true,
        //         path: downloads + "/" + `${tempFileName}.pdf`
        //     }
        // })
        //     .fetch("GET", completeURL)
        //     .then((res) => {
        //         setIsLoading(false);
        //         // if (Platform.OS === 'ios') {
        //         // console.log(res)
        //         const filePath = res.path();
        //         // console.log(filePath)
        //         // `file://${temporaryFilePath}`,
        //         let options = {
        //             type: 'application/pdf',
        //             url: `file://${filePath}`,
        //             saveToFiles: true,
        //         };
        //         dispatch(removePDFFromDB(url))

        //         Share.open(options)
        //             .then((resp) => console.log(resp))
        //             .catch((err) => console.log(err));
        //         //   }
        //         // console.log(res)
        //     })
        //     .catch((e) => {
        //         setIsLoading(false);
        //         // console.log("error", e)
        //     })

    }
    const getReportsDataFromAPI = async (param, toDate, isDownloadFile) => {
        try {
            let obj = {
                dateTimeTo: moment(toDate).format("YYYY-MM-DD HH:mm:ss"), // "2023-06-13 16:40:50",
                VehicleId: VehicleId,
                currentTime: moment().format("(dddd) DD/MM/YYYY hh:mm:ssA"),
                speedLimit: overSpeedReportDateTime.speedLimit,
                duration: idleParkedReportDateTime.duration,
                unitPrice: fuelReportDateTime.unitPrice
            }
            // return
            if (param === "history") {
                obj.dateTimeFrom = moment(historyReportDateTime.fromDate).format("YYYY-MM-DD HH:mm:ss")
                setIsLoading(true)
                dispatch(getHistoryReport(obj, async (flag, URL) => {
                    if (flag) {
                        // console.log("URL======================", URL)
                        // let getHTMLwithData = await assetHistoryReportPDF(data, obj, company);
                        // console.log(URL)
                        // setIsLoading(false)
                        // downloadPDFANDView("assetHistoryReportPDF", URL)
                        setIsLoading(false)
                        if (isDownloadFile) {
                            downloadPDFFromURLFunc("assetHistoryReportPDF", URL)
                        } else {
                            setIsLoading(false)
                            navigation.navigate("PDFViewComp", { pdf: "<></>", name: "assetHistoryReportPDF", URL: URL })
                        }
                        // generateAndSharePDF("assetHistoryReportPDF", getHTMLwithData)
                    } else {
                        setIsLoading(false)
                    }
                }))
            } else if (param === "trip") {
                obj.dateTimeFrom = moment(tripReportDateTime.fromDate).format("YYYY-MM-DD HH:mm:ss")
                setIsLoading(true)
                dispatch(getTripReport(obj, async (flag, data) => {
                    if (flag) {
                        // console.log(data)
                        let getHTMLwithData = await tripReportPDF(data, obj, company);
                        generateAndSharePDF("assetTripReportPDF", getHTMLwithData, isDownloadFile)
                    } else {
                        setIsLoading(false)
                    }
                }))
            } else if (param === "summary") {
                obj.dateTimeFrom = moment(summaryReportDateTime.fromDate).format("YYYY-MM-DD HH:mm:ss")
                setIsLoading(true)
                dispatch(getSummaryReport(obj, async (flag, data) => {
                    if (flag) {
                        let getHTMLwithData = await summeryReportPDF(data, obj, company);
                        generateAndSharePDF("summeryReportPDF", getHTMLwithData, isDownloadFile)
                    } else {
                        setIsLoading(false)
                    }
                }))
            } else if (param === "command") {
                obj.dateTimeFrom = moment(commandReportDateTime.fromDate).format("YYYY-MM-DD HH:mm:ss")
                setIsLoading(true)
                dispatch(getAssetCommandsReport(obj, async (flag, data) => {
                    if (flag) {
                        let getHTMLwithData = await commandsReportPDF(data, obj, company);
                        generateAndSharePDF("commandsReportPDF", getHTMLwithData, isDownloadFile)
                    } else {
                        setIsLoading(false)
                    }
                }))
            } else if (param === "km") {
                obj.dateTimeFrom = moment(kmReportDateTime.fromDate).format("YYYY-MM-DD HH:mm:ss")
                setIsLoading(true)
                dispatch(getAssetKilometerReport(obj, async (flag, data) => {
                    if (flag) {
                        let getHTMLwithData = await kilometerReportPDF(data, obj, company);
                        generateAndSharePDF("kilometerReportPDF", getHTMLwithData, isDownloadFile)
                    } else {
                        setIsLoading(false)
                    }
                }))
            } else if (param === "fuel") {
                obj.dateTimeFrom = moment(fuelReportDateTime.fromDate).format("YYYY-MM-DD HH:mm:ss")
                setIsLoading(true)
                dispatch(getAssetAccumulativeTripsFuelReport(obj, async (flag, data) => {
                    if (flag) {
                        let getHTMLwithData = await fuelReportPDF(data, obj, company);
                        generateAndSharePDF("fuelReportPDF", getHTMLwithData, isDownloadFile)
                    } else {
                        setIsLoading(false)
                    }
                }))
            } else if (param === "idleParked") {
                obj.dateTimeFrom = moment(idleParkedReportDateTime.fromDate).format("YYYY-MM-DD HH:mm:ss")
                setIsLoading(true)
                dispatch(getIdleParkedReport(obj, async (flag, data) => {
                    if (flag) {
                        let getHTMLwithData = await idleParkedReportPDF(data, obj, company);
                        generateAndSharePDF("idleParkedReportPDF", getHTMLwithData, isDownloadFile)
                    } else {
                        setIsLoading(false)
                    }
                }))
            } else if (param === "overSpeed") {
                obj.dateTimeFrom = moment(overSpeedReportDateTime.fromDate).format("YYYY-MM-DD HH:mm:ss")
                setIsLoading(true)
                dispatch(getAssetOverSpeedReport(obj, async (flag, data) => {
                    if (flag) {
                        let getHTMLwithData = await overSpeedReportPDF(data, obj, company);
                        generateAndSharePDF("overSpeedReportPDF", getHTMLwithData, isDownloadFile)
                    } else {
                        setIsLoading(false)
                    }
                }))
            }
        } catch (error) {
            setIsLoading(false)

        }
    }
    const finalConfirmationModalUi = (name, date) => {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={!!isFinalModalVisible}
            onRequestClose={() => setIsFinalModalVisible(false)}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: responsiveSizes(height, width, scale, fontScale, 10),
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: responsiveSizes(height, width, scale, fontScale, 20),
                        borderRadius: responsiveSizes(height, width, scale, fontScale, 10),
                    }}
                >
                    <Text style={{ marginBottom: responsiveSizes(height, width, scale, fontScale, 10), color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), textAlign: "center" }}>
                        View or Download
                    </Text>
                    {/* <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            padding: responsiveSizes(height, width, scale, fontScale,10),
                            marginBottom: responsiveSizes(height, width, scale, fontScale,10),
                            textAlign: "center",
                            fontSize: resposiveFontSize(height, width, scale, fontScale,18),
                            borderRadius: responsiveSizes(height, width, scale, fontScale,20),
                            color: "black"
                        }}
                        placeholderTextColor={"grey"}
                        placeholder="0"
                        keyboardType="numeric"
                        value={(isFinalModalVisible === "fuelReportFrom" && fuelReportDateTime.unitPrice) || (isFinalModalVisible === "overSpeedFrom" && overSpeedReportDateTime.speedLimit) || (isFinalModalVisible === "idleParkedFrom" && idleParkedReportDateTime.duration) || ""}
                        onChangeText={(text) => {
                            // setFuelPrice(text)
                            if (isFinalModalVisible === "fuelReportFrom") {
                                setFuelReportDateTime({ ...fuelReportDateTime, unitPrice: text })
                            } else if (isFinalModalVisible === "overSpeedFrom") {
                                setOverSpeedReportDateTime({ ...overSpeedReportDateTime, speedLimit: text })
                            } else if (isFinalModalVisible === "idleParkedFrom") {
                                setIdleParkedReportDateTime({ ...idleParkedReportDateTime, duration: text })
                            }
                        }}
                    /> */}
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View></View>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <View style={{ width: 100, marginHorizontal: 5 }}>
                                <Button title="Cancel" onPress={() => setIsFinalModalVisible(false)} />
                            </View>
                            <View style={{ width: 100, marginHorizontal: 5 }}>
                                <Button title="View" onPress={() => {
                                    if (isFinalModalVisible && isFinalModalVisible.name && isFinalModalVisible.date) {
                                        getReportsDataFromAPI(isFinalModalVisible.name, isFinalModalVisible.date, false)
                                        setIsFinalModalVisible(false);
                                    }
                                }} />
                            </View>
                            <View style={{ width: 100, marginHorizontal: 5 }}>
                                <Button title="Download" onPress={() => {
                                    if (isFinalModalVisible && isFinalModalVisible.name && isFinalModalVisible.date) {
                                        getReportsDataFromAPI(isFinalModalVisible.name, isFinalModalVisible.date, true)
                                        setIsFinalModalVisible(false);
                                    }
                                }} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    }

    const modalUi = () => {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={!!isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: responsiveSizes(height, width, scale, fontScale, 10),
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: responsiveSizes(height, width, scale, fontScale, 20),
                        borderRadius: responsiveSizes(height, width, scale, fontScale, 10),
                    }}
                >
                    <Text style={{ marginBottom: responsiveSizes(height, width, scale, fontScale, 10), color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), textAlign: "center" }}>
                        {(isModalVisible === "fuelReportFrom" && "Enter Fuel Price") || (isModalVisible === "overSpeedFrom" && "Enter Speed Limit") || (isModalVisible === "idleParkedFrom" && "Enter Idle/Parked Duration")}
                    </Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            padding: responsiveSizes(height, width, scale, fontScale, 10),
                            marginBottom: responsiveSizes(height, width, scale, fontScale, 10),
                            textAlign: "center",
                            fontSize: resposiveFontSize(height, width, scale, fontScale, 18),
                            borderRadius: responsiveSizes(height, width, scale, fontScale, 20),
                            color: "black"
                        }}
                        placeholderTextColor={"grey"}
                        placeholder="0"
                        keyboardType="numeric"
                        value={(isModalVisible === "fuelReportFrom" && fuelReportDateTime.unitPrice) || (isModalVisible === "overSpeedFrom" && overSpeedReportDateTime.speedLimit) || (isModalVisible === "idleParkedFrom" && idleParkedReportDateTime.duration) || ""}
                        onChangeText={(text) => {
                            // setFuelPrice(text)
                            if (isModalVisible === "fuelReportFrom") {
                                setFuelReportDateTime({ ...fuelReportDateTime, unitPrice: text })
                            } else if (isModalVisible === "overSpeedFrom") {
                                setOverSpeedReportDateTime({ ...overSpeedReportDateTime, speedLimit: text })
                            } else if (isModalVisible === "idleParkedFrom") {
                                setIdleParkedReportDateTime({ ...idleParkedReportDateTime, duration: text })
                            }
                        }}
                    />
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View></View>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <View style={{ width: 100, marginHorizontal: 5 }}>
                                <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
                            </View>
                            <View style={{ width: 100, marginHorizontal: 5 }}>
                                <Button title="OK" onPress={() => {
                                    if (isModalVisible === "fuelReportFrom" && fuelReportDateTime.unitPrice) {
                                        setDateModalVisible(isModalVisible)
                                    } else if (isModalVisible === "overSpeedFrom" && overSpeedReportDateTime.speedLimit) {
                                        setDateModalVisible(isModalVisible)
                                    } else if (isModalVisible === "idleParkedFrom" && idleParkedReportDateTime.duration) {
                                        setDateModalVisible(isModalVisible)
                                    }
                                    setIsModalVisible(false);
                                }} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    }
    const handleDateSelection = (param) => {
        let tempDateTimeFrom = null;
        let tempDateTimeTo = null;
        if (param === "today") {
            tempDateTimeFrom = new Date(moment().startOf('day'));
            tempDateTimeTo = new Date();
        } else if (param === "yesterday") {
            tempDateTimeFrom = new Date(moment().subtract(1, 'days').startOf('day'));
            tempDateTimeTo = new Date(moment().subtract(1, 'days').endOf('day'));

        } else if (param === "week") {
            tempDateTimeFrom = new Date(moment().subtract(1, 'weeks'));
            tempDateTimeTo = new Date();
        }
        if (dateModalVisible === "historyReportFrom") {
            setHistoryReportDateTime({ ...historyReportDateTime, fromDate: tempDateTimeFrom, toDate: tempDateTimeTo })
            setDateModalVisible(false)
            setIsFinalModalVisible({ name: "history", date: tempDateTimeTo })
        } else if (dateModalVisible === "tripReportFrom") {
            settripReportDateTime({ ...tripReportDateTime, fromDate: tempDateTimeFrom, toDate: tempDateTimeTo })
            setDateModalVisible(false)
            setIsFinalModalVisible({ name: "trip", date: tempDateTimeTo })
        } else if (dateModalVisible === "summaryReportFrom") {
            setSummaryReportDateTime({ ...summaryReportDateTime, fromDate: tempDateTimeFrom, toDate: tempDateTimeTo })
            setDateModalVisible(false)
            setIsFinalModalVisible({ name: "summary", date: tempDateTimeTo })
        } else if (dateModalVisible === "commandReportFrom") {
            setCommandReportDateTime({ ...commandReportDateTime, fromDate: tempDateTimeFrom, toDate: tempDateTimeTo })
            setDateModalVisible(false)
            setIsFinalModalVisible({ name: "command", date: tempDateTimeTo })
        } else if (dateModalVisible === "kmReportFrom") {
            setKmReportDateTime({ ...kmReportDateTime, fromDate: tempDateTimeFrom, toDate: tempDateTimeTo })
            setDateModalVisible(false)
            setIsFinalModalVisible({ name: "km", date: tempDateTimeTo })
        } else if (dateModalVisible === "fuelReportFrom") {
            setFuelReportDateTime({ ...fuelReportDateTime, fromDate: tempDateTimeFrom, toDate: tempDateTimeTo })
            setDateModalVisible(false)
            setIsFinalModalVisible({ name: "fuel", date: tempDateTimeTo })
        } else if (dateModalVisible === "idleParkedFrom") {
            setIdleParkedReportDateTime({ ...idleParkedReportDateTime, fromDate: tempDateTimeFrom, toDate: tempDateTimeTo })
            setDateModalVisible(false)
            setIsFinalModalVisible({ name: "idleParked", date: tempDateTimeTo })
        } else if (dateModalVisible === "overSpeedFrom") {
            setOverSpeedReportDateTime({ ...overSpeedReportDateTime, fromDate: tempDateTimeFrom, toDate: tempDateTimeTo })
            setDateModalVisible(false)
            setIsFinalModalVisible({ name: "overSpeed", date: tempDateTimeTo })
        }
    }
    const dateModal = () => {
        return <Modal
            transparent={true}
            animationType="slide"
            visible={!!dateModalVisible}
            onRequestClose={() => setDateModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setDateModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Date</Text>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleDateSelection('today')}
                        >
                            <Text style={styles.modalText}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleDateSelection('yesterday')}
                        >
                            <Text style={styles.modalText}>Yesterday</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleDateSelection('week')}
                        >
                            <Text style={styles.modalText}>This Week</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                setReportModal(dateModalVisible)
                                setDateModalVisible(false)
                            }}
                        >
                            <Text style={styles.modalText}>Custom Date</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    }
    const setReportsButtons = () => {
        // mod_id: ""10504"" Hisotry Report
        // mod_id: ""10509"" Asset Trip Report
        // mod_id: ""10510"" KM
        // mod_id: ""10511"" Summery
        // mod_id: ""10517"" logs
        // mod_id: ""10518"" Accumulative Fuel
        // mod_id: ""10528"" Overspeed
        // mod_id: ""10529"" Idle/parked"
        // console.log(reportRole)
        let btns = [];
        for (let key in reportRole) {
            if (reportRole[key].mod_id === "10504") {
                btns.push(<TouchableOpacity key={reportRole[key].mod_id} activeOpacity={0.7} onPress={() => setDateModalVisible("historyReportFrom")} style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 15), height: responsiveSizes(height, width, scale, fontScale, 120), width: "30%", elevation: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }}>
                        <SVG_ICONS.TrackGreen />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale, 10) }}>Travel</Text>
                </TouchableOpacity>)
            }
            if (reportRole[key].mod_id === "10509") {
                btns.push(<TouchableOpacity key={reportRole[key].mod_id} activeOpacity={0.7} onPress={() => setDateModalVisible("tripReportFrom")} style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 15), height: responsiveSizes(height, width, scale, fontScale, 120), width: "30%", elevation: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }}>
                        <SVG_ICONS.CarRental />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale, 10) }}>Trip</Text>
                </TouchableOpacity>)
            }
            if (reportRole[key].mod_id === "10510") {
                btns.push(<TouchableOpacity key={reportRole[key].mod_id} activeOpacity={0.7} onPress={() => setDateModalVisible("kmReportFrom")} style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 15), height: responsiveSizes(height, width, scale, fontScale, 120), width: "30%", elevation: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }}>
                        <SVG_ICONS.Distance />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale, 10) }}>KM</Text>
                </TouchableOpacity>)
            }
            if (reportRole[key].mod_id === "10511") {
                btns.push(<TouchableOpacity key={reportRole[key].mod_id} activeOpacity={0.7} onPress={() => setDateModalVisible("summaryReportFrom")} style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 15), height: responsiveSizes(height, width, scale, fontScale, 120), width: "30%", elevation: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }}>
                        <SVG_ICONS.Summary />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale, 10) }}>Summary</Text>
                </TouchableOpacity>)
            }
            if (reportRole[key].mod_id === "10517") {
                btns.push(<TouchableOpacity key={reportRole[key].mod_id} activeOpacity={0.7} onPress={() => setDateModalVisible("commandReportFrom")} style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 15), height: responsiveSizes(height, width, scale, fontScale, 120), width: "30%", elevation: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }}>
                        <SVG_ICONS.AdjustLight />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale, 10) }}>CMDLogs</Text>
                </TouchableOpacity>)
            }
            if (reportRole[key].mod_id === "10518") {
                btns.push(<TouchableOpacity key={reportRole[key].mod_id} activeOpacity={0.7} onPress={() => setIsModalVisible("fuelReportFrom")} style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 15), height: responsiveSizes(height, width, scale, fontScale, 120), width: "30%", elevation: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 65), width: responsiveSizes(height, width, scale, fontScale, 65), marginBottom: responsiveSizes(height, width, scale, fontScale, -5), marginTop: responsiveSizes(height, width, scale, fontScale, -5) }}>
                        <SVG_ICONS.FeulPumpOrange />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale, 10) }}>Fuel</Text>
                </TouchableOpacity>)
            }
            if (reportRole[key].mod_id === "10528") {
                btns.push(<TouchableOpacity key={reportRole[key].mod_id} activeOpacity={0.7} onPress={() => setIsModalVisible("overSpeedFrom")} style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 15), height: responsiveSizes(height, width, scale, fontScale, 120), width: "30%", elevation: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 80), marginBottom: -20, marginTop: -10, width: responsiveSizes(height, width, scale, fontScale, 80), marginBottom: -20, marginTop: -10 }}>
                        <SVG_ICONS.BackWarningCar />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale, 10) }}>Overspeed</Text>
                </TouchableOpacity>)
            }
            if (reportRole[key].mod_id === "10529") {
                btns.push(<TouchableOpacity key={reportRole[key].mod_id} activeOpacity={0.7} onPress={() => setIsModalVisible("idleParkedFrom")} style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 15), height: responsiveSizes(height, width, scale, fontScale, 120), width: "30%", elevation: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale, 50), width: responsiveSizes(height, width, scale, fontScale, 50) }}>
                        <SVG_ICONS.CarBadge />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale, 13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale, 10) }}>Idle/Stop</Text>
                </TouchableOpacity>)
            }
        }
        if (btns.length) {
            return btns
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: responsiveSizes(height, width, scale, fontScale, 70) }}>
            {(isLoading || loader) && <Loader />}
            {modalUi()}
            {finalConfirmationModalUi()}
            {dateModal()}
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: responsiveSizes(height, width, scale, fontScale, 60), backgroundColor: "#E5E5E5", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: responsiveSizes(height, width, scale, fontScale, 10), paddingRight: responsiveSizes(height, width, scale, fontScale, 15), elevation: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingBottom: responsiveSizes(height, width, scale, fontScale, 10) }}>
                    <TouchableOpacity style={{ height: responsiveSizes(height, width, scale, fontScale, 40), width: responsiveSizes(height, width, scale, fontScale, 40) }} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <SVG_ICONS.Back />
                    </TouchableOpacity>
                    <Text style={{ color: "#383838", fontSize: resposiveFontSize(height, width, scale, fontScale, 18), fontFamily: FONTS.interBold }}>Reports</Text>
                </View>
                <Text style={{ color: "#242424", fontSize: resposiveFontSize(height, width, scale, fontScale, 16), fontFamily: FONTS.interRegular, marginBottom: responsiveSizes(height, width, scale, fontScale, 10) }}>{VRN || "--"}</Text>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {setReportsButtons()}
                {/* <TouchableOpacity activeOpacity={0.7} onPress={() => setReportModal("tripReportFrom")} style={{ margin: responsiveSizes(height, width, scale, fontScale,5), padding: responsiveSizes(height, width, scale, fontScale,15), height: responsiveSizes(height, width, scale, fontScale,120), width: "30%", elevation: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                    <View style={{ height: responsiveSizes(height, width, scale, fontScale,50), width: responsiveSizes(height, width, scale, fontScale,50) }}>
                        <SVG_ICONS.Driver />
                    </View>
                    <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale,10) }}>Driver</Text>
                </TouchableOpacity> */}
                <View style={{ margin: responsiveSizes(height, width, scale, fontScale, 5), padding: responsiveSizes(height, width, scale, fontScale, 15), height: responsiveSizes(height, width, scale, fontScale, 120), width: "30%", justifyContent: "space-between", alignItems: "center" }}>
                    {/* <View style={{ height: responsiveSizes(height, width, scale, fontScale,50), width: responsiveSizes(height, width, scale, fontScale,50) }}>
                        <SVG_ICONS.Driver />
                    </View> */}
                    {/* <Text style={{ color: "black", fontSize: resposiveFontSize(height, width, scale, fontScale,13), fontFamily: FONTS.interRegular, marginTop: responsiveSizes(height, width, scale, fontScale,10) }}>Driver</Text> */}
                </View>
            </View>

            {/* Hisotry Report Date time from */}
            <DatePicker
                title="Select From Date & Time"
                modal
                mode="datetime"
                maximumDate={moment().subtract(0.5, 'hour').toDate()}
                open={reportModal === "historyReportFrom"}
                date={historyReportDateTime.fromDate || moment().subtract(0.5, 'hour').toDate()}
                onConfirm={(date) => {
                    setHistoryReportDateTime({ ...historyReportDateTime, fromDate: date })
                    setReportModal("historyReportTo")
                }}
                onCancel={() => {
                    setReportModal("")
                    setHistoryReportDateTime({ fromDate: "", toDate: "" })
                }}
            />
            {/* Hisotry Report Date time to */}
            <DatePicker
                title="Select To Date & Time"
                modal
                mode="datetime"
                minimumDate={!!historyReportDateTime.fromDate ? moment(historyReportDateTime.fromDate).add(5, 'minutes').toDate() : null}
                maximumDate={(!!historyReportDateTime.fromDate && moment(historyReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(historyReportDateTime.fromDate).add(7, 'days').toDate() : new Date()}
                open={reportModal === "historyReportTo"}
                date={historyReportDateTime.toDate || ((!!historyReportDateTime.fromDate && moment(historyReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(historyReportDateTime.fromDate).add(7, 'days').toDate() : new Date())}
                onConfirm={(date) => {
                    setIsFinalModalVisible({ name: "history", date })
                }}
                onCancel={() => {
                    setReportModal("")
                    setHistoryReportDateTime({ fromDate: "", toDate: "" })
                }}
            />

            {/* Trip Report Date time from */}
            <DatePicker
                title="Select From Date & Time"
                modal
                mode="datetime"
                maximumDate={moment().subtract(0.5, 'hour').toDate()}
                open={reportModal === "tripReportFrom"}
                date={tripReportDateTime.fromDate || moment().subtract(0.5, 'hour').toDate()}
                onConfirm={(date) => {
                    settripReportDateTime({ ...tripReportDateTime, fromDate: date })
                    setReportModal("tripReportTo")
                }}
                onCancel={() => {
                    setReportModal("")
                    settripReportDateTime({ fromDate: "", toDate: "" })
                }}
            />
            {/* Trip Report Date time to */}
            <DatePicker
                title="Select To Date & Time"
                modal
                mode="datetime"
                minimumDate={!!tripReportDateTime.fromDate ? moment(tripReportDateTime.fromDate).add(5, 'minutes').toDate() : null}
                maximumDate={(!!tripReportDateTime.fromDate && moment(tripReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(tripReportDateTime.fromDate).add(7, 'days').toDate() : new Date()}
                open={reportModal === "tripReportTo"}
                date={tripReportDateTime.toDate || ((!!tripReportDateTime.fromDate && moment(tripReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(tripReportDateTime.fromDate).add(7, 'days').toDate() : new Date())}
                onConfirm={(date) => {
                    setIsFinalModalVisible({ name: "trip", date })
                }}
                onCancel={() => {
                    setReportModal("")
                    settripReportDateTime({ fromDate: "", toDate: "" })
                }}
            />


            {/* Summery Report Date time from */}
            <DatePicker
                title="Select From Date & Time"
                modal
                mode="datetime"
                maximumDate={moment().subtract(0.5, 'hour').toDate()}
                open={reportModal === "summaryReportFrom"}
                date={summaryReportDateTime.fromDate || moment().subtract(0.5, 'hour').toDate()}
                onConfirm={(date) => {
                    setSummaryReportDateTime({ ...summaryReportDateTime, fromDate: date })
                    setReportModal("summaryReportTo")
                }}
                onCancel={() => {
                    setReportModal("")
                    setSummaryReportDateTime({ fromDate: "", toDate: "" })
                }}
            />
            {/* Summery Report Date time to */}
            <DatePicker
                title="Select To Date & Time"
                modal
                mode="datetime"
                minimumDate={!!summaryReportDateTime.fromDate ? moment(summaryReportDateTime.fromDate).add(5, 'minutes').toDate() : null}
                maximumDate={(!!summaryReportDateTime.fromDate && moment(summaryReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(summaryReportDateTime.fromDate).add(7, 'days').toDate() : new Date()}
                open={reportModal === "summaryReportTo"}
                date={summaryReportDateTime.toDate || ((!!summaryReportDateTime.fromDate && moment(summaryReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(summaryReportDateTime.fromDate).add(7, 'days').toDate() : new Date())}
                onConfirm={(date) => {
                    setIsFinalModalVisible({ name: "summary", date })
                }}
                onCancel={() => {
                    setReportModal("")
                    setSummaryReportDateTime({ fromDate: "", toDate: "" })
                }}
            />


            {/* command Report Date time from */}
            <DatePicker
                title="Select From Date & Time"
                modal
                mode="datetime"
                maximumDate={moment().subtract(0.5, 'hour').toDate()}
                open={reportModal === "commandReportFrom"}
                date={commandReportDateTime.fromDate || moment().subtract(0.5, 'hour').toDate()}
                onConfirm={(date) => {
                    setCommandReportDateTime({ ...commandReportDateTime, fromDate: date })
                    setReportModal("commandReportTo")
                }}
                onCancel={() => {
                    setReportModal("")
                    setCommandReportDateTime({ fromDate: "", toDate: "" })
                }}
            />
            {/* command Report Date time to */}
            <DatePicker
                title="Select To Date & Time"
                modal
                mode="datetime"
                minimumDate={!!commandReportDateTime.fromDate ? moment(commandReportDateTime.fromDate).add(5, 'minutes').toDate() : null}
                maximumDate={(!!commandReportDateTime.fromDate && moment(commandReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(commandReportDateTime.fromDate).add(7, 'days').toDate() : new Date()}
                open={reportModal === "commandReportTo"}
                date={commandReportDateTime.toDate || ((!!commandReportDateTime.fromDate && moment(commandReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(commandReportDateTime.fromDate).add(7, 'days').toDate() : new Date())}
                onConfirm={(date) => {
                    setIsFinalModalVisible({ name: "command", date })
                }}
                onCancel={() => {
                    setReportModal("")
                    setCommandReportDateTime({ fromDate: "", toDate: "" })
                }}
            />


            {/* Km Report Date time from */}
            <DatePicker
                title="Select From Date & Time"
                modal
                mode="datetime"
                maximumDate={moment().subtract(0.5, 'hour').toDate()}
                open={reportModal === "kmReportFrom"}
                date={kmReportDateTime.fromDate || moment().subtract(0.5, 'hour').toDate()}
                onConfirm={(date) => {
                    setKmReportDateTime({ ...kmReportDateTime, fromDate: date })
                    setReportModal("kmReportTo")
                }}
                onCancel={() => {
                    setReportModal("")
                    setKmReportDateTime({ fromDate: "", toDate: "" })
                }}
            />
            {/* Km Report Date time to */}
            <DatePicker
                title="Select To Date & Time"
                modal
                mode="datetime"
                minimumDate={!!kmReportDateTime.fromDate ? moment(kmReportDateTime.fromDate).add(5, 'minutes').toDate() : null}
                maximumDate={(!!kmReportDateTime.fromDate && moment(kmReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(kmReportDateTime.fromDate).add(7, 'days').toDate() : new Date()}
                open={reportModal === "kmReportTo"}
                date={kmReportDateTime.toDate || ((!!kmReportDateTime.fromDate && moment(kmReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(kmReportDateTime.fromDate).add(7, 'days').toDate() : new Date())}
                onConfirm={(date) => {
                    setIsFinalModalVisible({ name: "km", date })
                }}
                onCancel={() => {
                    setReportModal("")
                    setKmReportDateTime({ fromDate: "", toDate: "" })
                }}
            />


            {/* Fuel Report Date time from */}
            <DatePicker
                title="Select From Date & Time"
                modal
                mode="datetime"
                maximumDate={moment().subtract(0.5, 'hour').toDate()}
                open={reportModal === "fuelReportFrom"}
                date={fuelReportDateTime.fromDate || moment().subtract(0.5, 'hour').toDate()}
                onConfirm={(date) => {
                    setFuelReportDateTime({ ...fuelReportDateTime, fromDate: date })
                    setReportModal("fuelReportTo")
                }}
                onCancel={() => {
                    setReportModal("")
                    setFuelReportDateTime({ fromDate: "", toDate: "" })
                }}
            />
            {/* Fuel Report Date time to */}
            <DatePicker
                title="Select To Date & Time"
                modal
                mode="datetime"
                minimumDate={!!fuelReportDateTime.fromDate ? moment(fuelReportDateTime.fromDate).add(5, 'minutes').toDate() : null}
                maximumDate={(!!fuelReportDateTime.fromDate && moment(fuelReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(fuelReportDateTime.fromDate).add(7, 'days').toDate() : new Date()}
                open={reportModal === "fuelReportTo"}
                date={fuelReportDateTime.toDate || ((!!fuelReportDateTime.fromDate && moment(fuelReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(fuelReportDateTime.fromDate).add(7, 'days').toDate() : new Date())}
                onConfirm={(date) => {
                    setIsFinalModalVisible({ name: "fuel", date })
                }}
                onCancel={() => {
                    setReportModal("")
                    setFuelReportDateTime({ fromDate: "", toDate: "" })
                }}
            />


            {/* IdleParked Report Date time from */}
            <DatePicker
                title="Select From Date & Time"
                modal
                mode="datetime"
                maximumDate={moment().subtract(0.5, 'hour').toDate()}
                open={reportModal === "idleParkedFrom"}
                date={idleParkedReportDateTime.fromDate || moment().subtract(0.5, 'hour').toDate()}
                onConfirm={(date) => {
                    setIdleParkedReportDateTime({ ...idleParkedReportDateTime, fromDate: date })
                    setReportModal("idleParkedTo")
                }}
                onCancel={() => {
                    setReportModal("")
                    setIdleParkedReportDateTime({ fromDate: "", toDate: "" })
                }}
            />
            {/* IdleParked Report Date time to */}
            <DatePicker
                title="Select To Date & Time"
                modal
                mode="datetime"
                minimumDate={!!idleParkedReportDateTime.fromDate ? moment(idleParkedReportDateTime.fromDate).add(5, 'minutes').toDate() : null}
                maximumDate={(!!idleParkedReportDateTime.fromDate && moment(idleParkedReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(idleParkedReportDateTime.fromDate).add(7, 'days').toDate() : new Date()}
                open={reportModal === "idleParkedTo"}
                date={idleParkedReportDateTime.toDate || ((!!idleParkedReportDateTime.fromDate && moment(idleParkedReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(idleParkedReportDateTime.fromDate).add(7, 'days').toDate() : new Date())}
                onConfirm={(date) => {
                    setIsFinalModalVisible({ name: "idleParked", date })

                }}
                onCancel={() => {
                    setReportModal("")
                    setIdleParkedReportDateTime({ fromDate: "", toDate: "" })
                }}
            />


            {/* OverSpeed Report Date time from */}
            <DatePicker
                title="Select From Date & Time"
                modal
                mode="datetime"
                maximumDate={moment().subtract(0.5, 'hour').toDate()}
                open={reportModal === "overSpeedFrom"}
                date={overSpeedReportDateTime.fromDate || moment().subtract(0.5, 'hour').toDate()}
                onConfirm={(date) => {
                    setOverSpeedReportDateTime({ ...overSpeedReportDateTime, fromDate: date })
                    setReportModal("overSpeedTo")
                }}
                onCancel={() => {
                    setReportModal("")
                    setOverSpeedReportDateTime({ fromDate: "", toDate: "" })
                }}
            />
            {/* OverSpeed Report Date time to */}
            <DatePicker
                title="Select To Date & Time"
                modal
                mode="datetime"
                minimumDate={!!overSpeedReportDateTime.fromDate ? moment(overSpeedReportDateTime.fromDate).add(5, 'minutes').toDate() : null}
                maximumDate={(!!overSpeedReportDateTime.fromDate && moment(overSpeedReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(overSpeedReportDateTime.fromDate).add(7, 'days').toDate() : new Date()}
                open={reportModal === "overSpeedTo"}
                date={overSpeedReportDateTime.toDate || ((!!overSpeedReportDateTime.fromDate && moment(overSpeedReportDateTime.fromDate).isBefore(moment().subtract(7, 'days'))) ? moment(overSpeedReportDateTime.fromDate).add(7, 'days').toDate() : new Date())}
                onConfirm={(date) => {
                    setIsFinalModalVisible({ name: "overSpeed", date })
                    // getReportsDataFromAPI("overSpeed", date)
                }}
                onCancel={() => {
                    setReportModal("")
                    setOverSpeedReportDateTime({ fromDate: "", toDate: "" })
                }}
            />
        </SafeAreaView>
    );
};
export default React.memo(Reports);
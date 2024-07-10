import React from 'react'
import { Text, Image, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default FuelDetail = () => {
    const navigation = useNavigation()
    const { fuelDeatilsData } = useSelector(({ fuelDetails }) => fuelDetails)
    const fuelPrice = useSelector(({ auth }) => auth.fuelPrice)
    const { Summery } = fuelDeatilsData;
    const summery = Summery[0]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={style.headertitle}>
                    <Image style={style.backimage} source={require('./leftarrow.png')} />
                    <Text style={{ fontSize: 20 }}></Text>
                </TouchableOpacity>
                <View style={style.imgcontainer}>

                    <Image style={style.image} source={require('./fuelconsume.png')} />
                </View>
                <View >
                    <Text style={style.literfule}>Fuel Consumed <Text style={style.liters}>{summery?.fuel_used}</Text>Liter</Text>
                </View>
            </View>
            <View>
                <Image style={style.fuelmeter} source={require('./meter1.png')} />
                <View style={style.fuelcostcontainer}>
                    <Text style={{ fontSize: 18, color: '#BCBCBC' }}>Thats’s the Total Cost</Text>
                    <Text style={{ fontWeight: '700', fontSize: 36, marginTop: -10 }}>{summery?.fuel_cost} <Text style={{ fontSize: 18 }}>Rs.</Text></Text>
                </View>
                <View style={style.uppercontainer}>
                    <View style={style.generalcontainer} >
                        <View style={style.tripdot}></View><Text style={{ marginLeft: 5, fontSize: 18, color: '#ABABAB' }} >Total Trips</Text>
                    </View>
                    <Text style={{ fontSize: 18, marginTop: 5, marginLeft: 15, color: '#3C3C3C' }}>{summery?.trip_count}</Text>
                    <View style={style.generalcontainer}>
                        <View style={style.distancedot}></View><Text style={{ marginLeft: 5, fontSize: 18, color: '#ABABAB' }}>Distance <Text style={{ marginLeft: 5, fontSize: 12, color: '#ABABAB' }}>km</Text></Text>
                    </View>
                    <Text style={{ fontSize: 18, marginTop: 5, marginLeft: 15, color: '#3C3C3C' }}>{summery?.trip_mileage}</Text>
                </View>
                <View style={style.lowercontainer}>
                    <View style={style.generalcontainer}>
                        <View style={style.avgdot}></View><Text style={{ marginLeft: 5 }}>Fuel Avg. <Text style={{ marginLeft: 5, fontSize: 12 }}>kmpl</Text></Text>
                    </View>
                    <Text style={{ fontSize: 18, marginTop: 5, marginLeft: 10 }}>{Number(summery?.total_mileage / summery?.fuel_used).toFixed(2)}</Text>
                    <View style={style.generalcontainer}>
                        <View style={style.fuelpricedot}></View><Text style={{ marginLeft: 5 }}>Fuel Price </Text>
                    </View>
                    <Text style={{ fontSize: 18, marginTop: 5, marginLeft: 10 }}>{fuelPrice}</Text>
                </View>
            </View>
            <View style={style.bottomcontainer}>
                <View style={style.drivetimecontainer}>
                    <Text>Total Drive Time </Text><Text>{summery?.driveTime}</Text>
                </View>
                <View style={style.idletimecontainer}>
                    <Text>Total Idle Time </Text><Text>{summery?.idleTime}</Text>
                </View>
                <View style={style.parkedtimecontainer}>
                    <Text>Total Parked Time </Text><Text>{summery?.parkTime}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    header: {
        height: 200,
        padding: 20,
        backgroundColor: '#434343',
    },
    headertitle: {
        flexDirection: 'row',
    },
    imgcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
    },
    literfule: {
        fontSize: 12,
        textAlign: 'center',
        color: '#DBDBDB',
        letterSpacing: 2,
    },
    liters: {
        fontSize: 36,
        fontWeight: '700',

    },
    bottomcontainer: {
        position: 'absolute',
        bottom: 0,
        height: 100,
        width: '100%',
        backgroundColor: 'green',
        borderTopColor: '#E9E9E9',
        borderTopWidth: 1,


    },
    drivetimecontainer: {
        width: '100%',
        height: 32,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#C5FFBB',


    },
    idletimecontainer: {
        width: '100%',
        height: 34,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#BBD2FF',
    },
    parkedtimecontainer: {
        width: '100%',
        height: 32,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFF2B0',
    },
    fuelmeter: {
        position: 'absolute',
        width: '50%',
        height: 450,

        right: -50,
    },
    tripdot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginTop: 8,
        backgroundColor: '#04CD00',
    },
    distancedot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginTop: 8,
        backgroundColor: '#00E0FF',
    },
    avgdot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginTop: 5,
        backgroundColor: '#FF4D4D',
    },
    fuelpricedot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginTop: 5,
        backgroundColor: '#FF9F0E',
    },
    generalcontainer: {
        flexDirection: 'row',

    },
    fuelcostcontainer: {

        marginTop: 20,
        marginLeft: 10,
    },
    uppercontainer: {
        marginTop: 30,
        marginLeft: 10,
    },
    lowercontainer: {
        marginTop: 60,
        marginLeft: 10,
    },
    backimage: {
        width: 30,
        height: 30,
    },




});
const IMAGES = {
    logo: require("../assets/images/logo.png"),
    halconLogo: require("../assets/images/halconLogo.png"),
    logo_name: require("../assets/images/logo_name.png"),
    circleChart: require("../assets/images/circleChart.png"),
    currentLocMarker: require("../assets/images/currentLocMarker.png"),
};

const ICON_IMAGES = {
    right_arrow: require("../assets/icons/Right.png"),
    Password_key: require("../assets/icons/Password_key.png"),
    Server: require("../assets/icons/Server.png"),
    User: require("../assets/icons/User.png"),
    ChatMessage: require("../assets/icons/Chat_Message.png"),
    GasPump: require("../assets/icons/gas_pump.png"),
};

const AlarmIcons = {
    drivingbehaviour: require("../assets/IconsforAssetList/alarmicon/drivingbehaviour.png"),
    geofence: require("../assets/IconsforAssetList/alarmicon/geofence.png"),
    Immobilizer: require("../assets/IconsforAssetList/alarmicon/Immobilizer.png"),
    key: require("../assets/IconsforAssetList/alarmicon/key.png"),
    overspeed: require("../assets/IconsforAssetList/alarmicon/overspeed.png"),
    power: require("../assets/IconsforAssetList/alarmicon/power.png"),
    warning: require("../assets/IconsforAssetList/alarmicon/warning.png"),
}

const AlarmGroupIcons = {
    ACC: require("../assets/alarmIcons/ACC.png"),
    Battery: require("../assets/alarmIcons/battery.png"),
    Door: require("../assets/alarmIcons/door.png"),
    Driver: require("../assets/alarmIcons/driverBehaviour.png"),
    Engine: require("../assets/alarmIcons/engine.png"),
    Excessive: require("../assets/alarmIcons/Excessive.png"),
    Fuel: require("../assets/alarmIcons/fuel.png"),
    Geofence: require("../assets/alarmIcons/GeoFence.png"),
    Other: require("../assets/alarmIcons/others.png"),
    Outpts: require("../assets/alarmIcons/outpts.png"),
    Poi: require("../assets/alarmIcons/poi.png"),
    Rfid: require("../assets/alarmIcons/rfid.png"),
    Route: require("../assets/alarmIcons/route.png"),
    Vehicle: require("../assets/alarmIcons/vehicleServices.png"),
    Violation: require("../assets/alarmIcons/voilation.png"),
}

const AssetIconPNG = {
    atm: {
        idle: require("../assets/AssetIconPNG/atm/idleatm.png"),
        moving: require("../assets/AssetIconPNG/atm/movingatm.png"),
        offline: require("../assets/AssetIconPNG/atm/offlineatm.png"),
        parked: require("../assets/AssetIconPNG/atm/parkedatm.png"),
    },
    bike: {
        idle: require("../assets/AssetIconPNG/bike/idlebike.png"),
        moving: require("../assets/AssetIconPNG/bike/movingbike.png"),
        offline: require("../assets/AssetIconPNG/bike/offlinebike.png"),
        parked: require("../assets/AssetIconPNG/bike/parkedbike.png"),
    },
    bus: {
        idle: require("../assets/AssetIconPNG/bus/idlebus.png"),
        moving: require("../assets/AssetIconPNG/bus/movingbus.png"),
        offline: require("../assets/AssetIconPNG/bus/offlinebus.png"),
        parked: require("../assets/AssetIconPNG/bus/parkedbus.png"),
    },
    car: {
        idle: require("../assets/AssetIconPNG/car/idlecar.png"),
        moving: require("../assets/AssetIconPNG/car/movingcar.png"),
        offline: require("../assets/AssetIconPNG/car/offlinecar.png"),
        parked: require("../assets/AssetIconPNG/car/parkedcar.png"),
    },
    container: {
        idle: require("../assets/AssetIconPNG/container/idlecontainer.png"),
        moving: require("../assets/AssetIconPNG/container/movingcontainer.png"),
        offline: require("../assets/AssetIconPNG/container/offlinecontainer.png"),
        parked: require("../assets/AssetIconPNG/container/parkedcontainer.png"),
    },
    cycle: {
        idle: require("../assets/AssetIconPNG/cycle/idlecycle.png"),
        moving: require("../assets/AssetIconPNG/cycle/movingcycle.png"),
        offline: require("../assets/AssetIconPNG/cycle/offlinecycle.png"),
        parked: require("../assets/AssetIconPNG/cycle/parkedcycle.png"),
    },
    person: {
        idle: require("../assets/AssetIconPNG/person/idleperson.png"),
        moving: require("../assets/AssetIconPNG/person/movingperson.png"),
        offline: require("../assets/AssetIconPNG/person/offlineperson.png"),
        parked: require("../assets/AssetIconPNG/person/parkedperson.png"),
    },
    pet: {
        idle: require("../assets/AssetIconPNG/pet/idlepet.png"),
        moving: require("../assets/AssetIconPNG/pet/movingpet.png"),
        offline: require("../assets/AssetIconPNG/pet/offlinepet.png"),
        parked: require("../assets/AssetIconPNG/pet/parkedpet.png"),
    },
    truck: {
        idle: require("../assets/AssetIconPNG/truck/idletruck.png"),
        moving: require("../assets/AssetIconPNG/truck/movingtruck.png"),
        offline: require("../assets/AssetIconPNG/truck/offlinetruck.png"),
        parked: require("../assets/AssetIconPNG/truck/parkedtruck.png"),
    }

}

const tabNavigation = {
    activeTab: {
        alrm: require("../assets/tabnavigation/activetab/alrm.png"),
        car: require("../assets/tabnavigation/activetab/car.png"),
        dashboard: require("../assets/tabnavigation/activetab/dashboard.png"),
        mark: require("../assets/tabnavigation/activetab/mark.png"),
        profile: require("../assets/tabnavigation/activetab/profile.png"),
    },
    nonActiveTab: {
        alrm: require("../assets/tabnavigation/nonactivetab/alrm.png"),
        car: require("../assets/tabnavigation/nonactivetab/car.png"),
        dashboard: require("../assets/tabnavigation/nonactivetab/dashboard.png"),
        mark: require("../assets/tabnavigation/nonactivetab/mark.png"),
        profile: require("../assets/tabnavigation/nonactivetab/profile.png"),
    }
}
export { IMAGES, ICON_IMAGES, AlarmIcons, AlarmGroupIcons, AssetIconPNG, tabNavigation };

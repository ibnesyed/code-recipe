import Share from 'react-native-share';
import { ASSET_SCREEN_ICONS, VEHICLE_MAP_ICONS, AssetIconPNG } from "../utils"

export const markerIconForMap = (AssetType, Status) => {
    if (!AssetType) {
        if (Status === "Parked") {
            return <VEHICLE_MAP_ICONS.carMapParked />
        } else if (Status === "Moving") {
            return <VEHICLE_MAP_ICONS.carMapMoving />
        } else if (Status === "Idle") {
            return <VEHICLE_MAP_ICONS.carMapIdle />
        } else {
            return <VEHICLE_MAP_ICONS.carMapOffline />
        }
    } else if (AssetType.toLowerCase() === "car") {
        if (Status === "Parked") {
            return <VEHICLE_MAP_ICONS.carMapParked />
        } else if (Status === "Moving") {
            return <VEHICLE_MAP_ICONS.carMapMoving />
        } else if (Status === "Idle") {
            return <VEHICLE_MAP_ICONS.carMapIdle />
        } else {
            return <VEHICLE_MAP_ICONS.carMapOffline />
        }
    } else if (AssetType.toLowerCase() === "bus") {
        if (Status === "Parked") {
            return <VEHICLE_MAP_ICONS.busMapIconParked />
        } else if (Status === "Moving") {
            return <VEHICLE_MAP_ICONS.busMapIconMoving />
        } else if (Status === "Idle") {
            return <VEHICLE_MAP_ICONS.busIconMapIdle />
        } else {
            return <VEHICLE_MAP_ICONS.busMapIconOffline />
        }
    } else if (AssetType.toLowerCase() === "truck" || AssetType.toLowerCase() === "container") {
        if (Status === "Parked") {
            return <VEHICLE_MAP_ICONS.truckIconMapParked />
        } else if (Status === "Moving") {
            return <VEHICLE_MAP_ICONS.truckIconMapMoving />
        } else if (Status === "Idle") {
            return <VEHICLE_MAP_ICONS.truckIconMapIdle />
        } else {
            return <VEHICLE_MAP_ICONS.truckIconMapOffline />
        }
    } else if (AssetType.toLowerCase() === "bike" || AssetType.toLowerCase() === "bicycle") {
        if (Status === "Parked") {
            return <VEHICLE_MAP_ICONS.bikeIconMapParked />
        } else if (Status === "Moving") {
            return <VEHICLE_MAP_ICONS.bikeMapMoving />
        } else if (Status === "Idle") {
            return <VEHICLE_MAP_ICONS.bikeMapIdle />
        } else {
            return <VEHICLE_MAP_ICONS.bikeIconMapOffline />
        }
    } else {
        if (Status === "Parked") {
            return <VEHICLE_MAP_ICONS.carMapParked />
        } else if (Status === "Moving") {
            return <VEHICLE_MAP_ICONS.carMapMoving />
        } else if (Status === "Idle") {
            return <VEHICLE_MAP_ICONS.carMapIdle />
        } else {
            return <VEHICLE_MAP_ICONS.carMapOffline />
        }
    }
}
export const vichelIcon = (AssetType, Status) => {
    if (!AssetType) {
        if (Status === "Parked") {
            return AssetIconPNG.car.parked
            // return <ASSET_SCREEN_ICONS.carparked />
        } else if (Status === "Moving") {
            return AssetIconPNG.car.moving
            // return <ASSET_SCREEN_ICONS.carmoving />
        } else if (Status === "Idle") {
            return AssetIconPNG.car.idle
            // return <ASSET_SCREEN_ICONS.caridle />
        } else {
            return AssetIconPNG.car.offline
            // return <ASSET_SCREEN_ICONS.caroffline />
        }
    } else if (AssetType.toLowerCase() === "car") {
        if (Status === "Parked") {
            return AssetIconPNG.car.parked
            // return <ASSET_SCREEN_ICONS.carparked />
        } else if (Status === "Moving") {
            return AssetIconPNG.car.moving
            // return <ASSET_SCREEN_ICONS.carmoving />
        } else if (Status === "Idle") {
            return AssetIconPNG.car.idle
            // return <ASSET_SCREEN_ICONS.caridle />
        } else {
            return AssetIconPNG.car.offline
            // return <ASSET_SCREEN_ICONS.caroffline />
        }
    } else if (AssetType.toLowerCase() === "bus") {
        if (Status === "Parked") {
            return AssetIconPNG.bus.parked
        } else if (Status === "Moving") {
            return AssetIconPNG.bus.moving
        } else if (Status === "Idle") {
            return AssetIconPNG.bus.idle
        } else {
            return AssetIconPNG.bus.offline
        }
        if (Status === "Parked") {
            return <ASSET_SCREEN_ICONS.busparked />
        } else if (Status === "Moving") {
            return <ASSET_SCREEN_ICONS.busmoving />
        } else if (Status === "Idle") {
            return <ASSET_SCREEN_ICONS.busidle />
        } else {
            return <ASSET_SCREEN_ICONS.busoffline />
        }
    } else if (AssetType.toLowerCase() === "truck") {
        if (Status === "Parked") {
            return AssetIconPNG.truck.parked
        } else if (Status === "Moving") {
            return AssetIconPNG.truck.moving
        } else if (Status === "Idle") {
            return AssetIconPNG.truck.idle
        } else {
            return AssetIconPNG.truck.offline
        }
        if (Status === "Parked") {
            return <ASSET_SCREEN_ICONS.truckparked />
        } else if (Status === "Moving") {
            return <ASSET_SCREEN_ICONS.truckmoving />
        } else if (Status === "Idle") {
            return <ASSET_SCREEN_ICONS.truckidle />
        } else {
            return <ASSET_SCREEN_ICONS.truckoffline />
        }
    } else if (AssetType.toLowerCase() === "container") {
        if (Status === "Parked") {
            return AssetIconPNG.container.parked
        } else if (Status === "Moving") {
            return AssetIconPNG.container.moving
        } else if (Status === "Idle") {
            return AssetIconPNG.container.idle
        } else {
            return AssetIconPNG.container.offline
        }
        if (Status === "Parked") {
            return <ASSET_SCREEN_ICONS.containerparked />
        } else if (Status === "Moving") {
            return <ASSET_SCREEN_ICONS.containermoving />
        } else if (Status === "Idle") {
            return <ASSET_SCREEN_ICONS.containeridle />
        } else {
            return <ASSET_SCREEN_ICONS.containeroffline />
        }
    } else if (AssetType.toLowerCase() === "bike") {
        if (Status === "Parked") {
            return AssetIconPNG.bike.parked
        } else if (Status === "Moving") {
            return AssetIconPNG.bike.moving
        } else if (Status === "Idle") {
            return AssetIconPNG.bike.idle
        } else {
            return AssetIconPNG.bike.offline
        }
        if (Status === "Parked") {
            return <ASSET_SCREEN_ICONS.bikeparked />
        } else if (Status === "Moving") {
            return <ASSET_SCREEN_ICONS.bikemoving />
        } else if (Status === "Idle") {
            return <ASSET_SCREEN_ICONS.bikeidle />
        } else {
            return <ASSET_SCREEN_ICONS.bikeoffline />
        }
    } else if (AssetType.toLowerCase() === "bicylce" || AssetType.toLowerCase() === "bicycle") {
        if (Status === "Parked") {
            return AssetIconPNG.cycle.parked
        } else if (Status === "Moving") {
            return AssetIconPNG.cycle.moving
        } else if (Status === "Idle") {
            return AssetIconPNG.cycle.idle
        } else {
            return AssetIconPNG.cycle.offline
        }
        if (Status === "Parked") {
            return <ASSET_SCREEN_ICONS.bicycleparked />
        } else if (Status === "Moving") {
            return <ASSET_SCREEN_ICONS.bicyclemoving />
        } else if (Status === "Idle") {
            return <ASSET_SCREEN_ICONS.bicycleidle />
        } else {
            return <ASSET_SCREEN_ICONS.bicycleoffline />
        }
    } else if (AssetType.toLowerCase() === "personal" || AssetType.toLowerCase() === "person") {
        if (Status === "Parked") {
            return AssetIconPNG.person.parked
        } else if (Status === "Moving") {
            return AssetIconPNG.person.moving
        } else if (Status === "Idle") {
            return AssetIconPNG.person.idle
        } else {
            return AssetIconPNG.person.offline
        }
        if (Status === "Parked") {
            return <ASSET_SCREEN_ICONS.personparked />
        } else if (Status === "Moving") {
            return <ASSET_SCREEN_ICONS.personmoving />
        } else if (Status === "Idle") {
            return <ASSET_SCREEN_ICONS.personidle />
        } else {
            return <ASSET_SCREEN_ICONS.personoffline />
        }
    } else if (AssetType.toLowerCase() === "atm") {
        if (Status === "Parked") {
            return AssetIconPNG.atm.parked
        } else if (Status === "Moving") {
            return AssetIconPNG.atm.moving
        } else if (Status === "Idle") {
            return AssetIconPNG.atm.idle
        } else {
            return AssetIconPNG.atm.offline
        }
        if (Status === "Parked") {
            return <ASSET_SCREEN_ICONS.atmparked />
        } else if (Status === "Moving") {
            return <ASSET_SCREEN_ICONS.atmmoving />
        } else if (Status === "Idle") {
            return <ASSET_SCREEN_ICONS.atmidle />
        } else {
            return <ASSET_SCREEN_ICONS.atmoffline />
        }
    } else if (AssetType.toLowerCase() === "pet") {
        if (Status === "Parked") {
            return AssetIconPNG.pet.parked
        } else if (Status === "Moving") {
            return AssetIconPNG.pet.moving
        } else if (Status === "Idle") {
            return AssetIconPNG.pet.idle
        } else {
            return AssetIconPNG.pet.offline
        }
        if (Status === "Parked") {
            return <ASSET_SCREEN_ICONS.petparked />
        } else if (Status === "Moving") {
            return <ASSET_SCREEN_ICONS.petmoving />
        } else if (Status === "Idle") {
            return <ASSET_SCREEN_ICONS.petidle />
        } else {
            return <ASSET_SCREEN_ICONS.petoffline />
        }
    } else {
        if (Status === "Parked") {
            return AssetIconPNG.car.parked
        } else if (Status === "Moving") {
            return AssetIconPNG.car.moving
        } else if (Status === "Idle") {
            return AssetIconPNG.car.idle
        } else {
            return AssetIconPNG.car.offline
        }
        if (Status === "Parked") {
            return <ASSET_SCREEN_ICONS.carparked />
        } else if (Status === "Moving") {
            return <ASSET_SCREEN_ICONS.carmoving />
        } else if (Status === "Idle") {
            return <ASSET_SCREEN_ICONS.caridle />
        } else {
            return <ASSET_SCREEN_ICONS.caroffline />
        }
    }
}


export const sendEmail = (message) => {
    let shareOption = {
        message: message,
        social: Share.Social.EMAIL
    }
    Share.shareSingle(shareOption)
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
}
export const sendWhatsAppMessage = async (message) => {
    try {
        const shareOptions = await checkIsWhatsappInstalled(message)
        Share.shareSingle(shareOptions)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    } catch (error) {

    }
};
export const checkIsWhatsappInstalled = (message) => {
    return new Promise((resolve, reject) => {
        Share.isPackageInstalled('com.whatsapp.w4b')
            .then((response) => {
                if (response?.isInstalled) {
                    resolve({
                        message,
                        social: Share.Social.WHATSAPPBUSINESS
                    })
                } else {
                    resolve({
                        message,
                        social: Share.Social.WHATSAPP
                    })
                }
                // { isInstalled: true/false, message: 'Package is Installed' }
            })
            .catch(() => {
                resolve({
                    message,
                    social: Share.Social.WHATSAPP
                })
            });
    });
}
import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { errorMessage } from "./showMessage";
import messaging from "@react-native-firebase/messaging";
import RNLocation from "react-native-location";

export const requestPushPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('User has notification permissions enabled.');
        return true;
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('User has provisional notification permissions.');
        return true;
    } else {
        console.log('User has notification permissions disabled');
        return false;
    }
}

export const requestLocationPermissions = async () => {
    try {
        return await RNLocation.checkPermission({
            ios: 'whenInUse', // or 'always'
            android: {
                detail: 'fine' // or 'fine'
            }
        });
    } catch (err) {
        return false;
    }
};

export const requestContactPermission = async () => {
    try {
    } catch (err) {
        console.warn(err);
    }
    const result = await request(
        Platform.OS === "ios" ? PERMISSIONS.IOS.CONTACTS : PERMISSIONS.ANDROID.READ_CONTACTS,
        {
            title: 'Разрешите приложению доступ к вашим контактам',
            message:
                "Нам необходимо открыть вашу книгу контактов," +
                "чтобы вы могли выбрать кого пригласить",
            buttonNeutral: "Спросить позже (приложение не будет работать)",
            buttonNegative: "Запретить (приложение не будет работать)",
            buttonPositive: "Разрешить"
        }
    )
    switch (result) {
        case RESULTS.GRANTED:
            return true;
         case RESULTS.BLOCKED:
            errorMessage({
                message: "Необходимо предоставить разрешение на доступ к контактам через системные настройки"
            })
            return false;
        default:
            errorMessage({
                message: "Не удалось получить доступ к контактам"
            })
            return false;
    }

    // try {
    //     const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //         {
    //             title: 'Разрешите приложению доступ к вашим контактам',
    //             message:
    //                 "Нам необходимо открыть вашу книгу контактов," +
    //                 "чтобы вы могли выбрать кого пригласить",
    //             buttonNeutral: "Спросить позже (приложение не будет работать)",
    //             buttonNegative: "Запретить (приложение не будет работать)",
    //             buttonPositive: "Разрешить"
    //         },
    //     );
    //     return granted === PermissionsAndroid.RESULTS.GRANTED;
    // } catch (err) {
    //     console.warn(err);
    //     return false;
    // }
}

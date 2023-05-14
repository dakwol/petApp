import React, {FC, useEffect, useState} from 'react';
import {INotification, IScreen} from "../../../types";
import {FlatList, Text, View} from "react-native";
import ViewScreen from '../../../components/Project/ViewScreen/ViewScreen';
import {translate} from "../../../utils/translate";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {userNotification} from "../../../api/user/userNotification/userNotification";
import NotificationsList from "../../../components/Project/NotificationsList/NotificationsList";
import { userNotificationsMarkAll } from '../../../api/user/userNotificationsMarkAll/userNotificationsMarkAll';
import {IApiReturn} from "../../../types/api";
import {getUserDataLive} from "../../../api/user/getUserDataLive/getUserDataLive";
import {useDispatch} from "react-redux";
import {updateUserDataLive} from "../../../redux/AuthRedux/actions/actionCreator";

const ProfileNotificationsList:FC<IScreen> = ({navigation, route}) => {

    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect( () => {
        userNotification().then( (resp) => {
                setNotifications(resp.data.data)
            }
        )
        userNotificationsMarkAll().then(resp => {
            console.log(resp)
        })
    }, [])

    console.log(notifications);


    const dispatch = useDispatch();

    return (
        <ViewScreen>
            <BackButton
                text={translate('back')}
                action={() => {
                    navigation.goBack()
                    getUserDataLive([]).then( (resp:IApiReturn<any>) => {
                        dispatch(updateUserDataLive({...resp.data}));
                    });
                }}
            />
            <View>
                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 18,
                        color: "#392413",
                        lineHeight: 22.5,
                        fontWeight: "500"
                    }}>{notifications.length > 0 ? translate('profile.notifications') :  translate('profile.noNotifications')}</Text>
                </View>
                <NotificationsList
                    nestedScrollEnabled={false}
                    onNotificationPress={ () => {} }
                    notifications={notifications}
                />
            </View>
        </ViewScreen>
    );
};

export default ProfileNotificationsList;

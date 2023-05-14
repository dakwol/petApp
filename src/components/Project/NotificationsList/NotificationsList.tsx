import React, {FC, useEffect} from 'react';
import {FlatList, ListRenderItemInfo, Pressable, Text, View} from "react-native";
import {INotification} from "../../../types";
import styles from "./styles";
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../../constants/Colors';
//import Moment from 'moment'

interface NotificationsListProps {
    nestedScrollEnabled: boolean,
    onNotificationPress: (id:number) => void,
    notifications: INotification[]
}

const NotificationsList:FC<NotificationsListProps> = ( {notifications, nestedScrollEnabled= false, onNotificationPress = () => {}
                                           }) => {

    useEffect(() => {
        console.log('notifications', notifications)
    }, [])

    //Moment.locale('ru')

    const renderItem = ({item}:ListRenderItemInfo<INotification>) => (
       
        <View>
            {item.is_read?
                <View style={styles.flatItem}>
                    <Text style={styles.titleReadText}>{item.title}</Text>
                    <Text style={styles.bodyReadText}>{item.body}</Text>
                    {/*<Text style={styles.bodyReadText}>{Moment(item.date).format('H:mm Y-MM-D')}</Text>*/}
                </View>
                :
                <View style={styles.flatItem}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.bodyText}>{item.body}</Text> 
                    {/*<Text style={styles.bodyReadText}>{Moment(item.date).format('H:mm Y-MM-D')}</Text>*/}
                </View>
            }
        </View>
    );

    return (
        <View style={{marginBottom:70}}>
            <FlatList
                data={notifications}
                contentContainerStyle={styles.listContainer}
                renderItem={renderItem}
                nestedScrollEnabled
            />
        </View>
    );
};

export default NotificationsList;

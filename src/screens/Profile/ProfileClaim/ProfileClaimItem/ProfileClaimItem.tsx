import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {View, Text, Image} from 'react-native';
import { getEventById } from '../../../../api/events/getEventById';
import { getUserById } from '../../../../api/user/getUserById/getUserById';
import { globalStyles } from '../../../../constants/globalStyles';
import navigation from '../../../../navigation';
import { SCREENS } from '../../../../navigation/screenName';
import { IClaim } from '../../../../types';


interface IClaimListItem {
    data: IClaim;
    onPress?: ({}) => void;
};

const ProfileClaimItem: FC<IClaimListItem> = ({
                                                 data,
                                                 ... props}) => {

                                                    
    const [eventInfo, setEventInfo] = useState<any>();
    const [userInfo, setUserInfo] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(true);
    
    useEffect(()=>{
        getEventById(data.event_id).then((resp)=>{
            setEventInfo(resp.data.event[0])
            getUserById({"user_id": resp.data.event[0].user_id}).then((resp)=>{
                setUserInfo(resp)
                setIsLoading(false)
            })
        })
    },[])

    return (
        <>
        {isLoading?
            <View style={[globalStyles.loading,{alignItems: "flex-start"}]}>
                <ActivityIndicator size={'small'}/>
            </View>
            :
            <TouchableOpacity onPress={props.onPress} style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{flexDirection:'row', flex: .2, marginRight: 20}}>
                        <Text style={{fontWeight: 'bold', fontSize:20}}>#{data.event_id}</Text>
                    </View>
                        <View style={{flex: 1}}>
                            <Text style={{ fontWeight: 'bold', fontSize:20}}>{eventInfo.evt_topic}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{ fontWeight: 'bold', fontSize:15, marginRight: 5}}>{userInfo?.nickname}</Text>
                                <Text style={{ fontWeight: 'bold', fontSize:15}}>{userInfo?.full_name}</Text>
                            </View>
                        </View>
                    
            </TouchableOpacity>
        }
        </>
    );
};

export default ProfileClaimItem;

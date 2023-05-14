import React, {FC, useEffect, useRef, useState} from 'react';
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {styles} from "../../../components/Project/Profile/styles";
import { ActivityIndicator, ListRenderItemInfo, Platform, Text, View } from 'react-native';
import DropdownSelect from '../../../components/UI/DropdownSelect/DropdownSelect';
import TextArea from '../../../components/UI/TextArea/TextArea';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../../components/UI/Button/Button';
import { eventModerate } from '../../../api/events/eventModerate/eventModerate';
import { errorMessage } from '../../../utils/showMessage';
import { eventModerateMedia } from '../../../api/events/eventModerateMedia/eventModerateMedia';
import { colors } from '../../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import { getEventLikes } from '../../../api/events/getEventLikes/getEventLikes';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { IEvent } from '../../../types';
import { SCREENS } from '../../../navigation/screenName';


interface IEventScreen {
    route: any,
    navigation: any,
}

const EventListLikes:FC<IEventScreen> = ({
                                          navigation,
                                          route
                                      }) => {

    const [userLike, setUserLike] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(true);

    useEffect(()=>{
        getEventLikes(route.params.eventId).then((resp)=>{
            if(resp.success){
                setUserLike(resp.data);
                setIsLoading(false);
            }
        })
    },[])

    
    const renderItem = ({item}:ListRenderItemInfo<IEvent>) => {
        return(
            <TouchableOpacity 
                style={{paddingVertical: 20}}
                onPress={() =>{ navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileUserScreen, params: {userId:item.user.id}})}}
            >
                <Text>{item.user.nickname}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <ViewScreen>
               <View style={{ position: 'absolute', left: 0 }}>
                    <BackButton
                        text={translate('back')}
                        action={() => {
                            navigation.goBack()
                        }}
                    />
                </View>
                <View style={[styles.profileHeader, {width: '100%', paddingHorizontal: 16}]}>
                    <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 18,
                            color: "#392413",
                            lineHeight: 22.5,
                            fontWeight: "500"
                        }}>{translate("event.likers")}</Text>
                    </View>
                    {isLoading?
                        <ActivityIndicator size={48}/>
                        :
                        <FlatList 
                            data={userLike} 
                            renderItem={renderItem}
                        />
                    }
                </View>
        </ViewScreen>
    );
};

export default EventListLikes;

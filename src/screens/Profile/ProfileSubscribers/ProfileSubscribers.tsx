import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, ListRenderItemInfo, Text, View} from 'react-native';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {IScreen, IStory, IUser} from "../../../types";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { userFollowers } from '../../../api/user/userFollowers/userFollowers';
import { userSubscribes } from '../../../api/user/userSubscribers/userSubscribers';
import { colors } from '../../../constants/Colors';
import { SCREENS } from '../../../navigation/screenName';



const ProfileSubscribers:FC<IScreen> = (
    {
        navigation,
        route
    }
) => {

    const [followers, setFollowers] = useState<any>();
    const [followersItem, setFollowersItem] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(true);

    useEffect(()=>{
       if(route.params.screen == 'followers'){
        userFollowers(route.params.user_id).then(resp=>{
            if(resp.success){
                setFollowers(resp.data.subscribers)
                setIsLoading(false)
            }
        })
       } else {
        userSubscribes(route.params.user_id).then(resp=>{
            if(resp.success){
                setFollowers(resp.data.subscribers)
                setIsLoading(false)
            }
        })
       }
    },[])

    const renderItem = ({item}:ListRenderItemInfo<IUser>) => {
        return(
            <TouchableOpacity 
                style={{paddingVertical: 20}} 
                onPress={() =>{ navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileUserScreen, params: {userId: route.params.screen == "followers"? item.follower.id : item.subscriber.id}})}}
            >
                <Text>{route.params.screen == "followers"? item.follower.nickname : item.subscriber.nickname}</Text>
            </TouchableOpacity>
        )
    }



    return (
        <ViewScreen>
            <View style={styles.background}>
                <View style={{ position: 'absolute', left: 0 }}>
                    <BackButton
                        text={translate('back')}
                        action={() => {
                            navigation.goBack()
                        }}
                    />
                </View>
                <View style={[styles.profileHeader, {width: '100%'}]}>
                       <View style={{paddingHorizontal: 16,}}>
                            <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: "#392413",
                                    lineHeight: 22.5,
                                    fontWeight: "500"
                                }}>
                                    {route.params.screen == 'followers'?
                                        translate("profile.followers")
                                        :
                                        translate("profile.subscribers")
                                    }
                                </Text>
                            </View>
                            {isLoading?
                                <ActivityIndicator size={48}/>
                                :
                                <FlatList 
                                    data={followers} 
                                    renderItem={renderItem}
                                />
                            }
                        </View>
                </View>

            </View>
        </ViewScreen>

    );
};

export default ProfileSubscribers;

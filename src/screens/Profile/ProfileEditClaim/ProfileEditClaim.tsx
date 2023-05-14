import React, {FC, useEffect, useState} from 'react';
import {IClaim, INotification, IScreen} from "../../../types";
import {ActivityIndicator, FlatList, Image, ListRenderItemInfo, Platform, Text, TouchableOpacity, View} from "react-native";
import ViewScreen from '../../../components/Project/ViewScreen/ViewScreen';
import {getTranslateMessage, translate} from "../../../utils/translate";
import BackButton from "../../../components/UI/BackButton/BackButton";
import { eventClaimClaims } from '../../../api/claim/eventClaimClaims/eventClaimClaims';
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../../../constants/Colors';
import { SCREENS } from '../../../navigation/screenName';
import { event } from 'react-native-reanimated';
import Button from '../../../components/UI/Button/Button';
import TextArea from '../../../components/UI/TextArea/TextArea';
import { getEventById } from '../../../api/events/getEventById';
import { getUserById } from '../../../api/user/getUserById/getUserById';
import { eventClaimUpdate } from '../../../api/claim/eventClaimUpdate/eventClaimUpdate';
import { claimArrow } from '../../../constants/images';
import { errorMessage } from '../../../utils/showMessage';
import { Dictionary } from '../../../locales/dictionary';

const ProfileEditClaim:FC<IScreen> = ({navigation, route}) => {

    const [isLoading, setIsLoading] = useState<any>(true);

    const [isSelected, setSelection] = useState(false);
    const [messageValue, setMessageValue] = useState<string>(route.params.moderationComment);
    const [eventInfo, setEventInfo] = useState<any>();
    const [userInfo, setUserInfo] = useState<any>();

    useEffect(()=>{
        setMessageValue(messageValue);
    },[messageValue])


    useEffect(()=>{
        if(route.params.eventId){
            getEventById(route.params.eventId).then((resp)=>{
                setEventInfo(resp.data.event[0])
                getUserById({"user_id": resp.data.event[0].user_id}).then((resp)=>{
                    setUserInfo(resp)
                    setIsLoading(false)
                })
            })
            
        }
    },[])

    const payload = {
        "event_claim_id": route.params.claimId,
        "is_open": isSelected? 1:0,
        "moderator_comment": messageValue
    }

    const claimUpdate = async() => {
        const updateResponse = await eventClaimUpdate(payload);
        if(updateResponse.success){
            errorMessage({
                message: translate("common.success"),
            });
            navigation.goBack()
        } else {
            errorMessage({
                message: translate("errors.unknownError"),
            });
        }
    }


    return (
        <ViewScreen>
            <BackButton
                text={translate('back')}
                action={() => {
                    navigation.goBack()
                }}
            />
            <View style={{paddingHorizontal:16}}>
                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 18,
                        color: "#392413",
                        lineHeight: 22.5,
                        fontWeight: "500"
                    }}>{translate('claim.claim')} {route.params.eventId}</Text>
                </View>
                <View style={{paddingHorizontal: 16}}>
                            {isLoading?
                                <ActivityIndicator size={48}/>
                                :
                                <View style={{marginVertical: 15}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{eventInfo?.evt_topic}</Text>
                                        <Image source={claimArrow} style={{resizeMode: 'contain', width: 15, height: 14}}></Image>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 18, marginRight: 5}}>{userInfo?.nickname}</Text>
                                            <Text style={{fontWeight: 'bold', fontSize: 18}}>{userInfo?.full_name}</Text>
                                        </View>
                                        <Image source={claimArrow} style={{resizeMode: 'contain', width: 15, height: 14}}></Image>
                                    </View>
                                </View>
                            }
                            <View>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>{translate('claim.claimText')}</Text>
                                <Text style={{fontWeight: 'bold', fontSize: 15, marginVertical: 10}}>{route.params.textClaim}</Text>
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>{translate('claim.comment')}</Text>
                            <TextArea
                                value={messageValue}
                                placeholder={translate('event.moderationText')}
                                onChangeText={(data) => {setMessageValue(data)}}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            {Platform.OS === 'ios' ? (
                            <CheckBox
                                boxType={'square'}
                                value={isSelected}
                                onValueChange={setSelection}
                                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                                lineWidth={3}
                                tintColor={colors.rainee}
                                onTintColor={colors.greenPH}
                                onCheckColor={colors.greenPH}
                            />
                            ) : (
                                <CheckBox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                />
                            )}
                                <Text>{translate("claim.closeClaim")}</Text>
                            </View>
                            <View style={{alignItems: 'center', marginTop: 10}}>
                                <Button
                                    text={translate("common.buttonUpdate")} 
                                    action={()=>{claimUpdate()}}
                                />
                            </View>
                       </View>
            </View>
        </ViewScreen>
    );
};

export default ProfileEditClaim;

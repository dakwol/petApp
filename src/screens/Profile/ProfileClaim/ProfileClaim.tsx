import React, {FC, useEffect, useState} from 'react';
import {IClaim, INotification, IScreen} from "../../../types";
import {ActivityIndicator, FlatList, ListRenderItemInfo, Platform, Text, TouchableOpacity, View} from "react-native";
import ViewScreen from '../../../components/Project/ViewScreen/ViewScreen';
import {translate} from "../../../utils/translate";
import BackButton from "../../../components/UI/BackButton/BackButton";
import { eventClaimClaims } from '../../../api/claim/eventClaimClaims/eventClaimClaims';
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../../../constants/Colors';
import { SCREENS } from '../../../navigation/screenName';
import ProfileClaimItem from './ProfileClaimItem/ProfileClaimItem';

const ProfileClaim:FC<IScreen> = ({navigation, route}) => {

    const [claims, setClaims] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(true);

    useEffect( () => {
        eventClaimClaims().then( (resp) => {
                setClaims(resp.data.claims)
                setIsLoading(false)
            })
    }, [])



    const [isSelected, setSelection] = useState<boolean>(false);


    const renderItem = ({item}:ListRenderItemInfo<IClaim>) => {
        return (
            <>
                {(isSelected == item.is_open) && 
                    <ProfileClaimItem 
                        data={item}
                        onPress={() =>{ navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileEditClaim, params: {eventId: item.event_id, moderationComment: item.moderator_comment, textClaim: item.text, claimId:item.id}})}} 
                    />
                }
            </>
            
        )
    };

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
                    }}>{translate('claim.claim')}</Text>
                </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                                )
                    }
                    <Text>{translate('claim.seeClose')}</Text>
                    </View>
                    <FlatList
                        data={claims}
                        renderItem={renderItem}
                        style={{marginBottom: 85}}
                    />
            </View>
        </ViewScreen>
    );
};

export default ProfileClaim;

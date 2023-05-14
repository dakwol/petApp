import React, {FC, useEffect, useState} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {useDispatch, useSelector} from "react-redux";
import Profile from "../../../components/Project/Profile/Profile";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {Text, View} from "react-native";
import ViewBottom from "../../../components/UI/ViewBottom/ViewBottom";
import ButtonSaveEvent from "../../../components/Project/ButtonSaveEvent/ButtonSaveEvent";
import {setIsLoggedIn, updateUserDataLive} from "../../../redux/AuthRedux/actions/actionCreator";
import {SCREEN_WIDTH} from "../../../constants/globalStyles";
import {IScreen} from "../../../types";
import {addChat} from "../../../api/chats/addChat/addChat";
import {showMessage} from "react-native-flash-message";
import {errorMessage} from "../../../utils/showMessage";
import { ScrollView } from 'react-native-virtualized-view';

import { SCREENS } from '../../../navigation/screenName';
import {getUserDataLive} from "../../../api/user/getUserDataLive/getUserDataLive";
import {IApiReturn} from "../../../types/api";

const ProfileUserScreen:FC<IScreen> = ({ navigation, route }) => {

    const userInfo = useSelector((state: any) => state?.session?.userData);
    const profileUserId = route.params?.userId ?? false;

    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(setIsLoggedIn(false));
    }

    const onAddChat = async () => {
        const response = await addChat({
            chat_user: profileUserId,
            chat_initiator: userInfo?.user_id
        })
        if (response.success) {
            navigation.navigate('CommonNavigator', {screen: 'ChatScreen', params: {chatId: response.data}});
        } else {
            errorMessage({
                message: response.message,
            });
        }
    }

    return (
        <ViewScreen>
            {profileUserId &&
            <View style={{position: 'absolute', left: 0}}>
                <BackButton
                    text={translate('back')}
                    action={() => {
                        navigation.goBack();

                    }}
                />
            </View>
            }
            {userInfo?.user_id &&
            <ScrollView style={[{marginTop: (profileUserId != userInfo?.user_id) ? 25 : 0}]}>
                <Profile
                    user_id={route.params?.userId}
                    navigation={navigation}
                />
            </ScrollView>
            }

            <ViewBottom marginBottom={0}>
                <View style={{width: SCREEN_WIDTH, padding: 5, alignItems: "center", justifyContent: "center"}}>

                    {(profileUserId === false || profileUserId === userInfo?.user_id || userInfo == undefined)?

                        <View style={{margin: 5}}>
                            <ButtonSaveEvent
                                buttonText={translate("auth.logout")}
                                onPress={onLogout}
                            />
                        </View>
                        :
                        <View style={{margin: 5}}>
                            <ButtonSaveEvent
                                buttonText={translate("task.OrderService")}
                                onPress={() => console.log('order click')}
                            />
                        </View>
                    }
                </View>
            </ViewBottom>

        </ViewScreen>
    );

};

export default ProfileUserScreen;

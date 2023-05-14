import React, {FC, useEffect, useState} from 'react';
import {updateNotifSettings} from "../../../api/user/updateNotifSettings/updateNotifSettings";
import {showMessage} from "react-native-flash-message";
import {translate} from "../../../utils/translate";
import {getUserById} from "../../../api/user/getUserById/getUserById";
import {useIsFocused} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {IScreen} from "../../../types";
import {Text, View} from "react-native";
import {styles} from "../../../components/Project/Profile/styles";
import BackButton from "../../../components/UI/BackButton/BackButton";
import ToggleButton from "../../../components/UI/ToggleButton/ToggleButton";
import ViewScreen from '../../../components/Project/ViewScreen/ViewScreen';
import {INotifMnemo} from "../../../api/user/types";
import {getFormData} from "../../../utils/formData";
import {errorMessage} from "../../../utils/showMessage";


const ProfileNotifications:FC<IScreen> = ({navigation, route}) => {
    const isFocused = useIsFocused();
    const [profileInfo, setProfileInfo] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<any>(false);
    const [notifSettings, setNotifSettings] = useState({
        comments: false,
        favevents: false,
        msgs: false,
        notification: false,
        stories: false,
        follow: false,
        likes: false,
    });
    const userInfo = useSelector((state: any) => state?.session?.userData);
    const notifMnemos = ['msgs','comments','favevents','stories','follow','likes'];
    useEffect(() => {

        if(isFocused) {
            getUserById({user_id: userInfo.user_id}).then((dataUser) => {
                let tmpNotifSettings = {...notifSettings};
                notifMnemos.map( mnemo => {
                    //@ts-ignore
                    tmpNotifSettings[mnemo] = dataUser['notif_' + mnemo] = dataUser['notif_' + mnemo] === false || dataUser['notif_' + mnemo] === 0 ? false:true;
                    console.log(dataUser['notif_'+ mnemo])
                });
                tmpNotifSettings.notification = dataUser.notification === false || dataUser.notification === 0  ? false:true;

                setProfileInfo(dataUser);
                console.log(notifSettings);
                setNotifSettings(tmpNotifSettings);
                setIsLoaded(true);
            });
        }
    }, [isFocused]);

    const onChangeNotify = async (field:INotifMnemo, value:boolean) => {

        const realValue = value ? false : true;
        const apiValue = value ? 0 : 1;
        let tmpNotifSettings = {...notifSettings};
        //@ts-ignore
        tmpNotifSettings[field] = realValue;
        setNotifSettings(tmpNotifSettings);

        const resp = await updateNotifSettings(apiValue, field);
        if(resp.success == true) {
            showMessage({
                message: translate('profile.updateNotifSuccess'),
                type: "success"
            });
        } else {
            errorMessage({
                message: translate('profile.updateNotifError'),
            });
            setNotifSettings({...notifSettings});
        }
    }
    return (
        <ViewScreen>
            <View style={styles.background}>
                {isLoaded &&
                    <View style={styles.profile}>
                            <View style={{position: 'absolute', left: 0, zIndex: 1000}}>
                                <BackButton
                                    text={translate('back')}
                                    action={() => {
                                        navigation.goBack()
                                    }}
                                />
                            </View>
                        <View style={styles.profileHeader}>
                            
                            <View style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: 18,
                                    color: "#392413",
                                    lineHeight: 22.5,
                                    fontWeight: "500"
                                }}>{translate('profile.notifications')}</Text>
                            </View>

                            <View style={styles.profileSettingsContainer}>

                                <ToggleButton
                                    onToggle={(value) => onChangeNotify("msgs", value)}
                                    text={translate('profile.notifyMessage')}
                                    value={notifSettings.msgs!}
                                />

                                <ToggleButton
                                    onToggle={(value) => onChangeNotify("comments", value)}
                                    text={translate('profile.notifyComment')}
                                    value={notifSettings.comments!}
                                />

                                <ToggleButton
                                    onToggle={(value) => onChangeNotify("favevents", value)}
                                    text={translate('profile.notifyEvent')}
                                    value={notifSettings.favevents!}
                                />
                                <ToggleButton
                                    onToggle={(value) => onChangeNotify("stories", value)}
                                    text={translate('profile.notifyStories')}
                                    value={notifSettings.stories!}
                                />
                                <ToggleButton
                                    onToggle={(value) => onChangeNotify("follow", value)}
                                    text={translate('profile.notifyFollow')}
                                    value={notifSettings.follow!}
                                />
                                <ToggleButton
                                    onToggle={(value) => onChangeNotify("likes", value)}
                                    text={translate('profile.notifyLikes')}
                                    value={notifSettings.likes!}
                                />
                            </View>
                        </View>
                    </View>
                }
            </View>
        </ViewScreen>
    );
};

export default ProfileNotifications;

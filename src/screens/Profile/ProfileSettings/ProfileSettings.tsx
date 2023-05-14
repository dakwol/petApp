import React, {FC, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {IScreen} from "../../../types";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";
import {fonts} from "../../../constants/fonts";
import {colors} from "../../../constants/Colors";
import {SCREENS} from "../../../navigation/screenName";
import {Dictionary} from "../../../locales/dictionary";
import InviteFriendModal from "../../../components/Project/InviteFriendModal/InviteFriendModal";
import Stories from '../../../components/UI/Stories/Stories';
import {helpMedias} from "../../../constants/images";
import {navigateTo} from "../../../utils/navigate";
import {capitalizeFirstLetter} from "../../../utils/text";
import {useSelector} from "react-redux";

const stylesScreen = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        marginBottom: 20
    },
    text: {
        color: colors.black,
        fontSize: 18,
        lineHeight: 22.5,
        fontFamily: fonts.Medium,
        flex: 1,
    },
});
const ProfileSettings: FC<IScreen> = ({ navigation, route }) => {
    const [fullView, setFullView] = useState(false);
    const userDataFull = useSelector((state: any) => state?.session?.userDataFull);

    const toggleModal = () => {
        setFullView(!fullView);
    }

    //const storyMedias = helpMedias;
    const storyMedias = (Platform.OS == 'ios')
        ? [
            'https://petapidev.ratsysdev.com/storage/other_media/i_1.jpg'
        ]
        : [
            'https://petapidev.ratsysdev.com/storage/other_media/i_1.jpg'
        ];
    const storyMediasTest = [
        "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
        "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
        "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
        "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
        "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
    ];


    const [visibleStories, setVisibleStories] = useState(false);

    return (
        <ViewScreen>
            <InviteFriendModal isVisible={fullView}  toggleModal={toggleModal}/>
            <View style={styles.background}>
                <View style={[Platform.OS === 'ios'?[styles.profile, {paddingHorizontal: 10}] : styles.profile]}>
                    <View style={{ position: 'absolute', left: 0, zIndex: 1000}}>
                        <BackButton
                            text={translate('back')}
                            action={() => {
                                navigation.goBack()
                            }}
                        />
                    </View>
                    <View style={styles.profileHeader}>
                        <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 18,
                                color: "#392413",
                                lineHeight: 22.5,
                                fontWeight: "500"
                            }}>{translate('profile.settings')}</Text>
                        </View>

                        <View style={[styles.profileSettingsContainer, {height: 500, flex: 1}]}>
                            <View style={[stylesScreen.container, { marginTop: 20, justifyContent: 'space-between', alignItems: 'center'}]}>
                                <TouchableOpacity onPress={() => { navigation.navigate(SCREENS.ProfileMyTaskScreen) }}> 
                                    <Text style={stylesScreen.text}>Мои заявки</Text>
                                </TouchableOpacity>
                                <View style={{backgroundColor: colors.greenPH, paddingHorizontal: 10, borderRadius: 20, paddingVertical: 2}}>
                                    <Text style={{fontSize: 12, color: colors.white}}>Удобный сервис от ЗооКлик</Text>
                                </View>
                            </View>
                            <View style={[stylesScreen.container]}>
                                <TouchableOpacity style={{height: 20}} onPress={() => { navigation.navigate(SCREENS.ProfileNotifications) }}>
                                    <Text style={stylesScreen.text}>{translate('profile.pushNotifications')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylesScreen.container}>
                                <TouchableOpacity style={{height: 20}} onPress={() => { navigation.navigate(SCREENS.ProfileApp) }}>
                                    <Text style={stylesScreen.text}>{translate('profile.appAbout')}</Text>
                                </TouchableOpacity>
                            </View>
                            {userDataFull.nickname_migrate &&
                                <View style={stylesScreen.container}>
                                    <TouchableOpacity style={{height: 20}} onPress={() => {
                                        navigateTo(navigation, SCREENS.ProfileNickname)
                                    }}>
                                        <Text style={stylesScreen.text}>Изменить ник</Text>
                                    </TouchableOpacity>

                                </View>
                            }
                            <View style={stylesScreen.container}>
                                <TouchableOpacity style={{height: 20}} onPress={() => { navigation.navigate(SCREENS.ProfilePassword) }}>
                                    <Text style={stylesScreen.text}>{translate('profile.changePassword')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylesScreen.container}>
                                <TouchableOpacity style={{height: 20}} onPress={() => { navigation.navigate(SCREENS.ProfileFeedbackScreen) }}>
                                    <Text style={stylesScreen.text}>{translate('profile.sendfeedback')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylesScreen.container}>
                                <TouchableOpacity style={{height: 20}} onPress={() => { navigation.navigate(SCREENS.ProfileLocation) }}>
                                    <Text style={stylesScreen.text}>{translate(Dictionary.profile.locationSettings)}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylesScreen.container}>
                                <TouchableOpacity style={{height: 20}} onPress={() => toggleModal()}>
                                    <Text style={stylesScreen.text}>{translate(Dictionary.profile.inviteFriend)}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylesScreen.container}>
                                <TouchableOpacity style={{height: 20}} onPress={() => navigateTo(navigation, SCREENS.HelpScreen)}>
                                    <Text style={stylesScreen.text}>{capitalizeFirstLetter(translate(Dictionary.common.helpInterface))}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylesScreen.container}>
                                <TouchableOpacity style={{height: 20}} onPress={() => { navigation.navigate(SCREENS.ProfileDeleteScreen) }}>
                                    <Text style={stylesScreen.text}>{translate('profile.deleteaccount')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                </View>
            </View>
        </ViewScreen>
    );
};

export default ProfileSettings;

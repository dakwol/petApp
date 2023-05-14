import React, {FC} from 'react';
import {IScreen} from "../../../types";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../../components/Project/Profile/styles";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {colors} from "../../../constants/Colors";
import {fonts} from "../../../constants/fonts";
import {version as app_version} from "../../../../package.json";



const stylesScreen = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 47,
        width: '100%',
    },
    text: {
        color: colors.cedar,
        fontSize: 16,
        lineHeight: 19,
        fontFamily: fonts.Medium,
        flex: 1,
        opacity:0.5
    },
});

const ProfileApp:FC<IScreen>  = ({navigation, route}) => {

    return (
        <ViewScreen>
            <View style={styles.background}>
                <View style={styles.profile}>
                    <View style={{position: 'absolute', left: 0}}>
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
                            }}>{translate('profile.appAbout')}</Text>
                        </View>

                        <View style={styles.profileSettingsContainer}>

                            {/*
                            <View style={[stylesScreen.container, {marginTop: 10}]}>
                                    <Text
                                        onPress={() => Linking.openURL('http://google.com')}
                                        style={stylesScreen.text}
                                    >
                                        {translate('profile.appService')}
                                    </Text>
                            </View>
                            */ }

                            <View style={[stylesScreen.container, {marginTop: 10}]}>
                                <Text
                                    onPress={() => Linking.openURL('https://zoo-click.com/documents/agreement.pdf')}
                                    style={stylesScreen.text}
                                >
                                    {translate('profile.appLicense')}
                                </Text>
                            </View>
                            <View style={[stylesScreen.container, {marginTop: 10}]}>
                                <Text
                                    onPress={() => Linking.openURL('https://zoo-click.com/documents/privacy.pdf')}
                                    style={stylesScreen.text}
                                >
                                    {translate('profile.appPrivate')}
                                </Text>
                            </View>

                            <View style={[stylesScreen.container, {marginTop: 10}]}>
                                <Text
                                    onPress={() => Linking.openURL('http://google.com')}
                                    style={stylesScreen.text}
                                >
                                    {translate('profile.appVersion')}: {app_version}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ViewScreen>
    );
};

export default ProfileApp;

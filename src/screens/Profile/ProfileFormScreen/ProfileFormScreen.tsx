import React, {FC} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";

import {IScreen} from "../../../types";
import {View} from "react-native";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";
import ProfileForm from "../../../components/Project/ProfileForm/ProfileForm";

const ProfileFormScreen:FC<IScreen> = ({navigation, route, ...props}) => {
    return (
        <ViewScreen keyboardVerticalOffset={-225}>
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

                    <ProfileForm navigation = {navigation} route={route} />

                </View>
            </View>
        </ViewScreen>
    );
};

export default ProfileFormScreen;

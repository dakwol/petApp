import React, {FC} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";

import {IScreen} from "../../../types";
import {Text, View} from "react-native";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";
import FeedbackForm from "../../../components/Project/FeedbackForm/FeedbackForm";

const ProfileDeleteScreen:FC<IScreen> = ({navigation, route, ...props}) => {
    return (
        <ViewScreen keyboardVerticalOffset={0}>
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

                    <FeedbackForm
                        isDeleteAccount = {true}
                        defaultTopicId={3}
                        defaultText={'Пожалуйста удалите мой аккаунт'}
                        buttonText={'Отправить запрос'}
                    />

                </View>
            </View>
        </ViewScreen>
    );
};

export default ProfileDeleteScreen;

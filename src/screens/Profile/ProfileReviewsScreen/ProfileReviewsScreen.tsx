import React, {FC} from 'react';
import {IScreen} from "../../../types";
import {Text, View} from "react-native";
import {styles} from "../../../components/Project/Profile/styles";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import ProfileReviews from "../../../components/Project/Profile/ProfileReviews/ProfileReviews";

const ProfileReviewsScreen:FC<IScreen> = ({navigation, route}) => {
    const profileId = route.params.user_id;

    return (
        <ViewScreen>
            <View style={styles.background}>
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
                            }}>{translate('profile.reviews')}</Text>
                        </View>

                        <View style={styles.profileSettingsContainer}>
                            <ProfileReviews
                                profileId={profileId}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ViewScreen>
    );
};

export default ProfileReviewsScreen;

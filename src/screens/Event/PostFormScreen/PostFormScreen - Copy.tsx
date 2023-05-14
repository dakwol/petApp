import React, {FC} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {IScreen} from "../../../types";
import {View} from "react-native";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";
import PostForm from "../../../components/Project/PostForm/PostForm";

const PostFromScreen:FC<IScreen> = ({navigation, route, ...props}) => {
    const { id } = route?.params ?? {id: 0 }

    return (
        <ViewScreen>
            <View style={styles.background}>
                <View style={[styles.profile, {paddingTop:25}]}>
                    <View style={{position: 'absolute', left: 0}}>
                        <BackButton
                            text={translate('back')}
                            action={() => {
                                navigation.goBack()
                            }}
                        />
                    </View>
                    <PostForm
                        post_id={id}
                        navigation = {navigation}
                        route={route}
                    />
                </View>
            </View>
        </ViewScreen>
    );
};

export default PostFromScreen;

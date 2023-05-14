import React, {FC} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {IScreen} from "../../../types";
import {View} from "react-native";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {getTranslateMessage, translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";
import PostForm from "../../../components/Project/PostForm/PostForm";
import PostCreate from "../../../components/External/Post/PostCreate";
import {errorMessage} from "../../../utils/showMessage";
import {capitalizeFirstLetter} from "../../../utils/text";

const PostFromScreen:FC<IScreen> = ({navigation, route, ...props}) => {
    const { id } = route?.params ?? {id: 0 }

    // @ts-ignore
    return (
        <ViewScreen keyboardVerticalOffset={-50}>
            <View style={styles.background}>
                <View style={[styles.profile, {paddingTop:25}]}>

                    {/* show OLD component for edit */}
                    {id && id > 0 &&
                        <PostForm
                            post_id={id}
                            navigation = {navigation}
                            route={route}
                        />
                    }
                    {/* show NEW for create */}
                    {!id &&
                        <PostCreate
                            navigation = {navigation}
                            route={route}
                        />
                    }

                </View>
            </View>
        </ViewScreen>
    );
};

export default PostFromScreen;

import React, {FC} from 'react';
import {View} from "react-native";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {styles} from "../../../components/Project/Profile/styles";
import PostForm from "../../../components/Project/PostForm/PostForm";
import PostCreate from "../../../components/External/Post/PostCreate";
import {IScreen} from "../../../types";

const StoriesFormScreen:FC<IScreen> = ({navigation, route, ...props}) => {
    return (
        <ViewScreen keyboardVerticalOffset={-50}>
            <View style={styles.background}>
                <View style={[styles.profile, {paddingTop:25}]}>
                        <PostCreate
                            mode={"stories"}
                            navigation = {navigation}
                            route={route}
                        />
                </View>
            </View>
        </ViewScreen>
    );
};

export default StoriesFormScreen;

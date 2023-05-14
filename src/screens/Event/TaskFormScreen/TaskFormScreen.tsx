import React, {FC} from 'react';
import {Text, View} from "react-native";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {IScreen} from "../../../types";
import BackButton from '../../../components/UI/BackButton/BackButton';
import { translate } from '../../../utils/translate';
import TaskForm from '../../../components/Project/TaskForm/TaskForm';
import TaskForm2 from "../../../components/Project/TaskForm/TaskForm";

const TaskFormScreen:FC<IScreen> = ({navigation, route, ...props}) => {
    return (
        <ViewScreen keyboardVerticalOffset={-50}>
            <View style={{justifyContent: 'space-between', alignItems:'center', flexDirection:'row'}}>
                <BackButton
                    text={translate('task.goToFeed')}
                    action={() => {
                        navigation.goBack()
                    }}
                    stylesContainer={{width: 120}}
                />
            </View>
            <View>
                <View style={[{paddingTop:25}]}>
                        <TaskForm2
                            userInfo={route.params.userInfo}
                            navigation={navigation}
                        />
                </View>
            </View>
        </ViewScreen>
    );
};

export default TaskFormScreen;

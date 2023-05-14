import React, {FC} from 'react';
import {Text, View} from "react-native";
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {IScreen} from "../../../types";
import BackButton from '../../../components/UI/BackButton/BackButton';
import { translate } from '../../../utils/translate';
import TaskForm from '../../../components/Project/TaskForm/TaskForm';
import TaskList from '../../../components/Project/TaskList/TaskList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonAdd from '../../../components/Project/ButtonAdd/ButtonAdd';
import { navigateTo } from '../../../utils/navigate';
import { SCREENS } from '../../../navigation/screenName';
import { useSelector } from 'react-redux';

const TaskScreen:FC<IScreen> = ({navigation, route, ...props}) => {
    const userInfo = useSelector((state: any) => state?.session?.userData);
    const onNewTaskPress = () => {
        navigation.navigate(SCREENS.TaskFormScreen, {category_id: 3, userInfo: userInfo})
    }
    return (
        <ViewScreen keyboardVerticalOffset={-50}>
            <View style={{justifyContent: 'space-between', alignItems:'center', flexDirection:'row'}}>
                <BackButton
                    text={translate('back')}
                    action={() => {
                        navigation.goBack()
                    }}
                />
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}} onPress={onNewTaskPress}>
                    <Text>Новая заявка</Text>
                    <ButtonAdd buttonSize={32} onPress={onNewTaskPress} />
                </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 20}}>
                <View style={[{paddingTop:25}]}>
                        <TaskList navigation={navigation}></TaskList>
                </View>
            </View>
        </ViewScreen>
    );
};

export default TaskScreen;

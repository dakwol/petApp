import React, {FC} from "react";
import {IChatList, IChatListItem} from "../ChatList/types";
import {ITaskList, ITaskListItem} from "./types";
import styles from "./styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {colors} from "../../../constants/Colors";
import { getMediaPreview } from "../../../utils/common";
import { Badge } from "react-native-elements";
import { SCREEN_WIDTH } from "../../../constants/globalStyles";

const TaskListSm:FC<ITaskList> = ({
                                    tasks,
                                    type,
                                    onTaskPress = (type: any, item: any) => { console.log(item) },
                                    unread_tasks,
                                    ...props}) => {
    const onPress = (type: number, item: ITaskListItem) => {
        onTaskPress(type, item);
    }

    //type = 1 => exe user
    //console.log('TPP', type);

    //console.log('wss tasks', tasks)
    //console.log('wss untasks', unread_tasks)

    return (
        <View style={styles.messagesContainer}>
            {tasks.map( (task) => {

                return (
                    <TouchableOpacity key={task.id} onPress={() => onPress(type, task)}>
                    <View style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.greenPH, paddingVertical: 10, justifyContent: "space-between"}}>
                        <View style={{flexDirection: "row"}}>
                            <Image source={{uri: getMediaPreview(task?.preview)}} style={styles.taskImg}/>

                            <View style={{justifyContent: "space-between", height: 55}}>
                                <View>
                                    <Text numberOfLines={1} style={styles.title}>{task.name}</Text>
                                    { unread_tasks?.includes(task.id) && (
                                        <Badge
                                            //value={4}
                                            status="error"
                                            badgeStyle={{width: 10, height: 10, borderRadius:10}}
                                            containerStyle={{ position: "absolute", top: 2, left: -12 }}
                                        />
                                    )}

                                </View>
                                <Text style={{fontSize: 8, color:colors.black}}>{task.is_has_new_responses? 'Есть отклики' : 'Не откликов'}</Text>
                                <Text style={{fontSize: 12, color: colors.zcBrown, fontWeight: "bold"}}>Заявка №{task.id}</Text>
                            </View>
                        </View>

                        <View style={{height: 55, alignItems: "flex-end"}}>
                            <Text style={styles.dateTask}>{task.date}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                )

            })}
        </View>
    );
};

export default TaskListSm;

import React, {FC} from 'react';
import {ICommentEventItem, ICommentEventList} from "./types";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../ChatList/styles";
import {getMediaPreviewSrc} from "../../../utils/common";
import {getFullDate, getFullDateTime} from "../../../utils/datetime";



const CommentEventList:FC<ICommentEventList> = ({
                                                    events,
                                                    onEventCommentPress = (item) => { console.log(item) },
                                           ...props}) => {
    const onPress = (item:ICommentEventItem) => {
        onEventCommentPress(item);
    }

    return (
        <View style={styles.messagesContainer}>
            {
                events.map( (event) => {

                        let lastComment = event.comments[0]?.comment;
                        let lastCommentDate = getFullDateTime(event.comments[0]?.created_at);

                        return (

                            <TouchableOpacity key={event.id} onPress={() => onPress(event)} style={styles.messageObject}>
                                <View style={styles.messageImage}>
                                    <Image resizeMode={"contain"} style={styles.messageImageIcon} source={getMediaPreviewSrc(event?.media)}/>
                                </View>
                                <View style={styles.commentObjectText}>
                                    <Text numberOfLines={1} style={{
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        color: "#8AC43A",
                                    }}>{event.evt_topic}</Text>
                                    <Text numberOfLines={1} style={{
                                        color: "#392413",
                                        fontSize: 12,
                                        lineHeight: 15
                                    }}>{event.user.first_name} {event.user.last_name}, {lastCommentDate}</Text>
                                    <Text numberOfLines={1} style={{
                                        fontWeight: "bold",
                                        //color: "#8AC43A",
                                        color: "#392413",
                                        fontSize: 12,
                                        opacity: 0.6
                                    }}>{lastComment}</Text>
                                </View>
                                {/*
                                <View style={styles.dateContainer}>
                                    <Text numberOfLines={1} style={{color: "#392413", opacity: 0.6}}>{getFullDate(event.updated_at)}</Text>
                                </View>*/ }
                            </TouchableOpacity>
                        )
                    }
                )

            }
        </View>
    );
};

export default CommentEventList;

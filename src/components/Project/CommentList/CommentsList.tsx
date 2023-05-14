import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import {styles} from "../ChatMessages/styles";
import {Image, Pressable, Text, TouchableOpacity, View} from "react-native";
import {getFullDateTime} from "../../../utils/datetime";
import {getEventComments} from "../../../api/events/getEventComments/getEventComments";
import {getAvatar, getMediaPreviewSrc} from "../../../utils/common";
import {colors} from "../../../constants/Colors";
import {capitalizeFirstLetter} from "../../../utils/text";
import {translate} from "../../../utils/translate";

interface ICommentsList {
    eventId: number;
    eventDetail: any;
    needCommentsRefresh:boolean;
    setNeedCommentsRefresh: any;
    navigateToUser: any;
    contentEmpty?: ReactNode
    onlyLast?:number
    showAllText?: boolean,
    showAddText?: boolean
    showTitle?:boolean,
    navigateToEvent?:any
}

interface IComment {
    user_avatar_media: any,
    comment: string;
    created_at: string;
    dt_added: number;
    event_id: number;
    id: number;
    is_shown: number;
    updated_at: string | null;
    user_id: number;
    user:any;
}

const CommentsList:FC<ICommentsList> = ({
                                            eventId,
                                            eventDetail,
                                            needCommentsRefresh,
                                            setNeedCommentsRefresh,
                                            navigateToUser,
                                            contentEmpty,
                                            onlyLast,
                                            showAllText=false,
                                            showAddText=false,
    showTitle = true,
                                            navigateToEvent

                                        }) => {

    const [comments, setComments] = useState<IComment[]>([])
    const scrollViewRef = useRef();

    useEffect(() =>{
        if(needCommentsRefresh == true) {
            getEventComments({evt_id: eventId}).then((data: IComment[]) => {
                if(onlyLast) {
                    data = data.slice( 0 - onlyLast);
                }
                setComments(data);
                setNeedCommentsRefresh(false);
            });
        }
    }, [needCommentsRefresh, eventId])


    return (
        <View style={ {flex:1}}>
            {comments && comments.length > 0 && showTitle &&
            <View style={[{marginTop: 10, flex:1},  ]}>
                <Text style={{
                    color: colors.greenPH,
                    fontSize: 18,
                    fontWeight: "500",
                    textAlign: "left"
                }}>{capitalizeFirstLetter(translate('comment.comments'))}</Text>
            </View>
            }
            <View
                style={[styles.messageViewer, {flex:1}]}
            >
                {comments &&  comments.length > 0 &&
                <View style={[styles.messageBody, {marginTop:0}]}>
                    {comments?.map((comment: IComment) =>
                        <View key={comment.id}
                              style={[
                                  styles.messageSender,
                                  comment.user_id == eventDetail.user_id && {},


                              ]}
                        >
                            <View style={{flex:1, marginRight:45}}>
                                <Text style={[styles.messageText, {fontSize:15, lineHeight: 19, fontWeight: "500", color: colors.black }]}>{comment.comment}</Text>
                                <Pressable onPress={ () => navigateToUser(comment?.user?.id ?? false) }>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={[styles.messageText, {color: colors.greenLight} ]}>{comment?.user?.full_name}</Text>
                                        <Text style={[styles.messageTime, {color: colors.greenLight} ]}>{getFullDateTime(comment.created_at)}</Text>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={{
                                width:30,
                                position: 'absolute',
                                right: 10
                            }}>
                                <TouchableOpacity onPress={ () => navigateToUser(comment?.user?.id ?? false) }>
                                    {/* <Image style={styles.messageImageUser} resizeMode="contain" source={getMediaPreviewSrc(comment?.user?.avatar_media)}/> */}
                                    <Image style={styles.messageImageUser} resizeMode="contain" source={getMediaPreviewSrc(comment?.user_avatar_media)}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
                }
                {comments && (onlyLast != undefined && comments.length > onlyLast) && showAllText &&
                <TouchableOpacity onPress={navigateToEvent}>
                    <Text>Смотреть все комментарии ({comments.length})</Text>
                </TouchableOpacity>
                }
                {comments
                && (comments.length == 0 || (onlyLast != undefined && comments.length <= onlyLast))
                && showAddText &&
                <TouchableOpacity onPress={navigateToEvent}>
                    <Text style={{color:colors.gray}}>Добавить комментарий</Text>
                </TouchableOpacity>
                }


            </View>
        </View>
    );
};

export default CommentsList;

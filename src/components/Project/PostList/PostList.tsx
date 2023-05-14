import React, {FC, useState} from 'react';
import {ActivityIndicator, FlatList, FlatListProps, View} from 'react-native';
import {removeEventFromFavorite} from '../../../api/user/removeFavEvent';
import {saveEventToFavorite} from '../../../api/user/saveFavEvent';
import {globalStyles} from '../../../constants/globalStyles';
import {IEvent} from '../../../types';
import {getFormData} from '../../../utils/formData';
import styles from './styles';
import {useSelector} from "react-redux";
import {showMessage} from "react-native-flash-message";
import {translate} from "../../../utils/translate";
import PostsListItem from "./PostListItem/PostListItem";
import {errorMessage} from "../../../utils/showMessage";


interface IEventListProps {
    data: any[];
    onEventPress?: (id: number) => void;
    horizontal?: boolean;
    onRemoveFromFav?: () => void;
    onTouchStart?: (e:any) => void;
    onTouchEnd?: (e:any) => void;
    isVisible?: boolean,
    onEndReached?: (e:any) => void
    onEndReachedThreshold?: number
    onRefresh?:() => void
    refreshing?: boolean,
    isPageLoading?: boolean
    onChangeDataItem?: (item:any) => void;
};

const PostsList: FC<IEventListProps> = ({
                                            data,
                                            onEventPress= () => {},
                                            onRemoveFromFav = () => {},
                                            onTouchStart = (e) => {},
                                            onTouchEnd = (e) => {},
                                            onEndReached= (e) => {},
                                            isVisible= true,
                                            onEndReachedThreshold = 1,
                                            onRefresh = () => {},
                                            refreshing= false,
                                            isPageLoading = false,
                                            onChangeDataItem = (item) => {},
                                            ...props
                                        }) => {

    const userInfo = useSelector((state: any) => state?.session?.userData);

    const onAddFavouriteEventPress = async (eventId: number) => {
        try {
            const payload = {
                evt_id: eventId,
            };
            const response = await saveEventToFavorite(userInfo.token, getFormData(payload));
            if (response.data.status === 'success') {
                showMessage({
                    message: translate("event.addToFavSuccess"),
                    type: "success"
                });
            } else {
                errorMessage({
                    message: translate("errors.unknownError"),
                });
            }
        } catch (error) {
            errorMessage({
                message: translate("errors.unknownError"),
            });
        }
    };

    const onRemoveFavouriteEventPress = async (eventId: number) => {
        try {
            const payload = {
                evt_id: eventId,
            };
            const response = await removeEventFromFavorite(userInfo.token,getFormData(payload));
            if (response.data.status === 'success') {
                showMessage({
                    message: translate("event.removeFromFavSuccess"),
                    type: "success"
                });
                if(onRemoveFromFav) { onRemoveFromFav() }
            } else {
                errorMessage({
                    message: translate("errors.unknownError"),
                });
            }
        } catch (error) {
            errorMessage({
                message: translate("errors.unknownError"),
            });
        }
    };

    const[touchEnd, setTouchEnd] = useState<boolean>();
    console.log(touchEnd)

    const _renderItem = ({item, index}: {item: IEvent; index: number}) => {
        return (

            <PostsListItem
                data={item}
                onPress={onEventPress}
                onAddToFavourite={onAddFavouriteEventPress}
                onRemoveFromFavourite={onRemoveFavouriteEventPress}
                onChangeDataItem={onChangeDataItem}
                touchCansel={(item)=>{setTouchEnd(item)}}
            />

        );
    };

    return (
        <View style={[globalStyles.flexOne, {display: (isVisible) ? "flex":"none"}]}>
            <FlatList
                onTouchStart={ (e) => {
                    //console.log('onTouchStart', e.nativeEvent)
                    onTouchStart(e);
                } }
                onTouchEnd={ (e) => {
                    //console.log('onTouchEnd', e.nativeEvent)
                    touchEnd && onTouchEnd(e);
                } }
                onTouchCancel={ (e) => {
                    //console.log('onTouchCancel', e.nativeEvent)
                    touchEnd && onTouchEnd(e);
                } }
                data={data}
                keyExtractor={(item: IEvent) => item.id.toString()}
                //columnWrapperStyle={styles.flatlistColumn}
                contentContainerStyle={styles.listEvent}
                renderItem={_renderItem}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                onRefresh={onRefresh}
                refreshing={refreshing}
                {...props}
            />
            {isPageLoading &&
                <ActivityIndicator size={48}/>
            }
        </View>
    );
};

export default PostsList;

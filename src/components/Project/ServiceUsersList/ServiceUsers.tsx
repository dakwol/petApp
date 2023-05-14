import React, {FC} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {removeEventFromFavorite} from '../../../api/user/removeFavEvent';
import {saveEventToFavorite} from '../../../api/user/saveFavEvent';
import {globalStyles, SCREEN_WIDTH} from '../../../constants/globalStyles';
import {IEvent, IUser} from '../../../types';
import {getFormData} from '../../../utils/formData';
import styles from './styles';
import {useSelector} from "react-redux";
//import EventsListItem from "./EventsListItem/EventsListItem";
import {showMessage} from "react-native-flash-message";
import {translate} from "../../../utils/translate";
import {errorMessage} from "../../../utils/showMessage";
import ServicesListItem from "../EventsList/ServicesListItem/ServicesListItem";
import ServiceUserListItem from "./ServiceUserListItem/ServiceUserListItem";
import EventsListItem from "../EventsList/EventsListItem/EventsListItem";


type IServiceUsersListProps = {
    data: any[];
    onServiceUserPress?: (id: number) => void;
    horizontal?: boolean;
    onTouchStart?: (e:any) => void;
    onTouchEnd?: (e:any) => void;
    isVisible?: boolean;
    onEndReached?: (e:any) => void
    onEndReachedThreshold?: number
    onRefresh?:() => void
    refreshing?: boolean,
    isPageLoading?: boolean,
    activeCategory?: number,
};

const ServiceUsersList: FC<IServiceUsersListProps> = ({
                                                          data,
                                                          onServiceUserPress= () => {},
                                                          onTouchStart = (e) => {},
                                                          onTouchEnd = (e) => {},
                                                          isVisible= true,
                                                          onEndReached= (e) => {},
                                                          onEndReachedThreshold = 1,
                                                          onRefresh = () => {},
                                                          refreshing = false,
                                                          isPageLoading = false,
                                                          activeCategory,
                                                          ...props
                                                      }) => {

    const userInfo = useSelector((state: any) => state?.session?.userData);

    const _renderItem = ({item, index}: {item: IUser; index: number}) => {


        return (
            <>
                {userInfo?.user_id != item.id && (
                    <ServiceUserListItem
                        user={item}
                        onPress={onServiceUserPress}
                    />)}
            </>
        )
    };


    return (
        <View style={[globalStyles.flexOne, {width: SCREEN_WIDTH - 10,display: (isVisible) ? "flex":"none"}]}>
            <FlatList
                onTouchStart={ (e) => {
                    onTouchStart(e);
                } }
                onTouchEnd={ (e) => {
                    onTouchEnd(e);
                } }
                onTouchCancel={ (e) => {
                    onTouchEnd(e);
                } }

                numColumns={2}
                data={data}
                keyExtractor={(item: IUser) => item.id.toString()}
                columnWrapperStyle={[styles.flatlistColumn, activeCategory == 3? {flexDirection: 'column', flexWrap: 'wrap'}: {}]}
                contentContainerStyle={styles.listEvent}
                renderItem={_renderItem}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                onRefresh={onRefresh}
                refreshing = {false}
                {...props}
            />
            {isPageLoading &&
            <ActivityIndicator size={48}/>
            }

        </View>
    );
};

export default ServiceUsersList;

import React, {FC} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {removeEventFromFavorite} from '../../../api/user/removeFavEvent';
import {saveEventToFavorite} from '../../../api/user/saveFavEvent';
import {globalStyles} from '../../../constants/globalStyles';
import {IEvent} from '../../../types';
import {getFormData} from '../../../utils/formData';
import styles from './styles';
import {useSelector} from "react-redux";
import EventsListItem from "./EventsListItem/EventsListItem";
import {showMessage} from "react-native-flash-message";
import {translate} from "../../../utils/translate";
import {errorMessage} from "../../../utils/showMessage";
import ServicesListItem from './ServicesListItem/ServicesListItem';

type IEventListProps = {
  data: any[];
  onEventPress?: (id: number) => void;
  horizontal?: boolean;
  onRemoveFromFav?: () => void;
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

const EventsList: FC<IEventListProps> = ({
                                           data,
                                           onEventPress= () => {},
                                           onRemoveFromFav = () => {},
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

  console.log('DANTEST',userInfo)

  const _renderItem = ({item, index}: {item: IEvent; index: number}) => {
    return (
      <>
        {activeCategory == 3?
          <ServicesListItem
              //key={item.id}
              data={item}
              onPress={onEventPress}
              onAddToFavourite={onAddFavouriteEventPress}
              onRemoveFromFavourite={onRemoveFavouriteEventPress}
              
          />
          : 
          <EventsListItem
              //key={item.id}
              data={item}
              onPress={onEventPress}
              onAddToFavourite={onAddFavouriteEventPress}
              onRemoveFromFavourite={onRemoveFavouriteEventPress}
          />
        }
      </>
    );
  };

  return (
      <View style={[globalStyles.flexOne, {display: (isVisible) ? "flex":"none"}]}>
        {props.horizontal === true ? (
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item: IEvent) => item.id.toString()}
                contentContainerStyle={styles.listEvent}
                renderItem={_renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsHorizontalScrollIndicator={false}
            />
        ) : (
            <FlatList
                onTouchStart={ (e) => {
                  //console.log('onTouchStart', e.nativeEvent)
                  onTouchStart(e);
                } }
                onTouchEnd={ (e) => {
                  //console.log('onTouchEnd', e.nativeEvent)
                  onTouchEnd(e);
                } }
                onTouchCancel={ (e) => {
                  //console.log('onTouchCancel', e.nativeEvent)
                  onTouchEnd(e);
                } }

                numColumns={2}
                data={data}
                keyExtractor={(item: IEvent) => item.id.toString()}
                columnWrapperStyle={[styles.flatlistColumn, activeCategory == 3? {flexDirection: 'column', flexWrap: 'wrap'}: {}]}
                contentContainerStyle={styles.listEvent}
                renderItem={_renderItem}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                onRefresh={onRefresh}
                refreshing = {false}
                {...props}
            />
        )}
        {isPageLoading &&
            <ActivityIndicator size={48}/>
        }

      </View>
  );
};

export default EventsList;

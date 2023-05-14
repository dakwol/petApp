import React, {FC, useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import CategoriesList from '../../components/Project/CategoriesList/CategoriesList';
import EventsList from '../../components/Project/EventsList/EventsList';
import {CategoryItem, Event, IEvent} from '../../types';
import styles from './styles';
import {useDispatch, useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import {getEventsFav} from "../../api/events/getEventsFav/getEventsFav";
import ViewScreen from "../../components/Project/ViewScreen/ViewScreen";
import {NAVIGATORS} from "../../navigation/const";
import {translate} from "../../utils/translate";

interface IFavouritesScreen {
    navigation: object,
}

const Favorites:FC<IFavouritesScreen> = ({ navigation, ...props}) => {

    const dispatch = useDispatch();
    const focused = useIsFocused();
    const userInfo = useSelector((state: any) => state?.session?.userData);
    const categories = useSelector((state: any) => state?.global?.categories);

    const [eventsFav, setEventsFav] = useState<IEvent[]>([]);

    /*
    const [listFavouriteEvent, setListFavouriteEvent] = useState<Event[]>([]);
    const [categoryId, setCategoryId] = useState<number>();
    const [isRefreshEvent, setIsRefreshEvent] = useState<boolean>(false);
    */

    useEffect( () => {
        //console.log('eventsFav', eventsFav);
    }, [eventsFav])

    useEffect(() => {
        if (focused) {
            getEventsFavList().then( response => setEventsFav(response) );
        }
    }, [focused, categories]);

    const onRemoveFromFav = () => {
        getEventsFavList().then( response => setEventsFav(response) );
    }

    const getEventsFavList = useCallback(async () => {
        const payload = {
            user_id: userInfo.user_id?.toString(),
        };
        let output:IEvent[] = [];
        try {
            output = await getEventsFav(payload);
            output.map( item => item.isfav = true);
            return output;
        } catch (error) {
            return output;
        }
    },[]);

    const onEventPress = (id: number) => {
        //@ts-ignore
        navigation.navigate('CommonNavigator', { screen: 'EventScreen', params: {eventId: id } } );
    };
    const onCategoryItemPress = (item: CategoryItem) => {};

    return (
        <ViewScreen>
            {/*
            <View style={styles.categoryListContainer}>
                <CategoriesList
                    onItemPress={onCategoryItemPress}
                    categories={categories}
                />

            </View>
            */}
            <View style={styles.eventListContainer}>
                {eventsFav.length > 0
                    ?
                    <EventsList
                        data={eventsFav}
                        onEventPress={onEventPress}
                        onRemoveFromFav={onRemoveFromFav}
                    />
                    :
                    <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 18}} >{translate('event.noFavs')}</Text>
                    </View>
                }
            </View>
        </ViewScreen>
    );
};

export default Favorites;

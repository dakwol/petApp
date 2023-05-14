import React, {FC, useState} from 'react';
import {FlatList, Image, ListRenderItemInfo, Pressable, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {IStory} from "../../../types";
import {getAvatar, getMediaFirst, getMediaPreview} from "../../../utils/common";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import {SCREENS} from "../../../navigation/screenName";
import {useNavigation} from "@react-navigation/native";
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import { translate } from '../../../utils/translate';
import { defaultImageUri } from '../../../constants/images';

interface StoriesListProps {
    nestedScrollEnabled: boolean,
    onStoryPress: (id:number) => void,
    stories: IStory[],
    deleteButton?: boolean,
    itemDelete?: (id:number) => void,
    modalVisible?: (visible: boolean) => void,
}

const StoriesList:FC<StoriesListProps> = ( {stories, deleteButton, itemDelete=()=>{}, modalVisible=()=>{}, nestedScrollEnabled= false, onStoryPress = () => {}
                                           }) => {
    const navigation = useNavigation();

    

    const renderItem = ({item}:ListRenderItemInfo<IStory>) => (
        <TouchableOpacity onPress={ () =>{
            item.id == -1
                // @ts-ignore
                ? (navigation.navigate('CommonNavigator', {screen: SCREENS.StoriesFormScreen}))
                // @ts-ignore
               :
                // @ts-ignore
                navigation.navigate('CommonNavigator', {screen: SCREENS.StoriesScreen, params:{id:item.user_id}})
        }}>
                    <View style={deleteButton?{height: 100, marginBottom:10, marginHorizontal: 4}:styles.flatItem}>
                        {item.id == -1
                            ?
                            <View style={{justifyContent: 'space-between', height: 120}}>
                                <View>
                                    <Image style={[styles.itemImage, {borderWidth: 0}, (getAvatar(item?.user?.avatar_media?.preview) == defaultImageUri)? {resizeMode: 'contain'} : {resizeMode: 'cover'}]} source={{uri:getAvatar(item?.user?.avatar_media?.preview)}} />
                                    <View style={styles.addButton}>
                                        <ButtonAdd buttonSize={32} onPress={ () =>{ // @ts-ignore
                                            navigation.navigate('CommonNavigator', {screen: SCREENS.StoriesFormScreen}) }}/>
                                    </View>
                                </View>
                                {deleteButton?
                                    <View></View>
                                :
                                    <Text style={[styles.itemText,{textAlign: 'center'}]}>
                                        {translate("stories.youStories")}
                                    </Text>    
                                }
                            </View>
                            :
                           deleteButton?
                                <View style={{width: 100, position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={{uri:getMediaPreview(getMediaFirst(item.medias))}} style={{width: '100%', height: 100, borderRadius: 12}}/>
                                        <View style={{position: 'absolute', top:-4, right: -4, zIndex:1000}}>
                                            <ButtonDelete buttonSize={18} onPress={ () => {itemDelete(item.id), modalVisible(true)}}/>
                                        </View>
                                </View>
                                :
                                <View style={{height: 120, justifyContent: 'space-between'}}>
                                    <View>
                                        <Image style={styles.itemImage} source={{uri:getAvatar(item?.user?.avatar_media?.preview)}} />
                                    </View>
                                    <Text style={[styles.itemText,{textAlign: 'center'}]}>
                                        {item.user.nickname}
                                    </Text>
                                </View>
                            
                        }
                    </View>
        </TouchableOpacity>
    );

    return (
        <View style={{}}>
            {
                deleteButton?

                <FlatList
                    data={stories}
                    contentContainerStyle={{ paddingVertical:20, flexWrap: 'wrap', flexDirection: 'row'}}
                    renderItem={renderItem}
                    nestedScrollEnabled
                />

                :

                <FlatList
                    showsHorizontalScrollIndicator={true}
                    horizontal
                    data={stories}
                    contentContainerStyle={styles.listContainer}
                    renderItem={renderItem}
                    nestedScrollEnabled
                />
            }
        </View>
    );
};

export default StoriesList;

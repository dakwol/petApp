import React, {FC, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Dimensions, FlatList, Image, ListRenderItemInfo, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import {IScreen, IStory} from "../../../types";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";
import {getMyStories} from '../../../api/user/getMyStories/getMyStories';
import { deleteStories } from '../../../api/user/deleteStories/deleteStories';
import ModalSimple from '../../../components/UI/ModalSimple/ModalSimple';
import StoriesList from '../../../components/Project/StoriesList/StoriesList';
import { useIsFocused } from '@react-navigation/native';
import { errorMessage } from '../../../utils/showMessage';
import { indexOf } from 'lodash';



const StoriesEditScreen:FC<IScreen> = (
    {
        navigation,
        route
    }
) => {

    const [storiesList, setStoriesList] = useState<any>();
    const [storDelete, setStorDelete] = useState<boolean>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isModalStor, setIsModalStor] = useState<any>();
    const isFocused = useIsFocused();

    const storiesDelete = async (id: any) => {
            await deleteStories(id);
            setStorDelete(!storDelete);
            setIsVisible(false);
    }

      useEffect(() => {
        getMyStories().then(resp => {
            
            if(resp.success){
                let isActiveStroies = [];  
                resp.data.stories.map((itemStories:any) =>{
                if(itemStories.is_active){
                    isActiveStroies.push(itemStories)
                }
                })
                isActiveStroies.unshift(
                {
                    id: -1,
                    user: resp.data.stories.user_id,
                    user_id: resp.data.stories.user_id,
                    is_active: false,
                    media: [],
                });
                setStoriesList(isActiveStroies)
                 
            } else {
                errorMessage({
                    message: translate("errors.unknownError"),
                });
            }
            setIsLoading(false)
        })
    },[isFocused, storDelete]);

    return (
        <ViewScreen>
            <View style={styles.background}>
                <View style={{ position: 'absolute', left: 0 }}>
                    <BackButton
                        text={translate('back')}
                        action={() => {
                            navigation.goBack()
                        }}
                    
                    />
                </View>
                <ModalSimple 
                    isVisible={isVisible} 
                    toggleModal={()=>{}} 
                    compState={undefined}
                >
                    <View style={{padding: 10}}>
                        <Text style={{marginBottom:10, fontWeight: 'bold', fontSize: 15}}>{translate("stories.verificationDelete")}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity style={{marginRight:20}} onPress={()=>{storiesDelete(isModalStor)}}>
                                <Text style={{fontWeight: 'bold', fontSize: 16}}>{translate("stories.yes")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setIsVisible(false)}}>
                                <Text style={{fontWeight: 'bold', fontSize: 16}}>{translate("stories.no")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ModalSimple>
                <View style={[styles.profileHeader, {width: '100%'}]}>
                       <View style={{paddingHorizontal: 16,}}>
                            <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: "#392413",
                                    lineHeight: 22.5,
                                    fontWeight: "500"
                                }}>{translate("stories.stories")}</Text>
                            </View>


                            {isLoading?
                                <ActivityIndicator size={48}/>
                                :
                                <View>
                                    <StoriesList 
                                        nestedScrollEnabled={false}
                                        onStoryPress={() => {} }
                                        stories={storiesList} 
                                        deleteButton={true}
                                        itemDelete={(id)=>{setIsModalStor(id)}}                                   
                                        modalVisible={(visible)=>{setIsVisible(visible)}}                                   
                                    />
                                </View>
                            }
                       </View>
                </View>
            </View>
        </ViewScreen>

    );
};

export default StoriesEditScreen;

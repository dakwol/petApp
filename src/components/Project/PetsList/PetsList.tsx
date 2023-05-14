import React, {FC} from 'react';
import {IPet} from "../../../types";
import {FlatList, Image, ListRenderItem, ListRenderItemInfo, Pressable, Text, View} from "react-native";
import {styles as stylesProfile} from "../Profile/styles";

import {getMediaFirst, getMediaPreview} from "../../../utils/common";
import {capitalizeFirstLetter, showFirstChars} from "../../../utils/text";
import {translate} from "../../../utils/translate";
import styles from "./styles";
import {SCREEN_WIDTH} from "../../../constants/globalStyles";
import {Dictionary} from "../../../locales/dictionary";

import {Dimensions} from "react-native";

interface PetsListProps {
    pets: IPet[],
    nestedScrollEnabled: boolean,
    onPetPress: (id:number) => void,
}

const PetsList:FC<PetsListProps> = ( {
                                            pets,
                                            nestedScrollEnabled= false,
                                            onPetPress = () => {}
                                         }) => {
    const renderItem = ({item}:ListRenderItemInfo<IPet>) => (
        <Pressable onPress={ () => { onPetPress(item.id) } } style={[{width: (Dimensions.get('window').width - 30) / 4.5}]}>
            <View key={`pet_${item.id}`}>
                <View style={[stylesProfile.sectionContainer]}>
                    <View style={[{alignItems:"center"}]}>
                        <Image style={[stylesProfile.sectionObjectImage,{resizeMode: "contain"}]} source={{uri:getMediaPreview(getMediaFirst(item.media))}} />
                        <Text >
                            {showFirstChars(capitalizeFirstLetter( item.name != null ? item.name: capitalizeFirstLetter(translate("pet.noname"))), 9)}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={true}
                horizontal
                data={pets}
                contentContainerStyle={styles.listContainer}
                renderItem={renderItem}
                nestedScrollEnabled
            />
        </View>
    );
};

export default PetsList;

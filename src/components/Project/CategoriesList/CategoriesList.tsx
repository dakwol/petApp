import React, {FC, useCallback, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import FlatListIcons from '../../Base/FlatListIcons/FlatListIcons';
import styles from './styles';
import {CategoryItem} from '../../../types';

type Props = {
    onItemPress: (item: CategoryItem) => void;
    categories: CategoryItem[];
    activeCategory?: number;
};

const CategoriesList: FC<Props> = ({onItemPress,categories,activeCategory = 0, ...props }) => {
    const renderItem = ({item}:any) => (
        <FlatListIcons key={item.id} activeItem={activeCategory} item={item} onPress={() => onItemPress(item)} />
    );


    const _renderItem = useCallback(
        ({item, index}: {item: CategoryItem; index: number}) => {
            return (
                <FlatListIcons activeItem={activeCategory} item={item} onPress={() => onItemPress(item)} />
            );
        },
        [],
    );
    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={categories}
                contentContainerStyle={styles.listContainer}
                renderItem={renderItem}
                //keyExtractor={item => item.id}
                //renderItem={ (item: any, index:any) => _renderItem2(item, index)}
            />
        </View>
    );
};

export default CategoriesList;

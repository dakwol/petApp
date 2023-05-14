import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {SvgUri} from 'react-native-svg';
import {CategoryItem} from '../../../types';
import {getSvgUrl} from "../../../utils/common";

import {cat_icons} from "../../../constants/images";


type Props = {
    item: CategoryItem;
    onPress: () => void;
    activeItem: number;
};
// @ts-ignore
const FlatListIcons: FC<Props> = ({item, onPress, activeItem,...props}) => {
    let itemStyles:any[] = [styles.itemContainer];
    if(activeItem == item.id) {
        itemStyles.push(styles.itemContainerActive);
    }

    return (
        <TouchableOpacity style={itemStyles} onPress={onPress}>
            <View style={styles.icon}>
                <Image
                    style={{transform: [{scaleX: 0.83}, {scaleY: 0.83}]}}
                    source={cat_icons[item.id]}
                />
            </View>
            <Text style={styles.itemText} numberOfLines={1}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    /*
    if (item.icon_link.includes(".svg"))
    {
        return (
            <TouchableOpacity style={itemStyles} onPress={onPress}>
                <View style={styles.icon}>
                    <SvgUri uri={getSvgUrl(item.icon_link)} style={styles.iconContainer} />
                </View>
                <Text style={styles.itemText} numberOfLines={1}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }
    else if (item.icon_link.includes(".png"))
    {
        return (
            <TouchableOpacity style={itemStyles} onPress={onPress}>
                <View style={styles.icon}>
                    <Image
                        style={{}}
                        source={cat_icons[item.id]}
                    />
                </View>
                <Text style={styles.itemText} numberOfLines={1}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }

     */
};

export default FlatListIcons;

import React, {FC, useEffect, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../SubCategoriesList/styles";
import {getSubCategories} from "../../../api/categories/getSubCategories/getSubCutegories";
import {SvgUri} from "react-native-svg";
import {cat_icons, closeIcon} from "../../../constants/images";
import CategoriesList from "../CategoriesList/CategoriesList";
import {getSvgUrl} from "../../../utils/common";

export interface ISubCategoriesList {
    category_id:number;
    subcategory_id: number;
    setActiveSubCategory: any;
    setShowSubCategories: any;
}

const SubCategoriesList: FC<ISubCategoriesList> = ({
                                                       category_id,
                                                       subcategory_id,
                                                       setActiveSubCategory,
                                                       setShowSubCategories,
                                                       ...props }) => {

    //const [subCategories, setSubCategories] = useState<any[]>([]);
    const [renderSubCategories, setRenderSubCategories] = useState<any[]>([]);

    const getSubCategoriesList = async (id:number) => {
        const resp = await getSubCategories({category_id:id});

        let renderData = [];
        renderData.push({
            id: -1,
            name: "",
            icon: closeIcon,
            uri:false,
            onPress: () => {setShowSubCategories(false)}
        })
        resp.data.map( (item: any) => {
            renderData.push({
                id: item.id,
                name: item.name,
                icon: false,
                icon_link:item.icon_link,
                onPress: () => {
                    (item.id == subcategory_id)
                        ? setActiveSubCategory(0)
                        : setActiveSubCategory(item.id)
                }
            })
        })
        setRenderSubCategories(renderData);
        //setShowSubCategories(true);
        //setSubCategories(resp.data);
    }

    useEffect( () => {
        getSubCategoriesList(category_id).then( () => {
            //setShowSubCategories(true);
        });
    }, [category_id])

    const renderItem = ({item}:any) => {
        const itemStyles = item.id == subcategory_id ? [styles.itemContainer, styles.itemContainerActive]:styles.itemContainer;
        return (
            <TouchableOpacity
                style={itemStyles}
                onPress={item.onPress}>
                {item.icon
                    ?
                    <View style={[styles.icon, {width:10, height:10, marginLeft: 5, transform: [{scaleX: 0.9}, {scaleY: 0.9}]}]}>
                        <Image source={item.icon} style={styles.iconContainer}/>
                    </View>
                    :
                    <View style={[styles.icon, {width: 15, height: 15, marginRight: 5}]}>
                        <Image source={cat_icons[item.id]} style={styles.iconContainer}/>
                    </View>
                }
                {/*
                {item.icon
                    ?
                    <View style={[styles.icon, {width:12, height:12}]}>
                        <Image source={item.icon} style={styles.iconContainer}/>
                    </View>
                    :
                    <View style={styles.icon}>
                        <SvgUri uri={getSvgUrl(item.icon_link)} style={styles.iconContainer}/>
                    </View>
                }*/}
                <Text style={styles.itemText} numberOfLines={1}>
                    {item.name}
                </Text>
            </TouchableOpacity>

            /*<FlatListIcons key={item.id} activeItem={activeCategory} item={item} onPress={() => onItemPress(item)} />*/
        );
    };

    return (
            <View style={[styles.container]}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={renderSubCategories}
                    contentContainerStyle={styles.listContainer}
                    renderItem={renderItem}
                    //keyExtractor={item => item.id}
                    //renderItem={ (item: any, index:any) => _renderItem2(item, index)}
                />
            </View>
    );
};

export default SubCategoriesList;

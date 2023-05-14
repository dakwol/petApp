import React, {FC, useEffect, useState} from 'react';
import {FlatList, Image, LogBox, TouchableOpacity, View} from 'react-native';
import styles from './styles';
//@ts-ignore
import ImageView from 'react-native-image-view';
import {getImageByUrl, getImageUri} from "../../../utils/common";

type Props = {
    onItemPress: (item: any) => void;
    items: any[];
    activeItem?: number;
};

interface IImageViewImage {
    source:{uri:string},
}

const FlatListImages: FC<Props> = ({onItemPress,items,activeItem = 0, ...props }) => {

    const [isImagesViewVisible, setIsImagesViewVisible] = useState<boolean>(false);
    const [images, setImages] = useState<IImageViewImage[]>([]);
    const [currentImage, setCurrentImage] = useState<number>(0)
    const [compState, setCompState] = useState();

    useEffect( () => {

        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        let tmpImages:IImageViewImage[] = [];
        console.log(items);
        items.map( item => {
            tmpImages.push({
                source:{uri:getImageUri(item)}
            })
        });
        console.log(tmpImages);
        setImages(tmpImages);


    }, [])

    const renderItem = ({item, index}:any) => {
        console.log(item);
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    setCurrentImage(index);
                    setIsImagesViewVisible(true);
                }}
                style={{
                    width: 200,
                    height: 200
                }}
            >
                <Image resizeMode="contain" source={item.source} style={{
                    width: 200,
                    height: 200
                }}/>
            </TouchableOpacity>

        );
    };
    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={images}
                contentContainerStyle={styles.listContainer}
                renderItem={renderItem}
            />
            <ImageView
                glideAlways
                controls={{next:true,prev:true,close:true}}
                images={images}
                imageIndex={currentImage}
                animationType="fade"
                isVisible={isImagesViewVisible}
                onClose={() => setIsImagesViewVisible( false)}
            />
        </View>
    );
};

export default FlatListImages;

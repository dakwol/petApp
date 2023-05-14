import React, {FC} from 'react';
import {FlatList, Image, ListRenderItemInfo, TouchableOpacity, View} from "react-native";
import {IEvent, IPet} from "../../../types";

import {getMediaFirst, getMediaFull, getMediaPreview, getMediaPreviewSrc} from "../../../utils/common";
import BlurImage from '../../UI/BlurImage/BlurImage';
import styles from "./styles";
import PlayButton from "../../UI/PlayButton/PlayButton";

interface IFeedListProps {
    data: IEvent[],
    onItemPress: (id:number, item?: any) => void,
    nestedScrollEnabled?: boolean
}

const FeedList:FC<IFeedListProps> = ({data, onItemPress, nestedScrollEnabled = false, ... props}) => {
    const renderItem = ({item}:ListRenderItemInfo<IEvent>) => (
        <TouchableOpacity style={styles.itemContainer} key={`event_${item.id}`} onPress={ () => { onItemPress(item.id)} }>
                <BlurImage
                    resizeMode={undefined}
                    media={getMediaPreviewSrc(getMediaFirst(item.media))}
                    blur={(getMediaFirst(item.media).is_checked === 0) }
                    style={styles.itemImg}
                    resizeMethod={undefined}
                />
                {getMediaFirst(item.media).media_type !== undefined && getMediaFirst(item.media).media_type === "video" &&
                    <PlayButton/>
                }
        </TouchableOpacity>
    );
    return (
        <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={(item: IEvent) => item.id.toString()}
            columnWrapperStyle={{justifyContent:"flex-start"}}
            contentContainerStyle={styles.listEvent}
            nestedScrollEnabled
        />
    );
};

export default FeedList;

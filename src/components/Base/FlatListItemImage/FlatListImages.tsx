import React, {FC} from 'react';
import {Image} from 'react-native';

type Props = {
    image: any;
    onPress: () => void;
    activeItem: number;
};
const FlatListItemImage: FC<Props> = ({image, onPress, activeItem,...props}) => {
    return (
        <Image source={{uri: image}} />
    );
};

export default FlatListItemImage;

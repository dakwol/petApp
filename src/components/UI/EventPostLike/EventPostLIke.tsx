import React, { FC, useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Image, Pressable, ActivityIndicator} from 'react-native';
import { getEvents } from '../../../api/events/getEvents';
import { globalStyles } from '../../../constants/globalStyles';
import {activeLikePostIcon, leftIcon, unActiveLikePostIcon} from '../../../constants/images';
import { IEvent } from '../../../types';
import { getFormData } from '../../../utils/formData';
import styles from './styles';

interface IEventLikePost {
    isLiked: boolean;
    onLike: () => void;
    onUnLike: () => void;
};

const EventPostLike: FC<IEventLikePost> = ({
                                               isLiked,
                                               onLike = () => {},
                                               onUnLike = () => {}
}) => {
  return (
    <View>
        <Pressable onPress={ (isLiked) ? onUnLike:onLike }>
            <Image
                source={isLiked ? activeLikePostIcon : unActiveLikePostIcon}
                style={styles.favouriteIcon}
            />
        </Pressable>
    </View>
  );
};

export default EventPostLike;

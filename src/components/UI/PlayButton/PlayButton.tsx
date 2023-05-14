import React, {FC, useState} from 'react';
import { Ionicons } from "@expo/vector-icons";
import styles from './styles';

const PlayButton = () => {
    return <Ionicons style={[styles.playBtn]} name="ios-play" size={50} />;
}

export default PlayButton;
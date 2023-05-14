import React, {FC} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {translate} from '../../../utils/translate';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';

type Props = {
  onPress: () => any;
  style?: {};
  icon?: any;
  size?: number;
};

const ButtonMapNavigate: FC<Props> = ({onPress,...props}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, props.style]}>
        <Entypo name={props.icon} size={props.size} color="black" />
      </TouchableOpacity>
    );
};

export default ButtonMapNavigate;

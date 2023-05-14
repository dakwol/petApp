import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {leftIcon} from '../../../constants/images';
import styles from './styles';

type Props = {
  text: String;
  action: () => void;
  stylesContainer?: any;
};
const BackButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.action} style={styles.backButton} >
      <View style={[styles.container, props.stylesContainer]}>
        <Image source={leftIcon} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

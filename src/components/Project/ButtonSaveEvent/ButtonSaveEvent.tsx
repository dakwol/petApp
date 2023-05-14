import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {MaterialIndicator} from "react-native-indicators";
import {colors} from "../../../constants/Colors";

type Props = {
  onPress: () => void;
  buttonText: string;
  style?: {};
  textStyle?: {};
  loading?: boolean

};

const ButtonSaveEvent: FC<Props> = ({onPress, buttonText, loading= false, ...props}) => {
  return (
      <>
        {loading ? (
            <TouchableOpacity onPress={() => {} } style={[styles.container, props.style]}>
              <MaterialIndicator color={colors.white} size={25} />
            </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={onPress} style={[styles.container, props.style]}>
              <Text style={[styles.buttonText, props.textStyle]}>{buttonText}</Text>
            </TouchableOpacity>
        )}
      </>
  );
};

export default ButtonSaveEvent;

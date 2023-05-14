import React, {FC} from 'react';
import {View, Text, Switch} from 'react-native';
import {colors} from '../../../constants/Colors';
import styles from './styles';

type Props = {
  onToggle: (value: boolean) => void;
  value: boolean;
  text: string;
};
const ToggleButton: FC<Props> = ({value = false, ...props}) => {
  const onChangeValue = () => {
    props.onToggle(value);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
      <Switch
        trackColor={{true: colors.greenPH}}
        thumbColor={colors.white}
        ios_backgroundColor={colors.lightGray}
        onValueChange={onChangeValue}
        value={value}
        style={styles.toggleButton}
      />
    </View>
  );
};

export default ToggleButton;

import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fonts} from '../../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 47,
    width: '100%',
  },
  text: {
    fontSize: 18,
    lineHeight: 22.5,
    fontFamily: fonts.Medium,
    flex: 1,
  },
  toggleButton: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
});

export default styles;

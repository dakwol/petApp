import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fonts} from '../../../constants/fonts';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 70,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  icon: {
    top: 5,
    marginRight: 10,
  },
  text: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.black,
  },
  buttonSettings: {
    justifyContent:'center',
    paddingHorizontal: 5
  }
});
export default styles;

import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fonts} from '../../../constants/fonts';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30,
  },
  descriptionMsg: {
    width: SCREEN_WIDTH * 0.8,
  },
  descriptionMsgText: {
    color: colors.cedar,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  checkBoxContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.rainee,
    paddingBottom: 5,
  },
});
export default styles;

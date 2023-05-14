import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fonts} from '../../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: colors.lightGray,
    borderRadius: 41,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 19,
  },
  textInput: {
    height: 48,
    backgroundColor: colors.lightGray,
    marginHorizontal: 16,
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.Bold,
    lineHeight: 17,
  },
  iconLeft: {
    height: 15,
    width: 15,
  },
  iconRight: {
    height: 11,
    width: 11,
  },
});
export default styles;

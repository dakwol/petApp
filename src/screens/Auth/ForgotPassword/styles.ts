import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fonts} from '../../../constants/fonts';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
  },
  vwFlexOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 0.2,
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    flex: 0.4,
    alignItems: 'center',
  },
  errorMessage: {
    width: SCREEN_WIDTH * 0.8,
    marginBottom: 50,
  },
  errorMessageText: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    textAlign: 'center',
  },
  headingTitleContainer: {
    marginBottom: 40,
  },
  headingTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.greenPH,
  },
  descriptionMsg: {
    marginBottom: 30,
  },
  descriptionMsgText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});
export default styles;

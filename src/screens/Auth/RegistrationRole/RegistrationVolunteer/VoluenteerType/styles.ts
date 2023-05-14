import { StyleSheet } from 'react-native';
import { colors } from '../../../../../constants/Colors';
import { fonts } from '../../../../../constants/fonts';
import { SCREEN_WIDTH } from '../../../../../constants/globalStyles';

const styles = StyleSheet.create({
  vwFlexOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
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
    marginTop: 60,
  },
  whiteBtn: {
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 2,
    borderColor: colors.greenPH
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
  bottomImage: {
    marginBottom: 40,
  },
});
export default styles;

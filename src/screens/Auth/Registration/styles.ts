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
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    marginTop:10,
  },
  bottomContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  errorMessage: {
    marginBottom: 50,
  },
  errorMessageText: {
    fontFamily: fonts.Regular,
    fontSize: 16,
  },
  headingTitleContainer: {
    marginTop: 60,
  },
  headingTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.greenPH,
  },
  descriptionMsg: {
    width: SCREEN_WIDTH * 0.8,
    marginBottom: 15,
  },
  descriptionMsgText: {
    color: colors.cedar,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  textLink: {
    color: colors.greenPH,
  },
});
export default styles;

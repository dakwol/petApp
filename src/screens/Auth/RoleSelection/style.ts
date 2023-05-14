import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fonts} from '../../../constants/fonts';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  vwFlexOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  bottomContainer: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
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
    marginBottom: 30,
  },
  descriptionMsgText: {
    color: colors.cedar,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  textLink: {
    color: colors.greenPH,
  },
  blackText: {
    color: colors.black,
    textAlign: 'right',
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
  },
  modalStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerStyle: {width: SCREEN_WIDTH * 0.8},
});

export default styles;

import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fonts} from '../../../constants/fonts';

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
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 0.3,
    marginBottom: 10,
  },
  errorMessage: {
    marginBottom: 50,
  },
  errorMessageText: {
    fontFamily: fonts.Regular,
    fontSize: 16,
  },
  headingTitleContainer: {
    marginBottom: 40,
  },
  headingTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.greenPH,
  },
});

export default styles;

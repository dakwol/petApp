import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';

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
  headingTitleContainer: {
    width: SCREEN_WIDTH * 0.8,
    alignItems: 'flex-end',
    marginTop: 30,
  },
  headingTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.greenPH,
  },
});

export default styles;

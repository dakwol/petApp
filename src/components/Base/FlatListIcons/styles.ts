import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  iconContainer: {
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (SCREEN_WIDTH) / 4,
    paddingVertical:5,
  },
  itemContainerActive: {
    backgroundColor: colors.lightGray
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#6F7565',
  },
});

export default styles;

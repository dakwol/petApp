import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import { SCREEN_HEIGHT } from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  modalUp: {
    margin: 0,
    height: SCREEN_HEIGHT - 200,
    justifyContent:'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  modalHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  modalUpContainer: {
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingHorizontal: 0,
  },
  toggleBar: {
    backgroundColor: colors.greenPH,
    width: 40,
    height: 5,
    borderRadius: 3,
    marginVertical: 5,
    alignSelf: 'center',
  },
});

export default styles;

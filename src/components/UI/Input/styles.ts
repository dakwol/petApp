import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  inputSection: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.13,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(138, 196, 58, 0.6)',
  },
  input: {
    width: SCREEN_WIDTH * 0.8,
    height: 40,
    marginVertical: 12,
  },
  tinyLogo: {
    marginRight: 14,
    marginTop: 25,
  },
  tinyLogoRight: {
    position: 'absolute',
    right: 0,
  },
});
export default styles;

/*
import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  inputSection: {
    width: SCREEN_WIDTH * 0.8,
    //height: SCREEN_WIDTH * 0.13,
    height: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(138, 196, 58, 0.6)',
  },
  input: {
    width: "100%",
    height: 20,
    marginVertical: 12,
  },
  tinyLogo: {
    marginRight: 14,
    marginTop: 25,
  },
  tinyLogoRight: {
    position: 'absolute',
    right: 0,
  },
});
export default styles;
*/

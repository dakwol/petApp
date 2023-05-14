import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';
import { fonts } from '../../../constants/fonts';
import { SCREEN_WIDTH } from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 70,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  cardTask: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: 'white',
    marginTop: 20
  },
  icon: {
    top: 5,
    marginRight: 10,
  },
  text: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.black,
  },
  buttonSettings: {
    justifyContent: 'center',
    paddingHorizontal: 5
  }
});
export default styles;
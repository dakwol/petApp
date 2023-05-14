import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../constants/Colors';
import {SCREEN_WIDTH} from "../../constants/globalStyles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    marginHorizontal: 2,
    marginVertical: 8,
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  categoriesList:{
    marginVertical: 5,
  },
  bottomContainer: {
    height: 270,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
    elevation: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  bottomButtonContainer: {
    height: 70,
    width: SCREEN_WIDTH,
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    width: '45%',
    backgroundColor: colors.white,
    elevation:5
  },
  buttonTextStyle: {
    color: colors.greenPH,
    fontSize: 14,
    fontWeight: '200'
  }
});

export default styles;

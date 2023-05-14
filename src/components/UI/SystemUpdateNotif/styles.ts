import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    zIndex: 1000,
    padding: 20
  },
  containerElem: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },
  btn: {
    backgroundColor: colors.greenPH,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default styles;

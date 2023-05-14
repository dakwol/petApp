import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';

const styles = StyleSheet.create({
  containerMain: {
   flex:1,
    backgroundColor: colors.white,
  },
  mapSection: {
    height: 200,
    opacity:1
  },
  container: {
    // marginHorizontal: 10,
  },
  formContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  fieldLine: {
    borderBottomColor: colors.greenPH,
    borderBottomWidth: 1,
  },
  input: {
    height: 50,
    fontSize: 16,
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.greenPH,
  },
  halfInput: {
    width: '48%',
  },

  bigInput: {
    height: 50,
    borderColor: colors.greenPH,
    borderWidth: 0.5,
    marginTop: 33,
    textAlign: 'center',
  },
  textInputsRow: {
    flexDirection: 'row',
    marginHorizontal: 0,
    justifyContent: "space-between",
    marginTop:1,
  },
  image: {
    height: 79,
    width: 102,
    alignSelf: 'center',
    marginTop: 30,
  },
  submitButton: {
    marginTop: 15,
  },
  dropdown: {
    borderColor: colors.greenPH,
    borderRadius: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingHorizontal: 0,
    paddingTop:15,
    marginTop: 0,
  },
  dropdownContainer: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderColor: colors.greenPH,
    zIndex: 9999
  },
  iconDown: {
    height: 6,
    width: 12,
    margin: 2,
  },
  dropdownText: {
    color: colors.cedar,
    opacity: 0.5,
    flex: 1,
    fontSize: 16,
  },
});

export default styles;

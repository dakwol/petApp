import { StyleSheet } from 'react-native';

import { colors } from '../../../constants/Colors';


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft:20,
    marginRight:20,
    marginBottom: 0,
    // flex: 1,
    // minHeight: 5566
  },
  formLayout: {
    flexDirection: 'row',
  },
  leftLayout: {
    width: '50%',
  },
  rightLayout: {
    width: '50%',
    alignItems: 'flex-end',
  },

  bottomLayout: {
    marginTop: 20,
  },
  submitButton: {
    marginTop: 30,
  },
  input: {
    height: 50,
    fontSize: 16,
    marginTop: 0,
    borderBottomColor: colors.greenPH,
    borderBottomWidth: 1
  },
  halfInput: {
    width: '48%',
  },

  bigInput: {
    height: 50,
    borderColor: colors.greenPH,
    borderWidth: 0.5,
    marginTop: 33,
    paddingHorizontal: 10,
    //textAlign: 'center',
  },
  textInputsRow: {
    flexDirection: 'row',
    marginHorizontal: 0,
    justifyContent: "space-between"
  },
  image: {
    height: 79,
    width: 102,
    alignSelf: 'center',
    marginTop: 30,
    resizeMode: "contain"
  },

  dropdown: {
    borderColor: colors.greenPH,
    borderRadius: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingHorizontal: 0,
    paddingTop: 5,
    marginTop: 5,
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

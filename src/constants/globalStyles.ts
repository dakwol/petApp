import { Dimensions, StyleSheet } from 'react-native';

import { colors } from "./Colors";

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const globalStyles = StyleSheet.create({
  formFieldLabel: {
    fontSize: 16,
    color: colors.halfCedar
  },


  parentContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: colors.greenPH,
  },
  screenContainer: {
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    backgroundColor: colors.white,
    overflow: 'hidden',
    flex: 1,
  },


  vwFlexOneCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwFlexOne: {
    flex: 1,
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
  headerContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingRight: 10,
  },
  headerImage: {
    marginTop: 30,
  },
  backgroundWhite: {
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodySectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    color: "#392413",
    lineHeight: 27,
    fontWeight: "500"
  },
  bodySectionSubTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    color: "#392413",
    lineHeight: 27,
    fontWeight: "500"
  },
  halfInput: {
    width: '48%',
    marginRight: '1%'
  },
  'halfInput:last-child': {
    width: '48%',
    marginLeft: '1%'
  },
  errorInput: {
    borderWidth: 2,
    borderColor: '#ff0000d4',
    borderRadius: 5
  }
});

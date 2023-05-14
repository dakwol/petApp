import {StyleSheet} from 'react-native';
import {colors} from '../../constants/Colors';
import {fonts} from '../../constants/fonts';

const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  parentContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: colors.greenPH,
  },
  container: {
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    backgroundColor: colors.white,
    overflow: 'hidden',
    flex: 1,
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  categoriesList: {
    marginVertical: 10,
  },
  listTitle: {
    marginHorizontal: 15,
  },
  addEventTestBtn: {
    justifyContent: 'center',
  },
  btnAddTestText: {
    fontFamily: fonts.Medium,
    textAlign: 'center',
    color: colors.greenPH,
    fontSize: 14,
    lineHeight: 17,
  },
  modalAddEvent: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  eventList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  modalAddEventContainer: {
    backgroundColor: colors.white,
    paddingBottom: 50,
    marginTop: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  toggleBar: {
    backgroundColor: colors.greenPH,
    width: 40,
    height: 5,
    borderRadius: 3,
    marginVertical: 5,
    alignSelf: 'center',
  },
  titleNewEvents: {
    fontSize: 24,
    fontFamily: fonts.Medium,
    marginBottom: 12,
  },
  eventFormContainer: {
    marginHorizontal: 31,
  },
  eventCardContainer: {
    marginHorizontal: 30,
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    backgroundColor: colors.greenPH,
  },
  tabBarButton: {
    flex: 1,
    height: ifIphoneX(80, 60),
  },
  tabBarIcon: {
    height: 18,
    width: 18,
  },
  tabBarLabelIcon: {
    alignItems: 'center',
    marginTop: 12,
  },
  inActiveTab: {
    opacity: 0.5,
  },
  activeTabBorderContainer: {
    height: 9,
    marginTop: 4,
    width: '100%',
    overflow: 'hidden',
  },
  activeTabBorder: {
    height: 18,
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 35,
  },
});
export default styles;

import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fonts} from '../../../constants/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: SCREEN_HEIGHT - 150,
  },
  imagesContainer: {
    width: '50%',
    justifyContent: 'space-between',
    height: SCREEN_WIDTH * 0.42,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  topicText: {
    fontSize: 28,
    fontFamily: fonts.Bold,
    marginTop: 8,
    lineHeight: 35,
    color: colors.greenPH,
  },
  detailRow: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: "center"

  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 8,
  },
  detailText: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    lineHeight: 17.5,
    flex: 1,
    color: colors.cedar,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;

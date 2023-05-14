import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fonts} from '../../../constants/fonts';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greenPH,
    width: SCREEN_WIDTH * 0.56,
    borderRadius: 8,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.Bold,
    fontSize: 16
  },
});

export default styles;

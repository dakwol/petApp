import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking, Pressable} from 'react-native';
import { translate } from '../../../utils/translate';
import styles from './styles';

type Props = {
  platform: any;
  action: () => void;
};
const SystemUpdateNotif = (props: Props) => {

  let linkApp: string;

  if(props.platform == 'ios'){
    linkApp = 'http://itunes.apple.com/ru/lookup?bundleId=com.zooclick.app';
  } else {
    linkApp = 'https://play.google.com/store/apps/details?id=com.zooclick.app';
  }

  return (
      <Pressable style={styles.container} onPress={()=>{props.action()}}>
          <View style={styles.containerElem}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{translate('system.systemUpdate')}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(linkApp)} style={styles.btn}>
              <Text style={{color: 'white', fontSize: 15}}>{translate('system.update')}</Text>
            </TouchableOpacity>
          </View>
      </Pressable>
  );
};

export default SystemUpdateNotif;

import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../../constants/Colors';
import Input from '../../../components/UI/Input/Input';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';

type Props = {
  companyAddress: string;
  serviceAddrress: string;
  actionOne: (value: string) => void;
  actionTwo: (value: string) => void;
};
const AdditionalAddress = ({
  companyAddress,
  serviceAddrress,
  actionOne,
  actionTwo,
}: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [updateStyle, setUpdateStyle] = useState({
    update: false,
    value: {transform: [{scaleX: 0.7}, {scaleY: 0.7}]},
  });
  return (
    <View>
      <View style={styles.inputContainer}>
        <View>
          <View style={styles.descriptionMsg}>
            <Text style={styles.descriptionMsgText}>
              Please add a company address(-es)
            </Text>
          </View>
        </View>
        <Input
          valueText={companyAddress}
          onChange={actionOne}
          placeHolderText="Company address *"
          isShowIcon={false}
        />
      </View>
      <View>
        <View style={styles.descriptionMsg}>
          <Text style={styles.descriptionMsgText}>
            Please add a service address
          </Text>
        </View>
        <Input
          valueText={serviceAddrress}
          onChange={actionTwo}
          placeHolderText="Company ID"
          isShowIcon={false}
        />
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue: boolean) => {
            setToggleCheckBox(newValue);
            setUpdateStyle({...updateStyle, update: true});
          }}
          boxType="square"
          lineWidth={3}
          tintColor={colors.rainee}
          onTintColor={colors.greenPH}
          onCheckColor={colors.greenPH}
        />
        <Text style={styles.checkBoxText}>Matches the legal address</Text>
      </View>
    </View>
  );
};

export default AdditionalAddress;

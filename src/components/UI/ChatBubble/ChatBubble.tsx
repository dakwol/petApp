import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {colors} from "../../../constants/Colors";
/* import Icon from "react-native-vector-icons/MaterialCommunityIcons"; */
import {Icons} from "../../../constants/images";
import {globalStyles} from '../../../constants/globalStyles';
import styles from './styles';
import Svg, { Path } from 'react-native-svg'

type Props = {
    key: any;
    text: String;
    dt_added: String;
    mine: boolean
};
const ChatBubble:FC<Props> = (props) => {
    return (
        <View style={[
                styles.message,
                props.mine ? styles.mine : styles.notMine
            ]}>
            <View
                style={[styles.cloud,
                    {
                        backgroundColor: props.mine ? colors.zcGreenOpacity8 : colors.zcBrownOpacity8
                    }
                ]}
            >
                {
                    props.text ?
                        <View key={props.key}>
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: props.mine ? 'black' : 'black'
                                }
                            ]}

                            >
                            {props.text}
                        </Text>
                        <Text style={[
                            styles.text_dt,
                            {
                                alignSelf: props.mine ? 'flex-end' : 'flex-start'
                            }
                        ]}>
                            {props.dt_added}
                        </Text>
                        </View>
                    :
                    null
                }
                <View
                    style={[
                        styles.arrow_container,
                        props.mine ? styles.arrow_right_container : styles.arrow_left_container
                    ]}
                >
                    <Svg style={props.mine ? styles.arrow_right : styles.arrow_left }
                        width="15"
                        height="17.5"
                        viewBox="32.484 17.5 15.515 17.5"
                        enable-background="new 32.485 17.5 15.515 17.5"
                    >
                        <Path
                            d={ props.mine
                                ?
                                "M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                                :
                                "M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"

                            }
                            fill={props.mine ? colors.zcGreenOpacity8 : colors.zcBrownOpacity8}
                            x="0"
                            y="0"
                        />
                    </Svg>
                </View>
            </View>
        </View>
    );
};

export default ChatBubble;

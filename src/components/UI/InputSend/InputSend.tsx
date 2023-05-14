import React, {FC} from 'react';
import Input from "../Input/Input";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../constants/globalStyles";
import {View} from "react-native";

interface IInputSend {
    onChange: any;
    placeHolderText: string;
    valueText?: string;
    isShowIcon?: boolean;
    icon?: any;
    type?: any;
    isShowRightIcon?: boolean;
    rightIcon?: any;
    isPassword?: boolean;
    onPress: any;
    inputRef: any;
    extraStyles?: any;
}

const InputSend:FC<IInputSend> = ({
                                      onChange,
                                      inputRef,
                                      placeHolderText,
                                      valueText,
                                      type = 'none',
                                      icon,
                                      extraStyles,
                                      isShowIcon = true,
                                      isShowRightIcon = false,
                                      rightIcon,
                                      isPassword = false,
                                      onPress,
                                      ...props
                                  }) => {

    return (
        <View style={{backgroundColor:"#FFF"}}>
            <Input
                onChange={onChange}
                placeHolderText={placeHolderText}
                isShowRightIcon
                rightIcon={rightIcon}
                onPress={onPress}
                inputRef={inputRef}

                extraStyles={extraStyles != undefined? extraStyles : {
                    inputSection: {
                        width: SCREEN_WIDTH - 20,
                        paddingRight: 5,
                        paddingLeft: 0,
                        borderTopWidth: 1,
                        borderTopColor: 'rgba(138, 196, 58, 0.6)',
                        borderBottomWidth: 0,
                        height:60,
                        marginLeft:10,
                        marginRight:10,
                        paddingTop:0,
                    },
                    input: {
                        width: SCREEN_WIDTH - 10,
                        height:50,
                        fontSize:16,
                        padding:0,
                        marginVertical:0,
                        marginTop:5,
                        paddingRight: 40
                    },
                    tinyLogoRight: {
                        width:24,
                        height:24,
                        marginTop: 18,
                    }
                }}
            ></Input>
        </View>
    );
};

export default InputSend;

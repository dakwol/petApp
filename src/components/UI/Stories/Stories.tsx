import React, {FC, useState} from 'react';
import {Dimensions, Pressable, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import {ProgressBar, StoryContainer} from 'react-native-stories-view';
import {colors} from '../../../constants/Colors';
import {AntDesign} from '@expo/vector-icons';

type Props = {
    visible: boolean,
    onComplete: (value: any) => void,
    images: any[],
    duration?: number,
}



const Stories:FC<Props> = ({
                               onComplete,
                               visible,
                               images = [],
                               duration= 30,
                               ...props}) => {

    const [stopTouch, setStopTouch] = useState(true)

    const CloseStore = () => {
        return (
            <TouchableOpacity onPress={() => onComplete(false)}>
                <View style={{position: 'absolute', top: 35, right: 20}}>
                    <Pressable onPress={() => onComplete(false)} ><AntDesign name="close" size={24} color={colors.white} /></Pressable>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex:1}} onTouchMove={() => setStopTouch(false)} onTouchEnd={() => setStopTouch(true)}>
            <StoryContainer
                visible={visible}
                enableProgress={true}
                images={images}
                duration={duration}
                onComplete={() => { }}
                containerStyle={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: colors.black
                }}
                barStyle={{
                    barActiveColor: colors.white,
                    barInActiveColor: colors.gray,
                    barWidth: 100,
                    barHeight: 3
                }}
                imageStyle={{
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                    alignSelf: "center",
                    resizeMode: "contain",
                }}
                headerComponent={CloseStore()}
            />
        </View>
    );
};

export default Stories;

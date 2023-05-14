import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import ProgressBar from './ProgressBar';

type Props = {
    next: () => void;
    pause: boolean;
    isLoaded: boolean;
    isNewStory: boolean;
    duration: number;
    stories: any[];
    currentStory: Object;
    currentIndex: number;
    length: number[];
    progress: Object;
};

const ProgressArray = (props: Props) => {
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (props.pause) {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [props.pause]);

    return (
        <Animated.View style={[styles.progressBarArray, {opacity}]}>
            {props.stories.map((item, index) => (
                <ProgressBar
                    index={index}
                    key={index}
                    duration={item.duration || 3}
                    isNewStory={props.isNewStory}
                    currentIndex={props.currentIndex}
                    next={props.next}
                    length={props.stories.length}
                    active={index === props.currentIndex ? 1 : index < props.currentIndex ? 2 : 0}
                    isLoaded={props.isLoaded}
                    pause={props.pause}
                />
            ))}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    progressBarArray: {
        flexDirection: 'row',
        position: 'absolute',
        top: 30,
        width: '98%',
        height: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default ProgressArray;

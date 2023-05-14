import React, {FC} from 'react';
import {View} from "react-native";

//@ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {styles} from "./styles";

interface StarsRating {
    stars: number[],
    starSize: number,
    //styleContainer: any,
    //styleStar: any,
}

const StarsRating:FC<StarsRating> = ({
                                         stars = [0,0,0,0,0],
                                         starSize = 15,
}) => {
    return (
        <View style={[styles.alignItems]}>
            {stars.map( (star:number, index) => {
                if (star == 1) {
                    return <Icon key={`star_${index}`} name="star" size={starSize} style={[styles.starFull]}/>
                }
                return <Icon key={`star_${index}`} name="star-outline" size={starSize} style={[styles.starEmpty]}/>
            })}
        </View>
    );
};

export default StarsRating;

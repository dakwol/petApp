import React, {FC} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../../constants/Colors';
import {
    favIconTab,
    homeIconTab,
    locationIcon,
    mapIconTab,
    messageIconTab,
    profileIconTab,
} from '../../../constants/images';
import {SCREENS} from '../../../navigation/screenName';
import styles from './styles';
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import {translate} from "../../../utils/translate";
import {capitalizeFirstLetter} from "../../../utils/text";
import {Badge} from "react-native-elements";


interface ICustomTabBar {
    state: any;
    descriptors: any;
    navigation: any;
    alarmMarkers: any;
    [x:string]: any;
}
const CustomTabBar:FC<ICustomTabBar> = ({
                                            state,
                                            descriptors,
                                            navigation,
                                            alarmMarkers,
                                            ...props
                                        }) => {

    //console.log('wss 3', alarmMarkers);

    /*
    const tabHiddenRoutes = [SCREENS.FavoritesScreenEvent,SCREENS.SCREENS.HomeScreenEvent];

    if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
        navigation.setOptions({tabBarVisible: false});
    }
    else{
        navigation.setOptions({tabBarVisible: true});
    }
    */
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route: any, index: number) => {
                const {options} = descriptors[route.key];
                let label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                let extraImageStyle = {};
                let extraTabBarLabelIcon = {};
                const isFocused = state.index === index;
                let iconName;
                switch (route.name) {
                    case SCREENS.Home:
                        label = capitalizeFirstLetter(translate('menu.home'))
                        extraImageStyle = {width:24, height:24}
                        extraTabBarLabelIcon = {marginTop:6};
                        iconName = homeIconTab;
                        break;
                    case SCREENS.Favorites:
                        iconName = favIconTab;
                        break;
                    case SCREENS.Map:
                        iconName = mapIconTab;
                        break;
                    case SCREENS.Messages:
                        iconName = messageIconTab;
                        break;
                    case SCREENS.Profile:
                        iconName = profileIconTab;
                        break;
                    default:
                        break;
                }

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({name: route.name, merge: true});
                    }
                };
                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={styles.tabBarButton}>
                        <View>
                            <View
                                style={[
                                    styles.tabBarLabelIcon,
                                    !isFocused && styles.inActiveTab,
                                    extraTabBarLabelIcon
                                ]}>
                                <Image
                                    source={iconName}
                                    style={[styles.tabBarIcon, extraImageStyle]}
                                    resizeMode="contain"
                                />
                                <Text style={{color: colors.white,fontSize:12}}>{label}</Text>
                                {isFocused && (
                                    <View style={styles.activeTabBorderContainer}>
                                        <View style={styles.activeTabBorder}></View>
                                    </View>
                                )}

                            </View>
                            {alarmMarkers[route.name] && (
                                <Badge
                                    status="error"
                                    containerStyle={{ position: "absolute", top: 5, right: 23}}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
export default CustomTabBar;

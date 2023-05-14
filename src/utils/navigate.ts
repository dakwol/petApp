import {SCREENS} from "../navigation/screenName";

export const navigateTo = (navigation: any, screen: string, params?: any) => {
    const bottomNavigators = [SCREENS.HomeScreen, SCREENS.FavoritesScreen, SCREENS.Map,SCREENS.Messages, SCREENS.Profile];
    //navigation = useNavigation();
    let navOptions:{screen:string, params?:any} = {
        screen: screen
    };
    if(params) {
        navOptions.params = params;
    }


    if(bottomNavigators.includes(screen)) {
        // @ts-ignore
        navigation.navigate('BottomTabNavigator', navOptions);
    } else {
        // @ts-ignore
        navigation.navigate('CommonNavigator', navOptions)
    }
}


export const navigateToHome = () => {

}

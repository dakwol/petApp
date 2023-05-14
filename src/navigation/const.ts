import EventScreen from "../screens/Event/EventScreen/EventScreen";
import EventFormScreen from "../screens/Event/EventFormScreen/EventFormScreen";

export const NAVIGATORS = {
    CommonNavigator: {
        name: 'CommonNavigator',
        screens: {
            EventScreen: {
                name: 'EventScreen',
                component: EventScreen
            },
            EventFormScreen: {
                name:'EventFormScreen',
                component: EventFormScreen
            }
        }
    }
}

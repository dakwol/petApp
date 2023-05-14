import * as React from 'react';
import {BottomTabParamList, HomeParamList} from '../types';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Favorites from '../screens/Favorites/Favorites';
import Map from '../screens/Map/Map';
import Message from '../screens/Message/Message';
import CustomTabBar from '../components/UI/CustomTabBar/CustomTabBar';
import {SCREENS} from './screenName';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import ProfileUserScreen from "../screens/Profile/ProfileUserScreen/ProfileUserScreen";
import ProfileSettings from "../screens/Profile/ProfileSettings/ProfileSettings";
import ProfileNotifications from "../screens/Profile/ProfileNotifications/ProfileNotifications";
import ProfileNotificationsList from "../screens/Profile/ProfileNotificationsList/ProfileNotificationsList";
import ProfileApp from "../screens/Profile/ProfileApp/ProfileApp";
import ProfilePassword from "../screens/Profile/ProfilePassword/ProfilePassword";
import ProfileFeedbackScreen from "../screens/Profile/ProfileFeedbackScreen/ProfileFeedbackScreen";
import ProfileLocation from "../screens/Profile/ProfileLocation/ProfileLocation";
import ProfileNickname from '../screens/Profile/ProfileNickname/ProfileNickname';
import ProfileDeleteScreen from "../screens/Profile/ProfileDeleteScreen/ProfileDeleteScreen";
import ProfileMyTaskScreen from '../screens/Profile/ProfileMyTaskScreen/ProfileMyTaskScreen';
import {useSelector} from "react-redux";
import TaskFormScreen from '../screens/Event/TaskFormScreen/TaskFormScreen';
import TaskScreen from '../screens/Event/TaskScreen/TaskScreen';
import TaskChatScreen from '../screens/Message/TaskChatScreen/TaskChatScreen';
import TaskChatExecuterScreen from '../screens/Message/TaskChatExecuterScreen/TaskChatExecuterScreen';
import TaskChatOpenScreen from '../screens/Message/TaskChatOpenScreen/TaskChatOpenScreen';


const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<HomeParamList>();
const tabScreenOptions:BottomTabNavigationOptions = {
    headerShown: false,
    tabBarAllowFontScaling: true,
    tabBarHideOnKeyboard: true,
    tabBarStyle: { display: "none" }
}
const stackScreenOptions:StackNavigationOptions = {
    headerShown: false,
}

function HomeStack(props: any) {

    return(
        <Stack.Navigator initialRouteName={SCREENS.HomeScreen} >
            <Stack.Screen name={SCREENS.HomeScreen} component={Home} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.TaskScreen} component={TaskScreen} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.TaskFormScreen} component={TaskFormScreen} options={stackScreenOptions} />
            {/*
            <Stack.Screen name={SCREENS.AddEvent} component={EventForm} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.HomeScreenEvent} component={EventScreen} options={stackScreenOptions } />
            */}
        </Stack.Navigator>
    )
}

function FavoritesStack() {

    return(
        <Stack.Navigator initialRouteName={SCREENS.FavoritesScreen} >
            <Stack.Screen name={SCREENS.FavoritesScreen} component={Favorites} options={stackScreenOptions} />
            {/*
            <Stack.Screen name={SCREENS.FavoritesScreenEvent} component={EventScreen} options={stackScreenOptions} />
            */}
        </Stack.Navigator>
    )
}

function MessageStack() {

    return(
        <Stack.Navigator initialRouteName={SCREENS.Messages} >
              <Stack.Screen name={SCREENS.Messages} component={Message} options={stackScreenOptions} />
              <Stack.Screen name={SCREENS.TaskChatScreen} component={TaskChatScreen} options={stackScreenOptions} />
              <Stack.Screen name={SCREENS.TaskChatExecuterScreen} component={TaskChatExecuterScreen} options={stackScreenOptions} />
              <Stack.Screen name={SCREENS.TaskChatOpenScreen} component={TaskChatOpenScreen} options={stackScreenOptions} />
           
        </Stack.Navigator>
    )
}

function ProfileStack() {

    return(
        <Stack.Navigator initialRouteName={SCREENS.ProfileUserScreen} >
            <Stack.Screen name={SCREENS.ProfileUserScreen} component={ProfileUserScreen} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.ProfileSettings} component={ProfileSettings} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.ProfileNotifications} component={ProfileNotifications} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.ProfileNotificationsList} component={ProfileNotificationsList} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.ProfileApp} component={ProfileApp} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.ProfilePassword} component={ProfilePassword} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.ProfileFeedbackScreen} component={ProfileFeedbackScreen} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.ProfileLocation} component={ProfileLocation} options={stackScreenOptions} />
            <Stack.Screen name={SCREENS.ProfileMyTaskScreen} component={ProfileMyTaskScreen} options={stackScreenOptions} />

            <Stack.Screen name={SCREENS.ProfileDeleteScreen} component={ProfileDeleteScreen} options={stackScreenOptions} />
        </Stack.Navigator>
    )
}

interface ICustomTabBar {
    alarmMarkers: any;
}

function BottomTabNavigator(props:any) {

    const userDataLive = useSelector((state:any) => state?.session?.userDataLive);

    let alarmMarkers:any = [];

    if (typeof userDataLive !== "undefined") {
        if (userDataLive.unread_chat_messages > 0 || userDataLive.unread_task_responses.total > 0) {
            alarmMarkers[SCREENS.Messages] = true;
        }
        if (userDataLive.unread_notifications > 0) {
            alarmMarkers[SCREENS.Profile] = true;
        }
    }

    //console.log('wss screen', alarmMarkers);

    return (
        <Tab.Navigator
            tabBar={(props: any) => <CustomTabBar {...props} alarmMarkers={alarmMarkers}/>}
        >
            <Tab.Screen
                name={SCREENS.Home}
                component={HomeStack}
                options={tabScreenOptions}

            />
            <Tab.Screen
                name={SCREENS.Favorites}
                //component={Favorites}
                component={FavoritesStack}
                options={tabScreenOptions}


            />
            <Tab.Screen
                name={SCREENS.Map}
                component={Map}
                options={tabScreenOptions}
            />
            <Tab.Screen
                name={SCREENS.Messages}
                component={MessageStack}
                options={tabScreenOptions}
            />
            <Tab.Screen
                name={SCREENS.Profile}
                //component={ ProfileUserScreen }
                component={ProfileStack}
                options={tabScreenOptions}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

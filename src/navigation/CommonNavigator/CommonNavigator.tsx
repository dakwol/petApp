import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {CommonNavigatorParamList} from "./types";
import {NAVIGATORS} from "../const";
import EventScreen from "../../screens/Event/EventScreen/EventScreen";

import ProfileUserScreen from "../../screens/Profile/ProfileUserScreen/ProfileUserScreen";
import ChatScreen from "../../screens/Message/ChatScreen/ChatScreen";
import {SCREENS} from "../screenName";
import ProfileReviewsScreen from "../../screens/Profile/ProfileReviewsScreen/ProfileReviewsScreen";
import ProfilePetForm from "../../screens/Profile/ProfilePetForm/ProfilePetForm";
import PostFormScreen from "../../screens/Event/PostFormScreen/PostFormScreen";
import ProfileFormScreen from "../../screens/Profile/ProfileFormScreen/ProfileFormScreen";
import HelpScreen from "../../screens/Home/HelpScreen/HelpScreen";
import ClaimScreen from "../../screens/Claim/ClaimScreen/ClaimScreen";
import ProfileNickname from "../../screens/Profile/ProfileNickname/ProfileNickname";
import StoriesFormScreen from "../../screens/Event/StoriesFormScreen/StoriesFormScreen";
import StoriesScreen from "../../screens/Home/StoriesScreen/StoriesScreen";
import StoriesEditScreen from "../../screens/Profile/StoriesEditScreen/StoriesEditScreen";
import EventModerationScreen from "../../screens/Event/EventModerationScreen/EventModerationScreen";
import ProfileSubscribers from "../../screens/Profile/ProfileSubscribers/ProfileSubscribers";
import ProfileNotificationsList from "../../screens/Profile/ProfileNotificationsList/ProfileNotificationsList";
import EventListLikes from "../../screens/Event/EventListLikes/EventListLikes";
import ProfileClaim from "../../screens/Profile/ProfileClaim/ProfileClaim";
import ProfileEditClaim from "../../screens/Profile/ProfileEditClaim/ProfileEditClaim";
import DebugScreen from "../../screens/DebugScreen/DebugScreen";
import EventFormScreen from "../../screens/Event/EventFormScreen/EventFormScreen";
import StoriesModerationScreen from "../../screens/Profile/StoriesModerationScreen/StoriesModerationScreen";
import TaskFormScreen from "../../screens/Event/TaskFormScreen/TaskFormScreen";
import TaskScreen from "../../screens/Event/TaskScreen/TaskScreen";
import ProfileServices from "../../screens/Profile/ProfileServices/ProfileServices";
import TaskChatScreen from "../../screens/Message/TaskChatScreen/TaskChatScreen";
import TaskChatOpenScreen from "../../screens/Message/TaskChatOpenScreen/TaskChatOpenScreen";
import TaskChatExecuterScreen from "../../screens/Message/TaskChatExecuterScreen/TaskChatExecuterScreen";
import UserSpecializationMedia from "../../screens/Auth/RegistrationRole/RegistrationExecuter/UserSpecializationMedia/UserSpecializationMedia";



const CommonStack = createStackNavigator<CommonNavigatorParamList>();

function CommonNavigator() {

    return (
        <CommonStack.Navigator >
            <CommonStack.Screen name={'EventScreen'} component={EventScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={'EventFormScreen'} component={EventFormScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.EventModerationScreen} component={EventModerationScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.EventListLikes} component={EventListLikes} options={{headerShown: false} } />
            <CommonStack.Screen name={'ProfileUserScreen'} component={ProfileUserScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={'ChatScreen'} component={ChatScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.ClaimScreen} component={ClaimScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.ProfileReviewsScreen} component={ProfileReviewsScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.ProfilePetForm} component={ProfilePetForm} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.PostFormScreen} component={PostFormScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={'ProfileFormScreen'} component={ProfileFormScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.HelpScreen} component={HelpScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.ProfileNickname} component={ProfileNickname} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.ProfileSubscribers} component={ProfileSubscribers} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.ProfileNotificationsList} component={ProfileNotificationsList} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.ProfileClaim} component={ProfileClaim} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.ProfileEditClaim} component={ProfileEditClaim} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.ProfileServices} component={ProfileServices} options={{headerShown: false} } />

            <CommonStack.Screen name={SCREENS.StoriesFormScreen} component={StoriesFormScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.TaskFormScreen} component={TaskFormScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.TaskScreen} component={TaskScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.TaskChatScreen} component={TaskChatScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.TaskChatOpenScreen} component={TaskChatOpenScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.TaskChatExecuterScreen} component={TaskChatExecuterScreen} options={{headerShown: false} } />

            <CommonStack.Screen name={SCREENS.StoriesScreen} component={StoriesScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.StoriesEditScreen} component={StoriesEditScreen} options={{headerShown: false} } />
            <CommonStack.Screen name={SCREENS.StoriesModerationScreen} component={StoriesModerationScreen} options={{headerShown: false} } />

            <CommonStack.Screen name={SCREENS.UserSpecializationMedia} component={UserSpecializationMedia} options={{headerShown: false} } />

            <CommonStack.Screen name={'DebugScreen'} component={DebugScreen} options={{headerShown: false} } />


        </CommonStack.Navigator>
    )
}

export default CommonNavigator;

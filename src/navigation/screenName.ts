import { translate } from '../utils/translate';
import EventScreen from "../screens/Event/EventScreen/EventScreen";
import Favorites from "../screens/Favorites/Favorites";
import PostFormScreen from "../screens/Event/PostFormScreen/PostFormScreen";
import { CommonNavigatorParamList } from "./CommonNavigator/types";

interface IScreenNames {
  [x: string]: keyof CommonNavigatorParamList
}


export const SCREENS: any = {
  Home: translate('nav.home'),
  Favorites: translate('nav.favorites'),

  Map: translate('nav.map'),
  Messages: translate('nav.messages'),
  Profile: translate('nav.profile'),
  AddEvent: 'AddEvent',

  ClaimScreen: 'ClaimScreen',

  HomeScreen: 'HomeScreen',
  HomeScreenEvent: 'HomeScreenEvent',

  EventScreen: "EventScreen",
  EventFormScreen: "EventFormScreen",
  EventModerationScreen: "EventModerationScreen",
  EventListLikes: "EventListLikes",

  FavoritesScreen: 'FavoritesScreen',
  FavoritesScreenEvent: 'FavoritesScreenEvent',

  ProfileUserScreen: 'ProfileUserScreen',
  ProfileApp: 'ProfileApp',
  ProfileNotifications: 'ProfileNotifications',
  ProfileNotificationsList: 'ProfileNotificationsList',
  ProfileSettings: 'ProfileSettings',
  ProfileReviews: 'ProfileReviews',
  ProfileNickname: 'ProfileNickname',
  ProfilePassword: 'ProfilePassword',
  ProfileReviewsScreen: 'ProfileReviewsScreen',
  ProfileFeedbackScreen: 'ProfileFeedbackScreen',
  ProfileDeleteScreen: 'ProfileDeleteScreen',
  ProfileLocation: 'ProfileLocation',
  ProfileSubscribers: 'ProfileSubscribers',
  ProfileClaim: 'ProfileClaim',
  ProfileEditClaim: 'ProfileEditClaim',
  ProfileServices: 'ProfileServices',
  ProfileMyTaskScreen: 'ProfileMyTaskScreen',

  StoriesFormScreen: 'StoriesFormScreen',

  ProfilePetForm: 'ProfilePetForm',
  PostFormScreen: 'PostFormScreen',
  ProfileFormScreen: 'ProfileFormScreen',

  HelpScreen: 'HelpScreen',
  StoriesScreen: 'StoriesScreen',
  StoriesEditScreen: 'StoriesEditScreen',
  StoriesModerationScreen: 'StoriesModerationScreen',
  TaskFormScreen: 'TaskFormScreen',
  TaskScreen: 'TaskScreen',
  TaskChatScreen: 'TaskChatScreen',
  TaskChatOpenScreen: 'TaskChatOpenScreen',
  TaskChatExecuterScreen: 'TaskChatExecuterScreen',

  UserSpecializationMedia: 'UserSpecializationMedia'


  /*
    FavoritesStack: {
      Favorites: {
        name: 'FavoritesStack',
        title: translate('nav.favorites'),
        component: Favorites,
      },
      Event: {
        name: 'FavoritesEvent',
        title: 'Event',
        component: EventScreen
      }
    },

    Event: {
      Form: 'Add Event',
      Screen: {
        name: 'EventScreen',
        title: 'Event',
        component: EventScreen
      },
    }

   */
};

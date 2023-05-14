import { Platform } from "react-native";

export const defaultImageUri = "https://petapi2.ratsysdev.com/uploads/logo.jpg";
export const defaultSvgUri = "https://petapi2.ratsysdev.com/uploads/pets.svg";
export const defaultImage300 = require('../assets/images/default_img_300.png');

export const beingGoodSimple = require('../assets/images/being_good_is_simple_ru.png');
export const petHelp = require('../assets/images/pet_help_ru.png');
export const headerImage = require('../assets/images/header_image_ru.png');
export const logoPH = require('../assets/images/logo_ph.png');
export const defaultEventImg = require('../assets/images/default_event_img.png');
export const markerImage = require('../assets/images/marker.png');

export const tmpDogImg = require('../assets/images/tmp/dog_image.png');
export const tmpKateBigImg = require('../assets/images/tmp/Kate_big.png');
export const tmpCatImg = require('../assets/images/tmp/cat.png');
export const tmpDogBigImg = require('../assets/images/tmp/dog_big.png');
export const tmpKateImg = require('../assets/images/tmp/Kate.png');
export const tmpMichaelImg = require('../assets/images/tmp/Michael.png');

//Help Stories

export const androidHelpMedias = [
    require('../assets/images/help__android1080x2204.jpg')
];

export const iosHelpMedias = [
    require('../assets/images/help__iphone1170x2532.jpg')
];

export const helpMedias = Platform.OS == 'ios' ? iosHelpMedias : androidHelpMedias;

// Icon
export const emailIcon = require('../assets/images/icons/email_icon.png');
export const passwordIcon = require('../assets/images/icons/password_icon.png');
export const phoneIcon = require('../assets/images/icons/phone_icon.png');
export const accountIcon = require('../assets/images/icons/account_icon.png');
export const downIcon = require('../assets/images/icons/down_icon.png');
export const leftIcon = require('../assets/images/icons/left_icon.png');
export const clockIcon = require('../assets/images/icons/clock_icon.png');
export const locationIconBrown = require('../assets/images/icons/locationbrown_icon.png');
export const clockIconBrown = require('../assets/images/icons/clockbrown_icon.png');
export const locationIcon = require('../assets/images/icons/location_icon.png');
export const activeFavouriteIcon = require('../assets/images/icons/active_favourite_icon.png');
export const unActiveFavouriteIcon = require('../assets/images/icons/unactive_favourite_icon.png');
export const activeLikePostIcon = require('../assets/images/icons/like_filled.png');
export const unActiveLikePostIcon = require('../assets/images/icons/like.png');
export const addMediaBig = require('../assets/images/icons/addMedia.png');
export const notifications = require('../assets/images/icons/notifications.png');
export const moderation = require('../assets/images/icons/Moderator.png');
export const addIcon = require('../assets/images/icons/add_icon.png');
export const claimArrow = require('../assets/images/icons/claimArrow.png');
export const car = require('../assets/images/icons/car.png');
export const home = require('../assets/images/icons/home.png');
export const computer = require('../assets/images/icons/computer.png');
export const Rtask = require('../assets/images/icons/Rtask.png');
export const calendarTask = require('../assets/images/icons/calendarTask.png');
export const geo = require('../assets/images/icons/geo.png');
export enum Icons {
    messageSend = require('../assets/images/icons/message__send_icon.png'),
    messageAddMedia = require('../assets/images/icons/message__addMedia_icon.svg'),
    addPng = require('../assets/images/icons/add_icon.png'),
    arrowDown = require('../assets/images/icons/arrow-down.png'),
    arrowUp = require('../assets/images/icons/arrow-up.png'),
    postMessage = require('../assets/images/icons/post_sendMesssage.png'),
    postComment = require('../assets/images/icons/post_addComment.png')
}



//TabBarIcon
export const homeIconTab = require('../assets/images/icons/home_tab_icon.png');
export const favIconTab = require('../assets/images/icons/fav_tab_icon.png');
export const mapIconTab = require('../assets/images/icons/map_tab_icon.png');
export const messageIconTab = require('../assets/images/icons/message_tab_icon.png');
export const profileIconTab = require('../assets/images/icons/profile_tab_icon.png');

//SearchInput Icon
export const searchIcon = require('../assets/images/icons/search_icon.png');
export const closeIcon = require('../assets/images/icons/close_icon.png');


//Categories
const categories_icons = [];
categories_icons[1] = require('../assets/images/icons/categories/cat1.png');
categories_icons[2] = require('../assets/images/icons/categories/cat2.png');
categories_icons[3] = require('../assets/images/icons/categories/cat3.png');
categories_icons[4] = require('../assets/images/icons/categories/cat1.png');
categories_icons[5] = require('../assets/images/icons/categories/cat5.png');
categories_icons[6] = require('../assets/images/icons/categories/cat6.png');
categories_icons[7] = require('../assets/images/icons/categories/cat6.png');
categories_icons[8] = require('../assets/images/icons/categories/cat6.png');
categories_icons[9] = require('../assets/images/icons/categories/cat9.png');
categories_icons[10] = require('../assets/images/icons/categories/cat10.png');
categories_icons[11] = require('../assets/images/icons/categories/cat10.png');
categories_icons[12] = require('../assets/images/icons/categories/cat12.png');
categories_icons[13] = require('../assets/images/icons/categories/cat13.png');
categories_icons[14] = require('../assets/images/icons/categories/cat14.png');
categories_icons[15] = require('../assets/images/icons/categories/cat14.png');
categories_icons[16] = require('../assets/images/icons/categories/cat16.png');
categories_icons[17] = require('../assets/images/icons/categories/cat17.png');
categories_icons[18] = require('../assets/images/icons/categories/cat1.png');
categories_icons[19] = require('../assets/images/icons/categories/cat19.png');
categories_icons[20] = require('../assets/images/icons/categories/cat1.png');
categories_icons[21] = require('../assets/images/icons/categories/cat21.png');
categories_icons[22] = require('../assets/images/icons/categories/cat22.png');
categories_icons[23] = require('../assets/images/icons/categories/cat23.png');
categories_icons[24] = require('../assets/images/icons/categories/cat24.png');
categories_icons[25] = require('../assets/images/icons/categories/cat25.png');
categories_icons[26] = require('../assets/images/icons/categories/cat25.png');
categories_icons[27] = require('../assets/images/icons/categories/cat27.png');
categories_icons[28] = require('../assets/images/icons/categories/cat28.png');

export const cat_icons = categories_icons;

const tmp_emergency = [];
tmp_emergency[1] = require('../assets/images/icons/categories/cat-emergency-high.png');
tmp_emergency[2] = require('../assets/images/icons/categories/cat-emergency-medium.png');
tmp_emergency[3] = require('../assets/images/icons/categories/cat-emergency-normal.png');

export const cat_icons_emergency = tmp_emergency;

//Map Markers
const tmp_markers = [];
tmp_markers[1] = require('../assets/images/icons/markers/marker1.png');
tmp_markers[2] = require('../assets/images/icons/markers/marker1.png');
tmp_markers[3] = require('../assets/images/icons/markers/marker1.png');
tmp_markers[4] = require('../assets/images/icons/markers/marker1.png');
tmp_markers[5] = require('../assets/images/icons/markers/marker1.png');
tmp_markers[6] = require('../assets/images/icons/markers/marker6.png');
tmp_markers[7] = require('../assets/images/icons/markers/marker6.png');
tmp_markers[8] = require('../assets/images/icons/markers/marker6.png');
tmp_markers[9] = require('../assets/images/icons/markers/marker9.png');
tmp_markers[10] = require('../assets/images/icons/markers/marker10.png');
tmp_markers[11] = require('../assets/images/icons/markers/marker10.png');
tmp_markers[12] = require('../assets/images/icons/markers/marker12.png');
tmp_markers[13] = require('../assets/images/icons/markers/marker13.png');
tmp_markers[14] = require('../assets/images/icons/markers/marker14.png');
tmp_markers[15] = require('../assets/images/icons/markers/marker14.png');
tmp_markers[16] = require('../assets/images/icons/markers/marker16.png');
tmp_markers[17] = require('../assets/images/icons/markers/marker17.png');
tmp_markers[18] = require('../assets/images/icons/markers/marker1.png');
tmp_markers[19] = require('../assets/images/icons/markers/marker19.png');
tmp_markers[20] = require('../assets/images/icons/markers/marker1.png');
tmp_markers[21] = require('../assets/images/icons/markers/marker21.png');
tmp_markers[22] = require('../assets/images/icons/markers/marker22.png');
tmp_markers[23] = require('../assets/images/icons/markers/marker23.png');
tmp_markers[24] = require('../assets/images/icons/markers/marker24.png');
tmp_markers[25] = require('../assets/images/icons/markers/marker25.png');
tmp_markers[26] = require('../assets/images/icons/markers/marker25.png');
tmp_markers[27] = require('../assets/images/icons/markers/marker27.png');
tmp_markers[28] = require('../assets/images/icons/markers/marker28.png');

export const map_markers = tmp_markers;

//Map Markers
const tmp_markers_emergency = [];
tmp_markers_emergency[1] = require('../assets/images/icons/markers/event_emergency_high.png');
tmp_markers_emergency[2] = require('../assets/images/icons/markers/event_emergency_yellow.png');
tmp_markers_emergency[3] = require('../assets/images/icons/markers/event_emergency_normal.png');

export const map_markers_emergency = tmp_markers_emergency;

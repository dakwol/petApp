import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import {translate} from "../../../../utils/translate";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {getUserById} from "../../../../api/user/getUserById/getUserById";
import {globalStyles} from "../../../../constants/globalStyles";
import {getMediaFirst, getMediaPreviewSrc} from "../../../../utils/common";
import {colors} from "../../../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import StarsRating from "../../../UI/StarsRating/StarsRating";
import {SCREENS} from "../../../../navigation/screenName";
import {useSelector} from "react-redux";

interface IProfileRatingProps {
    profileId: number,
    profileInfoProp?: any,
    showAvatar?: boolean,
    avatarPosition?: "left" | "right",
    showStars?: boolean,
    showCountText?: boolean,
    showName?:boolean
    showNick?:boolean
    showNickFIO?:boolean
    containerStyle?: any,
    namePosition?: "inline" | "top"
    onRatingsProps?: any,
    onPress?: (id:any) => void
}

const ProfileRating:FC<IProfileRatingProps> = ({
                                                   profileId,
                                                   profileInfoProp = {},
                                                   showCountText= true,
                                                   showStars= true,
                                                   showAvatar= false,
                                                   avatarPosition = "left",
                                                   showName = false,
                                                   showNick= false,
                                                   showNickFIO= false,
                                                   namePosition = "inline",
                                                   onRatingsProps,
                                                   containerStyle = {justifyContent: 'space-between',alignItems: 'center'},
                                                   onPress
                                               }) => {
    const [profileInfo, setProfileInfo] = useState<any>(profileInfoProp);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const userInfo = useSelector((state: any) => state?.session?.userData);

    const onRatingPress = () => {
        if(onRatingsProps){
            onRatingsProps(profileInfo.id)
        } else {
            // @ts-ignore
            navigation.navigate('CommonNavigator', { screen: 'ProfileReviewsScreen', params: {user_id: profileInfo.id} });
        }
    }

    const onAvatarPress = () => {
        if(userInfo.user_id == profileId) {
            // @ts-ignore
            navigation.navigate('BottomTabNavigator', {screen: SCREENS.Profile});
        } else {
            // @ts-ignore
            navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileUserScreen, params: {userId: profileId}})
        }
    }

    /*
    const onRatingPress = () => {

        if(onPress) {
            onPress(profileInfo.id);
        } else {
            // @ts-ignore
            navigation.navigate('CommonNavigator', { screen: 'ProfileReviewsScreen', params: {user_id: profileInfo.id} });
        }
    }

     */

    useEffect(() => {
        getUserById({user_id: profileId}).then((dataUser) => {
            setProfileInfo(dataUser);
            setIsLoading(false);
        });

    }, []);


    const RatingName = () => {
        return (
            <Text style={{
                color: colors.black,
                opacity: 1,
                marginRight: 5
            }}>
                { (profileInfo.role != 1) ? profileInfo.ur_name : profileInfo.full_name }
            </Text>
        )
    }

    const RatingNick = () => {
        return (
            <Text style={{
                color: colors.black,
                opacity: 1,
                marginRight: 5
            }}>
                { (profileInfo.role != 1) ? profileInfo.nickname : profileInfo.nickname }
            </Text>
        )
    }

    const RatingNickFIO = () => {
        return (
            <Text style={{
                color: colors.black,
                opacity: 1,
                marginRight: 5
            }}>
                { (profileInfo.role != 1) ? profileInfo.nickname + ' (' + profileInfo.full_name + ')' : profileInfo.nickname + ' (' + profileInfo.full_name + ')'}
            </Text>
        )
    }

    const RatingStars = () => {
        return (
            <>
                <Text style={[styles.profileText, {marginRight: 4}]}>{profileInfo.review_rate}</Text>
                {showStars &&
                <StarsRating stars={profileInfo.stars} starSize={15}/>
                }
                {showCountText &&
                <Text
                    style={[styles.profileText, {marginLeft: 5}]}>{translate('profile.references')}: {profileInfo.reviews.length}
                </Text>
                }
            </>
        )
    }

    const RatingNoRef = () => {
        return (
            <Text style={styles.profileText}>{translate('profile.no_references')}</Text>
        )
    }

    const RatingAvatar = (imageSize:number = 18) => {
        return (
            <Image style={[styles.profileImage,{width:imageSize,height:imageSize,marginRight:5}]}
                   source={getMediaPreviewSrc(profileInfo?.avatar_media)}/>
        )
    }

    return (
        <View style={[styles.alignProfileInfoNoRow,{flex:1}]}>
            {isLoading ? (
                <View style={[globalStyles.loading,{alignItems: "flex-start"}]}>
                    <ActivityIndicator size={'small'}/>
                </View>
            ) : (
                <View style={[ { flex:1, flexDirection:"row"}, containerStyle ]}>
                    <TouchableOpacity onPress={ onRatingPress }  >
                        <View style={{flexDirection:"column"}} >
                            {showName && namePosition == "top" &&  <RatingName /> }
                            {showNick && namePosition == "top" &&  <RatingNick /> }
                            {showNickFIO && namePosition == "top" &&  <RatingNickFIO /> }
                            <View style={styles.alignProfileInfo}>
                                {showAvatar && avatarPosition == "left" && RatingAvatar(18) }
                                {showName && namePosition == "inline" &&  <RatingName /> }
                                {showStars && profileInfo.review_rate != null && <RatingStars /> }
                                {showStars && profileInfo.review_rate == null && <RatingNoRef /> }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View>
                        {showAvatar && avatarPosition == "right" &&
                        <TouchableOpacity onPress={ onAvatarPress } >
                            {RatingAvatar(36)}
                        </TouchableOpacity>
                        }
                    </View>
                </View>

            )}
        </View>
    );
};

export default ProfileRating;

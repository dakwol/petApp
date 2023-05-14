import React, {FC, useEffect, useState} from 'react'
import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native'
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styles} from "./styles";
import {translate} from "../../../../utils/translate";
import {getUserById} from "../../../../api/user/getUserById/getUserById";
import {globalStyles} from "../../../../constants/globalStyles";
import {getAvatar, getMediaPreviewSrc, getStarsFromRate} from "../../../../utils/common";
import {IReview} from "../../../../types";
import StarsRating from "../../../UI/StarsRating/StarsRating";
import {colors} from "../../../../constants/Colors";

interface IProfileReviewsProps {
    profileId:number,
    profileInfoProp?: any;
    //backType: 'section' | 'navigation';
    //backSection?: string;
}

const ProfileReviews:FC<IProfileReviewsProps> = ({
                                                     profileId,
                                                     profileInfoProp,
                                                 }) => {

    const [profileInfo, setProfileInfo] = useState<any>(profileInfoProp);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(profileInfoProp) {
            setProfileInfo(profileInfoProp);
            setIsLoading(false);
        } else {
            getUserById({user_id: profileId}).then((dataUser) => {
                /*
                getReviewsByUserId().then( dataReviews => {

                })

                 */
                console.log(dataUser);
                setProfileInfo(dataUser);
                setIsLoading(false);
            });
        }

    }, []);

    return (
        <View style={styles.background}>
            {isLoading ? (
                <View style={[globalStyles.loading,{alignItems: "flex-start"}]}>
                    <ActivityIndicator size={'large'}/>
                </View>
            ) : (
                <View style={styles.mainReviewContainer}>
                    {/*TODO:: Вынести хидер в отдельный компонент*/}
                    {/*
                    <View style={stylesProfile.profileHeader}>
                        <View style={stylesProfile.profileInfoContainer}>

                            <View>
                                {profileInfo.role == 1
                                    ?
                                    <><Text style={stylesProfile.Username}>{profileInfo.full_name}</Text></>
                                    :
                                    <>
                                        <Text style={stylesProfile.Username}>{profileInfo.ur_name}</Text>
                                        <Text >{profileInfo.ur_legalname}</Text>
                                    </>
                                }
                                 <ProfileRating profileId={profileInfo.id} profileInfoProp={profileInfo} />

                                {profileInfo.role == 1
                                    ?
                                    <View style={styles.alignProfileInfo}>
                                        <Text style={stylesProfile.profileRegisterInfo}>{translate(`profile.role_${profileInfo.role}`)}, {translate('profile.created_at')}</Text>
                                        <Text style={stylesProfile.profileRegisterInfo}>{datetimeConvert(profileInfo.created_at)}</Text>
                                    </View>
                                    :
                                    <>
                                        <View style={stylesProfile.alignProfileInfoNoRow}>
                                            <Text style={stylesProfile.profileRegisterInfo}>Адрес {profileInfo.ur_factaddress}</Text>
                                        </View>
                                        <View style={styles.alignProfileInfo}>
                                            <Text style={stylesProfile.profileRegisterInfo}>Сайт {profileInfo.website}</Text>
                                            <Text style={stylesProfile.profileRegisterInfo}>Телефон {profileInfo.phone}</Text>
                                        </View>
                                    </>
                                }
                            </View>
                            <View>
                                <Image style={styles.profileImage} source={{uri:getMediaPreview(getMediaFirst(profileInfo.media))}} />
                            </View>
                        </View>
                    </View>
                    */}
                    {profileInfo.review_rate != null &&
                    <View style={[styles.alignProfileInfo, {marginTop: 48}]}>
                        <Text style={[styles.profileText, {
                            color: colors.black,
                            fontSize: 21,
                            lineHeight: 21,
                            fontWeight: "bold",
                            marginRight: 4
                        }]}>
                            {profileInfo.review_rate}
                        </Text>
                        <View style={{marginTop: 5}}>
                            <StarsRating stars={profileInfo.stars} starSize={15}/>
                            <Text
                                style={[styles.profileText, {color: colors.black, fontSize: 11, fontWeight: "bold"}]}>
                                {translate('profile.references2').replace("{count}", profileInfo.reviews.length.toString())}
                            </Text>
                        </View>
                    </View>
                    }
                    {profileInfo.review_rate == null
                        ?
                        <View style={styles.reviewContainer}>
                            <View style={styles.reviewCount}>
                                <View style={styles.alignProfileInfo}>
                                    <Text style={styles.profileText}>{translate('profile.no_references')}</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={styles.reviewContainer}>
                            <View style={{flex: 1, marginTop:20}}>
                                <View style={styles.alignStars}>
                                    <StarsRating stars={[1,1,1,1,1]} starSize={18}/>
                                    <View style={{
                                        width: "65%",
                                        height: 1,
                                        backgroundColor: "#392413",
                                        opacity: 0.5,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}/>
                                    <Text style={{
                                        color: "#392413",
                                        fontSize: 18,
                                        lineHeight: 22,
                                        fontWeight: "700",
                                        opacity: 0.5
                                    }}>{profileInfo.reviewStat[5]}</Text>
                                </View>
                                <View style={styles.alignStars}>
                                    <StarsRating stars={[1,1,1,1,0]} starSize={18}/>
                                    <View style={{
                                        width: "65%",
                                        height: 1,
                                        backgroundColor: "#392413",
                                        opacity: 0.2,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}/>
                                    <Text style={{
                                        color: "#392413",
                                        fontSize: 18,
                                        lineHeight: 22,
                                        fontWeight: "700",
                                        opacity: 0.2
                                    }}>{profileInfo.reviewStat[4]}</Text>
                                </View>
                                <View style={styles.alignStars}>
                                    <StarsRating stars={[1,1,1,0,0]} starSize={18}/>
                                    <View style={{
                                        width: "65%",
                                        height: 1,
                                        backgroundColor: "#392413",
                                        opacity: 0.2,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}/>
                                    <Text style={{
                                        color: "#392413",
                                        fontSize: 18,
                                        lineHeight: 22,
                                        fontWeight: "700",
                                        opacity: 0.2
                                    }}>{profileInfo.reviewStat[3]}</Text>
                                </View>
                                <View style={styles.alignStars}>
                                    <StarsRating stars={[1,1,0,0,0]} starSize={18}/>
                                    <View style={{
                                        width: "65%",
                                        height: 1,
                                        backgroundColor: "#392413",
                                        opacity: 0.2,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}/>
                                    <Text style={{
                                        color: "#392413",
                                        fontSize: 18,
                                        lineHeight: 22,
                                        fontWeight: "700",
                                        opacity: 0.2
                                    }}>{profileInfo.reviewStat[2]}</Text>
                                </View>
                                <View style={styles.alignStars}>
                                    <StarsRating stars={[1,0,0,0,0]} starSize={18}/>

                                    <View style={{
                                        width: "65%",
                                        height: 1,
                                        backgroundColor: "#392413",
                                        opacity: 0.2,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}/>
                                    <Text style={{
                                        color: "#392413",
                                        fontSize: 18,
                                        lineHeight: 22,
                                        fontWeight: "700",
                                        opacity: 0.2
                                    }}>{profileInfo.reviewStat[1]}</Text>
                                </View>
                            </View>
                            <ScrollView>
                                {profileInfo.reviews.map( (review:IReview) =>
                                    <View key={review.review_id} style={{flex: 15, flexDirection: 'row', marginTop: 2}}>
                                        <View>
                                            <Image style={styles.profileImage} resizeMode='contain' source={getMediaPreviewSrc(review?.reviewer_user?.avatar_media ?? null )} />
                                        </View>
                                        <View style={{width: "65%", marginLeft: 15}}>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{fontWeight: "700", fontSize: 16, lineHeight: 20}}>{review.reviewer_user.full_name}</Text>
                                                <StarsRating stars={getStarsFromRate(review.review_rate)} starSize={15}/>
                                            </View>
                                            {/*
                                    <View>
                                        <Text style={{opacity: 0.5, marginTop: 6, marginBottom: 3, fontSize: 10, lineHeight: 12, fontWeight: "500"}}>{review.review_text}</Text>
                                    </View>
                                    */}
                                            <View>
                                                <Text style={{fontSize: 12, marginTop: 3, marginBottom: 6, lineHeight: 14.2, fontWeight: "500"}}>{review.review_text}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    }
                </View>
            )}
        </View>
    )
}

export default ProfileReviews


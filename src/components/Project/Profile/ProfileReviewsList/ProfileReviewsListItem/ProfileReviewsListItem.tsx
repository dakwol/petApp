import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { colors } from '../../../../../constants/Colors'
import { getAvatar } from '../../../../../utils/common'
import ProfileRating from '../../ProfileRating/ProfileRating'


interface IRewiewsListItem {
    profileInfo: any
}

const ProfileReviewsListItem: FC<IRewiewsListItem> = ({profileInfo}) => {
console.log(profileInfo)
  return (
    <View style={{flexDirection: 'row'}}>
        <View style={{alignItems: 'center', marginRight: 20}}>
            <Image style={{width: 60, height: 50, borderRadius: 5, resizeMode: 'contain'}}
                source={{uri: getAvatar(profileInfo?.reviewer_user?.avatar_media)}}
                //source={{uri: profileInfo.avatar_media.preview}}
            />
            <Text style={{fontWeight: 'bold', color: colors.black}}>{profileInfo.reviewer_user.first_name}</Text>
        </View>
        <View>
            <Text style={{fontWeight: 'bold', color: colors.black}}>{profileInfo.review_text}</Text>
            <ProfileRating profileId={profileInfo?.review_id} profileInfoProp={profileInfo} containerStyle={null} />
        </View>
    </View>
  )
}

export default ProfileReviewsListItem
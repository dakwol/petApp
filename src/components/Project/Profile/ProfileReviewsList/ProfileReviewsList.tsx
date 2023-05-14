import React, { FC } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import ProfileReviewsListItem from './ProfileReviewsListItem/ProfileReviewsListItem';

interface IRewiewsList {
    profileInfo: any
}

const ProfileReviewsList: FC<IRewiewsList> = ({profileInfo}) => {

    console.log(profileInfo)

    const _renderItem = ({item, index}: {item: any; index: number}) => {
        return (
              <ProfileReviewsListItem
                profileInfo={item}
              />
        );
      };

  return (
    <View>
        <FlatList 
            data={profileInfo.reviews} 
            renderItem={_renderItem}
        />
    </View>
  )
}

export default ProfileReviewsList
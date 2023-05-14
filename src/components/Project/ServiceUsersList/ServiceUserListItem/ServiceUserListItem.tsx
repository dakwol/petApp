import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles';
import BlurImage from "../../../UI/BlurImage/BlurImage";
import {getMediaFirst, getMediaPreview, getMediaPreviewSrc} from "../../../../utils/common";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {getTextReviews} from "../../../../utils/text";
import { SCREEN_WIDTH } from '../../../../constants/globalStyles';
import { translate } from '../../../../utils/translate';

interface IServiceUserListItem {
    user: any,
    onPress: (id: number) => void;
}

const ServiceUserListItem: FC<IServiceUserListItem> = ({user, ... props}) => {

    return (
        <TouchableOpacity  style={styles.container} onPress={() => props.onPress(user.id)}>
            <View style={styles.contentEvent}>
                <View style={styles.containerPreviewImg}>
                    <BlurImage
                        resizeMode={"cover"}
                        media={getMediaPreviewSrc(user.avatar_media)}
                        blur={ false }
                        style={styles.eventImg}
                    />
                </View>

                <View style={{paddingRight: 20, width: SCREEN_WIDTH - 95}}>
                    <Text style={styles.topicText}>
                        {user.full_name}
                    </Text>

                    <View style={{flexDirection:"row", alignItems: 'center', marginVertical: 4, justifyContent: 'space-between'}}>
                        <View style={{flexDirection:"row", alignItems: 'center'}}>
                            {user.reviews.length == 0? <></> :<Icon name="star" size={11} style={[styles.starFull]}/>}
                            {user.reviews.length == 0? <Text style={{fontSize: 10}}>{translate('profile.no_references')}</Text> :
                                <View style={{flexDirection:  'row'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 10, marginRight: 5}}>{user.review_rate}</Text>
                                    <Text style={{fontSize: 10}}>{getTextReviews(user.reviews.length)}</Text>
                                </View>
                            }
                        </View>
                        <View>
                            <Text  style={styles.topicText}>от 5000 Р</Text>
                        </View>
                    </View>

                    <Text numberOfLines={1} style={{overflow: 'hidden', fontSize: 14}}>{user.occupations.map( (item: { name: any; }) => item.name).join(', ')}</Text>
                </View>

                
            </View>
            
        </TouchableOpacity>
    )
}

export default ServiceUserListItem;

import { useIsFocused } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { getUserById } from '../../../api/user/getUserById/getUserById';
import ServicesList from '../../../components/Project/ServicesList/ServicesList';
import ViewScreen from '../../../components/Project/ViewScreen/ViewScreen'
import BackButton from '../../../components/UI/BackButton/BackButton';
import { IScreen } from '../../../types';
import { capitalizeFirstLetter } from '../../../utils/text';
import { translate } from '../../../utils/translate';

interface IProfileComponent {
    user_id: number | undefined;
}

const ProfileServices:FC<IScreen> = ({navigation, route}) => {
    const isFocused = useIsFocused();

    const [profileInfo, setProfileInfo] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<any>(false);
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        if (isFocused) {
            getUserById({user_id: route.params.user_id}).then((dataUser) => {
                setProfileInfo(dataUser);
                setServices(dataUser.services);
                setIsLoaded(true);
            });

        }
    }, [isFocused]);

  return (
    <ViewScreen>
          <View style={{position: 'absolute', left: 0, zIndex: 1000}}>
                <BackButton
                    text={translate('back')}
                    action={() => {
                        navigation.goBack()
                    }}
                />
            </View>
            <ScrollView  style={{marginTop: 50, marginHorizontal: 20}}>

            <Text
                style={{ 
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 20,
                    color: "#392413",
                    lineHeight: 27,
                    fontWeight: "500"
                }}>
                    Описание бизнеса
            </Text>

           <View>
                <Text
                    style={{ 
                        marginTop: 10,
                        marginBottom: 10,
                        fontSize: 20,
                        color: "#392413",
                        lineHeight: 27,
                        fontWeight: "500"
                    }}>{capitalizeFirstLetter(translate('profile.services'))}
                </Text>

                {services.length > 0?
                    <ServicesList
                        services={services}
                    />
                    :
                    <View>
                        <Text style={{textAlign: 'center'}}>Нет услуг</Text>
                    </View>
                }
           </View>

            </ScrollView>
         
    </ViewScreen>
  )
}

export default ProfileServices
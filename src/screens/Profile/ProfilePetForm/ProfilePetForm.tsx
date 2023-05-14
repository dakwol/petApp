import React, {FC} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import PetForm from "../../../components/Project/PetForm/PetForm";
import {IScreen} from "../../../types";
import {View} from "react-native";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";

const ProfilePetForm:FC<IScreen> = ({navigation, route, ...props}) => {

    const {id = 0 } = route?.params ?? { id: 0};
    //const petId = 1;
    return (
        <ViewScreen keyboardVerticalOffset={0}>
            <View style={[styles.background]}>
                <View style={[styles.profile,{paddingBottom:0}]}>
                    <View style={{position: 'absolute', left: 0}}>
                        <BackButton
                            text={translate('back')}
                            action={() => {
                                navigation.goBack()
                            }}
                        />
                    </View>

                        <PetForm
                            id={id}
                            navigation = {navigation}
                            route={route}
                        />

                </View>
            </View>
        </ViewScreen>
);
};

export default ProfilePetForm;

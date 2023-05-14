import React, {FC} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import ClaimForm from '../../../components/Project/ClaimForm/ClaimForm';

interface IClaimScreen {
    eventId?: number,
    route: any,
    navigation: any,
}


const ClaimScreen:FC<IClaimScreen> = ({navigation, route, ...props}) => {

    const eventId = route.params.eventId;
    return (
        <ViewScreen keyboardVerticalOffset={25}>
            <BackButton
                text={translate('back')}
                action={() => navigation.goBack()}
            />

           <ClaimForm eventId={eventId}/>

        </ViewScreen>
    );
};

export default ClaimScreen;

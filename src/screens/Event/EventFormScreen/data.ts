import { IMapCenterPoint } from "../../../components/MapComponent/types";
import { translate } from "../../../utils/translate";

export const fieldsDataDefault = {
    evt_topic: '',
    evt_ctgy_id: 0,
    city: '',
    evt_address: '',
    description: '',
    price_from: '',
    price_to: '',
    is_emergency: 0,
    evt_long: '',
    evt_lat: '',
    pet_id: 0,
}

export const mapCenterDefault: IMapCenterPoint = {
    latitude: 55.755926,
    longitude: 37.617011,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}

export const petsListDefault = [{
    label: translate('event.petListPlaceholder'),
    value: 0,
    id: 0
}];

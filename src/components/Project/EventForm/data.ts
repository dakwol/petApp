export const FORM_TYPE_EMERGENCY = 'emergency';
export const FORM_TYPE_PETS = 'pets';
export const FORM_TYPE_PETS_COMMERCIAL = 'pets_commercial';
export const FORM_TYPE_HELP = 'help';
export const FORM_TYPE_SERVICES = 'services';
export const FORM_TYPE_LEISURE = 'leisure';
export const FORM_TYPE_ALL = "all";
export const FORM_TYPE_MODERATION = "moderation";

export const fieldsSettings = {
    'all': {
        'evt_topic': true,
        'evt_ctgy_id': true,
        'evt_subctgy_id': true,
        'is_emergency': true,
        'city': true,
        'address': true,
        'description': true,
        'price_from': true,
        'price_to': true,
        'pets': true,
        'pet_type_id': true,
        'pet_species': true,
        'pet_age': true,
        'pet_color': true,
        'pet_sex': true,
        'pet_name': true,
        'pet_chip': true,
        'pet_sterilization': true,
    },
    //Экстренное событие
    'emergency': {
        'evt_topic': true,
        'evt_ctgy_id': true,
        'city': true,
        'address': true,
        'description': true,
        'pets': true,
        'pet_type_id': true,
        'pet_species': true,
        'pet_age': false,
        'pet_color': true,
        'pet_sex': true,
        'pet_name': false,
        'pet_chip': false,
        'pet_sterilization': false,
    },
    'pets': {
        'evt_topic': true,
        'evt_ctgy_id': true,
        'evt_subctgy_id': true,
        'is_emergency': true,
        'city': true,
        'address': true,
        'description': true,
        'pets': true,
        'pet_type_id': true,
        'pet_species': true,
        'pet_age': true,
        'pet_color': true,
        'pet_sex': true,
        'pet_name': true,
        'pet_chip': true,
        'pet_sterilization': true,

    },
    'pets_commercial': {
        'evt_topic': true,
        'evt_ctgy_id': true,
        'evt_subctgy_id': true,
        'city': true,
        'address': true,
        'description': true,
        'price_from': true,
        'price_to': true,
        'pets': true,
        'pet_type_id': true,
        'pet_species': true,
        'pet_age': true,
        'pet_color': true,
        'pet_sex': true,
        'pet_name': true,
        'pet_chip': true,
        'pet_sterilization': true,
    },
    'help': {
        'evt_topic': true,
        'evt_ctgy_id': true,
        'evt_subctgy_id': true,
        'is_emergency': true,
        'city': true,
        'address': true,
        'description': true,
        'pets': true,
        'pet_type_id': true,
        'pet_species': true,
        'pet_age': true,
        'pet_color': true,
        'pet_sex': true,
        'pet_name': true,
        'pet_chip': true,
        'pet_sterilization': true,
    },
    'services': {
        'evt_topic': true,
        'evt_ctgy_id': true,
        'evt_subctgy_id': true,
        'city': true,
        'address': true,
        'description': true,
        'price_from': true,
        'price_to': true,
        'pets': false,
    },
    'leisure': {
        'evt_topic': true,
        'evt_ctgy_id': true,
        'evt_subctgy_id': true,
        'city': true,
        'address': true,
        'description': true,
        'price_from': true,
        'price_to': true,
        'pets': false,
    },
    'moderation': {
        'delete_evt': true,
        'delete_allMedia': true
    },


}

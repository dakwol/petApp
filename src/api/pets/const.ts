import { IAPI_PETS_MODEL } from "./types";


export const API_PETS_MODEl = {
    entity: 'pet',
    url: 'pet',
    methods: {
        getPetsByUserId: {
            url: 'get-pets-by-user-id'
        },
        createPet: {
            method: "post",
            url: 'pets'
        },
        updatePet: {
            method: 'put',
            url: 'pets'
        },
        getPetTypes: {
            url: 'get-types'
        },
        addPetMediaMultiply: {
            url: 'add-media-multiply'
        },
        petMediaDelete: {
            method: "delete",
            url: "media"
        },
        deletePet: {
            url: "delete"
        }
    }

} as const;

//
///role/get-types
//get-types

import {IAPI_ENTITY_MODEL} from "../types";


export const API_ROLE_MODEl:IAPI_ENTITY_MODEL = {
    entity: 'role',
    url: 'role',
    methods: {
        getRoleTypes: {
            url: 'get-types'
        },
    }

} as const;

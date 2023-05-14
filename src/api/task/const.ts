import { IAPI_TASK_MODEL } from "./types";

export const API_TASK_MODEL = {
    entity: 'task',
    url: 'task',
    methods: {
        taskCreate: {
            url: 'create'
        },
        taskOptions: {
            url: 'options'
        },
        taskSearch: {
            url: 'search'
        },
        taskAssignContractor: {
            url: 'assign-contractor'
        },
        taskResponse: {
            url: 'response'
        }

    }

} as const;

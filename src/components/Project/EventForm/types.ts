export interface IEventFormScreen {
    navigation: any,
    route: any,
    onHideModal?: () => void;
    onAddingEvent?: () => void;
}

export interface IEventOnFieldChange {
    field: string,
    data: any,
    form?: string,
}

import {ImageSourcePropType} from "react-native";
import {IUser} from "../../../types";

export interface ITaskListItem {
    id:number,
    pet_id: number,
    service_id: number,
    name: string,
    description: string,
    price_from: number,
    price_to: number,
    created_at: string,
    updated_at: string,
    date: string,
    address: string,
    [x:string]: any;
}

export interface ITaskList {
    tasks: ITaskListItem[];
    type: number;
    onTaskPress: (type: number, item: ITaskListItem) => void;
    unread_tasks:any[];
}

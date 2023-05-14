import {ImageSourcePropType} from "react-native";
import {IUser} from "../../../types";



export interface ICommentEventItem {
    id:number,
    evt_topic: string,

    [x:string]: any;
}

export interface ICommentEventList {
    events: ICommentEventItem[];
    onEventCommentPress: (item: ICommentEventItem) => void;
}

import {showMessage} from "react-native-flash-message";
import {translate} from "./translate";
import {Dictionary} from "../locales/dictionary";
import {errorMessage} from "./showMessage";


interface IResponseWithBadWords {
    resp: any,
    messageSuccess?: string,
    messageBadWords: string,
    messageError: string,
    callBackSuccess?: () => void,
    callBackBadWords?: () => void,
    callBackError?: () => void,

}

interface IResponseWithMessage {
    resp: any,
    messageSuccess?: string,
    messageError?: string,
}

export const responseWithMessage = ({
                                        resp,
                                        messageSuccess = Dictionary.common.success,
                                        messageError = Dictionary.errors.unknownError,

                                    }:IResponseWithMessage) => {
    if(resp.success) {
        showMessage({
            message: translate(messageSuccess),
            type: "success"
        })
    }
    else {
        errorMessage({
            message: translate(messageError),
        });
    }
}

export const responseWithBadWords = ({
                                         resp,
                                         messageSuccess,
                                         messageBadWords,
                                         messageError,
                                         callBackSuccess,
                                         callBackBadWords,
                                         callBackError,

                                     }:IResponseWithBadWords) =>
{
    if(resp.success) {
        if(messageSuccess) {
            showMessage({
                message: translate(messageSuccess),
                type: "success"
            })
        }
        //@ts-ignore
        if(callBackSuccess) {
            callBackSuccess();
        }
        return true;
    } else if (resp?.originResp?.data?.bad_words) {
        errorMessage({
            message: translate(messageBadWords) + ': ' + resp?.originResp?.data?.bad_words.join(', '),
        })
        if(callBackBadWords) {
            callBackBadWords();
        }
        return false;
    } else {
        errorMessage({
            message: translate(messageError),
        });
        if(callBackError) {
            callBackError();
        }
        return false;
    }
}

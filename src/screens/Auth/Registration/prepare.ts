import { IRegistrationFormData } from "./types";
import { Dictionary } from "../../../locales/dictionary";
import { translate } from "../../../utils/translate";

export const registerAsList = [
    { value: 1, label: translate(Dictionary.user.general) },
    { value: 3, label: translate(Dictionary.user.urip) },
    { value: 2, label: translate(Dictionary.user.urur) },
    { value: 4, label: translate(Dictionary.user.urfl) },
];

export const defaultRegData: IRegistrationFormData = {
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 1,
    ur_fio: '',
    ur_name: '',
    ur_description: '',
    ur_ogrn: '',
    ur_kpp: '',
    ur_bik: '',
    ur_rekv: '',
    ur_address: '',
    ur_passport: '',
    ur_photo: '',
    website: '',
    description: '',
    ur_legalname: '',
    ur_factaddress: '',
    ur_inn: '',
    ur_type: 0,
    nickname:''

}

export const exRegData: IRegistrationFormData = {
    nickname: "", role: 0,
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
}

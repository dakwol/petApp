import React, {FC, useEffect, useState} from 'react';
import {View} from "react-native";
import {translate} from "../../../../utils/translate";
import Input from "../../../../components/UI/Input/Input";
import {IRegistrationFormData} from "../types";
import styles from "../../../Event/EventFormScreen/styles";
import {getRoleTypes} from "../../../../api/role/getRoleTypes/getRoleTypes";
import ToggleButton from "../../../../components/UI/ToggleButton/ToggleButton";
import DropdownSelect from "../../../../components/UI/DropdownSelect/DropdownSelect";
import TextArea from "../../../../components/UI/TextArea/TextArea";
import {prepareForSelect} from "../../../../utils/formData";

interface IRegistrationUR {
    formData:IRegistrationFormData,
    onFieldChange: ({form, field, data}:{form?:string | undefined, field:string, data: any}) => void
}

const RegistrationUR:FC<IRegistrationUR> = ({formData,onFieldChange}) => {
    const [roleTypeList, setRoleTypeList] =  useState<any[]>([]);
    const [addressSync, setAddressSync] = useState(false);

    useEffect(() => {
        getRoleTypes().then(resp => {
            setRoleTypeList(prepareForSelect(resp?.data ?? [],"id", "name"));
        })
    }, []);
    return (
        <View style={{marginTop:20}}>
            <DropdownSelect
                data={roleTypeList}
                onSelect={ (value) => { onFieldChange({field: "ur_type", data: value}) } }
                placeholder={translate('registration.ur_type')}
            />
            <View>
                <Input
                    valueText={formData.ur_name}
                    onChange={(value: any) => onFieldChange({field: "ur_name", data: value})}
                    placeHolderText={translate("registration.ur_name")}
                />
            </View>
            <View>
                <Input
                    valueText={formData.website}
                    onChange={(value: any) => onFieldChange({field: "website", data: value})}
                    placeHolderText={translate("registration.website")}
                />
            </View>
            <View>
                <TextArea
                    value={formData.ur_description}
                    placeholder={translate('description')}
                    style={styles.bigInput}
                    onChangeText={(data) => {
                        onFieldChange({field: 'ur_description', data: data})
                    }}
                />
            </View>
            {formData.role == 3 &&
                <>
                    <View>
                        <Input
                            valueText={formData.ur_fio}
                            onChange={(value: any) => onFieldChange({field: "ur_fio", data: value})}
                            placeHolderText={translate("registration.ur_fio")}
                        />
                    </View>

                    <View>
                        <Input
                            valueText={formData.ur_passport}
                            onChange={(value: any) => onFieldChange({field: "ur_passport", data: value})}
                            placeHolderText={translate("registration.ur_passport")}
                        />
                    </View>
                </>
            }
            {formData.role == 2 &&
                <>
                    <View>
                        <Input
                            valueText={formData.ur_legalname}
                            onChange={(value: any) => onFieldChange({field: "ur_legalname", data: value})}
                            placeHolderText={translate("registration.ur_legalname")}
                        />
                    </View>

                    <View>
                        <Input
                            valueText={formData.ur_kpp}
                            onChange={(value: any) => onFieldChange({field: "ur_kpp", data: value})}
                            placeHolderText={translate("registration.ur_kpp")}
                        />
                    </View>
                </>
            }
            {formData.role != 4 &&
                <>
                    <View>
                        <Input
                            valueText={formData.ur_ogrn}
                            onChange={(value: any) => onFieldChange({field: "ur_ogrn", data: value})}
                            placeHolderText={translate("registration.ur_ogrn")}
                        />
                    </View>


                    <View>
                        <Input
                            valueText={formData.ur_inn}
                            onChange={(value: any) => onFieldChange({field: "ur_inn", data: value})}
                            placeHolderText={translate("registration.ur_inn")}
                        />
                    </View>

                    <View>
                        <Input
                            valueText={formData.ur_bik}
                            onChange={(value: any) => onFieldChange({field: "ur_bik", data: value})}
                            placeHolderText={translate("registration.ur_bik")}
                        />
                    </View>
                </>
            }
            <View>
                <TextArea
                    value={formData.ur_rekv}
                    placeholder={translate('registration.ur_rekv')}
                    style={styles.bigInput}
                    onChangeText={(data) => {
                        onFieldChange({field: 'ur_rekv', data: data})
                    }}
                />
            </View>
            {formData.role != 4 &&
                <>
                    <View>
                        <Input
                            valueText={formData.ur_address}
                            onChange={(value: any) => onFieldChange({field: "ur_address", data: value})}
                            placeHolderText={translate("registration.ur_address")}
                        />
                    </View>
                    <View style={{width:"100%"}}>
                        <ToggleButton onToggle={(value) => {
                            const newValue = !value;
                            if(newValue) {onFieldChange({field: "ur_factaddress", data: formData.ur_address}); setAddressSync(true);}
                            else {setAddressSync(false);}
                        }} value={addressSync} text={translate("registration.ur_factaddress")} />
                    </View>
                </>
            }
            <View>
                <Input
                    valueText={formData.ur_factaddress}
                    onChange={(value: any) => onFieldChange({field: "ur_factaddress", data: value})}
                    placeHolderText={translate("registration.ur_factaddress")}
                />
            </View>

        </View>
    );
};

export default RegistrationUR;

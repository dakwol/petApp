import React, {FC} from 'react';
import {Text, View} from "react-native";
import {translate} from "../../../../utils/translate";

const RegistrationRoles:FC = () => {
    return (
        <View style={{flex:1, alignItems:"center",justifyContent:"center"}}>
            <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}}>{translate("registration.rolesText1")}</Text>
            <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}}>{translate("registration.rolesText2")}</Text>
            <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}}>{translate("registration.rolesText3")}</Text>
        </View>
    );
};

export default RegistrationRoles;

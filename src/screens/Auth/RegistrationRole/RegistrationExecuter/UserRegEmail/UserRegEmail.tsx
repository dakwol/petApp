import React, { FC, useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import SubButton from "../../../../../components/UI/SubButton/SubButton";
import { colors } from "../../../../../constants/Colors";
import { globalStyles, SCREEN_WIDTH } from "../../../../../constants/globalStyles";
import { headerImage } from "../../../../../constants/images";
import navigation from "../../../../../navigation";
import { IScreen } from "../../../../../types";
import { errorMessage } from "../../../../../utils/showMessage";
import { translate } from "../../../../../utils/translate";
import MaskInput from 'react-native-mask-input';
import { userCheckFreeEmail } from "../../../../../api/user/userCheckFreeEmail/userCheckFreeEmail";
import { Dictionary } from "../../../../../locales/dictionary";

const UserRegEmail:FC<IScreen> = ({navigation, route}) => {
    
    const [email, setEmail] = useState<any>({});

    const [arrInfo, setArrInfo] = useState(route.params.infoUser);

    const validate = (text:any) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          setEmail({ email: text, type: false })
          return false;
        }
        else {
            setEmail({ email: text, type: true })
            
          console.log("Email is Correct");
        }
      }

    useEffect(()=>{
        if(email.type == true){
            setArrInfo({...arrInfo, email: email.email})
        }
    },[email])

    const [err, setErr] = useState<boolean>(false)

    const switchScreen = () => {
        if(email.type){
            setErr(false)
            userCheckFreeEmail(email.email).then(resp=>{
                if (resp.success) {
                    if(resp.data) {
                      navigation.navigate('ConfirmNumber', {infoUser: arrInfo})
                    } else {
                      errorMessage({
                        message: translate(Dictionary.user.emailTaken),
                      });
                    }
                  }
            });
        } else {
            setErr(true)
            errorMessage({
                message: translate("errors.The_email_must_be_a_valid_email_address"),
            });
        }
       
    }

  
    return (
            <KeyboardAvoidingView 
                style={
                    [globalStyles.vwFlexOne, 
                        {justifyContent: "space-between", alignItems: "center",  marginVertical: 60}
                    ]
                } 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={20}
            >
                <Image source={headerImage}/>
                <View style={{marginBottom: 20}}>
                    <Text style={{alignSelf: "center", fontSize: 20, color: colors.greenPH, fontWeight: "bold", marginBottom: 20}}>{translate('auth.registration')}</Text>
                    <View>
                        <Text style={[{position: "absolute"},{ bottom: 35,fontSize: 11}]}>{translate('registration.ex_email')}</Text>
                         <Input valueText={email.email} onChange={(value:any)=>{validate(value)}} placeHolderText={""}></Input>
                    </View>
                </View>
                
                <View>
                    <Button text={translate('common.continue')} action={()=>switchScreen()} />
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 15}} onPress={()=>{navigation.goBack()}} >
                        <Text style={{fontSize: 18, color:colors.greenPH, textTransform: "uppercase", fontWeight: "bold"}}>{translate('back')}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
}

export default UserRegEmail;
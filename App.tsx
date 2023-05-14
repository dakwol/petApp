/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import * as RNLocalize from 'react-native-localize';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import FlashMessage from "react-native-flash-message";

import {LogBox, Platform} from 'react-native';
import {getTranslateMessage, setI18nConfig} from "./src/utils/translate";
import {persister, store} from "./src/redux/store";
import AppNavigation from "./src/navigation";
import appsFlyer from 'react-native-appsflyer';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica';

// @ts-ignore
import {APPMETRICA_KEY, APPMETRICA_ENABLED, APPSFLYER_ENABLED, APPSFLYER_APPID, APPSFLYER_KEY }  from '@env';

import { Linking } from 'react-native';
import { getVersion } from './src/api/system/getVersion/getVersion';
import { errorMessage } from './src/utils/showMessage';
import { capitalizeFirstLetter } from './src/utils/text';
import SystemUpdateNotif from './src/components/UI/SystemUpdateNotif/SystemUpdateNotif';

import {name, version} from './package.json';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    'new NativeEventEmitter',
    'EventEmitter.removeListener',
    'VirtualizedLists should never be nested inside plain ScrollViews',
    'Animated: `useNativeDriver`',
    'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
    'Easing was renamed to EasingNode in Reanimated 2'
]);

console.log('APPSFLYER', APPSFLYER_ENABLED, APPSFLYER_APPID, APPSFLYER_KEY)
if(APPSFLYER_ENABLED && APPSFLYER_ENABLED == 1) {
    appsFlyer.initSdk(
        {
            devKey: APPSFLYER_KEY,
            isDebug: false,
            appId: APPSFLYER_APPID,
            onInstallConversionDataListener: true, //Optional
            onDeepLinkListener: true, //Optional
            timeToWaitForATTUserAuthorization: 10 //for iOS 14.5
        },
        (result) => {
            console.log('APPSFLYER',result);
        },
        (error) => {
            console.error('APPSFLYER',error);
        }
    );
}

if (APPMETRICA_ENABLED && APPMETRICA_ENABLED == 1) {
    AppMetrica.activate({
        apiKey: APPMETRICA_KEY,
        sessionTimeout: 120,
        firstActivationAsUpdate: false
    });
}

export default function App() {
    const handleLocalizationChange = () => {

        setI18nConfig()
            // @ts-ignore
            .then(() => this.forceUpdate())
            // @ts-ignore
            .catch(error => {
                console.error(error);
            });
    };

    const [versionCheck, setVersionCheck] = useState<boolean>(false);

    useEffect(()=>{
        getVersion(Platform.OS).then(resp => {
            if(resp.success){
                if(resp.data.version > version){
                    setVersionCheck(true);
                }
            } else {
                setVersionCheck(false)
            }
        })
    },[])


    useEffect(() => {
        setI18nConfig().then(() => {
            RNLocalize.addEventListener('change', handleLocalizationChange);
        });

        return () => {
            RNLocalize.removeEventListener('change', handleLocalizationChange);
        };
    }, []);

    return (
        <SafeAreaProvider>
            {versionCheck && <SystemUpdateNotif platform = {Platform.OS} action={()=>{setVersionCheck(false)}}/>}
            <Provider store={store}>
                <PersistGate  loading={false} persistor={persister}>
                    <AppNavigation />
                    <FlashMessage position="bottom" duration={2750} floating/>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
}

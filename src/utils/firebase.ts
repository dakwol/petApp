// utils/firebase.js

import firebase from '@react-native-firebase/app';

const configurationOptions:any = {
    debug: true,
    promptOnMissingPlayServices: true
}

const firebaseApp = firebase.initializeApp(configurationOptions, 'com.zooclick.app')

export default firebaseApp


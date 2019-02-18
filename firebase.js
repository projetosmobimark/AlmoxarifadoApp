import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDHJTFpGBZUeY0KbbNhX6COc2oXkYnuC6g",
    authDomain: "almoxarifadomobi.firebaseapp.com",
    databaseURL: "https://almoxarifadomobi.firebaseio.com",
    projectId: "almoxarifadomobi",
    storageBucket: "almoxarifadomobi.appspot.com",
    messagingSenderId: "863198749261"
}

firebase.initializeApp(config);


export default firebase;
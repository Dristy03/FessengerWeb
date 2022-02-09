import firebase from 'firebase/compat/app';
import {getFirestore} from '@firebase/firestore'
import {getStorage} from "firebase/storage"
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDvBGudDZ8GYz7Ws7j-VKctkMZz4K0XjuA",
  authDomain: "fessenger-web.firebaseapp.com",
  projectId: "fessenger-web",
  storageBucket: "fessenger-web.appspot.com",
  messagingSenderId: "57236100406",
  appId: "1:57236100406:web:f91502ed76957803644f97"
};
export const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = app.auth()

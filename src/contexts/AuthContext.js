import React, { useContext, useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    setDoc(doc(db, "Users", email), {
      Email: email,
      MailCounter: 0,
      Name: "",
      Password: password,
      Bio: "",
    });
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  async function updatePassword(password) {
    const passwordRef = doc(db, "Users", currentUser.email);

    await updateDoc(passwordRef, {
      Password: password,
    });
    return currentUser.updatePassword(password);
  }

  async function updateName(name) {
    const nameRef = doc(db, "Users", currentUser.email);

    await updateDoc(nameRef, {
      Name: name,
    });
  
  }

  async function updateBio(bio) {
    const bioRef = doc(db, "Users", currentUser.email);

    await updateDoc(bioRef, {
      Bio: bio,
    });
  
  }

  async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, 'images/' + currentUser.email );
  
    setLoading(true);
    
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
  
    auth.updateProfile(currentUser, {photoURL});
    
    setLoading(false);
    alert("Uploaded file!");
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    updateName,
    updateBio,
    upload,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext(null);
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        const selectedRole = localStorage.getItem("selectedRole");

        if (snap.exists()) {
          const data = snap.data();

          if (selectedRole && data.role !== selectedRole) {
            await setDoc(ref, { ...data, role: selectedRole }, { merge: true });
            data.role = selectedRole;
          }

          setUserProfile(data);

          // ⭐ FINAL REQUIRED FIX →
          // ensures role update is immediately reflected in app without refresh
          localStorage.setItem("firebaseRole", data.role);

        } else {
          const profile = {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email,
            role: selectedRole || "citizen",
            createdAt: serverTimestamp(),
          };

          await setDoc(ref, profile);
          setUserProfile(profile);

          // ⭐ makes admin persist instantly
          localStorage.setItem("firebaseRole", profile.role);
        }
      } 
      else setUserProfile(null);

      setLoading(false);
    });

    return unsub;
  }, []);

  async function register({ name, email, password }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });

    const profile = {
      uid: cred.user.uid,
      name,
      email,
      role: localStorage.getItem("selectedRole") || "citizen",
      createdAt: serverTimestamp()
    };

    await setDoc(doc(db, "users", cred.user.uid), profile);
    setUserProfile(profile);
    setCurrentUser(cred.user);

    localStorage.setItem("firebaseRole", profile.role); // ⭐ persists on create
    return profile;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const savedRole = localStorage.getItem("selectedRole") || "citizen";
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    let profile;

    if (!snap.exists()) {
      profile = {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        role: savedRole,
        createdAt: serverTimestamp(),
      };
      await setDoc(ref, profile);
    } 
    else {
      profile = snap.data();
      if (profile.role !== savedRole) {
        await setDoc(ref, { ...profile, role: savedRole }, { merge: true });
        profile.role = savedRole;
      }
    }

    setUserProfile(profile);
    setCurrentUser(user);
    localStorage.setItem("firebaseRole", profile.role); // ⭐ update instantly

    return profile;
  }

  function logout() { 
    localStorage.removeItem("firebaseRole"); // ⭐ cleanup on logout
    return signOut(auth); 
  }

  const value = { currentUser, userProfile, login, register, loginWithGoogle, logout };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

/* eslint-disable react/prop-types */
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

export const AuthContext = createContext(null)
const provider = new GoogleAuthProvider()
const gitProvider = new GithubAuthProvider()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createNewUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photoURL) =>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL: photoURL
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(`current user`, currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
            setLoading(false)
        }
    }, [])

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        setLoading(true)
        return auth.signOut()
    }

    const gitSignIn = ()=>{
        return signInWithPopup(auth, gitProvider)
    }


    const info = {
        user,
        createNewUser,
        signInUser,
        googleSignIn,
        logOut,
        loading,
        gitSignIn,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
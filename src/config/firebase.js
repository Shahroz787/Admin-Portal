import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc, updateDoc, serverTimestamp, query, getDoc, collection, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {

    apiKey: "AIzaSyAxscCBmljlsMgbIFTylutIJol9wYujm2g",
    authDomain: "adminpanel-f1ec9.firebaseapp.com",
    projectId: "adminpanel-f1ec9",
    storageBucket: "adminpanel-f1ec9.firebasestorage.app",
    messagingSenderId: "711891082634",
    appId: "1:711891082634:web:5d33b7f7837c5ec428bc73",
    measurementId: "G-9GNMKZEMV5"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password, avatarURL) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Signup successful");
        const user = res.user;

      
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: avatarURL || "",
        });

    } catch (error) {
        console.log("Signup Error: ", error);
        const errorMessage = error?.code
            ? error.code.split('/')[1].split('-').join(' ')
            : "Signup failed. Please try again.";
        toast.error(errorMessage);
    }
};


const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;


        toast.success("Login successful");

        return user; // Return user object instead of handling redirect
    } catch (error) {
        const errorMessage = error?.code
            ? error.code.split('/')[1].split('-').join(' ')
            : "Login failed. Please try again.";
        toast.error(errorMessage);
        throw error; // Throw error to handle it in `page.js`
    }
};



const logout = async (setIsAuthenticated) => {
    try {
        await signOut(auth);
        localStorage.removeItem("authToken"); // Clear auth token from localStorage
        setIsAuthenticated(false); // Update authentication state
        toast.success("Logout successful");
    } catch (error) {
        console.log("Logout Error: ", error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

const resetpass = async (email) => {
    console.log(email)
    if (!email) {
        toast.error("Enter your Email")
    }
    try {
        const userRef = collection(db, "users")
        const q = query(userRef, where("email", "==", email))
        const querySnap = await getDocs(q)
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset Email Sent")
        } else {
            toast.error("Email doesn't exists")
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }

}

export { signup, login, logout, auth, db, resetpass };

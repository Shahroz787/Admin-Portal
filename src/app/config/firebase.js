import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc, updateDoc, serverTimestamp, query, getDoc, collection, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    // apiKey: "AIzaSyDV2rcK2owoUm6eFyw2KA4_Zb3r2LDNW10",
    // authDomain: "dashboard-bf708.firebaseapp.com",
    // projectId: "dashboard-bf708",
    // storageBucket: "dashboard-bf708.firebasestorage.app",
    // messagingSenderId: "872431833205",
    // appId: "1:872431833205:web:f1327e5793a27b4663283c",
    // measurementId: "G-YJFM1B6Z8D"
    apiKey: "AIzaSyBUWD3xPdUPJ-Bm-DLNmxgLHAL6Pq-TIxs",
    authDomain: "chatsapp-d6c80.firebaseapp.com",
    projectId: "chatsapp-d6c80",
    storageBucket: "chatsapp-d6c80.appspot.com",
    messagingSenderId: "913539421345",
    appId: "1:913539421345:web:947120288b8bef0be84ce0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password, avatarURL) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Signup successful");
        const user = res.user;

        // Save user data to Firestore, including avatar URL
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: avatarURL || "", // Save avatar URL here
        });

    } catch (error) {
        console.log("Signup Error: ", error);
        const errorMessage = error?.code
            ? error.code.split('/')[1].split('-').join(' ')
            : "Signup failed. Please try again.";
        toast.error(errorMessage);
    }
};


const login = async (email, password, router) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Update last login time in Firestore
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            lastLogin: serverTimestamp()
        });

        // Successful login
        toast.success("Login successful");

          // Use `push` to navigate to dashboard page after successful login
          router.push("/dashboard");

    } catch (error) {
        const errorMessage = error?.code
            ? error.code.split('/')[1].split('-').join(' ')
            : "Login failed. Please try again.";
        toast.error(errorMessage);
    }
};



const logout = async () => {
    try {
        await signOut(auth);
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

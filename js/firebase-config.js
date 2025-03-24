// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlkVBPWr5gw4wJGcLbAcpfFkCUfKLgdf4",
    authDomain: "farmsphere-b9e3b.firebaseapp.com",
    projectId: "farmsphere-b9e3b",
    storageBucket: "farmsphere-b9e3b.firebasestorage.app",
    messagingSenderId: "845445767021",
    appId: "1:845445767021:web:1df82928d21949892a4464",
    measurementId: "G-L5GCRZSP52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Analytics
const analytics = getAnalytics(app);

export { auth, analytics }; 
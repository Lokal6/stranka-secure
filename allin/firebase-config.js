// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: window.ENV?.FIREBASE?.API_KEY || "AIzaSyCWq1-Dst9nyWJCJVkMNrfnC0Xp4od8SGY",
  authDomain: window.ENV?.FIREBASE?.AUTH_DOMAIN || "projekt-9ef39.firebaseapp.com",
  projectId: window.ENV?.FIREBASE?.PROJECT_ID || "projekt-9ef39",
  storageBucket: window.ENV?.FIREBASE?.STORAGE_BUCKET || "projekt-9ef39.appspot.com",
  messagingSenderId: window.ENV?.FIREBASE?.MESSAGING_SENDER_ID || "215580281626",
  appId: window.ENV?.FIREBASE?.APP_ID || "1:215580281626:web:2d9b2c372b441ffa8c7aa3",
  measurementId: window.ENV?.FIREBASE?.MEASUREMENT_ID || "G-PLPDKJB3E0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Set up Google Auth Provider
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.addScope('profile');
googleAuthProvider.addScope('email');
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

// Log initialization (for debugging - can be removed in production)
console.log("Firebase initialized with project:", firebaseConfig.projectId);

// Additional security measure - prevent direct access to config in console
Object.freeze(firebaseConfig); 
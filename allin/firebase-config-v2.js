// Firebase configuration
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore ? firebase.firestore() : null;
const storage = firebase.storage ? firebase.storage() : null;

// Set up Google Auth Provider
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.addScope('profile');
googleAuthProvider.addScope('email');
// Set custom parameters to ensure we're using the correct client ID
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

// Log initialization
console.log("Firebase initialized with project:", firebaseConfig.projectId);

// Export for use in other files
window.firebaseConfig = firebaseConfig;
window.auth = auth;
window.db = db;
window.storage = storage;
window.googleAuthProvider = googleAuthProvider; 
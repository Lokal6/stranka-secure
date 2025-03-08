// Firebase configuration
const firebaseConfig = {
  // Use environment variables if available, otherwise use restricted keys
  apiKey: window.ENV?.FIREBASE?.API_KEY || "AIzaSyCWq1-Dst9nyWJCJVkMNrfnC0Xp4od8SGY",
  authDomain: window.ENV?.FIREBASE?.AUTH_DOMAIN || "projekt-9ef39.firebaseapp.com",
  projectId: window.ENV?.FIREBASE?.PROJECT_ID || "projekt-9ef39",
  storageBucket: window.ENV?.FIREBASE?.STORAGE_BUCKET || "projekt-9ef39.appspot.com",
  messagingSenderId: window.ENV?.FIREBASE?.MESSAGING_SENDER_ID || "215580281626",
  appId: window.ENV?.FIREBASE?.APP_ID || "1:215580281626:web:2d9b2c372b441ffa8c7aa3",
  measurementId: window.ENV?.FIREBASE?.MEASUREMENT_ID || "G-PLPDKJB3E0"
};

// Security measures for API keys
(function() {
  // Check if we're in a secure context (HTTPS or localhost)
  const isSecureContext = window.location.protocol === 'https:' || 
                          window.location.hostname === 'localhost' ||
                          window.location.hostname === '127.0.0.1';
  
  if (!isSecureContext) {
    console.warn('Application is running in an insecure context. API keys may be exposed.');
  }
  
  // Set HTTP referrer policy to restrict referrer information
  const metaReferrer = document.createElement('meta');
  metaReferrer.name = 'referrer';
  metaReferrer.content = 'strict-origin-when-cross-origin';
  document.head.appendChild(metaReferrer);
  
  // Add Content Security Policy to restrict API usage to your domain
  const metaCSP = document.createElement('meta');
  metaCSP.httpEquiv = 'Content-Security-Policy';
  metaCSP.content = "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.gstatic.com";
  document.head.appendChild(metaCSP);
})();

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

// Set persistence to LOCAL - user will stay signed in even after browser close
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log("Firebase auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

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
window.firebaseConfig = Object.freeze(firebaseConfig); // Make immutable
window.auth = auth;
window.db = db;
window.storage = storage;
window.googleAuthProvider = googleAuthProvider; 
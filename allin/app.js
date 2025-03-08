// DOM Elements
const lockScreen = document.getElementById('lockScreen');
const mainContent = document.getElementById('mainContent');
const logoutBtn = document.getElementById('logoutBtn');
const contactForm = document.getElementById('contactForm');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const lockScreenError = document.getElementById('lockScreenError');
const nightModeToggle = document.getElementById('nightModeToggle');
const body = document.body;
const desktopBg = document.querySelector('.desktop-bg');
const mobileBg = document.querySelector('.mobile-bg');

// Check for night mode preference on page load
const isNightMode = localStorage.getItem('nightMode') === 'true';
if (isNightMode) {
    enableNightMode();
}

// Debug element existence
console.log('Lock screen exists:', !!lockScreen);
console.log('Main content exists:', !!mainContent);
console.log('Logout button exists:', !!logoutBtn);
console.log('Google sign in button exists:', !!googleSignInBtn);
console.log('Lock screen error exists:', !!lockScreenError);

// Authentication state observer
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in - show main content and hide lock screen
        lockScreen.style.display = 'none';
        mainContent.style.display = 'block';
        console.log('User logged in:', user.email);
        
        // If user signed in with Google, you could display their profile picture
        if (user.photoURL) {
            console.log('User photo URL:', user.photoURL);
        }
    } else {
        // User is signed out - show lock screen and hide main content
        lockScreen.style.display = 'flex';
        mainContent.style.display = 'none';
        console.log('User logged out');
    }
});

// Google Sign-In functionality
const signInWithGoogle = () => {
    console.log('Starting Google sign-in process...');
    
    // Clear any previous errors
    if (lockScreenError) lockScreenError.textContent = '';
    
    // Using Firebase's built-in Google auth provider
    auth.signInWithPopup(googleAuthProvider)
        .then((result) => {
            // Google Sign-In successful
            const user = result.user;
            console.log('Google sign-in successful:', user.displayName);
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            
            console.error('Google sign-in error:', errorMessage);
            console.error('Error code:', errorCode);
            console.error('Error details:', error);
            
            // Display user-friendly error message
            let userMessage = 'Google sign-in failed. Please try again.';
            
            if (errorCode === 'auth/invalid-api-key') {
                userMessage = 'Authentication configuration error. Please contact support.';
            } else if (errorCode === 'auth/popup-closed-by-user') {
                userMessage = 'Sign-in was cancelled. Please try again.';
            } else if (errorCode === 'auth/popup-blocked') {
                userMessage = 'Pop-up was blocked by your browser. Please allow pop-ups for this site.';
                // Fall back to redirect method if popup is blocked
                auth.signInWithRedirect(googleAuthProvider);
                return;
            }
            
            // Display error in the lock screen error element
            if (lockScreenError) lockScreenError.textContent = userMessage;
        });
};

// Handle redirect result when user comes back from Google sign-in
auth.getRedirectResult()
    .then((result) => {
        console.log('Got redirect result:', result);
        if (result.user) {
            // Google Sign-In successful
            const user = result.user;
            console.log('Google sign-in successful from redirect:', user.displayName);
        } else {
            console.log('No user from redirect result');
        }
    })
    .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.error('Google sign-in result error:', errorMessage);
        console.error('Error code:', errorCode);
        console.error('Error details:', error);
        
        // Display error in the lock screen error element
        if (lockScreenError) lockScreenError.textContent = 'Google sign-in failed. Please try again.';
    });

// Google sign in button event listener
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', (e) => {
        console.log('Google sign in button clicked');
        e.preventDefault();
        signInWithGoogle();
    });
}

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    });
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle contact form submission
        console.log('Contact form submitted');
        // You can add code here to send the form data to your server or Firebase
    });
}

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-cards .card, .about, .contact');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

// Add animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
animateOnScroll();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Night Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const nightModeToggle = document.getElementById('nightModeToggle');
    
    // Toggle night mode when the button is clicked
    if (nightModeToggle) {
        nightModeToggle.addEventListener('click', () => {
            if (body.classList.contains('night-mode')) {
                disableNightMode();
            } else {
                enableNightMode();
            }
        });
    }
});

// Function to enable night mode
function enableNightMode() {
    body.classList.add('night-mode');
    
    // Change background images to night mode versions
    if (desktopBg) {
        desktopBg.src = 'assets/images/solo-leveling-igris-shadow-8k-wallpaper-uhdpaper.com-149@5@d-night.jpg';
    }
    
    if (mobileBg) {
        mobileBg.src = 'assets/images/solo-leveling-igris-shadow-8k-wallpaper-uhdpaper.com-149@5@d-night.jpg';
    }
    
    // Update header and footer styles
    const header = document.getElementById('mainHeader');
    const footer = document.querySelector('footer');
    
    if (header) {
        header.setAttribute('style', 'background-color: #121212 !important; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3) !important;');
        const nav = header.querySelector('nav');
        if (nav) {
            nav.setAttribute('style', 'background-color: #121212 !important;');
        }
        
        // Update nav links color
        const navLinks = header.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.setAttribute('style', 'color: #d0d0d0 !important;');
        });
        
        // Update logo color
        const logo = header.querySelector('.logo');
        if (logo) {
            logo.setAttribute('style', 'color: #d0d0d0 !important;');
        }
        
        // Update welcome message
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.style.backgroundColor = '#121212';
            welcomeMessage.style.color = '#d0d0d0';
            welcomeMessage.style.border = '1px solid #d0d0d0';
        }
    }
    
    if (footer) {
        footer.setAttribute('style', 'background-color: #121212 !important; color: #d0d0d0 !important; box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3) !important;');
    }
    
    // Save preference to localStorage
    localStorage.setItem('nightMode', 'true');
}

// Function to disable night mode
function disableNightMode() {
    body.classList.remove('night-mode');
    
    // Change background images back to day mode versions
    if (desktopBg) {
        desktopBg.src = 'assets/images/solo-leveling-igris-shadow-8k-wallpaper-uhdpaper.com-149@5@d.jpg';
    }
    
    if (mobileBg) {
        mobileBg.src = 'assets/images/solo-leveling-igris-shadow-phone-wallpaper-4k-uhdpaper.com-149@5@d.jpg';
    }
    
    // Update header and footer styles
    const header = document.getElementById('mainHeader');
    const footer = document.querySelector('footer');
    
    if (header) {
        header.setAttribute('style', 'background-color: white !important; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;');
        const nav = header.querySelector('nav');
        if (nav) {
            nav.setAttribute('style', 'background-color: white !important;');
        }
        
        // Update nav links color
        const navLinks = header.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.setAttribute('style', 'color: #333 !important;');
        });
        
        // Update logo color
        const logo = header.querySelector('.logo');
        if (logo) {
            logo.setAttribute('style', 'color: #4285f4 !important;');
        }
        
        // Update welcome message
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.style.backgroundColor = '#4285f4';
            welcomeMessage.style.color = 'white';
            welcomeMessage.style.border = 'none';
        }
    }
    
    if (footer) {
        footer.setAttribute('style', 'background-color: white !important; color: #333 !important; box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1) !important;');
    }
    
    // Save preference to localStorage
    localStorage.setItem('nightMode', 'false');
} 
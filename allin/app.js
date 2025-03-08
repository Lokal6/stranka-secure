// Main application module
const App = (function() {
    // DOM Elements
    const elements = {
        lockScreen: document.getElementById('lockScreen'),
        mainContent: document.getElementById('mainContent'),
        logoutBtn: document.getElementById('logoutBtn'),
        contactForm: document.getElementById('contactForm'),
        googleSignInBtn: document.getElementById('googleSignInBtn'),
        lockScreenError: document.getElementById('lockScreenError'),
        nightModeToggle: document.getElementById('nightModeToggle'),
        body: document.body,
        desktopBg: document.querySelector('.desktop-bg'),
        mobileBg: document.querySelector('.mobile-bg')
    };

    // Debug element existence
    console.log('Lock screen exists:', !!elements.lockScreen);
    console.log('Main content exists:', !!elements.mainContent);
    console.log('Logout button exists:', !!elements.logoutBtn);
    console.log('Google sign in button exists:', !!elements.googleSignInBtn);
    console.log('Lock screen error exists:', !!elements.lockScreenError);

    // Initialize the application
    function init() {
        // Check for night mode preference on page load
        const isNightMode = localStorage.getItem('nightMode') === 'true';
        if (isNightMode) {
            ThemeManager.enableNightMode();
        }

        // Set up event listeners
        setupEventListeners();
        
        // Set up authentication observer
        setupAuthObserver();
        
        // Initialize animations
        initAnimations();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Google sign in button event listener
        if (elements.googleSignInBtn) {
            elements.googleSignInBtn.addEventListener('click', (e) => {
                console.log('Google sign in button clicked');
                e.preventDefault();
                AuthManager.signInWithGoogle();
            });
        }

        // Logout functionality
        if (elements.logoutBtn) {
            elements.logoutBtn.addEventListener('click', () => {
                AuthManager.signOut();
            });
        }

        // Contact form submission
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Handle contact form submission
                console.log('Contact form submitted');
                // You can add code here to send the form data to your server or Firebase
            });
        }

        // Night Mode Toggle Functionality
        if (elements.nightModeToggle) {
            elements.nightModeToggle.addEventListener('click', () => {
                if (elements.body.classList.contains('night-mode')) {
                    ThemeManager.disableNightMode();
                } else {
                    ThemeManager.enableNightMode();
                }
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Add animation on scroll
        window.addEventListener('scroll', AnimationManager.animateOnScroll);
    }

    // Set up authentication observer
    function setupAuthObserver() {
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in - show main content and hide lock screen
                elements.lockScreen.style.display = 'none';
                elements.mainContent.style.display = 'block';
                console.log('User logged in:', user.email);
                
                // If user signed in with Google, you could display their profile picture
                if (user.photoURL) {
                    console.log('User photo URL:', user.photoURL);
                }
            } else {
                // User is signed out - show lock screen and hide main content
                elements.lockScreen.style.display = 'flex';
                elements.mainContent.style.display = 'none';
                console.log('User logged out');
            }
        });

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
                if (elements.lockScreenError) elements.lockScreenError.textContent = 'Google sign-in failed. Please try again.';
            });
    }

    // Initialize animations
    function initAnimations() {
        // Initial check for elements in view
        AnimationManager.animateOnScroll();
    }

    // Return public methods and properties
    return {
        init: init,
        elements: elements
    };
})();

// Authentication Manager Module
const AuthManager = (function() {
    // Google Sign-In functionality
    function signInWithGoogle() {
        console.log('Starting Google sign-in process...');
        
        // Clear any previous errors
        if (App.elements.lockScreenError) App.elements.lockScreenError.textContent = '';
        
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
                if (App.elements.lockScreenError) App.elements.lockScreenError.textContent = userMessage;
            });
    }

    // Sign out functionality
    function signOut() {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    }

    // Return public methods
    return {
        signInWithGoogle: signInWithGoogle,
        signOut: signOut
    };
})();

// Theme Manager Module
const ThemeManager = (function() {
    // Function to enable night mode
    function enableNightMode() {
        App.elements.body.classList.add('night-mode');
        
        // Change background images to night mode versions
        if (App.elements.desktopBg) {
            App.elements.desktopBg.src = 'assets/images/solo-leveling-igris-shadow-8k-wallpaper-uhdpaper.com-149@5@d-night.jpg';
        }
        
        if (App.elements.mobileBg) {
            App.elements.mobileBg.src = 'assets/images/solo-leveling-igris-shadow-phone-wallpaper-4k-uhdpaper.com-149@5@d-night.jpg';
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
        App.elements.body.classList.remove('night-mode');
        
        // Change background images back to day mode versions
        if (App.elements.desktopBg) {
            App.elements.desktopBg.src = 'assets/images/solo-leveling-igris-shadow-8k-wallpaper-uhdpaper.com-149@5@d.jpg';
        }
        
        if (App.elements.mobileBg) {
            App.elements.mobileBg.src = 'assets/images/solo-leveling-igris-shadow-phone-wallpaper-4k-uhdpaper.com-149@5@d.jpg';
            
            // Force browser to recognize the change by triggering a reflow
            App.elements.mobileBg.style.display = 'none';
            setTimeout(() => {
                App.elements.mobileBg.style.display = '';
            }, 10);
        }
        
        // Reset header and footer styles
        const header = document.getElementById('mainHeader');
        const footer = document.querySelector('footer');
        
        if (header) {
            header.removeAttribute('style');
            const nav = header.querySelector('nav');
            if (nav) {
                nav.removeAttribute('style');
            }
            
            // Reset nav links color
            const navLinks = header.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.removeAttribute('style');
            });
            
            // Reset logo color
            const logo = header.querySelector('.logo');
            if (logo) {
                logo.removeAttribute('style');
            }
            
            // Reset welcome message
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage) {
                welcomeMessage.removeAttribute('style');
            }
        }
        
        if (footer) {
            footer.removeAttribute('style');
        }
        
        // Save preference to localStorage
        localStorage.setItem('nightMode', 'false');
    }

    // Return public methods
    return {
        enableNightMode: enableNightMode,
        disableNightMode: disableNightMode
    };
})();

// Animation Manager Module
const AnimationManager = (function() {
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-cards .card, .about, .contact');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }

    // Return public methods
    return {
        animateOnScroll: animateOnScroll
    };
})();

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', App.init); 
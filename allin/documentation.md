# Solo Leveling Web Application Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Authentication](#authentication)
4. [UI Components](#ui-components)
5. [YouTube Integration](#youtube-integration)
6. [Firebase Integration](#firebase-integration)
7. [Performance Optimization](#performance-optimization)
8. [Error Handling](#error-handling)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Security Considerations](#security-considerations)
12. [Troubleshooting](#troubleshooting)

## Overview

The Solo Leveling Web Application is a responsive web application that allows users to watch YouTube videos from a curated playlist. The application features Google authentication, night mode, and remembers the user's last watched video and timestamp.

### Key Features

- Google Sign-In authentication
- YouTube playlist integration
- Video progress tracking and restoration
- Night/Day mode toggle
- Responsive design for mobile and desktop
- Offline detection and handling
- Performance optimization with lazy loading

## Architecture

The application follows a modular architecture with clear separation of concerns:

### Core Modules

1. **App Module** (`app.js`): Main application logic and initialization
2. **Authentication Manager**: Handles user authentication with Firebase
3. **Theme Manager**: Manages night/day mode functionality
4. **Animation Manager**: Handles UI animations
5. **Network Monitor**: Monitors network connectivity
6. **Performance Optimizer**: Optimizes application performance

### File Structure

- `index.html`: Main HTML file
- `app.js`: Main JavaScript file (modular structure)
- `styles.css`: Main CSS styles
- `background.css`: Background-specific styles
- `firebase-config-v2.js`: Firebase configuration
- `.env.js`: Environment variables (API keys)
- `tests.js`: Testing framework
- `documentation.md`: This documentation file

## Authentication

The application uses Firebase Authentication with Google Sign-In.

### Authentication Flow

1. User clicks the Google Sign-In button
2. Firebase Authentication opens a popup for Google Sign-In
3. After successful authentication, the user's information is stored in Firebase
4. The application displays the main content and loads the user's saved state

### Code Example

```javascript
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
            // ...
        });
}
```

## UI Components

### Lock Screen

The lock screen is displayed when the user is not authenticated. It contains:

- Google Sign-In button
- Error message display area

### Main Content

The main content is displayed when the user is authenticated. It contains:

- YouTube video player
- Video playlist
- Night mode toggle
- Logout button

### Night Mode

The application supports a night mode that changes the color scheme and background images:

- Light theme: White background, dark text
- Dark theme: Dark background, light text

## YouTube Integration

The application integrates with the YouTube API to load and play videos from a playlist.

### Playlist Loading

1. The application loads the playlist metadata using the YouTube API
2. It then loads the first batch of videos (50 videos)
3. Additional videos are loaded as the user scrolls through the playlist

### Video Player

The YouTube player is embedded using the YouTube IFrame API. It supports:

- Play/pause controls
- Volume control
- Fullscreen mode
- Timestamp tracking

### Progress Tracking

The application tracks the user's progress through the playlist:

- Current video index
- Current timestamp within the video
- Last watched date

This information is saved to Firebase Firestore and restored when the user returns.

## Firebase Integration

The application uses several Firebase services:

### Firebase Authentication

Used for Google Sign-In authentication.

### Firebase Firestore

Used to store user data:

- Email
- Display name
- Photo URL
- Video position (index in playlist)
- Last video timestamp
- Last watched date

### Firebase Hosting

The application is deployed using Firebase Hosting.

## Performance Optimization

The application includes several performance optimizations:

### Lazy Loading

- Images are lazy loaded using the native `loading="lazy"` attribute or Intersection Observer API fallback
- YouTube videos are loaded only when they come into view
- Thumbnails are displayed until the video is clicked

### Preconnect

The application preconnects to important domains to reduce connection setup time:

```javascript
// Preconnect to important domains
function preconnectToDomains() {
    const domains = [
        'https://www.youtube.com',
        'https://www.googleapis.com',
        'https://www.gstatic.com',
        'https://firestore.googleapis.com',
        'https://identitytoolkit.googleapis.com',
        'https://i.ytimg.com'
    ];
    
    domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
        
        // Also add DNS-prefetch as fallback
        const dnsLink = document.createElement('link');
        dnsLink.rel = 'dns-prefetch';
        dnsLink.href = domain;
        document.head.appendChild(dnsLink);
    });
}
```

### Performance Monitoring

The application monitors key performance metrics:

- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## Error Handling

The application includes comprehensive error handling:

### Script Loading Errors

The application detects and handles script loading errors:

```javascript
// Error handling for script loading
function handleScriptError(scriptSrc) {
    console.error(`Failed to load script: ${scriptSrc}`);
    const errorElement = document.getElementById('lockScreenError');
    if (errorElement) {
        errorElement.textContent = `Failed to load required resources. Please check your connection and try again.`;
    }
}
```

### Network Errors

The application monitors network connectivity and handles offline scenarios:

```javascript
// Network status monitoring
const NetworkMonitor = (function() {
    // ...
    
    // Check network status
    function checkNetworkStatus() {
        return new Promise((resolve) => {
            // Use fetch to check if we can actually reach the server
            fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=PL79KHfFXBQXXOg_UAdkVtnz_m3zVr86QB&key=' + (window.ENV?.YOUTUBE_API_KEY || 'AIzaSyDbwMgehgSGy7yZ9aoHwFrR_mm4uu5PZTU'), { 
                method: 'HEAD',
                mode: 'cors',
                cache: 'no-cache',
                timeout: 5000
            })
            .then(() => {
                isOnline = true;
                notifyListeners();
                displayNetworkStatus();
                resolve(true);
            })
            .catch(() => {
                // We might be online but can't reach the server
                if (navigator.onLine) {
                    console.warn('Browser reports online but cannot reach server');
                }
                isOnline = false;
                notifyListeners();
                displayNetworkStatus();
                resolve(false);
            });
        });
    }
    
    // ...
})();
```

### Authentication Errors

The application handles various authentication errors:

- Invalid API key
- Popup closed by user
- Popup blocked by browser

## Testing

The application includes a comprehensive testing framework in `tests.js`.

### Test Suites

1. **Authentication Tests**: Tests Firebase authentication functionality
2. **UI Elements Tests**: Tests the existence of key UI elements
3. **Theme Functionality Tests**: Tests night mode functionality
4. **Network Monitoring Tests**: Tests network monitoring functionality
5. **Performance Optimization Tests**: Tests performance optimization functionality

### Running Tests

Tests can be run in the browser console:

```javascript
// Run all tests
TestSuite.runAllTests();

// Run specific test suite
TestSuite.testAuthentication();
```

## Deployment

The application is deployed using Firebase Hosting.

### Deployment Steps

1. Ensure all files are in the `allin` directory
2. Login to Firebase: `firebase login`
3. Deploy to Firebase Hosting: `firebase deploy --only hosting`

### Firebase Configuration

The Firebase configuration is in `firebase.json`:

```json
{
  "hosting": {
    "public": "allin",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "README.md",
      "*.bat",
      "*.exe",
      "*.cmd",
      "*.ps1"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Security Considerations

### API Keys

API keys are stored in `.env.js` and should be kept secure:

- The file should not be committed to Git
- API keys should be restricted to specific domains
- Firebase security rules should be properly configured

### Content Security Policy

The application includes a Content Security Policy to restrict API usage:

```javascript
// Add Content Security Policy to restrict API usage to your domain
const metaCSP = document.createElement('meta');
metaCSP.httpEquiv = 'Content-Security-Policy';
metaCSP.content = "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.gstatic.com";
document.head.appendChild(metaCSP);
```

### HTTPS

The application should always be served over HTTPS to ensure secure communication.

## Troubleshooting

### Common Issues

#### 1. Google Sign-In Not Working

- Check that the Firebase API key is correct
- Ensure the Google Sign-In client ID is properly configured
- Check that the domain is authorized in the Firebase console

#### 2. Videos Not Loading

- Check the YouTube API key
- Ensure the playlist ID is correct
- Check network connectivity

#### 3. Night Mode Not Working

- Check that the background images exist
- Ensure the CSS classes are properly applied

#### 4. Deployment Issues

If deployment fails, try:

```bash
firebase hosting:disable
firebase hosting:enable
firebase deploy --only hosting
```

### Debugging

The application includes extensive console logging for debugging:

- Authentication events
- Network status changes
- Performance metrics
- Error messages

## Contributing

To contribute to the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `TestSuite.runAllTests()`
5. Submit a pull request

## License

This project is licensed under the MIT License. 
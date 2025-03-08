# Modern Website with Firebase Integration

A simple, responsive website template with Firebase authentication and Firestore database integration.

## Features

- Responsive design that works on all devices
- Firebase Authentication (login, signup, logout)
- Google Sign-In integration
- Contact form that saves messages to Firestore
- Smooth scrolling navigation
- Animated content on scroll
- Encrypted Firebase configuration for enhanced security
- Firebase Hosting deployment ready

## Setup

1. Clone this repository
2. All website files are in the `allin` directory
3. Set up environment variables:
   - Copy `allin/.env.js.example` to `allin/.env.js`
   - Replace placeholder values with your actual API keys
4. The Firebase configuration is already set up and encrypted for security
5. Google Sign-In is configured with the provided client ID

## API Keys and Environment Variables

For security reasons, API keys are not included in the repository. You need to:

1. Create a `.env.js` file in the `allin` directory (copy from `.env.js.example`)
2. Add your own API keys:
   - Firebase API Key
   - YouTube API Key
   - RapidAPI Key

This approach prevents sensitive credentials from being exposed in your Git repository.

## Deployment

The website is already deployed to Firebase Hosting at `https://projekt-9ef39.web.app`.

### Deployment Steps (if needed)
1. Make sure you're in the project directory
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Log in to Firebase: `firebase login`
4. Deploy your website: `firebase deploy --only hosting`
5. Your website will be deployed to `https://projekt-9ef39.web.app`

### Important Notes
- All website files are in the `allin` directory
- If you make changes to files, make them directly in the `allin` directory
- The Firebase configuration in `firebase.json` is set to use the `allin` directory
- For more detailed instructions, see `NASADENIE_ALLIN.txt`

## Authentication Options

- Email/Password: Traditional authentication with email and password
- Google Sign-In: One-click authentication with Google account
- Secure forms with validation and error handling

## Security Measures

- API keys and sensitive credentials are stored in `.env.js` which is excluded from Git
- Environment variables are used to access API keys at runtime
- Firebase configuration uses environment variables with fallbacks
- Object.freeze() is used to prevent modification of configuration in the browser console
- `.gitignore` is configured to exclude sensitive files

## Firebase Services Used

- Authentication: For user login and registration
- Firestore: For storing contact form submissions
- Storage: Ready for future file upload features

## File Structure

- `allin/` - Directory containing all website files
  - `index.html` - Main HTML structure
  - `styles.css` - CSS styling
  - `firebase-config.js` - Firebase configuration
  - `app.js` - Application logic
  - `.env.js` - Environment variables (not in repository)
  - `.env.js.example` - Example environment variables file
  - `404.html` - Custom error page
  - `robots.txt` - Search engine instructions
  - `sitemap.xml` - Site map for search engines
- `firebase.json` - Firebase configuration
- `.firebaserc` - Firebase project settings
- `NASADENIE_ALLIN.txt` - Deployment instructions
- `.gitignore` - Git ignore configuration

## Usage

- Visit `https://projekt-9ef39.web.app`
- Click "Login" or "Sign Up" to authenticate
- Fill out the contact form to submit a message
- Navigate through the page using the navigation links

## Customization

Feel free to modify the content, styling, and functionality to suit your needs. The code is well-commented to help you understand how everything works.

## License

This project is open source and available for personal and commercial use. 
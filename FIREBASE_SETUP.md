# Firebase OAuth Setup Guide

## Overview
This project now includes Firebase OAuth authentication with Google sign-in functionality.

## Features Added
- ✅ Google OAuth authentication
- ✅ Firebase authentication service
- ✅ Google sign-in button component
- ✅ Integration with register and login pages
- ✅ Error handling and loading states

## Firebase Configuration

### 1. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Authentication in the Firebase console
4. Go to Authentication > Sign-in method
5. Enable Google provider
6. Add your authorized domains

### 2. Environment Variables
Create a `.env` file in your project root with the following variables:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Google OAuth Setup
1. In Firebase Console, go to Authentication > Sign-in method
2. Click on Google provider
3. Enable it and configure:
   - Project support email
   - Authorized domains
4. Save the configuration

## Usage

### Google Sign-In Button
The `GoogleAuthButton` component is now available in both login and register pages:

```tsx
import GoogleAuthButton from "../core/components/GoogleAuthButton";

<GoogleAuthButton
  onSuccess={(user) => {
    // Handle successful sign-in
    console.log("User signed in:", user);
  }}
  onError={(error) => {
    // Handle sign-in error
    console.error("Sign-in error:", error);
  }}
/>
```

### Firebase Auth Service
Use the Firebase authentication service for additional functionality:

```tsx
import { signInWithGoogle, signOutUser, getCurrentUser } from "../core/firebase/auth";

// Sign in with Google
const { user, error } = await signInWithGoogle();

// Sign out
await signOutUser();

// Get current user
const currentUser = getCurrentUser();
```

## Files Modified/Created

### New Files:
- `src/core/firebase/auth.ts` - Firebase authentication service
- `src/core/components/GoogleAuthButton.tsx` - Google OAuth button component
- `FIREBASE_SETUP.md` - This setup guide

### Modified Files:
- `src/pages/RegisterPage.tsx` - Added Google OAuth button
- `src/pages/LoginPage.tsx` - Added Google OAuth button

## Security Notes
- Never commit your Firebase API keys to version control
- Use environment variables for sensitive configuration
- Configure authorized domains in Firebase Console
- Set up proper security rules in Firebase

## Troubleshooting

### Common Issues:
1. **Popup blocked**: Ensure your domain is authorized in Firebase Console
2. **API key errors**: Verify your environment variables are correctly set
3. **CORS errors**: Check your Firebase project settings and authorized domains

### Debug Mode:
Enable debug logging by checking the browser console for Firebase authentication events.

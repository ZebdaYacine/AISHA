# Aicha - Algerian Artisan Platform

A modern e-commerce platform showcasing Algeria's traditional crafts and artisan heritage. Built with React, TypeScript, and Firebase.

## ✨ Features

- **Authentication**: Secure user authentication with Firebase Google OAuth
- **Modern UI**: Beautiful, responsive design with Tailwind CSS and DaisyUI
- **TypeScript**: Full type safety and modern JavaScript features
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Firebase Integration**: Real-time authentication and data management

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Authentication**: Firebase
- **Database**: Firebase Firestore
- **Build Tool**: Vite
- **Icons**: React Icons, Lucide React

## 🛠️ Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project with Google OAuth enabled

## 📦 Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd aisha
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Google Authentication
   - Get your Firebase configuration

4. **Create environment file**:
```bash
cp .env.example .env
```

5. **Add Firebase configuration**:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

6. **Start development server**:
```bash
npm run dev
```

## 🔐 Firebase Setup

### 1. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Authentication in the Firebase console
4. Go to Authentication > Sign-in method
5. Enable Google provider
6. Add your authorized domains

### 2. Google OAuth Setup
1. In Firebase Console, go to Authentication > Sign-in method
2. Click on Google provider
3. Enable it and configure:
   - Project support email
   - Authorized domains
4. Save the configuration

## 📁 Project Structure

```
src/
│
├── core/                 # Core application logic
│   ├── components/       # Reusable UI components
│   ├── firebase/         # Firebase configuration and services
│   ├── hooks/            # Custom React hooks
│   └── state/            # Global state management
│
├── pages/                # Page components
│   ├── HomePage.tsx      # Home page
│   ├── LoginPage.tsx     # Login page with Google OAuth
│   ├── RegisterPage.tsx  # Registration page with Google OAuth
│   └── ProfilePage.tsx   # User profile page
│
├── assets/               # Static assets
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

## 🌟 Key Features

### Authentication
- **Google OAuth**: One-click sign-in with Google accounts
- **Secure**: Enterprise-grade security with Firebase
- **Profile Management**: User profile display and management
- **Session Management**: Automatic authentication state handling

### User Experience
- **Beautiful Design**: Modern, responsive UI with smooth animations
- **Fast Loading**: Optimized performance with Vite
- **Mobile First**: Responsive design for all devices
- **Accessibility**: Built with accessibility in mind

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

1. **Build the project**:
```bash
npm run build
```

2. **Deploy the `dist` folder** to your hosting provider

3. **Configure Firebase hosting** (optional):
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify Firebase configuration
3. Ensure Google OAuth is properly enabled
4. Check the Firebase Console for authentication logs

## 🔍 Troubleshooting

### Common Issues:
1. **Popup blocked**: Ensure your domain is authorized in Firebase Console
2. **API key errors**: Verify your environment variables are correctly set
3. **CORS errors**: Check your Firebase project settings and authorized domains

### Debug Mode:
Enable debug logging by checking the browser console for Firebase authentication events.

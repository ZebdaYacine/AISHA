# Aisha - Artisan Heritage Platform

A modern e-commerce platform showcasing Algeria's traditional crafts and artisan heritage. Built with React, TypeScript, and Appwrite.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with DaisyUI and Tailwind CSS
- **Authentication**: Secure user authentication with Appwrite
- **Product Showcase**: Display of traditional Algerian crafts and products
- **Multi-language Support**: Language selector for international users
- **Theme Toggle**: Light/dark mode support
- **Responsive Design**: Mobile-first approach with responsive components

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, DaisyUI
- **Authentication**: Appwrite
- **Database**: Appwrite Databases
- **Icons**: React Icons
- **Forms**: React Hook Form
- **Routing**: React Router DOM

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Appwrite server running locally or cloud instance

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd aisha
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=http://localhost:8888/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id

# Firebase Configuration (if using Firebase)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

### 4. Appwrite Setup

1. **Install Appwrite** (if running locally):
   ```bash
   docker run -it --rm \
     --volume /var/run/docker.sock:/var/run/docker.sock \
     --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
     --entrypoint="install" \
     appwrite/appwrite:1.7.4
   ```

2. **Start Appwrite**:
   ```bash
   cd appwrite
   docker-compose up -d
   ```

3. **Create Project and Database**:
   - Access Appwrite Console at `http://localhost:80`
   - Create a new project
   - Create a database with a users collection
   - Update your `.env` file with the correct IDs

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── core/
│   ├── appwrite/          # Appwrite configuration
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   └── state/            # Global state management
├── pages/                # Page components
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## 🎨 Components

### Core Components
- **Navbar**: Navigation with language selector and theme toggle
- **Footer**: Site footer with links and information
- **FloatingImage**: Animated floating images for visual appeal
- **ProductCard**: Product display cards
- **ThemeToggle**: Light/dark mode switcher
- **LanguageSelector**: Multi-language support

### Pages
- **HomePage**: Main landing page with product showcase
- **LoginPage**: User authentication
- **RegisterPage**: User registration

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_APPWRITE_ENDPOINT` | Appwrite server endpoint | Yes |
| `VITE_APPWRITE_PROJECT_ID` | Appwrite project ID | Yes |
| `VITE_APPWRITE_DATABASE_ID` | Appwrite database ID | Yes |
| `VITE_APPWRITE_COLLECTION_ID` | Appwrite collection ID | Yes |

## 🔐 Authentication

The application uses Appwrite for authentication:

- **Registration**: Users can create accounts with email and password
- **Login**: Secure email/password authentication
- **Session Management**: Automatic session handling
- **Protected Routes**: Authentication-based route protection

## 🎯 Features in Detail

### Product Showcase
- Grid layout for product display
- Pagination for large product catalogs
- Filter tabs for product categories
- Responsive design for all screen sizes

### User Experience
- Smooth animations and transitions
- Loading states and error handling
- Form validation with React Hook Form
- Responsive navigation with mobile drawer

### Visual Design
- Custom color schemes with Tailwind CSS
- DaisyUI components for consistent UI
- Floating animations for visual appeal
- Theme-aware styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Ensure your environment variables are correctly set
3. Verify Appwrite server is running and accessible
4. Check browser console for any error messages

## 🔄 Updates

Stay updated with the latest changes by:

- Watching the repository
- Checking the [Releases](https://github.com/your-repo/releases) page
- Following the project documentation

---

**Built with ❤️ for showcasing Algeria's rich artisan heritage**

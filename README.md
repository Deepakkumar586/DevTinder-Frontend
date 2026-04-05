# Dev-Tinder 🚀

A modern social networking platform designed specifically for developers to connect, collaborate, and build meaningful professional relationships. Think Tinder meets LinkedIn for the developer community.

![Dev-Tinder](https://img.shields.io/badge/Dev--Tinder-React-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-red?style=for-the-badge)

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login System** - JWT-based authentication
- **Password Recovery** - Forgot password with email verification
- **OTP Verification** - Two-factor authentication for enhanced security
- **Profile Verification** - Ensure authentic developer profiles

### 👥 Social Networking
- **Developer Feed** - Discover and connect with fellow developers
- **Connection Requests** - Send and receive connection requests
- **User Profiles** - Comprehensive developer profiles with skills and experience
- **Real-time Notifications** - Stay updated with toast notifications

### 🎨 Modern UI/UX
- **Dark Theme** - Eye-friendly dark mode by default
- **Responsive Design** - Works seamlessly on all devices
- **Smooth Animations** - GSAP-powered animations for better user experience
- **Intuitive Navigation** - Clean and modern interface

### 🛠️ Developer Experience
- **Fast Development** - Vite-powered development server
- **Type Safety** - TypeScript support for better code quality
- **Code Linting** - ESLint configuration for consistent code style
- **Hot Reload** - Instant updates during development

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool and dev server

### State Management
- **Redux Toolkit** - Modern Redux with simplified setup
- **Redux Persist** - Persistent state across browser sessions

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library built on Tailwind CSS
- **Lucide React** - Beautiful & consistent icon library

### Routing & HTTP
- **React Router DOM** - Declarative routing for React
- **Axios** - Promise-based HTTP client

### Additional Libraries
- **GSAP** - High-performance animations
- **React Hot Toast** - Beautiful toast notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

```bash
# Check versions
node --version  # Should be 18.0.0+
npm --version   # Should be 8.0.0+
```

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Deepakkumar586/DevTinder-Frontend.git
cd dev-tinder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your environment variables:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Dev-Tinder
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 Usage

### Development Workflow
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Key Features Usage

#### 🔐 Authentication
1. **Sign Up**: Create your developer profile
2. **Login**: Access your account securely
3. **Verify Profile**: Complete profile verification for enhanced trust

#### 👥 Networking
1. **Browse Feed**: Discover developers in your area
2. **Send Requests**: Connect with interesting developers
3. **Manage Connections**: Accept/reject connection requests
4. **View Profiles**: Explore detailed developer profiles

#### ⚙️ Profile Management
1. **Edit Profile**: Update your information and skills
2. **Upload Photos**: Add profile and portfolio images
3. **Privacy Settings**: Control your visibility and data

## 📁 Project Structure

```
dev-tinder/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx     # Navigation component
│   │   ├── Footer.jsx     # Footer component
│   │   ├── Profile.jsx    # User profile component
│   │   ├── Connections.jsx # Connections management
│   │   ├── Requests.jsx   # Connection requests
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Login.jsx      # Login page
│   │   ├── Feed.jsx       # Main feed page
│   │   ├── About.jsx      # About page
│   │   └── ...
│   ├── utils/             # Utility functions and store
│   │   ├── appStore.jsx   # Redux store configuration
│   │   ├── authSlice.jsx  # Authentication state
│   │   ├── constants.js   # App constants
│   │   └── ...
│   ├── App.jsx            # Main app component
│   ├── Body.jsx           # Layout wrapper
│   └── main.jsx           # App entry point
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1. Fork the Repository
Click the "Fork" button at the top right of this repository.

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 4. Commit Your Changes
```bash
git commit -m "Add: Brief description of your changes"
```

### 5. Push to Your Branch
```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request
Open a pull request with a clear description of your changes.

## 📝 Code Style Guidelines

- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Add comments for complex logic
- Keep components small and focused

## 🐛 Reporting Issues

Found a bug? We'd love to hear about it!

1. Check existing issues first
2. Use the issue template
3. Provide detailed steps to reproduce
4. Include browser/console logs if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React community for amazing documentation
- Vite team for the incredible build tool
- Tailwind CSS for utility-first styling
- All contributors and supporters



---

**Happy coding! 🎉**

Made with ❤️ for the developer community

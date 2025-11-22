# MacOS-Style Portfolio

A stunning, interactive portfolio website that mimics the macOS Big Sur interface, built with React, Vite, and TailwindCSS.

![MacOS Portfolio](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.8-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-cyan)

## ✨ Features

- 🖥️ **Authentic macOS Interface**: Draggable windows, glassmorphic dock, and top menu bar
- 🌓 **Dark/Light Mode**: Seamless theme switching with dynamic wallpapers
- 🤖 **AI Integration**: Built-in Gemini AI chat assistant
- 💼 **Portfolio Showcase**: Finder-style project browser
- 💻 **Interactive Terminal**: Command-line interface with AI capabilities
- 🎨 **Interactive Typography**: Mouse-reactive font weight effects on welcome screen
- 📱 **Responsive Design**: Optimized for various screen sizes
- ⚡ **Fast Performance**: Built with Vite for lightning-fast HMR

## 🏗️ Project Structure

```
mac-os-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── apps/              # Window content components
│   │   │   ├── Finder.jsx
│   │   │   ├── Terminal.jsx
│   │   │   ├── Safari.jsx
│   │   │   ├── Welcome.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── GeminiChat.jsx
│   │   ├── desktop/           # OS UI components
│   │   │   ├── Desktop.jsx
│   │   │   ├── Dock.jsx
│   │   │   ├── DockIcon.jsx
│   │   │   └── TopBar.jsx
│   │   └── window/            # Window management
│   │       ├── Window.jsx
│   │       └── WindowControls.jsx
│   ├── data/                  # Configuration files
│   │   ├── projects.js
│   │   ├── commands.js
│   │   └── wallpapers.js
│   ├── hooks/                 # Custom React hooks
│   │   └── useGemini.js
│   ├── store/                 # State management
│   │   └── useWindowStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd MacOS-style\ Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Add your Gemini API key:
   - Create a `.env` file in the root directory
   - Add: `VITE_GEMINI_API_KEY=your_api_key_here`

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎮 Usage

### Desktop Interactions

- **Open Apps**: Click icons in the dock or desktop
- **Drag Windows**: Click and drag the title bar
- **Close/Minimize**: Use the traffic light buttons (red/yellow/green)
- **Focus Windows**: Click anywhere on a window to bring it to front
- **Toggle Theme**: Open Settings app and click the Toggle button

### Terminal Commands

- `help` - Display available commands
- `about` - Learn about the developer
- `skills` - View technical skills
- `contact` - Get contact information
- `clear` - Clear terminal history
- `ai <prompt>` - Ask the Gemini AI assistant

### Gemini AI Chat

Click the purple sparkle icon in the dock to open the AI chat interface. Ask questions and get intelligent responses powered by Google's Gemini API.

## 🎨 Customization

### Adding Projects

Edit `src/data/projects.js`:

```javascript
export const PROJECTS = [
  {
    id: 'proj1',
    title: 'Your Project',
    category: 'Tech Stack',
    description: 'Project description',
    color: 'bg-blue-500',
    link: '#'
  },
  // Add more projects...
];
```

### Changing Wallpapers

Edit `src/data/wallpapers.js`:

```javascript
export const WALLPAPERS = {
  light: "your-light-wallpaper-url",
  dark: "your-dark-wallpaper-url"
};
```

### Modifying Terminal Commands

Edit `src/data/commands.js`:

```javascript
export const COMMANDS = {
  yourcommand: "Output text",
  // Add more commands...
};
```

## 🔧 Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icon library
- **Google Gemini API** - AI chat integration

## 🌟 Key Features Explained

### Window Management System

The app uses Zustand for centralized window state management, handling:
- Window position tracking
- Z-index management for focus
- Open/close/minimize states
- Drag and drop functionality

### Interactive Typography

The Welcome screen features a unique mouse-proximity effect:
- Each character's font weight dynamically adjusts based on cursor distance
- Exponential falloff creates a "magnetic" feel
- Smooth transitions for natural animations

### Glassmorphism Design

Authentic macOS Big Sur aesthetics using:
- `backdrop-blur` for glass effects
- Semi-transparent backgrounds
- Border overlays with subtle opacity
- Shadow layering for depth

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Adrian**
- Portfolio: [Your Portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: hello@developer.com

## 🙏 Acknowledgments

- Inspired by macOS Big Sur design language
- Icons by [Lucide Icons](https://lucide.dev)
- Wallpapers from [Unsplash](https://unsplash.com)

---

Made By Sahan Hettiarachchi


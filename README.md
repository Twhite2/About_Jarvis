# Cyberpunk Portfolio

A modern, cyberpunk-themed portfolio website built with Next.js, React Three Fiber, Framer Motion, and TypeScript. This interactive web application features sleek animations, 3D elements, and a futuristic user interface that showcases projects in a visually stunning way.

![Cyberpunk Portfolio Screenshot](./aboutjarvis/public/portfolio-screenshot.jpg)

## 🌟 Features

- **Cyberpunk Design Language**: Neon colors, futuristic typography, and sleek UI elements create an immersive cyberpunk experience
- **Interactive 3D Models**: Project cards feature interactive 3D models built with React Three Fiber
- **Dynamic Animations**: Smooth page transitions and interactive elements using Framer Motion
- **Custom Cursor**: Unique cursor interaction that responds to hoverable elements
- **Vertical Navigation**: Space-saving vertical navbar with active section highlighting
- **Animated Buttons**: Interactive cyberpunk-style buttons with hover effects
- **Light & Dark Mode**: Seamless theme switching with animated transitions
- **Responsive Design**: Fully responsive layout that works on all devices
- **TypeScript Support**: Type-safe codebase for improved developer experience

## 🚀 Technologies Used

- [Next.js](https://nextjs.org/) - React framework with server-side rendering
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React renderer for Three.js
- [Three.js](https://threejs.org/) - 3D library for JavaScript
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Type Animation](https://github.com/maxeth/react-type-animation) - Typing animation component

## 🛠️ Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Twhite2/About_Jarvis.git
cd About_Jarvis/aboutjarvis
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🏗️ Project Structure

```
aboutjarvis/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js application files
│   │   ├── page.tsx    # Home page component
│   │   ├── layout.tsx  # Root layout component
│   │   └── globals.css # Global styles
│   ├── components/     # Reusable components
│   │   ├── AnimatedButton.tsx  # Custom button component
│   │   └── ThemeToggle.tsx     # Light/dark theme toggle
```

## ✨ Key Components

### AnimatedButton
A custom button component with interactive hover animations and cyberpunk styling.

### ThemeToggle
A switch component for toggling between light and dark mode with smooth transitions.

### 3D Models
Various 3D models rendered with React Three Fiber for visualizing projects.

## 🔌 Customization

### Changing Colors
The cyberpunk color palette can be customized in `src/app/globals.css` by modifying the CSS variables in the `:root` selector.

### Adding Projects
To add new projects, modify the projects section in `src/app/page.tsx` by adding new project cards with their respective 3D models.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop browsers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

- **Emmanuel Twhite** - [GitHub Profile](https://github.com/Twhite2)

## 🙏 Acknowledgments

- Inspired by cyberpunk aesthetics from games like Cyberpunk 2077
- 3D model implementations based on React Three Fiber examples
- Custom animations inspired by Framer Motion demonstrations

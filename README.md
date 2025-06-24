# 🌍 MapToGlobe

**Transform 2D maps into stunning 3D globes with realistic planetary features**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=flat-square&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

![MapToGlobe Demo](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=MapToGlobe+Demo+Screenshot)

## ✨ Features

### 🌍 **Core Functionality**
- **Equirectangular Map Conversion** - Transform flat maps into 3D spheres
- **Multiple Texture Layers** - Surface textures, height maps, specular maps, and cloud layers
- **Real-time 3D Rendering** - Powered by Three.js WebGL for smooth performance
- **Interactive Controls** - Mouse-driven camera controls with zoom, rotate, and pan

### 🪐 **Advanced Planetary Features**
- **Enhanced Ring System** - Multiple ring types (Saturn, Uranus, Jupiter) with full customization
- **Advanced Moon System** - Multi-moon support with individual orbits and properties
- **Dynamic Lighting** - Realistic sun and ambient lighting with adjustable intensity
- **Atmospheric Effects** - Shininess control and lighting-based shading

### 🎨 **Customization Options**
- **Background Control** - Solid black, transparent, or custom starfield images
- **Material Properties** - Adjustable shininess, bump mapping, and specular highlighting
- **Transform Controls** - Independent rotation controls for planets, moons, and rings
- **Export Capabilities** - Screenshot capture and animated GIF generation

### 🖥️ **User Interface**
- **Modern Dark Theme** - Sleek navigation panel with organized controls
- **Responsive Design** - Works on desktop and tablet devices
- **Real-time Sliders** - Instant feedback for all parameter adjustments
- **File Upload Interface** - Drag-and-drop support for texture files
- **Collapsible Sections** - Organized navigation with expandable/collapsible sections

### 💾 **Local Storage & Persistence**
- **Auto-Save Functionality** - Automatically saves your complete configuration locally
- **Comprehensive State Management** - Preserves moon systems, planet settings, lighting, and rings
- **Privacy-First Design** - All data stays on your device, no cloud synchronization
- **Manual Controls** - Save state manually or clear all data with one click
- **Storage Information** - View saved data size and last save timestamp
- **Cross-Session Persistence** - Your work is restored when you return to the application

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.0 or higher
- **npm** 7.0 or higher
- **Modern Web Browser** with WebGL support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MapToGlobe.git
   cd MapToGlobe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run serve
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

### Production Build
```bash
npm run build
```

## 📖 Usage Guide

### 🗺️ **Basic Map Upload**

1. **Prepare Your Map**
   - Use equirectangular projection format
   - Recommended aspect ratio: 2:1 (width:height)
   - Supported formats: JPG, PNG, WebP
   - Maximum file size: 10MB

2. **Upload Surface Texture**
   - Click **"Surface Texture"** in the Planet section
   - Select your map image file
   - The 3D globe will update instantly

3. **Navigate the Globe**
   - **Left Mouse**: Rotate camera around globe
   - **Mouse Wheel**: Zoom in/out
   - **Right Mouse**: Pan camera position

### 🌙 **Adding Advanced Features**

#### **Height Maps (Topography)**
```
1. Upload a surface texture first
2. Click "Height Map" 
3. Use grayscale images (white = high, black = low)
4. Adjust bump scale for elevation intensity
```

#### **Specular Maps (Water/Ice)**
```
1. Upload surface and height maps
2. Click "Specular Map"
3. White areas = reflective (water/ice)
4. Black areas = matte (land)
```

#### **Cloud Layers**
```
1. Upload a surface texture
2. Click "Cloud Layer"
3. Use images with transparency for realistic clouds
4. Independent rotation controls available
```

#### **Advanced Ring System** 🪐
```
🎯 Ring Presets:
• Saturn: Large golden rings with classic appearance
• Uranus: Narrow blue rings with subtle glow
• Jupiter: Thin brown rings with low opacity
• Custom: Full manual control over all properties

⚙️ Custom Ring Controls:
• Inner Radius: 0.5 - 8.0 units
• Outer Radius: 1.0 - 12.0 units  
• Thickness: 0.2 - 8.0 units (auto-calculated or manual)
• Opacity: 0.1 - 1.0 (transparency control)
• Rotation Speed: 0.0 - 3.0x (0.0 = stationary)

🎨 Texture Support:
• Surface Texture: Main ring appearance (rectangular format)
• Transparency Map: Alpha channel for ring gaps
• Vertical bands represent ring structure
• Real-time texture mapping

✨ Advanced Features:
• Animated rotation with speed control
• Real-time geometry updates
• Auto-enable when selecting presets
• Memory-efficient resource management
```

#### **Multi-Moon System** 🌙
```
🌍 Preset Systems:
• Earth: Single Luna moon with realistic proportions
• Jupiter: Io, Europa, Ganymede, Callisto with accurate orbital speeds  
• Saturn: Mimas, Titan, Iapetus with varied characteristics
• Custom: Three colorful example moons with different properties

🎮 Individual Moon Controls:
• Size: 0.1x to 2x scale per moon
• Distance: 3 to 50 units orbital radius
• Orbit Speed: 0.0 to 5x (0.0 = paused orbit)
• Rotation Speed: 0.0 to 5x (0.0 = paused rotation)
• Custom Textures: Upload individual textures per moon
• Visibility: Show/hide each moon independently

🔧 System Management:
• Add unlimited custom moons with random colors
• Remove individual moons
• Show/Hide all moons with bulk controls
• Clear entire moon system
• Real-time moon counter in UI
• Legacy single moon support maintained
```

### 🎨 **Customization**

#### **Lighting Control**
- **Sun Intensity**: Controls directional lighting (0-2.5)
- **Ambient Intensity**: Controls overall brightness (0-4)
- **Dynamic Positioning**: Light follows camera for optimal viewing

#### **Background Options**
- **Solid Black**: Classic space environment
- **Transparent**: For overlay applications or screenshots
- **Custom Image**: Upload starfield or nebula backgrounds

#### **Export Features**
- **Screenshot**: High-resolution JPG capture
- **Animation**: 5-second rotating GIF generation
- **Preserves**: Current lighting, textures, and camera angle

#### **Storage & Data Management**
```
💾 Auto-Save System:
• Automatically saves all settings as you work
• Complete moon systems with individual properties
• Planet configuration and lighting settings
• Ring system state and UI preferences

🎮 Manual Controls:
• Save State: Force save current configuration
• Clear Canvas: Reset everything and clear storage
• Storage Info: View data size and last save time
• Auto-Load: Restores work when you return

🛡️ Privacy & Limitations:
• All data stays on your device (no cloud sync)
• Browser and device specific (no cross-platform sync)
• Texture images not stored (only settings)
• ~5-10MB storage limit per browser
```

### 🔧 **Technical Improvements**
- **Enhanced Ring Engine** - Redesigned geometry system with memory optimization
- **Real-time Updates** - Smooth slider interactions with debounced geometry updates
- **Error Recovery** - Robust resource management with graceful failure handling
- **Preset System** - Scientifically-inspired ring configurations for different planet types

## 🌟 Advanced Features

### **🌙 Multi-Moon System Capabilities**
- **Realistic Physics**: Each moon follows independent orbital mechanics with smooth animations
- **Pause Controls**: Set orbit or rotation speed to 0.0 to freeze motion (perfect for tidally locked moons)
- **Educational Value**: Step-by-step observation of celestial mechanics
- **Unlimited Scaling**: Create systems with dozens of moons if desired
- **Performance Optimized**: Efficient rendering even with multiple celestial bodies

### **🎯 Preset Moon Systems**
- **Earth System**: Accurate Luna proportions and orbital characteristics
- **Jupiter System**: Four Galilean moons (Io, Europa, Ganymede, Callisto) with realistic relative sizes and speeds
- **Saturn System**: Major moons including massive Titan and distant Iapetus
- **Custom System**: Demonstration of varied moon properties with different colors and behaviors

### **⚡ Technical Innovations**
- **Smart Animation Loops**: Only updates visible objects to maintain 60fps performance
- **Dynamic Lighting**: Realistic shadow casting between moons and planets
- **Memory Management**: Efficient texture loading and cleanup for multiple objects
- **Modular Architecture**: Easy to extend with new celestial body types

### **💾 Data Persistence & Storage**
MapToGlobe includes a comprehensive local storage system that automatically preserves your work:

#### **🔄 Auto-Save Features**
- **Complete Moon Systems**: All individual moon properties (size, distance, speeds, visibility)
- **Planet Configuration**: Shininess, texture states, control settings
- **Lighting Settings**: Sun intensity, ambient lighting levels
- **Ring System**: Ring visibility and configuration
- **Legacy Compatibility**: Original single moon system support
- **UI State**: Navigation panel states and user preferences

#### **🛡️ Privacy & Security**
- **Local-Only Storage**: All data remains on your device using browser Local Storage API
- **No Cloud Sync**: Zero data transmission to external servers
- **Browser Isolation**: Settings are specific to each browser and device
- **User Control**: Manual save/clear options with storage size monitoring
- **Automatic Cleanup**: Graceful handling of storage limitations and errors

#### **⚙️ Storage Management**
```typescript
// Storage includes comprehensive state management
interface StoredAppState {
    moonSystem: {
        moons: MoonConfig[];           // Individual moon properties
        customMoonCounter: number;     // Custom moon naming counter
    };
    legacyMoon: {
        visible: boolean;              // Legacy moon visibility
        scale: number;                 // Legacy moon size
        distance: number;              // Legacy moon distance
    };
    planet: {
        shininess: number;             // Surface material properties
    };
    lighting: {
        sunIntensity: number;          // Directional light strength
        ambientIntensity: number;      // Ambient light level
    };
    rings: {
        visible: boolean;              // Ring system state
    };
    atmosphere: {
        enabled: boolean;              // Atmospheric effects
    };
    images: {
        surface: boolean;              // Texture upload states
        clouds: boolean;
    };
}
```

#### **📊 Storage Limitations**
- **Browser Quota**: ~5-10MB typical local storage limit
- **Device Specific**: No cross-device synchronization
- **Texture Files**: Images not stored (only configuration)
- **Incognito Mode**: Data cleared when private session ends
- **Browser Clearing**: Removed when user clears browser data

## 🛠️ Technical Architecture

### **Frontend Stack**
- **Vue.js 3** - Reactive UI framework with Composition API
- **TypeScript** - Type-safe development environment
- **Tailwind CSS** - Utility-first styling framework
- **Vue Router** - Client-side routing and navigation

### **3D Graphics Engine**
- **Three.js** - WebGL-based 3D rendering library
- **Custom Shaders** - GLSL shaders for realistic materials
- **Orbit Controls** - Camera manipulation and interaction
- **Transform Controls** - Object manipulation tools

### **Key Components**

#### **Scene Management (`Scene.ts`)**
```typescript
- WebGL renderer configuration
- Camera and lighting setup
- Shadow mapping and post-processing
- Responsive viewport handling
```

#### **Planet System (`Planet.ts`)**
```typescript
- Sphere geometry generation
- Multi-layer material system
- Texture loading and management
- Height map displacement
```

#### **Celestial Bodies**
```typescript
- Moon.ts: Legacy single moon system (maintained for compatibility)
- MoonSystem.ts: Advanced multi-moon management with individual controls
- Rings.ts: Planetary ring geometry with custom textures
- Dynamic parent-child relationships with realistic orbital mechanics
```

### **File Structure**
```
src/
├── assets/
│   └── MapToGlobe/          # Core 3D engine
│       ├── Scene.ts         # WebGL scene management
│       ├── Planet.ts        # Planet rendering logic
│       ├── Moon.ts          # Legacy single moon system
│       ├── MoonSystem.ts    # Advanced multi-moon system
│       ├── Rings.ts         # Ring geometry
│       └── MapToGlobe.ts    # Main controller
├── components/
│   ├── Nav.vue              # Navigation panel with storage controls
│   ├── Scene.vue            # 3D canvas wrapper
│   └── Loader.vue           # Loading animations
├── utils/
│   └── storage.ts           # Local storage management system
├── views/
│   ├── Home.vue             # Main application view
│   ├── Help.vue             # Documentation page
│   └── Legal.vue            # Legal information
└── router/                  # Vue Router configuration
```

## 🎯 Image Requirements

### **Equirectangular Maps**
- **Projection**: Equirectangular (geographic/plate carrée)
- **Aspect Ratio**: Exactly 2:1 (width must be 2× height)
- **Resolution**: 1024×512 to 8192×4096 pixels
- **Formats**: JPG, PNG, WebP, GIF

### **Height Maps**
- **Format**: Grayscale images
- **Mapping**: White = highest elevation, Black = lowest
- **Resolution**: Should match surface texture resolution
- **Detail**: Higher contrast = more pronounced elevation

### **Specular Maps**
- **Format**: Grayscale or RGB
- **Mapping**: White = maximum reflection, Black = no reflection
- **Use Cases**: Oceans, lakes, ice caps, wet surfaces
- **Tip**: Use blue channel for water bodies

### **Cloud Layers**
- **Format**: PNG with transparency preferred
- **Alpha Channel**: Controls cloud opacity
- **Pattern**: Swirling, organic cloud formations work best
- **Coverage**: Can be global or regional

### **Ring Textures**
- **Format**: Rectangular images (any aspect ratio)
- **Orientation**: Vertical bands represent ring structure
- **Transparency**: Use alpha channel for ring gaps
- **Examples**: Saturn ring textures, asteroid belt patterns

## ⚡ Performance Tips

### **Optimization Guidelines**
- **Image Size**: Keep textures under 4MB for best performance
- **Resolution**: Use 2048×1024 for most applications
- **Format**: JPG for photos, PNG for graphics with transparency
- **Browser**: Chrome provides best WebGL performance

### **Hardware Requirements**
- **GPU**: Dedicated graphics card recommended
- **RAM**: 4GB minimum, 8GB+ for large textures
- **Browser**: WebGL 1.0 support (most modern browsers)

### **Troubleshooting**
- **Black textures**: Reduce image size or resolution
- **Slow performance**: Lower texture quality or close other tabs
- **WebGL errors**: Update graphics drivers or try different browser

## 🌟 Use Cases

### **Educational Applications**
- **Geography Classes**: Visualize Earth's topography and features
- **Astronomy Education**: Create realistic planetary models
- **Historical Maps**: Transform historical cartography into 3D

### **Creative Projects**
- **Game Development**: Generate planetary environments
- **Art Installation**: Interactive globe displays
- **Data Visualization**: Geographic data representation

### **Professional Uses**
- **Geographic Information Systems (GIS)**
- **Scientific Visualization**
- **Marketing and Presentations**
- **Web Applications and Portfolios**

## 🔧 Development

### **Development Setup**
```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run serve

# Run type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Project Commands**
```bash
npm run serve          # Development server
npm run build          # Production build
npm run type-check     # TypeScript validation
npm run lint           # Code linting
npm run format         # Code formatting
```

### **Environment Configuration**
```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Process**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Coding Standards**
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Automatic code formatting
- **Vue 3**: Composition API preferred

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### **Technologies**
- [Three.js](https://threejs.org/) - 3D graphics library
- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

### **Inspiration**
- NASA's Blue Marble imagery
- Google Earth's 3D globe interface
- Scientific visualization tools

## 📞 Support

### **Documentation**
- [User Guide](docs/USER_GUIDE.md)
- [API Reference](docs/API.md)
- [FAQ](docs/FAQ.md)

### **Community**
- **Issues**: [GitHub Issues](https://github.com/yourusername/MapToGlobe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/MapToGlobe/discussions)
- **Email**: support@maptoglobe.com

### **Resources**
- [Equirectangular Projection Guide](https://en.wikipedia.org/wiki/Equirectangular_projection)
- [WebGL Compatibility Check](https://get.webgl.org/)
- [Three.js Documentation](https://threejs.org/docs/)

---

**Made with ❤️ by the MapToGlobe Team**

*Transform your world, one map at a time* 🌍→🌎→🌏 
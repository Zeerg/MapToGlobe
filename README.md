# 🌍 MapToGlobe

**Transform 2D maps into stunning 3D globes with realistic planetary features**

## ✨ Features

- **Equirectangular Map Conversion** - Transform flat maps into 3D spheres
- **Multiple Texture Layers** - Surface textures, height maps, specular maps, and cloud layers
- **Enhanced Ring System** - Multiple ring types (Saturn, Uranus, Jupiter) with full customization
- **Advanced Moon System** - Multi-moon support with individual orbits and properties
- **Dynamic Lighting** - Realistic sun and ambient lighting with adjustable intensity
- **Export Capabilities** - Screenshot capture and animated GIF generation
- **Auto-Save Functionality** - Automatically saves your complete configuration locally

## 🚀 Quick Start

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

## 📖 Usage

1. **Upload Surface Texture**
   - Click "Surface Texture" in the Planet section
   - Select your equirectangular map image file (2:1 aspect ratio)
   - The 3D globe will update instantly

2. **Navigate the Globe**
   - **Left Mouse**: Rotate camera around globe
   - **Mouse Wheel**: Zoom in/out
   - **Right Mouse**: Pan camera position

3. **Add Features**
   - **Height Maps**: Upload grayscale images for topography
   - **Rings**: Choose from Saturn, Uranus, Jupiter presets or customize
   - **Moons**: Add multiple moons with individual controls
   - **Lighting**: Adjust sun and ambient intensity 
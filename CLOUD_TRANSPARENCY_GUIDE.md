# Advanced Cloud Transparency System

This document describes the new advanced cloud transparency and atmospheric rendering system that has been implemented to enhance the visual quality and realism of planetary clouds.

## Overview

The enhanced cloud system replaces the previous basic `MeshPhongMaterial` approach with a sophisticated shader-based system that supports:

- **Dynamic Transparency Control**: Real-time opacity and density adjustments
- **Atmospheric Scattering**: Realistic light scattering effects
- **Rim Lighting**: Atmospheric glow around cloud edges
- **Multi-layer Cloud Systems**: Support for multiple cloud layers at different altitudes
- **Animated Cloud Movement**: Realistic cloud rotation and texture animation
- **Density Mapping**: Support for separate density maps for more detailed cloud structure
- **Planetary Presets**: Pre-configured cloud settings for different planet types

## New Files Added

### 1. `src/assets/MapToGlobe/CloudShader.ts`
- Contains the vertex and fragment shaders for advanced cloud rendering
- Implements the `AdvancedCloudMaterial` class with comprehensive controls
- Provides atmospheric scattering, rim lighting, and altitude-based opacity calculations

### 2. Enhanced `src/assets/MapToGlobe/Planet.ts`
- Added multi-layer cloud system support
- New methods for cloud layer management
- Preset configurations for Earth, Venus, and Jupiter cloud systems
- Enhanced animation and lighting integration

### 3. Updated `src/assets/MapToGlobe/MapToGlobe.ts`
- Integration of cloud lighting with sun direction
- Methods to control advanced cloud features
- Cloud system information and management

### 4. Enhanced `src/components/Nav.vue`
- New UI controls for cloud transparency settings
- Cloud preset buttons
- Density map upload support
- Storage integration for cloud settings

## Key Features

### 1. Dynamic Transparency Controls

**Cloud Opacity** (`0.0 - 1.0`)
- Controls the overall transparency of cloud layers
- `0.0` = Completely transparent
- `1.0` = Completely opaque

**Cloud Density** (`0.0 - 2.0`)
- Affects how dense the clouds appear
- Works in conjunction with density maps if provided
- Higher values create more solid-looking clouds

### 2. Atmospheric Effects

**Atmospheric Scattering** (`0.0 - 1.0`)
- Simulates light scattering through the atmosphere
- Creates realistic blue-tinted atmospheric effects
- Enhances the sense of depth and realism

**Rim Lighting** (`0.0 - 2.0`)
- Creates a glowing effect around cloud edges
- Simulates atmospheric backscattering
- Customizable color (default: blue atmospheric glow)

### 3. Cloud Animation

**Cloud Speed** (`0.0 - 5.0`)
- Controls how fast clouds move and rotate
- Includes both texture animation and mesh rotation
- Creates dynamic, living atmospheric effects

### 4. Advanced Texturing

**Cloud Texture**
- Primary cloud image (RGB channels for color, Alpha for transparency)
- Supports standard image formats (PNG, JPG, etc.)

**Density Map** (Optional)
- Separate grayscale image defining cloud density
- Red channel used for density information
- Allows for more detailed cloud structure control

### 5. Multi-Layer Cloud System

The new system supports multiple cloud layers at different altitudes:

**Layer Management:**
- `AddCloudLayer(name, altitude, rotationSpeed)`
- `RemoveCloudLayer(name)`
- `SetCloudLayerTexture(layerName, file, densityMap?)`
- Individual control over each layer's properties

**Altitude-based Effects:**
- Higher altitude clouds automatically become more transparent
- Realistic atmospheric density simulation
- Distance-based opacity for performance optimization

## Planetary Presets

### Earth Atmosphere
- **Low Clouds**: Dense, lower altitude clouds (altitude: 0.015)
  - Opacity: 0.9, Density: 1.2, Scattering: 0.4
- **High Clouds**: Wispy, higher altitude clouds (altitude: 0.025)
  - Opacity: 0.6, Density: 0.8, Scattering: 0.6, Enhanced rim lighting

### Venus Clouds
- **Dense Atmosphere**: Thick sulfuric acid clouds (altitude: 0.03)
  - Opacity: 0.95, Density: 1.5, Scattering: 0.8
  - Golden/yellow atmospheric rim lighting

### Jupiter Bands
- **Multiple Bands**: Three atmospheric layers simulating Jupiter's bands
  - Band 1: altitude 0.01, fast rotation
  - Band 2: altitude 0.02, medium rotation  
  - Band 3: altitude 0.03, slow rotation
  - Strong atmospheric scattering and rim lighting effects

## Usage Instructions

### Basic Cloud Setup

1. **Upload Surface Texture**: First upload a planet surface texture
2. **Upload Cloud Layer**: Click "Cloud Layer" to upload cloud texture
3. **Optional Density Map**: Upload a separate density map for detailed structure
4. **Adjust Settings**: Use the transparency controls to fine-tune appearance

### Advanced Multi-Layer Setup

```javascript
// Add multiple cloud layers programmatically
const lowClouds = maptoglobe.AddCloudLayer('low', 0.015, 0.0008);
const highClouds = maptoglobe.AddCloudLayer('high', 0.025, 0.0012);

// Configure each layer individually
maptoglobe.SetCloudLayerOpacity('low', 0.9);
maptoglobe.SetCloudLayerDensity('low', 1.2);
maptoglobe.SetCloudLayerOpacity('high', 0.6);
maptoglobe.SetCloudLayerAtmosphericScattering('high', 0.6);
```

### UI Controls Location

In the navigation panel under "Planet" section:
- **Cloud Layer**: Upload cloud texture
- **Density Map**: Upload optional density map (appears after cloud upload)
- **Cloud Transparency**: Sliders for opacity, density, scattering, rim lighting, speed
- **Cloud Presets**: Quick setup buttons for Earth, Venus, Jupiter configurations

## Technical Implementation Details

### Shader Features

The cloud shader implements several advanced rendering techniques:

1. **Atmospheric Scattering Calculation**:
   ```glsl
   vec3 calculateAtmosphericScattering(vec3 rayDirection, vec3 sunDirection, float intensity) {
       float cosTheta = dot(rayDirection, sunDirection);
       float scattering = pow(1.0 - cosTheta * cosTheta, 1.5);
       return vec3(0.4, 0.7, 1.0) * scattering * intensity;
   }
   ```

2. **Edge Fade for Soft Boundaries**:
   ```glsl
   float calculateEdgeFade(vec3 normal, vec3 viewDirection) {
       float edge = 1.0 - abs(dot(normal, viewDirection));
       return smoothstep(0.0, edgeFadeDistance, edge);
   }
   ```

3. **Altitude-based Opacity**:
   ```glsl
   float calculateAltitudeOpacity(vec3 position) {
       float altitude = length(position) - 2.0; // Planet radius is 2.0
       return 1.0 - (altitude * altitudeOpacityFactor);
   }
   ```

### Performance Optimizations

- **Distance-based Culling**: Clouds fade out at far distances
- **Soft Alpha Testing**: Prevents hard edges while maintaining performance
- **Optimized Blending**: Uses `NormalBlending` with `depthWrite: false`
- **Efficient Uniform Management**: Clamped values prevent shader errors

### Integration with Existing Systems

- **Sun Direction Sync**: Clouds automatically receive sun direction from scene lighting
- **Day/Night Compatibility**: Works alongside existing DayNightShader system
- **Animation Loop**: Integrated with main animation loop for smooth updates
- **Storage System**: Cloud settings are automatically saved and restored

## Troubleshooting

### Common Issues

1. **Clouds not visible**: Ensure cloud opacity > 0 and a cloud texture is loaded
2. **Performance issues**: Reduce cloud density or disable atmospheric scattering on lower-end devices
3. **Texture not loading**: Check that the image file is valid and not corrupted
4. **Preset not working**: Make sure a cloud texture is loaded before applying presets

### Best Practices

1. **Texture Resolution**: Use 1024x512 or 2048x1024 for optimal quality/performance balance
2. **Density Maps**: Use grayscale images where white = dense, black = transparent
3. **Layer Altitudes**: Keep altitude differences > 0.005 to prevent z-fighting
4. **Animation Speed**: Use speeds between 0.5-2.0 for realistic cloud movement

## Future Enhancements

Potential areas for future development:

1. **Volumetric Clouds**: True 3D volumetric cloud rendering
2. **Weather Systems**: Dynamic cloud formation and dissipation
3. **Cloud Shadows**: Realistic shadow casting from clouds onto planet surface
4. **Storm Systems**: Hurricane and storm cloud formations
5. **Seasonal Variations**: Automatic cloud pattern changes over time

## API Reference

### CloudShader Methods

```typescript
// Material creation
const material = new AdvancedCloudMaterial(cloudTexture?, densityMap?);

// Property setters
material.setCloudOpacity(opacity: number): void
material.setCloudDensity(density: number): void
material.setAtmosphericScattering(intensity: number): void
material.setRimLighting(intensity: number, color?: THREE.Vector3): void
material.setCloudSpeed(speed: number): void
material.updateTime(time: number): void

// Feature toggles
material.enableAtmosphericScattering(enable: boolean): void
material.enableRimLighting(enable: boolean): void
material.enableAltitudeFading(enable: boolean): void
```

### Planet Cloud Methods

```typescript
// Legacy single cloud system
planet.SetCloudsImage(file: File): void
planet.SetCloudOpacity(opacity: number): void
planet.SetCloudDensity(density: number): void

// Advanced multi-layer system
planet.AddCloudLayer(name: string, altitude?: number, rotationSpeed?: number): CloudLayer
planet.RemoveCloudLayer(name: string): boolean
planet.SetCloudLayerTexture(layerName: string, file: File, densityMap?: File): void
planet.SetCloudLayerOpacity(layerName: string, opacity: number): void

// Preset configurations
planet.SetupEarthCloudLayers(): void
planet.SetupVenusCloudLayers(): void
planet.SetupJupiterCloudLayers(): void
```

This advanced cloud system provides a significant enhancement to the visual quality and realism of planetary rendering, offering both simple controls for basic users and advanced features for those wanting detailed atmospheric effects.
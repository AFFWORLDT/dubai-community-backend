# 🗺️ Dubai Community - React Native Mobile App

## 🚀 Premium Location-Based Social Networking App

A luxury React Native mobile application for the Dubai Community platform with advanced location-based services.

---

## 📱 Core Features

- **Real-time Location Sharing** with privacy controls
- **Nearby User Discovery** with distance calculations  
- **Location-based Event Discovery** and RSVP
- **Dubai-Specific Regional Support** (48 regions)
- **JWT Authentication** with refresh tokens
- **Cloudinary Media Integration**
- **Real-time Messaging** and connections
- **Luxury UI/UX Design** with premium animations

---

## 🛠 Tech Stack

### **Frontend**
- React Native 0.72+ with TypeScript
- Expo SDK 49+ for rapid development
- React Navigation 6 for navigation
- Redux Toolkit for state management

### **UI/UX**
- React Native Elements for base components
- React Native Vector Icons for premium icons
- Lottie React Native for luxury animations
- React Native Reanimated 3 for smooth animations

### **Location Services**
- Expo Location for GPS services
- React Native Maps for map integration
- Geolocation for distance calculations

### **Networking & API**
- Axios for API communication
- React Query for data fetching
- JWT Token Management for authentication

---

## 🎨 Luxury Design System

### **Color Palette**
```typescript
export const Colors = {
  primary: '#1E3A8A',      // Deep Blue
  secondary: '#F59E0B',    // Gold Accent
  accent: '#10B981',       // Emerald Green
  white: '#FFFFFF',
  black: '#000000',
  dubaiGold: '#FFD700',
  dubaiBlue: '#0066CC',
  dubaiSand: '#F4E4BC',
}
```

### **Typography**
```typescript
export const Typography = {
  fonts: {
    primary: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  sizes: {
    xs: 12, sm: 14, base: 16, lg: 18, xl: 20,
    '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48,
  },
}
```

---

## 📁 Project Structure

```
dubai-community-mobile/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   ├── location/       # Location-based components
│   │   ├── profile/        # User profile components
│   │   ├── events/         # Event management components
│   │   └── social/         # Social features components
│   ├── screens/
│   │   ├── auth/           # Authentication screens
│   │   ├── main/           # Main app screens
│   │   ├── location/       # Location-based screens
│   │   └── social/         # Social feature screens
│   ├── navigation/         # Navigation configuration
│   ├── services/
│   │   ├── api/           # API integration
│   │   ├── location/      # Location services
│   │   ├── storage/       # Local storage
│   │   └── media/         # Media handling
│   ├── store/             # Redux store
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript types
│   └── assets/            # Images, icons, fonts
├── app.json
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### **Prerequisites**
```bash
# Install Node.js (v18+)
# Install Expo CLI
npm install -g @expo/cli
```

### **Create Project**
```bash
# Create new Expo project
npx create-expo-app@latest dubai-community-mobile --template

# Navigate to project
cd dubai-community-mobile

# Install dependencies
npm install
```

### **Core Dependencies**
```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# State Management
npm install @reduxjs/toolkit react-redux
npm install @tanstack/react-query

# UI Components
npm install react-native-elements react-native-vector-icons
npm install lottie-react-native

# Animations
npm install react-native-reanimated react-native-gesture-handler

# Location Services
npm install expo-location react-native-maps

# Networking
npm install axios react-native-keychain

# Media
npm install expo-image-picker cloudinary-react-native

# Storage
npm install @react-native-async-storage/async-storage

# Utilities
npm install date-fns react-hook-form yup react-native-dotenv
```

### **Environment Setup**
```bash
# Create .env file
touch .env

# Add environment variables
API_BASE_URL=http://localhost:8000
CLOUDINARY_CLOUD_NAME=dbk0iancm
CLOUDINARY_API_KEY=xUDIPFGtlbFTd3ZoQttFDPVZ728
CLOUDINARY_UPLOAD_PRESET=24booking
```

---

## 🎨 Luxury UI Components

### **Premium Button Component**
```typescript
// src/components/common/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, Typography } from '../../utils/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], styles[size], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.primary} />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`]]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primary: { backgroundColor: Colors.primary },
  secondary: { backgroundColor: Colors.secondary },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  sm: { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 },
  md: { paddingVertical: 12, paddingHorizontal: 24, minHeight: 48 },
  lg: { paddingVertical: 16, paddingHorizontal: 32, minHeight: 56 },
  disabled: { opacity: 0.5 },
  text: {
    fontFamily: Typography.fonts.semiBold,
    textAlign: 'center',
  },
  primaryText: { color: Colors.white },
  secondaryText: { color: Colors.white },
  outlineText: { color: Colors.primary },
  smText: { fontSize: Typography.sizes.sm },
  mdText: { fontSize: Typography.sizes.base },
  lgText: { fontSize: Typography.sizes.lg },
});
```

---

## 📱 Screen Implementations

### **Luxury Home Screen**
```typescript
// src/screens/main/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { NearbyUsers } from '../../components/location/NearbyUsers';
import { NearbyEvents } from '../../components/location/NearbyEvents';
import { Colors, Typography } from '../../utils/constants';
import { useLocation } from '../../hooks/useLocation';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { updateLocation } = useLocation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await updateLocation();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to Dubai Community</Text>
        <Text style={styles.subtitle}>Discover amazing people and events nearby</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Card style={styles.actionCard}>
          <Button title="Update Location" onPress={updateLocation} variant="primary" />
        </Card>
        <Card style={styles.actionCard}>
          <Button title="Create Event" onPress={() => navigation.navigate('CreateEvent')} variant="secondary" />
        </Card>
      </View>

      {/* Nearby Users */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>People Nearby</Text>
        <NearbyUsers />
      </View>

      {/* Nearby Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Events Near You</Text>
        <NearbyEvents />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  header: {
    padding: 24,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  greeting: {
    fontSize: Typography.sizes['2xl'],
    fontFamily: Typography.fonts.bold,
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    fontFamily: Typography.fonts.medium,
    color: Colors.gray[600],
  },
  quickActions: {
    flexDirection: 'row',
    padding: 24,
    gap: 16,
  },
  actionCard: { flex: 1 },
  section: { padding: 24 },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontFamily: Typography.fonts.semiBold,
    color: Colors.gray[800],
    marginBottom: 16,
  },
});
```

---

## 🔧 API Integration

### **API Client Setup**
```typescript
// src/services/api/client.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

class ApiClient {
  private client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const refreshToken = await AsyncStorage.getItem('refresh_token');
          if (refreshToken) {
            try {
              const response = await this.refreshToken(refreshToken);
              const { access_token } = response.data;
              await AsyncStorage.setItem('access_token', access_token);
              error.config.headers.Authorization = `Bearer ${access_token}`;
              return this.client.request(error.config);
            } catch (refreshError) {
              await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(refreshToken: string) {
    return this.client.post('/auth/refresh', { refresh_token: refreshToken });
  }

  public get<T>(url: string, config?: any) {
    return this.client.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: any) {
    return this.client.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: any) {
    return this.client.put<T>(url, data, config);
  }

  public delete<T>(url: string, config?: any) {
    return this.client.delete<T>(url, config);
  }
}

export const apiClient = new ApiClient();
```

### **Location Service**
```typescript
// src/services/location/locationService.ts
import * as Location from 'expo-location';
import { apiClient } from '../api/client';

export class LocationService {
  static async requestPermissions(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  }

  static async getCurrentLocation() {
    return Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  }

  static async updateLocation(locationData: any) {
    return apiClient.post('/location/update', locationData);
  }

  static async getNearbyUsers(params: any) {
    return apiClient.get('/location/nearby', { params });
  }

  static async getNearbyEvents(params: any) {
    return apiClient.get('/location/events-nearby', { params });
  }

  static async getDubaiRegions() {
    return apiClient.get('/location/regions');
  }

  static async toggleLocationSharing(shareLocation: boolean) {
    return apiClient.post('/location/toggle-sharing', { share_location: shareLocation });
  }
}
```

---

## 🎯 Key Features Implementation

### **Real-time Location Updates**
```typescript
// src/hooks/useLocation.ts
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LocationService } from '../services/location/locationService';

export const useLocation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const hasPermission = await LocationService.requestPermissions();
      if (!hasPermission) return;

      const location = await LocationService.getCurrentLocation();
      
      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        share_location: true,
      };

      await LocationService.updateLocation(locationData);
      
      // Update Redux store
      dispatch({ type: 'location/setCurrentLocation', payload: locationData });

    } catch (err) {
      setError('Failed to update location');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { loading, error, updateLocation };
};
```

---

## 🚀 Build & Deployment

### **Development**
```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### **Production Build**
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

### **App Store Deployment**
```bash
# Submit to App Store
eas submit --platform ios

# Submit to Google Play Store
eas submit --platform android
```

---

## 📊 Performance Optimization

### **Image Optimization**
```typescript
// src/utils/imageOptimization.ts
export const optimizeImage = (url: string, width: number, height: number) => {
  return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto/`);
};
```

### **Caching Strategy**
```typescript
// src/services/storage/cache.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export class CacheService {
  static async set(key: string, data: any, ttl: number = 3600000) {
    const item = { data, timestamp: Date.now(), ttl };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  }

  static async get(key: string) {
    const item = await AsyncStorage.getItem(key);
    if (!item) return null;

    const { data, timestamp, ttl } = JSON.parse(item);
    const isExpired = Date.now() - timestamp > ttl;

    if (isExpired) {
      await AsyncStorage.removeItem(key);
      return null;
    }

    return data;
  }
}
```

---

## 🔒 Security & Privacy

### **Secure Storage**
```typescript
// src/services/storage/keychain.ts
import * as Keychain from 'react-native-keychain';

export class SecureStorage {
  static async storeToken(token: string) {
    await Keychain.setInternetCredentials('dubai_community', 'user', token);
  }

  static async getToken() {
    const credentials = await Keychain.getInternetCredentials('dubai_community');
    return credentials?.password;
  }

  static async removeToken() {
    await Keychain.resetInternetCredentials('dubai_community');
  }
}
```

---

## 🌟 Conclusion

The Dubai Community React Native mobile app features:

- **Luxury Design System** with premium animations
- **Advanced Location Services** with real-time updates
- **Comprehensive Social Features** including user discovery and events
- **Dubai-Specific Regional Support** with 48 local regions
- **Premium Performance** with optimized caching
- **Enterprise Security** with secure storage
- **Scalable Architecture** ready for production

The app provides an exceptional user experience for location-based social networking in Dubai.

---

**Ready to build the future of location-based social networking in Dubai! 🚀**

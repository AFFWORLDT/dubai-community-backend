# 🗺️ Dubai Community - React Native Mobile App

## 🚀 Premium Location-Based Social Networking App

A luxury React Native mobile application for the Dubai Community platform, featuring advanced location-based services, real-time user discovery, and premium social networking features.

---

## 📱 App Overview

### ✨ **Core Features**
- **Real-time Location Sharing** with privacy controls
- **Nearby User Discovery** with distance calculations
- **Location-based Event Discovery** and RSVP
- **Premium Social Networking** with advanced filtering
- **Dubai-Specific Regional Support** (48 regions)
- **JWT Authentication** with refresh tokens
- **Cloudinary Media Integration** for photos/videos
- **Real-time Messaging** and connections
- **Luxury UI/UX Design** with premium animations

### 🎯 **Target Audience**
- Dubai residents and expats
- Social networking enthusiasts
- Event organizers and attendees
- Location-based service users
- Premium social app users

---

## 🛠 Tech Stack

### **Frontend Framework**
- **React Native 0.72+** with TypeScript
- **Expo SDK 49+** for rapid development
- **React Navigation 6** for navigation
- **Redux Toolkit** for state management

### **UI/UX Libraries**
- **React Native Elements** for base components
- **React Native Vector Icons** for premium icons
- **Lottie React Native** for luxury animations
- **React Native Reanimated 3** for smooth animations
- **React Native Gesture Handler** for premium interactions

### **Location Services**
- **Expo Location** for GPS services
- **React Native Maps** for map integration
- **Geolocation** for distance calculations
- **Background Location** for real-time updates

### **Networking & API**
- **Axios** for API communication
- **React Query** for data fetching
- **WebSocket** for real-time features
- **JWT Token Management** for authentication

### **Media & Storage**
- **Expo Image Picker** for photo/video selection
- **Cloudinary SDK** for media uploads
- **AsyncStorage** for local data persistence
- **React Native Keychain** for secure storage

---

## 🎨 Luxury Design System

### **Color Palette**
```typescript
export const Colors = {
  // Primary Luxury Colors
  primary: '#1E3A8A',      // Deep Blue
  secondary: '#F59E0B',    // Gold Accent
  accent: '#10B981',       // Emerald Green
  
  // Neutral Palette
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Dubai Theme
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
    light: 'Poppins-Light',
  },
  
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
}
```

### **Spacing & Layout**
```typescript
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
}

export const Layout = {
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 8,
    },
  },
}
```

---

## 📁 Project Structure

```
dubai-community-mobile/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loading.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── location/
│   │   │   ├── LocationPicker.tsx
│   │   │   ├── NearbyUsers.tsx
│   │   │   ├── NearbyEvents.tsx
│   │   │   └── MapView.tsx
│   │   ├── profile/
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── EditProfile.tsx
│   │   │   └── Settings.tsx
│   │   ├── events/
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventDetails.tsx
│   │   │   ├── CreateEvent.tsx
│   │   │   └── EventList.tsx
│   │   └── social/
│   │       ├── UserCard.tsx
│   │       ├── ConnectionList.tsx
│   │       ├── MessageBubble.tsx
│   │       └── GroupCard.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── main/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── DiscoverScreen.tsx
│   │   │   ├── EventsScreen.tsx
│   │   │   ├── MessagesScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── location/
│   │   │   ├── MapScreen.tsx
│   │   │   ├── NearbyScreen.tsx
│   │   │   └── LocationSettingsScreen.tsx
│   │   └── social/
│   │       ├── UserProfileScreen.tsx
│   │       ├── ConnectionsScreen.tsx
│   │       ├── GroupsScreen.tsx
│   │       └── ChatScreen.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── events.ts
│   │   │   ├── location.ts
│   │   │   └── media.ts
│   │   ├── location/
│   │   │   ├── locationService.ts
│   │   │   ├── geolocation.ts
│   │   │   └── distanceCalculator.ts
│   │   ├── storage/
│   │   │   ├── asyncStorage.ts
│   │   │   ├── keychain.ts
│   │   │   └── cache.ts
│   │   └── media/
│   │       ├── imagePicker.ts
│   │       ├── cloudinary.ts
│   │       └── mediaUpload.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── authSlice.ts
│   │   ├── userSlice.ts
│   │   ├── locationSlice.ts
│   │   ├── eventsSlice.ts
│   │   └── messagesSlice.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useLocation.ts
│   │   ├── useEvents.ts
│   │   ├── useUsers.ts
│   │   └── useMedia.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── validation.ts
│   │   ├── formatters.ts
│   │   └── permissions.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── event.ts
│   │   ├── location.ts
│   │   └── api.ts
│   └── assets/
│       ├── images/
│       ├── icons/
│       ├── animations/
│       └── fonts/
├── app.json
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
└── README.md
```

---

## 🚀 Installation & Setup

### **Prerequisites**
```bash
# Install Node.js (v18+)
# Install Expo CLI
npm install -g @expo/cli

# Install React Native CLI (optional)
npm install -g react-native-cli
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
npm install react-native-elements
npm install react-native-vector-icons
npm install lottie-react-native

# Animations
npm install react-native-reanimated
npm install react-native-gesture-handler

# Location Services
npm install expo-location
npm install react-native-maps
npm install @react-native-community/geolocation

# Networking
npm install axios
npm install react-native-keychain

# Media
npm install expo-image-picker
npm install expo-media-library
npm install cloudinary-react-native

# Storage
npm install @react-native-async-storage/async-storage

# Utilities
npm install date-fns
npm install react-hook-form
npm install yup
npm install react-native-dotenv
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
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Layout } from '../../utils/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyleComposed = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.primary} />
      ) : (
        <Text style={textStyleComposed}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Layout.shadows.md,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: Typography.fonts.semiBold,
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  ghostText: {
    color: Colors.primary,
  },
  smText: {
    fontSize: Typography.sizes.sm,
  },
  mdText: {
    fontSize: Typography.sizes.base,
  },
  lgText: {
    fontSize: Typography.sizes.lg,
  },
  disabledText: {
    opacity: 0.7,
  },
});
```

### **Premium Card Component**
```typescript
// src/components/common/Card.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Colors, Layout } from '../../utils/constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.9}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    padding: 16,
  },
  default: {
    ...Layout.shadows.sm,
  },
  elevated: {
    ...Layout.shadows.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
});
```

---

## 📱 Screen Implementations

### **Luxury Home Screen**
```typescript
// src/screens/main/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { NearbyUsers } from '../../components/location/NearbyUsers';
import { NearbyEvents } from '../../components/location/NearbyEvents';
import { Colors, Typography, Spacing } from '../../utils/constants';
import { useLocation } from '../../hooks/useLocation';
import { useEvents } from '../../hooks/useEvents';
import { useUsers } from '../../hooks/useUsers';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { currentLocation, updateLocation } = useLocation();
  const { nearbyEvents, loading: eventsLoading } = useEvents();
  const { nearbyUsers, loading: usersLoading } = useUsers();
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await updateLocation();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to Dubai Community</Text>
        <Text style={styles.subtitle}>Discover amazing people and events nearby</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Card style={styles.actionCard}>
          <Button
            title="Update Location"
            onPress={updateLocation}
            variant="primary"
            size="md"
          />
        </Card>
        
        <Card style={styles.actionCard}>
          <Button
            title="Create Event"
            onPress={() => navigation.navigate('CreateEvent')}
            variant="secondary"
            size="md"
          />
        </Card>
      </View>

      {/* Nearby Users */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>People Nearby</Text>
        <NearbyUsers users={nearbyUsers} loading={usersLoading} />
      </View>

      {/* Nearby Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Events Near You</Text>
        <NearbyEvents events={nearbyEvents} loading={eventsLoading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    ...Layout.shadows.sm,
  },
  greeting: {
    fontSize: Typography.sizes['2xl'],
    fontFamily: Typography.fonts.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    fontFamily: Typography.fonts.medium,
    color: Colors.gray[600],
  },
  quickActions: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  actionCard: {
    flex: 1,
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontFamily: Typography.fonts.semiBold,
    color: Colors.gray[800],
    marginBottom: Spacing.md,
  },
});
```

---

## 🔧 API Integration

### **API Client Setup**
```typescript
// src/services/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          const refreshToken = await AsyncStorage.getItem('refresh_token');
          if (refreshToken) {
            try {
              const response = await this.refreshToken(refreshToken);
              const { access_token } = response.data;
              await AsyncStorage.setItem('access_token', access_token);
              
              // Retry original request
              error.config.headers.Authorization = `Bearer ${access_token}`;
              return this.client.request(error.config);
            } catch (refreshError) {
              // Refresh failed, redirect to login
              await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
              // Navigate to login screen
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

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
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

export interface LocationData {
  latitude: number;
  longitude: number;
  location_name?: string;
  share_location: boolean;
}

export class LocationService {
  static async requestPermissions(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  }

  static async getCurrentLocation(): Promise<Location.LocationObject> {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return location;
  }

  static async updateLocation(locationData: LocationData) {
    return apiClient.post('/location/update', locationData);
  }

  static async getNearbyUsers(params: {
    latitude: number;
    longitude: number;
    radius_km?: number;
    interests?: string;
    age_min?: number;
    age_max?: number;
    gender?: string;
    online_only?: boolean;
    limit?: number;
  }) {
    return apiClient.get('/location/nearby', { params });
  }

  static async getNearbyEvents(params: {
    latitude: number;
    longitude: number;
    radius_km?: number;
    interests?: string;
    limit?: number;
  }) {
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
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { LocationService } from '../services/location/locationService';
import { setCurrentLocation, setLocationSharing } from '../store/locationSlice';

export const useLocation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermissions = useCallback(async () => {
    try {
      const granted = await LocationService.requestPermissions();
      if (!granted) {
        setError('Location permission is required');
      }
      return granted;
    } catch (err) {
      setError('Failed to request location permissions');
      return false;
    }
  }, []);

  const updateLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      const location = await LocationService.getCurrentLocation();
      
      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        share_location: true,
      };

      await LocationService.updateLocation(locationData);
      
      dispatch(setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp,
      }));

    } catch (err) {
      setError('Failed to update location');
    } finally {
      setLoading(false);
    }
  }, [dispatch, requestPermissions]);

  const toggleLocationSharing = useCallback(async (shareLocation: boolean) => {
    try {
      await LocationService.toggleLocationSharing(shareLocation);
      dispatch(setLocationSharing(shareLocation));
    } catch (err) {
      setError('Failed to toggle location sharing');
    }
  }, [dispatch]);

  return {
    loading,
    error,
    updateLocation,
    toggleLocationSharing,
    requestPermissions,
  };
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
import { Image } from 'react-native';

export const optimizeImage = (url: string, width: number, height: number) => {
  // Add Cloudinary transformation parameters
  const optimizedUrl = url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto/`);
  return optimizedUrl;
};

export const preloadImages = (urls: string[]) => {
  urls.forEach(url => {
    Image.prefetch(url);
  });
};
```

### **Caching Strategy**
```typescript
// src/services/storage/cache.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export class CacheService {
  static async set(key: string, data: any, ttl: number = 3600000) {
    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    };
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

  static async clear() {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith('cache_'));
    await AsyncStorage.multiRemove(cacheKeys);
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

### **Data Encryption**
```typescript
// src/utils/encryption.ts
import CryptoJS from 'crypto-js';

export class Encryption {
  private static readonly SECRET_KEY = 'your-secret-key';

  static encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.SECRET_KEY).toString();
  }

  static decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
```

---

## 📈 Analytics & Monitoring

### **Error Tracking**
```typescript
// src/utils/errorTracking.ts
import * as Sentry from '@sentry/react-native';

export const initializeErrorTracking = () => {
  Sentry.init({
    dsn: 'your-sentry-dsn',
    environment: __DEV__ ? 'development' : 'production',
  });
};

export const trackError = (error: Error, context?: any) => {
  Sentry.captureException(error, {
    extra: context,
  });
};
```

---

## 🎨 Luxury Animations

### **Premium Transitions**
```typescript
// src/components/animations/PremiumTransition.tsx
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface PremiumTransitionProps {
  children: React.ReactNode;
  visible: boolean;
  duration?: number;
}

export const PremiumTransition: React.FC<PremiumTransitionProps> = ({
  children,
  visible,
  duration = 300,
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(50);

  React.useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
    } else {
      opacity.value = withTiming(0, { duration });
      scale.value = withTiming(0.8, { duration });
      translateY.value = withTiming(50, { duration });
    }
  }, [visible, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
```

---

## 🌟 Conclusion

The Dubai Community React Native mobile app represents a premium location-based social networking platform with:

- **Luxury Design System** with premium animations and interactions
- **Advanced Location Services** with real-time updates and privacy controls
- **Comprehensive Social Features** including user discovery, events, and messaging
- **Dubai-Specific Regional Support** with 48 local regions
- **Premium Performance** with optimized caching and image handling
- **Enterprise Security** with secure storage and data encryption
- **Scalable Architecture** ready for production deployment

The app is designed to provide an exceptional user experience while maintaining high performance and security standards for the Dubai community market.

---

**Ready to build the future of location-based social networking in Dubai! 🚀**

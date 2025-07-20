import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Home, Users, Trophy, MessageCircle, User } from 'lucide-react-native';

import HomeScreen from '@/screens/HomeScreen';
import RosterScreen from '@/screens/RosterScreen';
import MatchupScreen from '@/screens/MatchupScreen';
import LeagueScreen from '@/screens/LeagueScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let IconComponent;

              if (route.name === 'Home') {
                IconComponent = Home;
              } else if (route.name === 'Roster') {
                IconComponent = Users;
              } else if (route.name === 'Matchup') {
                IconComponent = Trophy;
              } else if (route.name === 'League') {
                IconComponent = MessageCircle;
              } else if (route.name === 'Profile') {
                IconComponent = User;
              }

              return <IconComponent size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 1,
              borderTopColor: '#E5E5EA',
              paddingTop: 8,
              paddingBottom: 8,
              height: 88,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
              marginTop: 4,
            },
            headerStyle: {
              backgroundColor: '#FFFFFF',
              borderBottomWidth: 1,
              borderBottomColor: '#E5E5EA',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: '#000000',
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Fantasy Football' }}
          />
          <Tab.Screen 
            name="Roster" 
            component={RosterScreen}
            options={{ title: 'My Team' }}
          />
          <Tab.Screen 
            name="Matchup" 
            component={MatchupScreen}
            options={{ title: 'Matchup' }}
          />
          <Tab.Screen 
            name="League" 
            component={LeagueScreen}
            options={{ title: 'League' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
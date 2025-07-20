import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StatusBar } from 'react-native';
import { 
  Users, 
  UserPlus, 
  Trophy, 
  Calendar, 
  BarChart3, 
  Crown,
  MessageCircle,
  Bot,
  History,
  Bitcoin,
  Settings
} from 'lucide-react-native';

// Fantasy Football Headquarters Screens
import TeamScreen from './src/screens/headquarters/TeamScreen';
import PlayersScreen from './src/screens/headquarters/PlayersScreen';
import MatchupScreen from './src/screens/headquarters/MatchupScreen';
import ScheduleScreen from './src/screens/headquarters/ScheduleScreen';
import StandingsScreen from './src/screens/headquarters/StandingsScreen';
import PostseasonScreen from './src/screens/headquarters/PostseasonScreen';

// Commissioner's Office Screens
import ChatScreen from './src/screens/office/ChatScreen';
import AIAssistantScreen from './src/screens/office/AIAssistantScreen';
import LeagueHistoryScreen from './src/screens/office/LeagueHistoryScreen';
import CLITDashboardScreen from './src/screens/office/CLITDashboardScreen';
import SettingsScreen from './src/screens/office/SettingsScreen';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

// Fantasy Football Headquarters Navigator
function HeadquartersNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: '#1e40af',
        tabBarInactiveTintColor: '#6b7280',
        tabBarIndicatorStyle: { backgroundColor: '#1e40af' },
        tabBarStyle: { backgroundColor: '#ffffff' },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
      }}
    >
      <TopTab.Screen 
        name="Team" 
        component={TeamScreen}
        options={{
          tabBarIcon: ({ color }) => <Users size={20} color={color} />
        }}
      />
      <TopTab.Screen 
        name="Players" 
        component={PlayersScreen}
        options={{
          tabBarIcon: ({ color }) => <UserPlus size={20} color={color} />
        }}
      />
      <TopTab.Screen 
        name="Matchup" 
        component={MatchupScreen}
        options={{
          tabBarIcon: ({ color }) => <Trophy size={20} color={color} />
        }}
      />
      <TopTab.Screen 
        name="Schedule" 
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => <Calendar size={20} color={color} />
        }}
      />
      <TopTab.Screen 
        name="Standings" 
        component={StandingsScreen}
        options={{
          tabBarIcon: ({ color }) => <BarChart3 size={20} color={color} />
        }}
      />
      <TopTab.Screen 
        name="Postseason" 
        component={PostseasonScreen}
        options={{
          tabBarIcon: ({ color }) => <Crown size={20} color={color} />
        }}
      />
    </TopTab.Navigator>
  );
}

// Commissioner's Office Navigator
function OfficeNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: '#dc2626',
        tabBarInactiveTintColor: '#6b7280',
        tabBarIndicatorStyle: { backgroundColor: '#dc2626' },
        tabBarStyle: { backgroundColor: '#ffffff' },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
      }}
    >
      <TopTab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => <MessageCircle size={20} color={color} />
        }}
      />
      <TopTab.Screen 
        name="AI Assistant" 
        component={AIAssistantScreen}
        options={{
          tabBarIcon: ({ color }) => <Bot size={20} color={color} />
        }}
      />
      <TopTab.Screen 
        name="History" 
        component={LeagueHistoryScreen}
        options={{
          tabBarIcon: ({ color }) => <History size={20} color={color} />
        }}
      />
      <TopTab.Screen 
        name="CLIT" 
        component={CLITDashboardScreen}
        options={{
          tabBarIcon: ({ color }) => <Bitcoin size={20} color={color} />
        }}
      />
      <TopTab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Settings size={20} color={color} />
        }}
      />
    </TopTab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1e40af',
            tabBarInactiveTintColor: '#6b7280',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#e5e7eb',
              paddingTop: 8,
              paddingBottom: 8,
              height: 70
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
              marginTop: 4
            }
          }}
        >
          <Tab.Screen
            name="Headquarters"
            component={HeadquartersNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Trophy size={size} color={color} />
              ),
              tabBarLabel: 'Fantasy HQ'
            }}
          />
          <Tab.Screen
            name="Office"
            component={OfficeNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MessageCircle size={size} color={color} />
              ),
              tabBarLabel: "Commissioner's Office"
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
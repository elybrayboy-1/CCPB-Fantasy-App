import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { 
  Settings,
  Bell,
  Shield,
  Users,
  Trophy,
  Calendar,
  DollarSign,
  Smartphone,
  Mail,
  Lock,
  Eye,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react-native';

interface SettingItem {
  id: string;
  title: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'action';
  icon: any;
  value?: boolean;
  onPress?: () => void;
  destructive?: boolean;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState({
    trades: true,
    waivers: true,
    lineups: false,
    scores: true,
    news: false
  });

  const [privacy, setPrivacy] = useState({
    showRecord: true,
    showRoster: true,
    allowMessages: true
  });

  const [league, setLeague] = useState({
    autoApprove: false,
    tradingEnabled: true,
    waiverNotifications: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleLeagueChange = (key: string, value: boolean) => {
    setLeague(prev => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete account') }
      ]
    );
  };

  const settingSections: SettingSection[] = [
    {
      title: 'Notifications',
      items: [
        {
          id: 'trades',
          title: 'Trade Notifications',
          description: 'Get notified about trade proposals and completions',
          type: 'toggle',
          icon: Users,
          value: notifications.trades,
          onPress: () => handleNotificationChange('trades', !notifications.trades)
        },
        {
          id: 'waivers',
          title: 'Waiver Wire',
          description: 'Notifications for waiver claims and results',
          type: 'toggle',
          icon: Trophy,
          value: notifications.waivers,
          onPress: () => handleNotificationChange('waivers', !notifications.waivers)
        },
        {
          id: 'lineups',
          title: 'Lineup Reminders',
          description: 'Remind me to set my lineup before games',
          type: 'toggle',
          icon: Calendar,
          value: notifications.lineups,
          onPress: () => handleNotificationChange('lineups', !notifications.lineups)
        },
        {
          id: 'scores',
          title: 'Live Scores',
          description: 'Real-time scoring updates during games',
          type: 'toggle',
          icon: Bell,
          value: notifications.scores,
          onPress: () => handleNotificationChange('scores', !notifications.scores)
        },
        {
          id: 'news',
          title: 'Fantasy News',
          description: 'Player news and injury updates',
          type: 'toggle',
          icon: Globe,
          value: notifications.news,
          onPress: () => handleNotificationChange('news', !notifications.news)
        }
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          id: 'showRecord',
          title: 'Show My Record',
          description: 'Allow others to see your win-loss record',
          type: 'toggle',
          icon: Eye,
          value: privacy.showRecord,
          onPress: () => handlePrivacyChange('showRecord', !privacy.showRecord)
        },
        {
          id: 'showRoster',
          title: 'Show My Roster',
          description: 'Allow others to view your current roster',
          type: 'toggle',
          icon: Users,
          value: privacy.showRoster,
          onPress: () => handlePrivacyChange('showRoster', !privacy.showRoster)
        },
        {
          id: 'allowMessages',
          title: 'Allow Messages',
          description: 'Receive messages from other league members',
          type: 'toggle',
          icon: Mail,
          value: privacy.allowMessages,
          onPress: () => handlePrivacyChange('allowMessages', !privacy.allowMessages)
        },
        {
          id: 'changePassword',
          title: 'Change Password',
          type: 'navigation',
          icon: Lock,
          onPress: () => console.log('Change password')
        },
        {
          id: 'twoFactor',
          title: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          type: 'navigation',
          icon: Shield,
          onPress: () => console.log('Two-factor auth')
        }
      ]
    },
    {
      title: 'League Settings',
      items: [
        {
          id: 'autoApprove',
          title: 'Auto-Approve Trades',
          description: 'Automatically approve fair trades (Commissioner only)',
          type: 'toggle',
          icon: Users,
          value: league.autoApprove,
          onPress: () => handleLeagueChange('autoApprove', !league.autoApprove)
        },
        {
          id: 'tradingEnabled',
          title: 'Trading Enabled',
          description: 'Allow trading in this league',
          type: 'toggle',
          icon: DollarSign,
          value: league.tradingEnabled,
          onPress: () => handleLeagueChange('tradingEnabled', !league.tradingEnabled)
        },
        {
          id: 'waiverNotifications',
          title: 'Waiver Notifications',
          description: 'Notify league when waivers process',
          type: 'toggle',
          icon: Bell,
          value: league.waiverNotifications,
          onPress: () => handleLeagueChange('waiverNotifications', !league.waiverNotifications)
        },
        {
          id: 'leagueRules',
          title: 'League Rules',
          type: 'navigation',
          icon: Trophy,
          onPress: () => console.log('League rules')
        },
        {
          id: 'scoringSettings',
          title: 'Scoring Settings',
          type: 'navigation',
          icon: Calendar,
          onPress: () => console.log('Scoring settings')
        }
      ]
    },
    {
      title: 'App Settings',
      items: [
        {
          id: 'pushNotifications',
          title: 'Push Notifications',
          type: 'navigation',
          icon: Smartphone,
          onPress: () => console.log('Push notifications')
        },
        {
          id: 'dataUsage',
          title: 'Data & Storage',
          type: 'navigation',
          icon: Globe,
          onPress: () => console.log('Data usage')
        },
        {
          id: 'about',
          title: 'About',
          type: 'navigation',
          icon: HelpCircle,
          onPress: () => console.log('About')
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          id: 'logout',
          title: 'Sign Out',
          type: 'action',
          icon: LogOut,
          onPress: handleLogout
        },
        {
          id: 'deleteAccount',
          title: 'Delete Account',
          type: 'action',
          icon: Shield,
          destructive: true,
          onPress: handleDeleteAccount
        }
      ]
    }
  ];

  const renderSettingItem = (item: SettingItem) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={styles.settingLeft}>
          <View style={[styles.iconContainer, item.destructive && styles.destructiveIcon]}>
            <IconComponent 
              size={20} 
              color={item.destructive ? '#ef4444' : '#6b7280'} 
            />
          </View>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, item.destructive && styles.destructiveText]}>
              {item.title}
            </Text>
            {item.description && (
              <Text style={styles.settingDescription}>{item.description}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.settingRight}>
          {item.type === 'toggle' && (
            <Switch
              value={item.value}
              onValueChange={() => item.onPress?.()}
              trackColor={{ false: '#f3f4f6', true: '#dc262620' }}
              thumbColor={item.value ? '#dc2626' : '#9ca3af'}
            />
          )}
          {item.type === 'navigation' && (
            <ChevronRight size={20} color="#9ca3af" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Settings size={24} color="#dc2626" />
          <Text style={styles.titleText}>Settings</Text>
        </View>
        <Text style={styles.subtitle}>Customize your fantasy experience</Text>
      </View>

      {/* Settings List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </View>
          </View>
        ))}
        
        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Fantasy Football App v1.0.0</Text>
          <Text style={styles.versionSubtext}>Built with ❤️ for fantasy football fans</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4
  },
  content: {
    flex: 1
  },
  section: {
    marginTop: 24
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    marginHorizontal: 16
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb'
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  destructiveIcon: {
    backgroundColor: '#fef2f2'
  },
  settingInfo: {
    flex: 1
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937'
  },
  destructiveText: {
    color: '#ef4444'
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  settingRight: {
    marginLeft: 12
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 68
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16
  },
  versionText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500'
  },
  versionSubtext: {
    fontSize: 12,
    color: '#d1d5db',
    marginTop: 4
  }
});
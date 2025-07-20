import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Trophy, TrendingUp, Calendar, Users, Bell, HelpCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const userStats = [
    { label: 'Leagues', value: '3', icon: Users },
    { label: 'Championships', value: '1', icon: Trophy },
    { label: 'Win Rate', value: '67%', icon: TrendingUp },
    { label: 'Years Playing', value: '5', icon: Calendar },
  ];

  const menuItems = [
    { title: 'League Settings', icon: Settings, subtitle: 'Manage your leagues' },
    { title: 'Notifications', icon: Bell, subtitle: 'Push notifications & alerts' },
    { title: 'Help & Support', icon: HelpCircle, subtitle: 'FAQ and contact support' },
    { title: 'Sign Out', icon: LogOut, subtitle: 'Log out of your account', isDestructive: true },
  ];

  const achievements = [
    { title: 'Champion', description: '2023 Championship Winner', icon: '🏆', earned: true },
    { title: 'Trade Master', description: 'Complete 10 trades in a season', icon: '🤝', earned: true },
    { title: 'Waiver Wire Wizard', description: 'Pick up 5 players who score 15+ points', icon: '🧙‍♂️', earned: false },
    { title: 'Perfect Week', description: 'Score highest points in a week', icon: '💯', earned: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=120&h=120&fit=crop&crop=face' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Your Name</Text>
          <Text style={styles.userEmail}>your.email@example.com</Text>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {userStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View key={index} style={styles.statCard}>
                <IconComponent size={24} color="#007AFF" />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        {/* Current Season Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2024 Season Summary</Text>
          <View style={styles.seasonCard}>
            <View style={styles.seasonStat}>
              <Text style={styles.seasonLabel}>Overall Record</Text>
              <Text style={styles.seasonValue}>24-18</Text>
            </View>
            <View style={styles.seasonStat}>
              <Text style={styles.seasonLabel}>Total Points</Text>
              <Text style={styles.seasonValue}>5,542.8</Text>
            </View>
            <View style={styles.seasonStat}>
              <Text style={styles.seasonLabel}>Best Week</Text>
              <Text style={styles.seasonValue}>167.4</Text>
            </View>
            <View style={styles.seasonStat}>
              <Text style={styles.seasonLabel}>Worst Week</Text>
              <Text style={styles.seasonValue}>89.2</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement, index) => (
              <View key={index} style={[styles.achievementCard, !achievement.earned && styles.lockedAchievement]}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={[styles.achievementTitle, !achievement.earned && styles.lockedText]}>
                    {achievement.title}
                  </Text>
                  <Text style={[styles.achievementDescription, !achievement.earned && styles.lockedText]}>
                    {achievement.description}
                  </Text>
                </View>
                {achievement.earned && (
                  <View style={styles.earnedBadge}>
                    <Text style={styles.earnedText}>✓</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* League History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent League History</Text>
          <View style={styles.historyContainer}>
            <View style={styles.historyItem}>
              <View style={styles.historyYear}>
                <Text style={styles.yearText}>2023</Text>
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyLeague}>The Championship League</Text>
                <Text style={styles.historyResult}>🏆 Champion (12-2)</Text>
              </View>
            </View>
            
            <View style={styles.historyItem}>
              <View style={styles.historyYear}>
                <Text style={styles.yearText}>2022</Text>
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyLeague}>The Championship League</Text>
                <Text style={styles.historyResult}>3rd Place (9-5)</Text>
              </View>
            </View>
            
            <View style={styles.historyItem}>
              <View style={styles.historyYear}>
                <Text style={styles.yearText}>2021</Text>
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyLeague}>The Championship League</Text>
                <Text style={styles.historyResult}>6th Place (7-7)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View style={styles.menuIcon}>
                    <IconComponent 
                      size={20} 
                      color={item.isDestructive ? "#FF3B30" : "#007AFF"} 
                    />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={[styles.menuTitle, item.isDestructive && styles.destructiveText]}>
                      {item.title}
                    </Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  seasonCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  seasonStat: {
    width: '48%',
    marginBottom: 16,
  },
  seasonLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  seasonValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  achievementsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#8E8E93',
  },
  lockedText: {
    color: '#C7C7CC',
  },
  earnedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnedText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  historyContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  historyYear: {
    width: 60,
    alignItems: 'center',
  },
  yearText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  historyDetails: {
    flex: 1,
    marginLeft: 16,
  },
  historyLeague: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  historyResult: {
    fontSize: 12,
    color: '#8E8E93',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  destructiveText: {
    color: '#FF3B30',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
  },
});
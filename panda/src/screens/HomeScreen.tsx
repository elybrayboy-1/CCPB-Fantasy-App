import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Trophy, Users, Calendar, TrendingUp } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* League Header */}
        <View style={styles.leagueHeader}>
          <View style={styles.leagueInfo}>
            <Text style={styles.leagueName}>The Championship League</Text>
            <Text style={styles.leagueDetails}>12 Teams • Week 15 • 2024 Season</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Trophy size={24} color="#007AFF" />
            <Text style={styles.statValue}>3rd</Text>
            <Text style={styles.statLabel}>Place</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={24} color="#34C759" />
            <Text style={styles.statValue}>8-6</Text>
            <Text style={styles.statLabel}>Record</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#FF9500" />
            <Text style={styles.statValue}>1,847</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* Current Matchup */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week's Matchup</Text>
          <View style={styles.matchupCard}>
            <View style={styles.teamContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face' }}
                style={styles.teamAvatar}
              />
              <Text style={styles.teamName}>Your Team</Text>
              <Text style={styles.teamScore}>127.8</Text>
            </View>
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.matchupStatus}>Final</Text>
            </View>
            <View style={styles.teamContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
                style={styles.teamAvatar}
              />
              <Text style={styles.teamName}>Mike's Squad</Text>
              <Text style={styles.teamScore}>134.2</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Users size={16} color="#007AFF" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Sarah picked up Gus Edwards</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Trophy size={16} color="#34C759" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Trade completed: Josh Jacobs for DeAndre Hopkins</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Calendar size={16} color="#FF9500" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Waivers processed</Text>
                <Text style={styles.activityTime}>2 days ago</Text>
              </View>
            </View>
          </View>
        </View>

        {/* League Standings Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>League Standings</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.standingsPreview}>
            <View style={styles.standingItem}>
              <Text style={styles.standingRank}>1.</Text>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }}
                style={styles.standingAvatar}
              />
              <Text style={styles.standingName}>Alex's Team</Text>
              <Text style={styles.standingRecord}>11-3</Text>
            </View>
            <View style={styles.standingItem}>
              <Text style={styles.standingRank}>2.</Text>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' }}
                style={styles.standingAvatar}
              />
              <Text style={styles.standingName}>Jessica's Squad</Text>
              <Text style={styles.standingRecord}>10-4</Text>
            </View>
            <View style={styles.standingItem}>
              <Text style={styles.standingRank}>3.</Text>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=40&h=40&fit=crop&crop=face' }}
                style={styles.standingAvatar}
              />
              <Text style={styles.standingName}>Your Team</Text>
              <Text style={styles.standingRecord}>8-6</Text>
            </View>
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
  leagueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  leagueInfo: {
    flex: 1,
  },
  leagueName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  leagueDetails: {
    fontSize: 14,
    color: '#8E8E93',
  },
  settingsButton: {
    padding: 8,
  },
  quickStats: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  viewAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  matchupCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  teamAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  teamScore: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  vsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  vsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4,
  },
  matchupStatus: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '500',
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  standingsPreview: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  standingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  standingRank: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    width: 24,
  },
  standingAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 12,
  },
  standingName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    flex: 1,
  },
  standingRecord: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
});
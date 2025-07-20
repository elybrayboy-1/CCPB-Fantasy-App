import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, TrendingUp, MessageCircle, Users, Calendar } from 'lucide-react-native';

export default function LeagueScreen() {
  const [activeTab, setActiveTab] = useState('standings');

  const standings = [
    { rank: 1, name: "Alex's Team", owner: 'Alex Chen', record: '11-3', points: 1924.8, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' },
    { rank: 2, name: "Jessica's Squad", owner: 'Jessica Wong', record: '10-4', points: 1876.2, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face' },
    { rank: 3, name: 'Your Team', owner: 'You', record: '8-6', points: 1847.6, avatar: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=50&h=50&fit=crop&crop=face' },
    { rank: 4, name: "Mike's Squad", owner: 'Mike Johnson', record: '8-6', points: 1823.4, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
    { rank: 5, name: 'Thunder Bolts', owner: 'Sarah Kim', record: '7-7', points: 1798.2, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face' },
    { rank: 6, name: 'Dream Team', owner: 'David Lee', record: '7-7', points: 1776.8, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face' },
    { rank: 7, name: 'The Crushers', owner: 'Emily Davis', record: '6-8', points: 1754.6, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face' },
    { rank: 8, name: 'Victory Lane', owner: 'Tom Wilson', record: '6-8', points: 1732.4, avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=50&h=50&fit=crop&crop=face' },
    { rank: 9, name: 'Power Players', owner: 'Lisa Brown', record: '5-9', points: 1698.2, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face' },
    { rank: 10, name: 'Game Changers', owner: 'Ryan Garcia', record: '4-10', points: 1654.8, avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=50&h=50&fit=crop&crop=face' },
    { rank: 11, name: 'Last Hope', owner: 'Kevin Park', record: '3-11', points: 1612.4, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face' },
    { rank: 12, name: 'Bottom Feeders', owner: 'Chris Taylor', record: '2-12', points: 1578.6, avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=50&h=50&fit=crop&crop=face' },
  ];

  const recentActivity = [
    { type: 'trade', text: 'Alex traded Josh Jacobs to Jessica for DeAndre Hopkins', time: '2 hours ago', icon: TrendingUp },
    { type: 'waiver', text: 'Sarah picked up Gus Edwards', time: '4 hours ago', icon: Users },
    { type: 'message', text: 'Mike: "Anyone want to trade for a QB?"', time: '6 hours ago', icon: MessageCircle },
    { type: 'trade', text: 'David traded Travis Etienne to Emily for Mike Evans', time: '1 day ago', icon: TrendingUp },
    { type: 'waiver', text: 'Tom picked up Romeo Doubs', time: '1 day ago', icon: Users },
    { type: 'message', text: 'League: Waivers have been processed', time: '2 days ago', icon: Calendar },
  ];

  const playoffs = [
    { seed: 1, team: "Alex's Team", record: '11-3' },
    { seed: 2, team: "Jessica's Squad", record: '10-4' },
    { seed: 3, team: 'Your Team', record: '8-6' },
    { seed: 4, team: "Mike's Squad", record: '8-6' },
    { seed: 5, team: 'Thunder Bolts', record: '7-7' },
    { seed: 6, team: 'Dream Team', record: '7-7' },
  ];

  const renderStandings = () => (
    <View style={styles.standingsContainer}>
      {standings.map((team, index) => (
        <View key={index} style={[styles.standingRow, team.owner === 'You' && styles.myTeamRow]}>
          <View style={styles.rankContainer}>
            <Text style={[styles.rank, team.rank <= 6 && styles.playoffRank]}>{team.rank}</Text>
          </View>
          
          <Image source={{ uri: team.avatar }} style={styles.teamAvatar} />
          
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{team.name}</Text>
            <Text style={styles.teamOwner}>{team.owner}</Text>
          </View>
          
          <View style={styles.teamStats}>
            <Text style={styles.teamRecord}>{team.record}</Text>
            <Text style={styles.teamPoints}>{team.points.toFixed(1)}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderActivity = () => (
    <View style={styles.activityContainer}>
      {recentActivity.map((activity, index) => {
        const IconComponent = activity.icon;
        return (
          <View key={index} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <IconComponent size={16} color="#007AFF" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>{activity.text}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderPlayoffs = () => (
    <View style={styles.playoffsContainer}>
      <View style={styles.playoffHeader}>
        <Trophy size={24} color="#FFD700" />
        <Text style={styles.playoffTitle}>Playoff Picture</Text>
      </View>
      
      <View style={styles.playoffSeeds}>
        {playoffs.map((team, index) => (
          <View key={index} style={[styles.playoffSeed, team.team === 'Your Team' && styles.myPlayoffSeed]}>
            <Text style={styles.seedNumber}>{team.seed}</Text>
            <Text style={styles.seedTeam}>{team.team}</Text>
            <Text style={styles.seedRecord}>{team.record}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.playoffInfo}>
        <Text style={styles.playoffInfoText}>
          Top 6 teams make playoffs. Playoffs start Week 15.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* League Header */}
      <View style={styles.leagueHeader}>
        <Text style={styles.leagueName}>The Championship League</Text>
        <Text style={styles.leagueInfo}>12 Teams • Week 15 • 2024 Season</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'standings' && styles.activeTab]}
          onPress={() => setActiveTab('standings')}
        >
          <Text style={[styles.tabText, activeTab === 'standings' && styles.activeTabText]}>
            Standings
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'activity' && styles.activeTab]}
          onPress={() => setActiveTab('activity')}
        >
          <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>
            Activity
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'playoffs' && styles.activeTab]}
          onPress={() => setActiveTab('playoffs')}
        >
          <Text style={[styles.tabText, activeTab === 'playoffs' && styles.activeTabText]}>
            Playoffs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'standings' && renderStandings()}
        {activeTab === 'activity' && renderActivity()}
        {activeTab === 'playoffs' && renderPlayoffs()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  leagueHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  leagueName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  leagueInfo: {
    fontSize: 14,
    color: '#8E8E93',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
  },
  scrollView: {
    flex: 1,
  },
  standingsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 16,
  },
  standingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  myTeamRow: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  rankContainer: {
    width: 30,
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  playoffRank: {
    color: '#34C759',
  },
  teamAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 12,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  teamOwner: {
    fontSize: 12,
    color: '#8E8E93',
  },
  teamStats: {
    alignItems: 'flex-end',
  },
  teamRecord: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  teamPoints: {
    fontSize: 12,
    color: '#8E8E93',
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginBottom: 4,
    lineHeight: 20,
  },
  activityTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  playoffsContainer: {
    margin: 20,
  },
  playoffHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  playoffTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  playoffSeeds: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  playoffSeed: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  myPlayoffSeed: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  seedNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34C759',
    width: 30,
  },
  seedTeam: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    flex: 1,
    marginLeft: 12,
  },
  seedRecord: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  playoffInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  playoffInfoText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
});
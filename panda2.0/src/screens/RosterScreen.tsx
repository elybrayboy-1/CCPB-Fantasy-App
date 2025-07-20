import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Star, TrendingUp, TrendingDown } from 'lucide-react-native';

export default function RosterScreen() {
  const rosterData = [
    { position: 'QB', player: 'Josh Allen', team: 'BUF', points: 24.8, status: 'active', image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=80&h=80&fit=crop&crop=face' },
    { position: 'RB', player: 'Christian McCaffrey', team: 'SF', points: 18.2, status: 'active', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    { position: 'RB', player: 'Saquon Barkley', team: 'PHI', points: 15.6, status: 'active', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
    { position: 'WR', player: 'Tyreek Hill', team: 'MIA', points: 12.4, status: 'active', image: 'https://images.pexels.com/photos/274577/pexels-photo-274577.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { position: 'WR', player: 'Stefon Diggs', team: 'HOU', points: 11.8, status: 'active', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
    { position: 'TE', player: 'Travis Kelce', team: 'KC', points: 9.2, status: 'active', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face' },
    { position: 'FLEX', player: 'Empty', team: '', points: 0, status: 'empty', image: null },
    { position: 'D/ST', player: 'San Francisco', team: 'SF', points: 8.0, status: 'active', image: null },
    { position: 'K', player: 'Justin Tucker', team: 'BAL', points: 7.0, status: 'active', image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=80&h=80&fit=crop&crop=face' },
  ];

  const benchPlayers = [
    { position: 'RB', player: 'Tony Pollard', team: 'TEN', points: 8.4, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
    { position: 'WR', player: 'Mike Evans', team: 'TB', points: 6.8, image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=face' },
    { position: 'WR', player: 'DK Metcalf', team: 'SEA', points: 5.2, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    { position: 'TE', player: 'Kyle Pitts', team: 'ATL', points: 4.6, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
  ];

  const renderPlayer = (player: any, index: number) => (
    <TouchableOpacity key={index} style={styles.playerRow}>
      <View style={styles.positionContainer}>
        <Text style={[styles.position, player.status === 'empty' && styles.emptyPosition]}>
          {player.position}
        </Text>
      </View>
      
      {player.status === 'empty' ? (
        <View style={styles.emptyPlayerContainer}>
          <View style={styles.emptyPlayerIcon}>
            <Plus size={20} color="#8E8E93" />
          </View>
          <Text style={styles.emptyPlayerText}>Add Player</Text>
        </View>
      ) : (
        <>
          <View style={styles.playerInfo}>
            {player.image && (
              <Image source={{ uri: player.image }} style={styles.playerImage} />
            )}
            <View style={styles.playerDetails}>
              <Text style={styles.playerName}>{player.player}</Text>
              <Text style={styles.playerTeam}>{player.team}</Text>
            </View>
          </View>
          
          <View style={styles.playerStats}>
            <Text style={styles.playerPoints}>{player.points}</Text>
            <View style={styles.trendContainer}>
              {player.points > 10 ? (
                <TrendingUp size={12} color="#34C759" />
              ) : (
                <TrendingDown size={12} color="#FF3B30" />
              )}
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Team Score */}
        <View style={styles.scoreHeader}>
          <Text style={styles.scoreLabel}>Projected Score</Text>
          <Text style={styles.scoreValue}>127.8</Text>
          <Text style={styles.scoreSubtext}>vs League Avg: 118.4</Text>
        </View>

        {/* Starting Lineup */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Starting Lineup</Text>
            <TouchableOpacity style={styles.optimizeButton}>
              <Star size={16} color="#007AFF" />
              <Text style={styles.optimizeText}>Optimize</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.rosterContainer}>
            {rosterData.map((player, index) => renderPlayer(player, index))}
          </View>
        </View>

        {/* Bench */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bench</Text>
          <View style={styles.rosterContainer}>
            {benchPlayers.map((player, index) => (
              <TouchableOpacity key={index} style={styles.benchPlayerRow}>
                <View style={styles.positionContainer}>
                  <Text style={styles.benchPosition}>{player.position}</Text>
                </View>
                
                <View style={styles.playerInfo}>
                  <Image source={{ uri: player.image }} style={styles.playerImage} />
                  <View style={styles.playerDetails}>
                    <Text style={styles.playerName}>{player.player}</Text>
                    <Text style={styles.playerTeam}>{player.team}</Text>
                  </View>
                </View>
                
                <View style={styles.playerStats}>
                  <Text style={styles.benchPoints}>{player.points}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Plus size={20} color="#007AFF" />
              <Text style={styles.actionText}>Add Player</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Star size={20} color="#007AFF" />
              <Text style={styles.actionText}>Waivers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <TrendingUp size={20} color="#007AFF" />
              <Text style={styles.actionText}>Trades</Text>
            </TouchableOpacity>
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
  scoreHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  scoreSubtext: {
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
  optimizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  optimizeText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  rosterContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  benchPlayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    opacity: 0.8,
  },
  positionContainer: {
    width: 50,
    alignItems: 'center',
  },
  position: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    textAlign: 'center',
    minWidth: 40,
  },
  benchPosition: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    textAlign: 'center',
    minWidth: 40,
  },
  emptyPosition: {
    color: '#8E8E93',
    backgroundColor: '#F2F2F7',
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  playerTeam: {
    fontSize: 12,
    color: '#8E8E93',
  },
  playerStats: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  playerPoints: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginRight: 8,
  },
  benchPoints: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  trendContainer: {
    marginLeft: 4,
  },
  emptyPlayerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  emptyPlayerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emptyPlayerText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
    marginTop: 8,
  },
});
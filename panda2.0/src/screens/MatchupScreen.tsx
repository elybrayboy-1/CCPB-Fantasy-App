import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Trophy, TrendingUp } from 'lucide-react-native';

export default function MatchupScreen() {
  const myTeam = {
    name: 'Your Team',
    owner: 'You',
    score: 127.8,
    projected: 132.4,
    avatar: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=80&h=80&fit=crop&crop=face',
    players: [
      { position: 'QB', name: 'Josh Allen', points: 24.8, projected: 26.2 },
      { position: 'RB', name: 'Christian McCaffrey', points: 18.2, projected: 19.8 },
      { position: 'RB', name: 'Saquon Barkley', points: 15.6, projected: 16.4 },
      { position: 'WR', name: 'Tyreek Hill', points: 12.4, projected: 14.2 },
      { position: 'WR', name: 'Stefon Diggs', points: 11.8, projected: 13.6 },
      { position: 'TE', name: 'Travis Kelce', points: 9.2, projected: 11.8 },
      { position: 'FLEX', name: 'Tony Pollard', points: 8.4, projected: 9.2 },
      { position: 'D/ST', name: 'San Francisco', points: 8.0, projected: 7.8 },
      { position: 'K', name: 'Justin Tucker', points: 7.0, projected: 8.4 },
    ]
  };

  const opponentTeam = {
    name: "Mike's Squad",
    owner: 'Mike Johnson',
    score: 134.2,
    projected: 128.6,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    players: [
      { position: 'QB', name: 'Lamar Jackson', points: 28.4, projected: 24.8 },
      { position: 'RB', name: 'Derrick Henry', points: 22.6, projected: 18.2 },
      { position: 'RB', name: 'Josh Jacobs', points: 16.8, projected: 15.4 },
      { position: 'WR', name: 'Davante Adams', points: 14.2, projected: 16.8 },
      { position: 'WR', name: 'CeeDee Lamb', points: 13.6, projected: 15.2 },
      { position: 'TE', name: 'Mark Andrews', points: 11.4, projected: 12.6 },
      { position: 'FLEX', name: 'Amari Cooper', points: 9.8, projected: 11.2 },
      { position: 'D/ST', name: 'Buffalo', points: 12.0, projected: 8.4 },
      { position: 'K', name: 'Harrison Butker', points: 5.4, projected: 6.0 },
    ]
  };

  const renderPlayerComparison = (myPlayer: any, oppPlayer: any, index: number) => (
    <View key={index} style={styles.playerComparison}>
      <View style={styles.playerSide}>
        <Text style={styles.playerName}>{myPlayer.name}</Text>
        <Text style={[styles.playerPoints, myPlayer.points > oppPlayer.points && styles.winningPoints]}>
          {myPlayer.points}
        </Text>
      </View>
      
      <View style={styles.positionCenter}>
        <Text style={styles.positionText}>{myPlayer.position}</Text>
      </View>
      
      <View style={[styles.playerSide, styles.opponentSide]}>
        <Text style={styles.playerName}>{oppPlayer.name}</Text>
        <Text style={[styles.playerPoints, oppPlayer.points > myPlayer.points && styles.winningPoints]}>
          {oppPlayer.points}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Matchup Header */}
        <View style={styles.matchupHeader}>
          <View style={styles.teamHeader}>
            <Image source={{ uri: myTeam.avatar }} style={styles.teamAvatar} />
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{myTeam.name}</Text>
              <Text style={styles.teamOwner}>{myTeam.owner}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={[styles.teamScore, myTeam.score > opponentTeam.score && styles.winningScore]}>
                {myTeam.score}
              </Text>
              <Text style={styles.projectedScore}>Proj: {myTeam.projected}</Text>
            </View>
          </View>
          
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.statusContainer}>
              <Clock size={12} color="#8E8E93" />
              <Text style={styles.statusText}>Final</Text>
            </View>
          </View>
          
          <View style={styles.teamHeader}>
            <Image source={{ uri: opponentTeam.avatar }} style={styles.teamAvatar} />
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{opponentTeam.name}</Text>
              <Text style={styles.teamOwner}>{opponentTeam.owner}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={[styles.teamScore, opponentTeam.score > myTeam.score && styles.winningScore]}>
                {opponentTeam.score}
              </Text>
              <Text style={styles.projectedScore}>Proj: {opponentTeam.projected}</Text>
            </View>
          </View>
        </View>

        {/* Game Stats */}
        <View style={styles.gameStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Win Probability</Text>
            <Text style={styles.statValue}>
              {myTeam.score > opponentTeam.score ? '100%' : '0%'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Point Difference</Text>
            <Text style={styles.statValue}>
              {Math.abs(myTeam.score - opponentTeam.score).toFixed(1)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Bench Points</Text>
            <Text style={styles.statValue}>28.4</Text>
          </View>
        </View>

        {/* Player Comparisons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Player Breakdown</Text>
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonHeader}>
              <Text style={styles.headerTeam}>{myTeam.name}</Text>
              <Text style={styles.headerPosition}>POS</Text>
              <Text style={styles.headerTeam}>{opponentTeam.name}</Text>
            </View>
            
            {myTeam.players.map((player, index) => 
              renderPlayerComparison(player, opponentTeam.players[index], index)
            )}
          </View>
        </View>

        {/* Week Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week's Performance</Text>
          <View style={styles.performanceContainer}>
            <View style={styles.performanceCard}>
              <Trophy size={24} color="#34C759" />
              <Text style={styles.performanceTitle}>Best Player</Text>
              <Text style={styles.performancePlayer}>Josh Allen</Text>
              <Text style={styles.performancePoints}>24.8 pts</Text>
            </View>
            
            <View style={styles.performanceCard}>
              <TrendingUp size={24} color="#007AFF" />
              <Text style={styles.performanceTitle}>Biggest Surprise</Text>
              <Text style={styles.performancePlayer}>Tony Pollard</Text>
              <Text style={styles.performancePoints}>+2.8 vs proj</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>View Full Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Send Message</Text>
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
  matchupHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  teamOwner: {
    fontSize: 12,
    color: '#8E8E93',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  teamScore: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  winningScore: {
    color: '#34C759',
  },
  projectedScore: {
    fontSize: 12,
    color: '#8E8E93',
  },
  vsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  vsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
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
  comparisonContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  comparisonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    marginBottom: 12,
  },
  headerTeam: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    textAlign: 'center',
  },
  headerPosition: {
    width: 60,
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    textAlign: 'center',
  },
  playerComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  playerSide: {
    flex: 1,
    alignItems: 'center',
  },
  opponentSide: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 2,
    textAlign: 'center',
  },
  playerPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  winningPoints: {
    color: '#34C759',
  },
  positionCenter: {
    width: 60,
    alignItems: 'center',
  },
  positionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  performanceTitle: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 8,
    marginBottom: 4,
  },
  performancePlayer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  performancePoints: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
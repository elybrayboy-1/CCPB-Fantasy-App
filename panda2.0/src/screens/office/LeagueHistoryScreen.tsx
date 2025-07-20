import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { 
  Trophy,
  Calendar,
  BarChart3,
  Users,
  Target,
  TrendingUp,
  Award,
  Crown
} from 'lucide-react-native';

interface SeasonRecord {
  year: number;
  champion: string;
  runnerUp: string;
  regularSeasonWinner: string;
  highestScorer: string;
  lowestScorer: string;
  mostPointsFor: number;
  championImage: string;
}

interface PlayerStats {
  name: string;
  championships: number;
  playoffAppearances: number;
  regularSeasonTitles: number;
  totalPointsFor: number;
  winPercentage: number;
  imageUrl: string;
}

interface HeadToHeadRecord {
  opponent: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  imageUrl: string;
}

const mockSeasonHistory: SeasonRecord[] = [
  {
    year: 2024,
    champion: 'TBD',
    runnerUp: 'TBD',
    regularSeasonWinner: 'Steel Curtain',
    highestScorer: 'Gridiron Gladiators',
    lowestScorer: 'Fumble Force',
    mostPointsFor: 1456.8,
    championImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    year: 2023,
    champion: 'Thunder Bolts',
    runnerUp: 'Steel Curtain',
    regularSeasonWinner: 'Gridiron Gladiators',
    highestScorer: 'Thunder Bolts',
    lowestScorer: 'Field Goal Fanatics',
    mostPointsFor: 1678.4,
    championImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    year: 2022,
    champion: 'Gridiron Gladiators',
    runnerUp: 'Touchdown Titans',
    regularSeasonWinner: 'Steel Curtain',
    highestScorer: 'Gridiron Gladiators',
    lowestScorer: 'Fumble Force',
    mostPointsFor: 1589.2,
    championImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  }
];

const mockPlayerStats: PlayerStats[] = [
  {
    name: 'You (Gridiron Gladiators)',
    championships: 1,
    playoffAppearances: 3,
    regularSeasonTitles: 1,
    totalPointsFor: 4234.6,
    winPercentage: 0.675,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Sarah Wilson (Steel Curtain)',
    championships: 0,
    playoffAppearances: 3,
    regularSeasonTitles: 2,
    totalPointsFor: 4456.8,
    winPercentage: 0.725,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Mike Johnson (Thunder Bolts)',
    championships: 1,
    playoffAppearances: 2,
    regularSeasonTitles: 0,
    totalPointsFor: 3987.2,
    winPercentage: 0.625,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Alex Rodriguez (Touchdown Titans)',
    championships: 0,
    playoffAppearances: 2,
    regularSeasonTitles: 0,
    totalPointsFor: 3876.4,
    winPercentage: 0.588,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  }
];

const mockHeadToHead: HeadToHeadRecord[] = [
  {
    opponent: 'Mike Johnson',
    wins: 4,
    losses: 2,
    pointsFor: 678.4,
    pointsAgainst: 634.2,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    opponent: 'Sarah Wilson',
    wins: 3,
    losses: 3,
    pointsFor: 712.6,
    pointsAgainst: 698.8,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    opponent: 'David Chen',
    wins: 5,
    losses: 1,
    pointsFor: 634.8,
    pointsAgainst: 567.2,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    opponent: 'Alex Rodriguez',
    wins: 2,
    losses: 4,
    pointsFor: 589.2,
    pointsAgainst: 645.6,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  }
];

export default function LeagueHistoryScreen() {
  const [selectedTab, setSelectedTab] = useState<'seasons' | 'stats' | 'h2h' | 'analytics'>('seasons');

  const renderSeasonHistory = () => (
    <View>
      <Text style={styles.sectionTitle}>Championship History</Text>
      {mockSeasonHistory.map(season => (
        <View key={season.year} style={styles.seasonCard}>
          <View style={styles.seasonHeader}>
            <Text style={styles.seasonYear}>{season.year}</Text>
            {season.champion !== 'TBD' && (
              <View style={styles.championBadge}>
                <Crown size={16} color="#f59e0b" />
                <Text style={styles.championText}>Champion</Text>
              </View>
            )}
          </View>
          
          <View style={styles.seasonDetails}>
            <View style={styles.seasonRow}>
              <Text style={styles.seasonLabel}>Champion:</Text>
              <Text style={[styles.seasonValue, season.champion === 'TBD' && styles.tbdText]}>
                {season.champion}
              </Text>
            </View>
            <View style={styles.seasonRow}>
              <Text style={styles.seasonLabel}>Runner-up:</Text>
              <Text style={[styles.seasonValue, season.runnerUp === 'TBD' && styles.tbdText]}>
                {season.runnerUp}
              </Text>
            </View>
            <View style={styles.seasonRow}>
              <Text style={styles.seasonLabel}>Regular Season Winner:</Text>
              <Text style={styles.seasonValue}>{season.regularSeasonWinner}</Text>
            </View>
            <View style={styles.seasonRow}>
              <Text style={styles.seasonLabel}>Highest Single Game:</Text>
              <Text style={styles.seasonValue}>
                {season.highestScorer} ({season.mostPointsFor})
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPlayerStats = () => (
    <View>
      <Text style={styles.sectionTitle}>All-Time Player Statistics</Text>
      {mockPlayerStats.map((player, index) => (
        <View key={player.name} style={styles.playerStatsCard}>
          <View style={styles.playerStatsHeader}>
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>#{index + 1}</Text>
            </View>
            <Image source={{ uri: player.imageUrl }} style={styles.playerImage} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.winPercentage}>
                {(player.winPercentage * 100).toFixed(1)}% Win Rate
              </Text>
            </View>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Trophy size={16} color="#f59e0b" />
              <Text style={styles.statValue}>{player.championships}</Text>
              <Text style={styles.statLabel}>Championships</Text>
            </View>
            <View style={styles.statItem}>
              <Target size={16} color="#10b981" />
              <Text style={styles.statValue}>{player.playoffAppearances}</Text>
              <Text style={styles.statLabel}>Playoffs</Text>
            </View>
            <View style={styles.statItem}>
              <Award size={16} color="#3b82f6" />
              <Text style={styles.statValue}>{player.regularSeasonTitles}</Text>
              <Text style={styles.statLabel}>Reg. Season</Text>
            </View>
            <View style={styles.statItem}>
              <BarChart3 size={16} color="#8b5cf6" />
              <Text style={styles.statValue}>{player.totalPointsFor.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Total PF</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderHeadToHead = () => (
    <View>
      <Text style={styles.sectionTitle}>Your Head-to-Head Records</Text>
      {mockHeadToHead.map(record => (
        <View key={record.opponent} style={styles.h2hCard}>
          <View style={styles.h2hHeader}>
            <Image source={{ uri: record.imageUrl }} style={styles.opponentImage} />
            <View style={styles.opponentInfo}>
              <Text style={styles.opponentName}>{record.opponent}</Text>
              <Text style={styles.h2hRecord}>
                {record.wins}-{record.losses} 
                ({record.wins > record.losses ? 'Leading' : record.wins < record.losses ? 'Trailing' : 'Tied'})
              </Text>
            </View>
            <View style={styles.h2hWinRate}>
              <Text style={[
                styles.winRateText,
                { color: record.wins > record.losses ? '#10b981' : '#ef4444' }
              ]}>
                {((record.wins / (record.wins + record.losses)) * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
          
          <View style={styles.h2hStats}>
            <View style={styles.h2hStatItem}>
              <Text style={styles.h2hStatValue}>{record.pointsFor.toFixed(1)}</Text>
              <Text style={styles.h2hStatLabel}>Points For</Text>
            </View>
            <View style={styles.h2hStatItem}>
              <Text style={styles.h2hStatValue}>{record.pointsAgainst.toFixed(1)}</Text>
              <Text style={styles.h2hStatLabel}>Points Against</Text>
            </View>
            <View style={styles.h2hStatItem}>
              <Text style={styles.h2hStatValue}>
                {(record.pointsFor - record.pointsAgainst > 0 ? '+' : '')}{(record.pointsFor - record.pointsAgainst).toFixed(1)}
              </Text>
              <Text style={styles.h2hStatLabel}>Point Diff</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View>
      <Text style={styles.sectionTitle}>League Analytics</Text>
      
      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>League Trends</Text>
        <View style={styles.trendItem}>
          <TrendingUp size={16} color="#10b981" />
          <Text style={styles.trendText}>Average scoring up 12% from last season</Text>
        </View>
        <View style={styles.trendItem}>
          <Users size={16} color="#3b82f6" />
          <Text style={styles.trendText}>Most competitive season yet (smallest point differential)</Text>
        </View>
        <View style={styles.trendItem}>
          <Trophy size={16} color="#f59e0b" />
          <Text style={styles.trendText}>4 different teams have won championships</Text>
        </View>
      </View>

      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>Your Performance Analysis</Text>
        <View style={styles.performanceGrid}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>67.5%</Text>
            <Text style={styles.performanceLabel}>All-Time Win %</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>3rd</Text>
            <Text style={styles.performanceLabel}>Total Points Rank</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>1.2</Text>
            <Text style={styles.performanceLabel}>Championships/Season</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>85%</Text>
            <Text style={styles.performanceLabel}>Playoff Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>League Records</Text>
        <View style={styles.recordItem}>
          <Text style={styles.recordLabel}>Highest Single Game:</Text>
          <Text style={styles.recordValue}>187.4 (Thunder Bolts, 2023)</Text>
        </View>
        <View style={styles.recordItem}>
          <Text style={styles.recordLabel}>Most Points in Season:</Text>
          <Text style={styles.recordValue}>1,678.4 (Thunder Bolts, 2023)</Text>
        </View>
        <View style={styles.recordItem}>
          <Text style={styles.recordLabel}>Biggest Blowout:</Text>
          <Text style={styles.recordValue}>89.6 points (Week 7, 2022)</Text>
        </View>
        <View style={styles.recordItem}>
          <Text style={styles.recordLabel}>Closest Game:</Text>
          <Text style={styles.recordValue}>0.1 points (Week 12, 2023)</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>League History</Text>
        <Text style={styles.headerSubtitle}>3 seasons • Est. 2022</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'seasons', label: 'Seasons', icon: Calendar },
          { key: 'stats', label: 'Player Stats', icon: BarChart3 },
          { key: 'h2h', label: 'Head-to-Head', icon: Users },
          { key: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map(({ key, label, icon: Icon }) => (
          <TouchableOpacity
            key={key}
            style={[styles.tab, selectedTab === key && styles.activeTab]}
            onPress={() => setSelectedTab(key as any)}
          >
            <Icon size={16} color={selectedTab === key ? '#dc2626' : '#6b7280'} />
            <Text style={[styles.tabText, selectedTab === key && styles.activeTabText]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'seasons' && renderSeasonHistory()}
        {selectedTab === 'stats' && renderPlayerStats()}
        {selectedTab === 'h2h' && renderHeadToHead()}
        {selectedTab === 'analytics' && renderAnalytics()}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#dc2626'
  },
  tabText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
    fontWeight: '500'
  },
  activeTabText: {
    color: '#dc2626'
  },
  content: {
    flex: 1,
    padding: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16
  },
  seasonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  seasonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  seasonYear: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  championBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fed7aa'
  },
  championText: {
    fontSize: 12,
    color: '#92400e',
    marginLeft: 4,
    fontWeight: '600'
  },
  seasonDetails: {
    gap: 8
  },
  seasonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  seasonLabel: {
    fontSize: 14,
    color: '#6b7280'
  },
  seasonValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937'
  },
  tbdText: {
    color: '#9ca3af',
    fontStyle: 'italic'
  },
  playerStatsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  playerStatsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12
  },
  playerInfo: {
    flex: 1
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  winPercentage: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statItem: {
    alignItems: 'center',
    flex: 1
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4
  },
  statLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
    textAlign: 'center'
  },
  h2hCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  h2hHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  opponentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12
  },
  opponentInfo: {
    flex: 1
  },
  opponentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  h2hRecord: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  h2hWinRate: {
    alignItems: 'center'
  },
  winRateText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  h2hStats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  h2hStatItem: {
    alignItems: 'center',
    flex: 1
  },
  h2hStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  h2hStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2
  },
  analyticsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  trendText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  performanceItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 12
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  performanceLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center'
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  recordLabel: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1
  },
  recordValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937'
  }
});
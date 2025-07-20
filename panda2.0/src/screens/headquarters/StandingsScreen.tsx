import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { 
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Medal,
  Award,
  Users,
  Target,
  BarChart3
} from 'lucide-react-native';

interface Team {
  id: string;
  name: string;
  owner: string;
  logo: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  streak: {
    type: 'W' | 'L';
    count: number;
  };
  division: 'North' | 'South';
  rank: number;
  playoffSeed?: number;
  isPlayoffBound: boolean;
  isChampion?: boolean;
}

interface Division {
  name: string;
  teams: Team[];
}

export default function StandingsScreen() {
  const [viewMode, setViewMode] = useState<'overall' | 'divisions' | 'playoffs'>('overall');

  // Mock data
  const teams: Team[] = [
    {
      id: '1',
      name: 'Blazing Comets',
      owner: 'Casey Wilson',
      logo: '☄️',
      wins: 11,
      losses: 2,
      pointsFor: 1847.5,
      pointsAgainst: 1523.2,
      streak: { type: 'W', count: 6 },
      division: 'North',
      rank: 1,
      playoffSeed: 1,
      isPlayoffBound: true,
      isChampion: true
    },
    {
      id: '2',
      name: 'Steel Titans',
      owner: 'Chris Brown',
      logo: '⚔️',
      wins: 10,
      losses: 3,
      pointsFor: 1756.8,
      pointsAgainst: 1612.4,
      streak: { type: 'W', count: 3 },
      division: 'South',
      rank: 2,
      playoffSeed: 2,
      isPlayoffBound: true
    },
    {
      id: '3',
      name: 'Ice Wolves',
      owner: 'David Kim',
      logo: '🐺',
      wins: 9,
      losses: 4,
      pointsFor: 1698.3,
      pointsAgainst: 1587.9,
      streak: { type: 'L', count: 1 },
      division: 'North',
      rank: 3,
      playoffSeed: 3,
      isPlayoffBound: true
    },
    {
      id: '4',
      name: 'Thunder Bolts',
      owner: 'Mike Johnson',
      logo: '⚡',
      wins: 8,
      losses: 5,
      pointsFor: 1634.7,
      pointsAgainst: 1598.1,
      streak: { type: 'W', count: 2 },
      division: 'South',
      rank: 4,
      playoffSeed: 4,
      isPlayoffBound: true
    },
    {
      id: '5',
      name: 'Crimson Hawks',
      owner: 'Jordan Lee',
      logo: '🦅',
      wins: 8,
      losses: 5,
      pointsFor: 1612.4,
      pointsAgainst: 1623.8,
      streak: { type: 'W', count: 1 },
      division: 'North',
      rank: 5,
      playoffSeed: 5,
      isPlayoffBound: true
    },
    {
      id: '6',
      name: 'Golden Lions',
      owner: 'Taylor Swift',
      logo: '🦁',
      wins: 7,
      losses: 6,
      pointsFor: 1589.2,
      pointsAgainst: 1634.5,
      streak: { type: 'L', count: 2 },
      division: 'South',
      rank: 6,
      playoffSeed: 6,
      isPlayoffBound: true
    },
    {
      id: '7',
      name: 'Fire Dragons',
      owner: 'Sarah Chen',
      logo: '🔥',
      wins: 7,
      losses: 6,
      pointsFor: 1567.8,
      pointsAgainst: 1645.2,
      streak: { type: 'W', count: 1 },
      division: 'North',
      rank: 7,
      isPlayoffBound: false
    },
    {
      id: '8',
      name: 'Storm Eagles',
      owner: 'Lisa Wang',
      logo: '🦅',
      wins: 6,
      losses: 7,
      pointsFor: 1523.6,
      pointsAgainst: 1678.9,
      streak: { type: 'L', count: 3 },
      division: 'South',
      rank: 8,
      isPlayoffBound: false
    },
    {
      id: '9',
      name: 'Neon Knights',
      owner: 'Alex Rivera',
      logo: '🌟',
      wins: 5,
      losses: 8,
      pointsFor: 1487.3,
      pointsAgainst: 1712.4,
      streak: { type: 'L', count: 4 },
      division: 'North',
      rank: 9,
      isPlayoffBound: false
    },
    {
      id: '10',
      name: 'Shadow Wolves',
      owner: 'Morgan Davis',
      logo: '🌙',
      wins: 4,
      losses: 9,
      pointsFor: 1423.7,
      pointsAgainst: 1756.8,
      streak: { type: 'L', count: 5 },
      division: 'South',
      rank: 10,
      isPlayoffBound: false
    }
  ];

  const divisions: Division[] = [
    {
      name: 'North Division',
      teams: teams.filter(team => team.division === 'North').sort((a, b) => a.rank - b.rank)
    },
    {
      name: 'South Division',
      teams: teams.filter(team => team.division === 'South').sort((a, b) => a.rank - b.rank)
    }
  ];

  const playoffTeams = teams.filter(team => team.isPlayoffBound).sort((a, b) => (a.playoffSeed || 0) - (b.playoffSeed || 0));

  const getStreakIcon = (streak: Team['streak']) => {
    if (streak.type === 'W') {
      return <TrendingUp size={16} color="#10b981" />;
    } else {
      return <TrendingDown size={16} color="#ef4444" />;
    }
  };

  const getPlayoffIcon = (seed?: number) => {
    if (!seed) return null;
    
    switch (seed) {
      case 1:
        return <Crown size={16} color="#fbbf24" />;
      case 2:
        return <Medal size={16} color="#d1d5db" />;
      case 3:
        return <Award size={16} color="#cd7c2f" />;
      default:
        return <Trophy size={16} color="#6b7280" />;
    }
  };

  const renderTeamRow = (team: Team, showDivision = false) => (
    <TouchableOpacity key={team.id} style={[styles.teamRow, team.isChampion && styles.championRow]}>
      <View style={styles.teamRank}>
        <Text style={[styles.rankText, team.isChampion && styles.championText]}>
          {team.rank}
        </Text>
        {team.isChampion && <Crown size={12} color="#fbbf24" />}
      </View>
      
      <View style={styles.teamInfo}>
        <View style={styles.teamHeader}>
          <Text style={styles.teamEmoji}>{team.logo}</Text>
          <View style={styles.teamDetails}>
            <Text style={[styles.teamName, team.isChampion && styles.championText]}>
              {team.name}
            </Text>
            <Text style={styles.ownerName}>{team.owner}</Text>
            {showDivision && (
              <Text style={styles.divisionText}>{team.division}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.teamStats}>
        <View style={styles.recordContainer}>
          <Text style={[styles.record, team.isChampion && styles.championText]}>
            {team.wins}-{team.losses}
          </Text>
          <View style={styles.streakContainer}>
            {getStreakIcon(team.streak)}
            <Text style={styles.streakText}>
              {team.streak.type}{team.streak.count}
            </Text>
          </View>
        </View>
        
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsFor}>{team.pointsFor.toFixed(1)}</Text>
          <Text style={styles.pointsAgainst}>{team.pointsAgainst.toFixed(1)}</Text>
        </View>
      </View>

      {team.isPlayoffBound && (
        <View style={styles.playoffIndicator}>
          {getPlayoffIcon(team.playoffSeed)}
        </View>
      )}
    </TouchableOpacity>
  );

  const renderOverallStandings = () => (
    <View style={styles.standingsContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerRank}>#</Text>
        <Text style={styles.headerTeam}>Team</Text>
        <Text style={styles.headerRecord}>Record</Text>
        <Text style={styles.headerPoints}>PF/PA</Text>
        <Text style={styles.headerPlayoff}>🏆</Text>
      </View>
      
      {teams.map(team => renderTeamRow(team, true))}
      
      <View style={styles.playoffLine}>
        <View style={styles.playoffLineBar} />
        <Text style={styles.playoffLineText}>Playoff Line</Text>
        <View style={styles.playoffLineBar} />
      </View>
    </View>
  );

  const renderDivisionStandings = () => (
    <View style={styles.divisionsContainer}>
      {divisions.map((division, index) => (
        <View key={division.name} style={styles.divisionSection}>
          <View style={styles.divisionHeader}>
            <Users size={20} color="#dc2626" />
            <Text style={styles.divisionTitle}>{division.name}</Text>
          </View>
          
          <View style={styles.divisionTeams}>
            {division.teams.map(team => renderTeamRow(team))}
          </View>
          
          {index < divisions.length - 1 && <View style={styles.divisionSeparator} />}
        </View>
      ))}
    </View>
  );

  const renderPlayoffStandings = () => (
    <View style={styles.playoffContainer}>
      <View style={styles.playoffHeader}>
        <Trophy size={24} color="#fbbf24" />
        <Text style={styles.playoffTitle}>Playoff Picture</Text>
      </View>
      
      <View style={styles.playoffSeeds}>
        {playoffTeams.map(team => (
          <View key={team.id} style={styles.playoffSeed}>
            <View style={styles.seedNumber}>
              <Text style={styles.seedText}>{team.playoffSeed}</Text>
            </View>
            <View style={styles.playoffTeamInfo}>
              <Text style={styles.playoffTeamEmoji}>{team.logo}</Text>
              <View>
                <Text style={styles.playoffTeamName}>{team.name}</Text>
                <Text style={styles.playoffTeamRecord}>
                  {team.wins}-{team.losses} • {team.pointsFor.toFixed(1)} PF
                </Text>
              </View>
            </View>
            {getPlayoffIcon(team.playoffSeed)}
          </View>
        ))}
      </View>
      
      <View style={styles.tiebreakers}>
        <Text style={styles.tiebreakerTitle}>Tiebreaker Rules</Text>
        <Text style={styles.tiebreakerText}>1. Head-to-head record</Text>
        <Text style={styles.tiebreakerText}>2. Total points scored</Text>
        <Text style={styles.tiebreakerText}>3. Division record</Text>
        <Text style={styles.tiebreakerText}>4. Points against</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <BarChart3 size={24} color="#dc2626" />
          <Text style={styles.titleText}>Standings</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.modeButton, viewMode === 'overall' && styles.activeModeButton]}
            onPress={() => setViewMode('overall')}
          >
            <Text style={[styles.modeButtonText, viewMode === 'overall' && styles.activeModeButtonText]}>
              Overall
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modeButton, viewMode === 'divisions' && styles.activeModeButton]}
            onPress={() => setViewMode('divisions')}
          >
            <Text style={[styles.modeButtonText, viewMode === 'divisions' && styles.activeModeButtonText]}>
              Divisions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modeButton, viewMode === 'playoffs' && styles.activeModeButton]}
            onPress={() => setViewMode('playoffs')}
          >
            <Text style={[styles.modeButtonText, viewMode === 'playoffs' && styles.activeModeButtonText]}>
              Playoffs
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {viewMode === 'overall' && renderOverallStandings()}
        {viewMode === 'divisions' && renderDivisionStandings()}
        {viewMode === 'playoffs' && renderPlayoffStandings()}
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
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  headerActions: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 2
  },
  modeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },
  activeModeButton: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280'
  },
  activeModeButtonText: {
    color: '#dc2626'
  },
  content: {
    flex: 1
  },
  standingsContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  headerRank: {
    width: 30,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280'
  },
  headerTeam: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280'
  },
  headerRecord: {
    width: 60,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
    textAlign: 'center'
  },
  headerPoints: {
    width: 80,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
    textAlign: 'center'
  },
  headerPlayoff: {
    width: 30,
    fontSize: 12,
    textAlign: 'center'
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  championRow: {
    backgroundColor: '#fef3c7'
  },
  teamRank: {
    width: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  championText: {
    color: '#d97706'
  },
  teamInfo: {
    flex: 1
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  teamEmoji: {
    fontSize: 20,
    marginRight: 8
  },
  teamDetails: {
    flex: 1
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937'
  },
  ownerName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 1
  },
  divisionText: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 1
  },
  teamStats: {
    alignItems: 'center'
  },
  recordContainer: {
    alignItems: 'center',
    width: 60
  },
  record: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  streakText: {
    fontSize: 10,
    color: '#6b7280',
    marginLeft: 2
  },
  pointsContainer: {
    alignItems: 'center',
    width: 80
  },
  pointsFor: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981'
  },
  pointsAgainst: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 1
  },
  playoffIndicator: {
    width: 30,
    alignItems: 'center'
  },
  playoffLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fef2f2'
  },
  playoffLineBar: {
    flex: 1,
    height: 1,
    backgroundColor: '#dc2626'
  },
  playoffLineText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#dc2626',
    marginHorizontal: 8
  },
  divisionsContainer: {
    padding: 16
  },
  divisionSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16
  },
  divisionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  divisionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8
  },
  divisionTeams: {
    padding: 8
  },
  divisionSeparator: {
    height: 16
  },
  playoffContainer: {
    padding: 16
  },
  playoffHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },
  playoffTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8
  },
  playoffSeeds: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 24
  },
  playoffSeed: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  seedNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  seedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  playoffTeamInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  playoffTeamEmoji: {
    fontSize: 24,
    marginRight: 12
  },
  playoffTeamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  playoffTeamRecord: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  tiebreakers: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  tiebreakerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12
  },
  tiebreakerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4
  }
});
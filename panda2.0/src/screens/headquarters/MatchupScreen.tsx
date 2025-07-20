import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { 
  ChevronLeft, 
  ChevronRight,
  Trophy,
  Clock,
  TrendingUp
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  points: number;
  projectedPoints: number;
  status: 'active' | 'playing' | 'played' | 'bye';
  imageUrl: string;
}

interface Team {
  id: string;
  name: string;
  owner: string;
  record: string;
  totalPoints: number;
  projectedPoints: number;
  lineup: Player[];
}

interface Matchup {
  id: string;
  week: number;
  team1: Team;
  team2: Team;
  isCurrentUser: boolean;
}

const mockLineup: Player[] = [
  {
    id: '1',
    name: 'Josh Allen',
    position: 'QB',
    team: 'BUF',
    points: 24.8,
    projectedPoints: 22.5,
    status: 'played',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Christian McCaffrey',
    position: 'RB',
    team: 'SF',
    points: 18.6,
    projectedPoints: 19.2,
    status: 'playing',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Alvin Kamara',
    position: 'RB',
    team: 'NO',
    points: 12.4,
    projectedPoints: 15.8,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Tyreek Hill',
    position: 'WR',
    team: 'MIA',
    points: 16.4,
    projectedPoints: 17.8,
    status: 'played',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Davante Adams',
    position: 'WR',
    team: 'LV',
    points: 8.2,
    projectedPoints: 14.5,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Travis Kelce',
    position: 'TE',
    team: 'KC',
    points: 12.3,
    projectedPoints: 14.1,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  }
];

const mockOpponentLineup: Player[] = [
  {
    id: '7',
    name: 'Lamar Jackson',
    position: 'QB',
    team: 'BAL',
    points: 28.4,
    projectedPoints: 24.2,
    status: 'played',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Derrick Henry',
    position: 'RB',
    team: 'BAL',
    points: 22.8,
    projectedPoints: 18.5,
    status: 'playing',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '9',
    name: 'Austin Ekeler',
    position: 'RB',
    team: 'WAS',
    points: 14.2,
    projectedPoints: 12.8,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '10',
    name: 'CeeDee Lamb',
    position: 'WR',
    team: 'DAL',
    points: 19.6,
    projectedPoints: 16.8,
    status: 'played',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '11',
    name: 'Mike Evans',
    position: 'WR',
    team: 'TB',
    points: 11.4,
    projectedPoints: 13.2,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '12',
    name: 'Mark Andrews',
    position: 'TE',
    team: 'BAL',
    points: 8.8,
    projectedPoints: 11.5,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  }
];

const mockMatchups: Matchup[] = [
  {
    id: '1',
    week: 13,
    isCurrentUser: true,
    team1: {
      id: '1',
      name: 'Gridiron Gladiators',
      owner: 'You',
      record: '8-4',
      totalPoints: 92.7,
      projectedPoints: 103.9,
      lineup: mockLineup
    },
    team2: {
      id: '2',
      name: 'Thunder Bolts',
      owner: 'Mike Johnson',
      record: '7-5',
      totalPoints: 105.2,
      projectedPoints: 97.0,
      lineup: mockOpponentLineup
    }
  },
  {
    id: '2',
    week: 13,
    isCurrentUser: false,
    team1: {
      id: '3',
      name: 'Steel Curtain',
      owner: 'Sarah Wilson',
      record: '9-3',
      totalPoints: 118.4,
      projectedPoints: 112.8,
      lineup: []
    },
    team2: {
      id: '4',
      name: 'End Zone Elite',
      owner: 'David Chen',
      record: '6-6',
      totalPoints: 89.6,
      projectedPoints: 95.2,
      lineup: []
    }
  }
];

export default function MatchupScreen() {
  const [currentMatchupIndex, setCurrentMatchupIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<'team1' | 'team2'>('team1');
  
  const currentMatchup = mockMatchups[currentMatchupIndex];
  const isUserMatchup = currentMatchup.isCurrentUser;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'played': return '#10b981';
      case 'playing': return '#f59e0b';
      case 'active': return '#3b82f6';
      case 'bye': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'played': return 'Final';
      case 'playing': return 'Live';
      case 'active': return 'Today';
      case 'bye': return 'Bye';
      default: return '';
    }
  };

  const navigateMatchup = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentMatchupIndex > 0) {
      setCurrentMatchupIndex(currentMatchupIndex - 1);
    } else if (direction === 'next' && currentMatchupIndex < mockMatchups.length - 1) {
      setCurrentMatchupIndex(currentMatchupIndex + 1);
    }
  };

  const renderPlayer = (player: Player, isOpponent = false) => (
    <View key={player.id} style={styles.playerRow}>
      <View style={styles.playerInfo}>
        <Image source={{ uri: player.imageUrl }} style={styles.playerImage} />
        <View style={styles.playerDetails}>
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.playerMeta}>{player.position} • {player.team}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(player.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(player.status) }]}>
              {getStatusText(player.status)}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.playerStats}>
        <Text style={[styles.pointsText, { color: isOpponent ? '#dc2626' : '#1e40af' }]}>
          {player.points}
        </Text>
        <Text style={styles.projectedText}>
          {player.projectedPoints}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Navigation */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.navButton, currentMatchupIndex === 0 && styles.navButtonDisabled]}
          onPress={() => navigateMatchup('prev')}
          disabled={currentMatchupIndex === 0}
        >
          <ChevronLeft size={24} color={currentMatchupIndex === 0 ? '#d1d5db' : '#6b7280'} />
        </TouchableOpacity>
        
        <View style={styles.weekInfo}>
          <Text style={styles.weekText}>Week {currentMatchup.week}</Text>
          <Text style={styles.matchupText}>
            {isUserMatchup ? 'Your Matchup' : 'League Matchup'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.navButton, currentMatchupIndex === mockMatchups.length - 1 && styles.navButtonDisabled]}
          onPress={() => navigateMatchup('next')}
          disabled={currentMatchupIndex === mockMatchups.length - 1}
        >
          <ChevronRight size={24} color={currentMatchupIndex === mockMatchups.length - 1 ? '#d1d5db' : '#6b7280'} />
        </TouchableOpacity>
      </View>

      {/* Score Header */}
      <View style={styles.scoreHeader}>
        <View style={styles.teamScore}>
          <Text style={styles.teamName}>{currentMatchup.team1.name}</Text>
          <Text style={styles.ownerName}>{currentMatchup.team1.owner}</Text>
          <Text style={styles.teamRecord}>{currentMatchup.team1.record}</Text>
          <Text style={[styles.totalPoints, { color: '#1e40af' }]}>
            {currentMatchup.team1.totalPoints}
          </Text>
          <Text style={styles.projectedTotal}>
            Proj: {currentMatchup.team1.projectedPoints}
          </Text>
        </View>
        
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
          <View style={styles.gameStatus}>
            <Clock size={16} color="#f59e0b" />
            <Text style={styles.gameStatusText}>Live</Text>
          </View>
        </View>
        
        <View style={styles.teamScore}>
          <Text style={styles.teamName}>{currentMatchup.team2.name}</Text>
          <Text style={styles.ownerName}>{currentMatchup.team2.owner}</Text>
          <Text style={styles.teamRecord}>{currentMatchup.team2.record}</Text>
          <Text style={[styles.totalPoints, { color: '#dc2626' }]}>
            {currentMatchup.team2.totalPoints}
          </Text>
          <Text style={styles.projectedTotal}>
            Proj: {currentMatchup.team2.projectedPoints}
          </Text>
        </View>
      </View>

      {/* Team Toggle (only for user matchup) */}
      {isUserMatchup && (
        <View style={styles.teamToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedTeam === 'team1' && styles.toggleButtonActive]}
            onPress={() => setSelectedTeam('team1')}
          >
            <Text style={[styles.toggleText, selectedTeam === 'team1' && styles.toggleTextActive]}>
              Your Team
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedTeam === 'team2' && styles.toggleButtonActive]}
            onPress={() => setSelectedTeam('team2')}
          >
            <Text style={[styles.toggleText, selectedTeam === 'team2' && styles.toggleTextActive]}>
              Opponent
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Lineup */}
      <ScrollView style={styles.lineup} showsVerticalScrollIndicator={false}>
        {isUserMatchup ? (
          <View style={styles.lineupContainer}>
            <View style={styles.lineupHeader}>
              <Text style={styles.lineupTitle}>
                {selectedTeam === 'team1' ? 'Your Lineup' : 'Opponent Lineup'}
              </Text>
              <View style={styles.lineupStats}>
                <Text style={styles.lineupStatText}>Points</Text>
                <Text style={styles.lineupStatText}>Proj</Text>
              </View>
            </View>
            
            {(selectedTeam === 'team1' ? currentMatchup.team1.lineup : currentMatchup.team2.lineup)
              .map(player => renderPlayer(player, selectedTeam === 'team2'))}
          </View>
        ) : (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Matchup Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Leading Team:</Text>
              <Text style={styles.summaryValue}>
                {currentMatchup.team1.totalPoints > currentMatchup.team2.totalPoints 
                  ? currentMatchup.team1.name 
                  : currentMatchup.team2.name}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Point Difference:</Text>
              <Text style={styles.summaryValue}>
                {Math.abs(currentMatchup.team1.totalPoints - currentMatchup.team2.totalPoints).toFixed(1)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Game Status:</Text>
              <Text style={[styles.summaryValue, { color: '#f59e0b' }]}>In Progress</Text>
            </View>
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navButtonDisabled: {
    backgroundColor: '#f9fafb'
  },
  weekInfo: {
    alignItems: 'center'
  },
  weekText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  matchupText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  teamScore: {
    flex: 1,
    alignItems: 'center'
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4
  },
  ownerName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2
  },
  teamRecord: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8
  },
  totalPoints: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4
  },
  projectedTotal: {
    fontSize: 12,
    color: '#6b7280'
  },
  vsContainer: {
    alignItems: 'center',
    marginHorizontal: 16
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 8
  },
  gameStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fed7aa'
  },
  gameStatusText: {
    fontSize: 12,
    color: '#92400e',
    marginLeft: 4,
    fontWeight: '500'
  },
  teamToggle: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 4
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8
  },
  toggleButtonActive: {
    backgroundColor: '#1e40af'
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280'
  },
  toggleTextActive: {
    color: '#ffffff'
  },
  lineup: {
    flex: 1,
    padding: 16
  },
  lineupContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden'
  },
  lineupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  lineupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  lineupStats: {
    flexDirection: 'row'
  },
  lineupStatText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginLeft: 16,
    width: 40,
    textAlign: 'center'
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12
  },
  playerDetails: {
    flex: 1
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937'
  },
  playerMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 4
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500'
  },
  playerStats: {
    alignItems: 'center',
    minWidth: 80
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  projectedText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280'
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937'
  }
});
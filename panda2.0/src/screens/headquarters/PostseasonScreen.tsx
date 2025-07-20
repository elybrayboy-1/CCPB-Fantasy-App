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
  Crown,
  Target,
  Calendar,
  Users
} from 'lucide-react-native';

interface BracketTeam {
  id: string;
  name: string;
  owner: string;
  seed: number;
  record: string;
  imageUrl: string;
}

interface BracketMatchup {
  id: string;
  round: string;
  week: number;
  team1?: BracketTeam;
  team2?: BracketTeam;
  score1?: number;
  score2?: number;
  winner?: BracketTeam;
  status: 'upcoming' | 'live' | 'completed';
}

const mockTeams: BracketTeam[] = [
  {
    id: '1',
    name: 'Steel Curtain',
    owner: 'Sarah Wilson',
    seed: 1,
    record: '9-3',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Gridiron Gladiators',
    owner: 'You',
    seed: 2,
    record: '8-4',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Thunder Bolts',
    owner: 'Mike Johnson',
    seed: 3,
    record: '7-5',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Touchdown Titans',
    owner: 'Alex Rodriguez',
    seed: 4,
    record: '8-4',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'End Zone Elite',
    owner: 'David Chen',
    seed: 5,
    record: '6-6',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Blitz Brigade',
    owner: 'Emma Thompson',
    seed: 6,
    record: '7-5',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Field Goal Fanatics',
    owner: 'Ryan Martinez',
    seed: 7,
    record: '5-7',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Fumble Force',
    owner: 'Lisa Garcia',
    seed: 8,
    record: '4-8',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  }
];

// Playoff Bracket (Top 4 teams)
const playoffBracket: BracketMatchup[] = [
  // Semifinals (Week 15)
  {
    id: 'sf1',
    round: 'Semifinals',
    week: 15,
    team1: mockTeams[0], // #1 Steel Curtain
    team2: mockTeams[3], // #4 Touchdown Titans
    status: 'upcoming'
  },
  {
    id: 'sf2',
    round: 'Semifinals',
    week: 15,
    team1: mockTeams[1], // #2 Gridiron Gladiators
    team2: mockTeams[2], // #3 Thunder Bolts
    status: 'upcoming'
  },
  // Championship (Week 17)
  {
    id: 'final',
    round: 'Championship',
    week: 17,
    status: 'upcoming'
  }
];

// Toilet Bowl Bracket (Bottom 4 teams)
const toiletBowlBracket: BracketMatchup[] = [
  // Toilet Bowl Semifinals (Week 15)
  {
    id: 'tb1',
    round: 'Toilet Bowl Semis',
    week: 15,
    team1: mockTeams[4], // #5 End Zone Elite
    team2: mockTeams[7], // #8 Fumble Force
    status: 'upcoming'
  },
  {
    id: 'tb2',
    round: 'Toilet Bowl Semis',
    week: 15,
    team1: mockTeams[5], // #6 Blitz Brigade
    team2: mockTeams[6], // #7 Field Goal Fanatics
    status: 'upcoming'
  },
  // Toilet Bowl Final (Week 17)
  {
    id: 'tbfinal',
    round: 'Toilet Bowl Final',
    week: 17,
    status: 'upcoming'
  }
];

export default function PostseasonScreen() {
  const [selectedBracket, setSelectedBracket] = useState<'playoffs' | 'toilet'>('playoffs');

  const renderTeam = (team: BracketTeam | undefined, isWinner = false) => {
    if (!team) {
      return (
        <View style={[styles.teamSlot, styles.emptySlot]}>
          <Text style={styles.emptySlotText}>TBD</Text>
        </View>
      );
    }

    return (
      <View style={[styles.teamSlot, isWinner && styles.winnerSlot]}>
        <View style={styles.seedContainer}>
          <Text style={styles.seedText}>{team.seed}</Text>
        </View>
        <Image source={{ uri: team.imageUrl }} style={styles.teamImage} />
        <View style={styles.teamDetails}>
          <Text style={styles.teamName} numberOfLines={1}>{team.name}</Text>
          <Text style={styles.teamOwner}>{team.owner}</Text>
          <Text style={styles.teamRecord}>{team.record}</Text>
        </View>
      </View>
    );
  };

  const renderMatchup = (matchup: BracketMatchup) => (
    <View key={matchup.id} style={styles.matchupContainer}>
      <View style={styles.matchupHeader}>
        <Text style={styles.roundText}>{matchup.round}</Text>
        <Text style={styles.weekText}>Week {matchup.week}</Text>
      </View>
      
      <View style={styles.matchupTeams}>
        {renderTeam(matchup.team1, matchup.winner?.id === matchup.team1?.id)}
        
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
          {matchup.score1 !== undefined && matchup.score2 !== undefined && (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{matchup.score1} - {matchup.score2}</Text>
            </View>
          )}
        </View>
        
        {renderTeam(matchup.team2, matchup.winner?.id === matchup.team2?.id)}
      </View>

      <View style={styles.matchupStatus}>
        <View style={[
          styles.statusDot, 
          { backgroundColor: matchup.status === 'completed' ? '#10b981' : 
                           matchup.status === 'live' ? '#f59e0b' : '#6b7280' }
        ]} />
        <Text style={styles.statusText}>
          {matchup.status === 'completed' ? 'Final' : 
           matchup.status === 'live' ? 'Live' : 'Upcoming'}
        </Text>
      </View>
    </View>
  );

  const renderPlayInGame = () => (
    <View style={styles.playInContainer}>
      <Text style={styles.playInTitle}>Week 14 Play-In Game</Text>
      <Text style={styles.playInSubtitle}>Winner advances to Toilet Bowl</Text>
      
      <View style={styles.playInMatchup}>
        {renderTeam(mockTeams[6])} {/* #7 */}
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        {renderTeam(mockTeams[7])} {/* #8 */}
      </View>
      
      <Text style={styles.playInNote}>
        Loser gets last place and pays league punishment
      </Text>
    </View>
  );

  const renderBottom8Table = () => (
    <View style={styles.bottom8Container}>
      <Text style={styles.bottom8Title}>Bottom 8 Table</Text>
      <Text style={styles.bottom8Subtitle}>Consolation standings for teams 5-8</Text>
      
      <View style={styles.tableHeader}>
        <Text style={styles.headerRank}>Rank</Text>
        <Text style={styles.headerTeam}>Team</Text>
        <Text style={styles.headerRecord}>Record</Text>
        <Text style={styles.headerPoints}>Points</Text>
      </View>
      
      {mockTeams.slice(4).map((team, index) => (
        <View key={team.id} style={styles.tableRow}>
          <Text style={styles.rankText}>{team.seed}</Text>
          <View style={styles.teamInfo}>
            <Image source={{ uri: team.imageUrl }} style={styles.smallTeamImage} />
            <View>
              <Text style={styles.smallTeamName}>{team.name}</Text>
              <Text style={styles.smallTeamOwner}>{team.owner}</Text>
            </View>
          </View>
          <Text style={styles.recordText}>{team.record}</Text>
          <Text style={styles.pointsText}>1,234.5</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Postseason</Text>
        <Text style={styles.headerSubtitle}>Playoffs & Toilet Bowl</Text>
      </View>

      {/* Bracket Toggle */}
      <View style={styles.bracketToggle}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedBracket === 'playoffs' && styles.toggleButtonActive]}
          onPress={() => setSelectedBracket('playoffs')}
        >
          <Crown size={16} color={selectedBracket === 'playoffs' ? '#ffffff' : '#6b7280'} />
          <Text style={[styles.toggleText, selectedBracket === 'playoffs' && styles.toggleTextActive]}>
            Playoffs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedBracket === 'toilet' && styles.toggleButtonActive]}
          onPress={() => setSelectedBracket('toilet')}
        >
          <Target size={16} color={selectedBracket === 'toilet' ? '#ffffff' : '#6b7280'} />
          <Text style={[styles.toggleText, selectedBracket === 'toilet' && styles.toggleTextActive]}>
            Toilet Bowl
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedBracket === 'playoffs' ? (
          <View>
            <View style={styles.bracketInfo}>
              <Trophy size={20} color="#f59e0b" />
              <Text style={styles.bracketInfoText}>
                Top 4 teams compete for the championship
              </Text>
            </View>
            
            {playoffBracket.map(renderMatchup)}
          </View>
        ) : (
          <View>
            <View style={styles.bracketInfo}>
              <Target size={20} color="#ef4444" />
              <Text style={styles.bracketInfoText}>
                Bottom 4 teams compete to avoid last place
              </Text>
            </View>
            
            {renderPlayInGame()}
            {toiletBowlBracket.map(renderMatchup)}
            {renderBottom8Table()}
          </View>
        )}

        {/* Schedule Info */}
        <View style={styles.scheduleInfo}>
          <Text style={styles.scheduleTitle}>Postseason Schedule</Text>
          <View style={styles.scheduleItem}>
            <Calendar size={16} color="#6b7280" />
            <Text style={styles.scheduleText}>Week 14: Play-In Game</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Calendar size={16} color="#6b7280" />
            <Text style={styles.scheduleText}>Week 15: Semifinals</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Calendar size={16} color="#6b7280" />
            <Text style={styles.scheduleText}>Week 16: Bye Week</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Calendar size={16} color="#6b7280" />
            <Text style={styles.scheduleText}>Week 17: Championship & Toilet Bowl Final</Text>
          </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4
  },
  bracketToggle: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 4
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8
  },
  toggleButtonActive: {
    backgroundColor: '#1e40af'
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 6
  },
  toggleTextActive: {
    color: '#ffffff'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  bracketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16
  },
  bracketInfoText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
    fontWeight: '500'
  },
  matchupContainer: {
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
  matchupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  roundText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  weekText: {
    fontSize: 14,
    color: '#6b7280'
  },
  matchupTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  teamSlot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  winnerSlot: {
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a'
  },
  emptySlot: {
    justifyContent: 'center'
  },
  emptySlotText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500'
  },
  seedContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  seedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  teamImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8
  },
  teamDetails: {
    flex: 1
  },
  teamName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937'
  },
  teamOwner: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 1
  },
  teamRecord: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 1
  },
  vsContainer: {
    alignItems: 'center',
    marginHorizontal: 12
  },
  vsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280'
  },
  scoreContainer: {
    marginTop: 4
  },
  scoreText: {
    fontSize: 10,
    color: '#1f2937',
    fontWeight: '600'
  },
  matchupStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6
  },
  statusText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500'
  },
  playInContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#fbbf24'
  },
  playInTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center'
  },
  playInSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16
  },
  playInMatchup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  playInNote: {
    fontSize: 11,
    color: '#dc2626',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  bottom8Container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16
  },
  bottom8Title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4
  },
  bottom8Subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  headerRank: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    width: 40
  },
  headerTeam: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    flex: 1
  },
  headerRecord: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    width: 60,
    textAlign: 'center'
  },
  headerPoints: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    width: 70,
    textAlign: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    width: 40
  },
  teamInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  smallTeamImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8
  },
  smallTeamName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937'
  },
  smallTeamOwner: {
    fontSize: 10,
    color: '#6b7280'
  },
  recordText: {
    fontSize: 12,
    color: '#6b7280',
    width: 60,
    textAlign: 'center'
  },
  pointsText: {
    fontSize: 12,
    color: '#6b7280',
    width: 70,
    textAlign: 'center'
  },
  scheduleInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  scheduleText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8
  }
});
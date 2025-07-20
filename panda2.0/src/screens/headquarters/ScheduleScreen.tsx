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
  Calendar,
  Clock,
  Trophy,
  Users,
  ChevronLeft,
  ChevronRight,
  Settings,
  Filter
} from 'lucide-react-native';

interface Team {
  id: string;
  name: string;
  owner: string;
  record: string;
  logo: string;
}

interface Game {
  id: string;
  week: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'completed';
  gameTime: string;
  isPlayoffs?: boolean;
}

interface Week {
  number: number;
  startDate: string;
  endDate: string;
  isPlayoffs?: boolean;
  playoffRound?: string;
}

export default function ScheduleScreen() {
  const [selectedWeek, setSelectedWeek] = useState(14);
  const [viewMode, setViewMode] = useState<'schedule' | 'admin'>('schedule');

  // Mock data
  const teams: Team[] = [
    { id: '1', name: 'Thunder Bolts', owner: 'Mike Johnson', record: '8-5', logo: '⚡' },
    { id: '2', name: 'Fire Dragons', owner: 'Sarah Chen', record: '7-6', logo: '🔥' },
    { id: '3', name: 'Ice Wolves', owner: 'David Kim', record: '9-4', logo: '🐺' },
    { id: '4', name: 'Storm Eagles', owner: 'Lisa Wang', record: '6-7', logo: '🦅' },
    { id: '5', name: 'Steel Titans', owner: 'Chris Brown', record: '10-3', logo: '⚔️' },
    { id: '6', name: 'Neon Knights', owner: 'Alex Rivera', record: '5-8', logo: '🌟' },
    { id: '7', name: 'Crimson Hawks', owner: 'Jordan Lee', record: '8-5', logo: '🦅' },
    { id: '8', name: 'Golden Lions', owner: 'Taylor Swift', record: '7-6', logo: '🦁' },
    { id: '9', name: 'Shadow Wolves', owner: 'Morgan Davis', record: '4-9', logo: '🌙' },
    { id: '10', name: 'Blazing Comets', owner: 'Casey Wilson', record: '11-2', logo: '☄️' }
  ];

  const weeks: Week[] = [
    ...Array.from({ length: 14 }, (_, i) => ({
      number: i + 1,
      startDate: `Sep ${3 + i * 7}`,
      endDate: `Sep ${9 + i * 7}`,
      isPlayoffs: false
    })),
    { number: 15, startDate: 'Dec 16', endDate: 'Dec 22', isPlayoffs: true, playoffRound: 'Wild Card' },
    { number: 16, startDate: 'Dec 23', endDate: 'Dec 29', isPlayoffs: true, playoffRound: 'Semifinals' },
    { number: 17, startDate: 'Dec 30', endDate: 'Jan 5', isPlayoffs: true, playoffRound: 'Championship' }
  ];

  const generateGamesForWeek = (week: number): Game[] => {
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    const games: Game[] = [];
    
    for (let i = 0; i < shuffledTeams.length; i += 2) {
      if (i + 1 < shuffledTeams.length) {
        const homeScore = week <= 13 ? Math.floor(Math.random() * 150) + 80 : undefined;
        const awayScore = week <= 13 ? Math.floor(Math.random() * 150) + 80 : undefined;
        
        games.push({
          id: `${week}-${i}`,
          week,
          homeTeam: shuffledTeams[i],
          awayTeam: shuffledTeams[i + 1],
          homeScore,
          awayScore,
          status: week <= 13 ? 'completed' : week === 14 ? 'live' : 'scheduled',
          gameTime: week === 14 ? 'Live' : week > 14 ? 'Sun 1:00 PM' : 'Final',
          isPlayoffs: week > 14
        });
      }
    }
    
    return games;
  };

  const currentWeekGames = generateGamesForWeek(selectedWeek);
  const currentWeek = weeks.find(w => w.number === selectedWeek);

  const renderGameCard = (game: Game) => {
    const getStatusColor = () => {
      switch (game.status) {
        case 'live': return '#ef4444';
        case 'completed': return '#10b981';
        default: return '#6b7280';
      }
    };

    const getStatusText = () => {
      switch (game.status) {
        case 'live': return 'LIVE';
        case 'completed': return 'FINAL';
        default: return game.gameTime;
      }
    };

    return (
      <TouchableOpacity key={game.id} style={[styles.gameCard, game.isPlayoffs && styles.playoffGame]}>
        {game.isPlayoffs && (
          <View style={styles.playoffBadge}>
            <Trophy size={12} color="#fbbf24" />
            <Text style={styles.playoffText}>PLAYOFFS</Text>
          </View>
        )}
        
        <View style={styles.gameHeader}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        </View>

        <View style={styles.matchup}>
          {/* Away Team */}
          <View style={styles.team}>
            <Text style={styles.teamEmoji}>{game.awayTeam.logo}</Text>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{game.awayTeam.name}</Text>
              <Text style={styles.teamRecord}>{game.awayTeam.record}</Text>
            </View>
            {game.awayScore !== undefined && (
              <Text style={[styles.score, game.awayScore > (game.homeScore || 0) && styles.winningScore]}>
                {game.awayScore}
              </Text>
            )}
          </View>

          <Text style={styles.vsText}>@</Text>

          {/* Home Team */}
          <View style={styles.team}>
            <Text style={styles.teamEmoji}>{game.homeTeam.logo}</Text>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{game.homeTeam.name}</Text>
              <Text style={styles.teamRecord}>{game.homeTeam.record}</Text>
            </View>
            {game.homeScore !== undefined && (
              <Text style={[styles.score, game.homeScore > (game.awayScore || 0) && styles.winningScore]}>
                {game.homeScore}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderWeekSelector = () => (
    <View style={styles.weekSelector}>
      <TouchableOpacity 
        style={styles.weekArrow}
        onPress={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
        disabled={selectedWeek === 1}
      >
        <ChevronLeft size={20} color={selectedWeek === 1 ? '#d1d5db' : '#6b7280'} />
      </TouchableOpacity>

      <View style={styles.weekInfo}>
        <Text style={styles.weekTitle}>
          {currentWeek?.isPlayoffs ? currentWeek.playoffRound : `Week ${selectedWeek}`}
        </Text>
        <Text style={styles.weekDates}>
          {currentWeek?.startDate} - {currentWeek?.endDate}
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.weekArrow}
        onPress={() => setSelectedWeek(Math.min(17, selectedWeek + 1))}
        disabled={selectedWeek === 17}
      >
        <ChevronRight size={20} color={selectedWeek === 17 ? '#d1d5db' : '#6b7280'} />
      </TouchableOpacity>
    </View>
  );

  const renderAdminPanel = () => (
    <View style={styles.adminPanel}>
      <Text style={styles.adminTitle}>Commissioner Tools</Text>
      
      <TouchableOpacity style={styles.adminButton}>
        <Settings size={20} color="#dc2626" />
        <Text style={styles.adminButtonText}>Edit Schedule</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.adminButton}>
        <Users size={20} color="#dc2626" />
        <Text style={styles.adminButtonText}>Assign Matchups</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.adminButton}>
        <Clock size={20} color="#dc2626" />
        <Text style={styles.adminButtonText}>Set Game Times</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.adminButton}>
        <Trophy size={20} color="#dc2626" />
        <Text style={styles.adminButtonText}>Playoff Settings</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Calendar size={24} color="#dc2626" />
          <Text style={styles.titleText}>Schedule</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.modeButton, viewMode === 'schedule' && styles.activeModeButton]}
            onPress={() => setViewMode('schedule')}
          >
            <Text style={[styles.modeButtonText, viewMode === 'schedule' && styles.activeModeButtonText]}>
              Schedule
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modeButton, viewMode === 'admin' && styles.activeModeButton]}
            onPress={() => setViewMode('admin')}
          >
            <Text style={[styles.modeButtonText, viewMode === 'admin' && styles.activeModeButtonText]}>
              Admin
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'schedule' ? (
        <>
          {renderWeekSelector()}
          
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.gamesContainer}>
              {currentWeekGames.map(renderGameCard)}
            </View>
            
            {/* Season Summary */}
            <View style={styles.seasonSummary}>
              <Text style={styles.summaryTitle}>Season Overview</Text>
              <View style={styles.summaryStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>14</Text>
                  <Text style={styles.statLabel}>Regular Season</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>3</Text>
                  <Text style={styles.statLabel}>Playoff Weeks</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>6</Text>
                  <Text style={styles.statLabel}>Playoff Teams</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderAdminPanel()}
        </ScrollView>
      )}
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
  weekSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  weekArrow: {
    padding: 8
  },
  weekInfo: {
    alignItems: 'center'
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  weekDates: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  content: {
    flex: 1
  },
  gamesContainer: {
    padding: 16
  },
  gameCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  playoffGame: {
    borderColor: '#fbbf24',
    borderWidth: 2
  },
  playoffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12
  },
  playoffText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#d97706',
    marginLeft: 4
  },
  gameHeader: {
    alignItems: 'center',
    marginBottom: 16
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  matchup: {
    gap: 12
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  teamEmoji: {
    fontSize: 24,
    marginRight: 12
  },
  teamInfo: {
    flex: 1
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  teamRecord: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280'
  },
  winningScore: {
    color: '#10b981'
  },
  vsText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    fontWeight: '500'
  },
  seasonSummary: {
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center'
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statItem: {
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626'
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center'
  },
  adminPanel: {
    padding: 16
  },
  adminTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center'
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  adminButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginLeft: 12
  }
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { 
  Users, 
  Settings, 
  Plus, 
  Minus,
  Star,
  TrendingUp,
  Clock
} from 'lucide-react-native';

interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  points: number;
  projectedPoints: number;
  status: 'active' | 'injured' | 'bye' | 'questionable';
  isStarter: boolean;
  imageUrl: string;
}

const mockRoster: Player[] = [
  {
    id: '1',
    name: 'Josh Allen',
    position: 'QB',
    team: 'BUF',
    points: 24.8,
    projectedPoints: 22.5,
    status: 'active',
    isStarter: true,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Christian McCaffrey',
    position: 'RB',
    team: 'SF',
    points: 18.6,
    projectedPoints: 19.2,
    status: 'active',
    isStarter: true,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Tyreek Hill',
    position: 'WR',
    team: 'MIA',
    points: 16.4,
    projectedPoints: 17.8,
    status: 'active',
    isStarter: true,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Travis Kelce',
    position: 'TE',
    team: 'KC',
    points: 12.3,
    projectedPoints: 14.1,
    status: 'active',
    isStarter: true,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Justin Jefferson',
    position: 'WR',
    team: 'MIN',
    points: 0,
    projectedPoints: 18.5,
    status: 'bye',
    isStarter: false,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return '#10b981';
    case 'injured': return '#ef4444';
    case 'bye': return '#f59e0b';
    case 'questionable': return '#f97316';
    default: return '#6b7280';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'Active';
    case 'injured': return 'Injured';
    case 'bye': return 'Bye Week';
    case 'questionable': return 'Questionable';
    default: return 'Unknown';
  }
};

export default function TeamScreen() {
  const [roster, setRoster] = useState(mockRoster);
  const [selectedTab, setSelectedTab] = useState<'lineup' | 'roster' | 'customize'>('lineup');

  const starters = roster.filter(player => player.isStarter);
  const bench = roster.filter(player => !player.isStarter);
  const totalPoints = roster.reduce((sum, player) => sum + player.points, 0);
  const projectedTotal = roster.reduce((sum, player) => sum + player.projectedPoints, 0);

  const handlePlayerAction = (playerId: string, action: 'start' | 'bench' | 'drop') => {
    if (action === 'drop') {
      Alert.alert(
        'Drop Player',
        'Are you sure you want to drop this player?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Drop', 
            style: 'destructive',
            onPress: () => {
              setRoster(prev => prev.filter(p => p.id !== playerId));
            }
          }
        ]
      );
    } else {
      setRoster(prev => prev.map(player => 
        player.id === playerId 
          ? { ...player, isStarter: action === 'start' }
          : player
      ));
    }
  };

  const renderPlayer = (player: Player, showActions = true) => (
    <View key={player.id} style={styles.playerCard}>
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
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{player.points}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{player.projectedPoints}</Text>
          <Text style={styles.statLabel}>Proj</Text>
        </View>
      </View>

      {showActions && (
        <View style={styles.playerActions}>
          {player.isStarter ? (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handlePlayerAction(player.id, 'bench')}
            >
              <Minus size={16} color="#ef4444" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handlePlayerAction(player.id, 'start')}
            >
              <Plus size={16} color="#10b981" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>The Gridiron Gladiators</Text>
          <Text style={styles.teamRecord}>8-4 • 2nd Place</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Score Summary */}
      <View style={styles.scoreCard}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreValue}>{totalPoints.toFixed(1)}</Text>
          <Text style={styles.scoreLabel}>Total Points</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreValue}>{projectedTotal.toFixed(1)}</Text>
          <Text style={styles.scoreLabel}>Projected</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreValue, { color: totalPoints > projectedTotal ? '#10b981' : '#ef4444' }]}>
            {totalPoints > projectedTotal ? '+' : ''}{(totalPoints - projectedTotal).toFixed(1)}
          </Text>
          <Text style={styles.scoreLabel}>vs Proj</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'lineup', label: 'Lineup', icon: Star },
          { key: 'roster', label: 'Full Roster', icon: Users },
          { key: 'customize', label: 'Customize', icon: Settings }
        ].map(({ key, label, icon: Icon }) => (
          <TouchableOpacity
            key={key}
            style={[styles.tab, selectedTab === key && styles.activeTab]}
            onPress={() => setSelectedTab(key as any)}
          >
            <Icon size={18} color={selectedTab === key ? '#1e40af' : '#6b7280'} />
            <Text style={[styles.tabText, selectedTab === key && styles.activeTabText]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'lineup' && (
          <View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Starting Lineup</Text>
              {starters.map(player => renderPlayer(player))}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bench</Text>
              {bench.map(player => renderPlayer(player))}
            </View>
          </View>
        )}

        {selectedTab === 'roster' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Full Roster</Text>
            {roster.map(player => renderPlayer(player))}
          </View>
        )}

        {selectedTab === 'customize' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Team Customization</Text>
            <View style={styles.customizeCard}>
              <Text style={styles.customizeTitle}>Team Name</Text>
              <Text style={styles.customizeValue}>The Gridiron Gladiators</Text>
            </View>
            <View style={styles.customizeCard}>
              <Text style={styles.customizeTitle}>Team Logo</Text>
              <Text style={styles.customizeValue}>Default Logo</Text>
            </View>
            <View style={styles.customizeCard}>
              <Text style={styles.customizeTitle}>Team Colors</Text>
              <View style={styles.colorPreview}>
                <View style={[styles.colorSwatch, { backgroundColor: '#1e40af' }]} />
                <View style={[styles.colorSwatch, { backgroundColor: '#ffffff' }]} />
              </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  teamInfo: {
    flex: 1
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  teamRecord: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  settingsButton: {
    padding: 8
  },
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center'
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  activeTab: {
    backgroundColor: '#eff6ff'
  },
  tabText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
    fontWeight: '500'
  },
  activeTabText: {
    color: '#1e40af'
  },
  content: {
    flex: 1,
    padding: 16
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  playerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12
  },
  playerDetails: {
    flex: 1
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  playerMeta: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500'
  },
  playerStats: {
    flexDirection: 'row',
    marginRight: 12
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 8
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  statLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2
  },
  playerActions: {
    flexDirection: 'row'
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  customizeCard: {
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
  customizeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8
  },
  customizeValue: {
    fontSize: 16,
    color: '#6b7280'
  },
  colorPreview: {
    flexDirection: 'row'
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  }
});
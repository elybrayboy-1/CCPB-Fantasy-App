import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from 'react-native';
import { 
  Search, 
  Filter, 
  Plus,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react-native';

interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  points: number;
  projectedPoints: number;
  ownership: number;
  status: 'available' | 'waivers' | 'owned';
  isWatchlist: boolean;
  imageUrl: string;
  news?: string;
}

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Gus Edwards',
    position: 'RB',
    team: 'LAC',
    points: 12.4,
    projectedPoints: 8.2,
    ownership: 45,
    status: 'available',
    isWatchlist: false,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    news: 'Expected to see increased carries with Ekeler out'
  },
  {
    id: '2',
    name: 'Romeo Doubs',
    position: 'WR',
    team: 'GB',
    points: 8.6,
    projectedPoints: 11.5,
    ownership: 23,
    status: 'waivers',
    isWatchlist: true,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    news: 'Trending up with recent target share increase'
  },
  {
    id: '3',
    name: 'Tyler Higbee',
    position: 'TE',
    team: 'LAR',
    points: 6.2,
    projectedPoints: 7.8,
    ownership: 12,
    status: 'available',
    isWatchlist: false,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Jaylen Warren',
    position: 'RB',
    team: 'PIT',
    points: 14.8,
    projectedPoints: 12.3,
    ownership: 67,
    status: 'owned',
    isWatchlist: false,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  }
];

const positions = ['All', 'QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
const teams = ['All', 'BUF', 'MIA', 'NE', 'NYJ', 'BAL', 'CIN', 'CLE', 'PIT', 'HOU', 'IND', 'JAX', 'TEN'];
const availability = ['All', 'Available', 'Waivers', 'Owned'];

export default function PlayersScreen() {
  const [players, setPlayers] = useState(mockPlayers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [waiverOrder] = useState(7); // Current waiver position

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = selectedPosition === 'All' || player.position === selectedPosition;
    const matchesTeam = selectedTeam === 'All' || player.team === selectedTeam;
    const matchesAvailability = selectedAvailability === 'All' || 
      (selectedAvailability === 'Available' && player.status === 'available') ||
      (selectedAvailability === 'Waivers' && player.status === 'waivers') ||
      (selectedAvailability === 'Owned' && player.status === 'owned');
    
    return matchesSearch && matchesPosition && matchesTeam && matchesAvailability;
  });

  const handleAddPlayer = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    if (player.status === 'waivers') {
      Alert.alert(
        'Add Waiver Claim',
        `Submit waiver claim for ${player.name}?\n\nYour current waiver position: #${waiverOrder}`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Submit Claim', 
            onPress: () => {
              Alert.alert('Success', `Waiver claim submitted for ${player.name}`);
            }
          }
        ]
      );
    } else if (player.status === 'available') {
      Alert.alert(
        'Add Player',
        `Add ${player.name} to your team?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Add Player', 
            onPress: () => {
              setPlayers(prev => prev.map(p => 
                p.id === playerId ? { ...p, status: 'owned' as const } : p
              ));
              Alert.alert('Success', `${player.name} added to your team`);
            }
          }
        ]
      );
    }
  };

  const toggleWatchlist = (playerId: string) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, isWatchlist: !player.isWatchlist }
        : player
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'waivers': return '#f59e0b';
      case 'owned': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Free Agent';
      case 'waivers': return 'Waivers';
      case 'owned': return 'Owned';
      default: return 'Unknown';
    }
  };

  const renderPlayer = (player: Player) => (
    <View key={player.id} style={styles.playerCard}>
      <View style={styles.playerInfo}>
        <Image source={{ uri: player.imageUrl }} style={styles.playerImage} />
        <View style={styles.playerDetails}>
          <View style={styles.playerHeader}>
            <Text style={styles.playerName}>{player.name}</Text>
            <TouchableOpacity 
              onPress={() => toggleWatchlist(player.id)}
              style={styles.watchlistButton}
            >
              <Star 
                size={16} 
                color={player.isWatchlist ? '#f59e0b' : '#d1d5db'} 
                fill={player.isWatchlist ? '#f59e0b' : 'none'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.playerMeta}>{player.position} • {player.team}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(player.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(player.status) }]}>
              {getStatusText(player.status)}
            </Text>
            <Text style={styles.ownershipText}>• {player.ownership}% owned</Text>
          </View>
          {player.news && (
            <Text style={styles.newsText} numberOfLines={2}>{player.news}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.playerStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{player.points}</Text>
          <Text style={styles.statLabel}>Last</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{player.projectedPoints}</Text>
          <Text style={styles.statLabel}>Proj</Text>
        </View>
      </View>

      {player.status !== 'owned' && (
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: getStatusColor(player.status) }]}
          onPress={() => handleAddPlayer(player.id)}
        >
          <Plus size={16} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search players..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, showFilters && styles.filterButtonActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={showFilters ? '#1e40af' : '#6b7280'} />
        </TouchableOpacity>
      </View>

      {/* Waiver Info */}
      <View style={styles.waiverInfo}>
        <Clock size={16} color="#f59e0b" />
        <Text style={styles.waiverText}>
          Waivers process Wednesday 3:00 AM • Your position: #{waiverOrder}
        </Text>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Position:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {positions.map(position => (
                <TouchableOpacity
                  key={position}
                  style={[styles.filterChip, selectedPosition === position && styles.filterChipActive]}
                  onPress={() => setSelectedPosition(position)}
                >
                  <Text style={[styles.filterChipText, selectedPosition === position && styles.filterChipTextActive]}>
                    {position}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Team:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {teams.map(team => (
                <TouchableOpacity
                  key={team}
                  style={[styles.filterChip, selectedTeam === team && styles.filterChipActive]}
                  onPress={() => setSelectedTeam(team)}
                >
                  <Text style={[styles.filterChipText, selectedTeam === team && styles.filterChipTextActive]}>
                    {team}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Status:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {availability.map(status => (
                <TouchableOpacity
                  key={status}
                  style={[styles.filterChip, selectedAvailability === status && styles.filterChipActive]}
                  onPress={() => setSelectedAvailability(status)}
                >
                  <Text style={[styles.filterChipText, selectedAvailability === status && styles.filterChipTextActive]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Players List */}
      <ScrollView style={styles.playersList} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsText}>
          {filteredPlayers.length} players found
        </Text>
        {filteredPlayers.map(renderPlayer)}
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
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#1f2937'
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterButtonActive: {
    backgroundColor: '#eff6ff'
  },
  waiverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fed7aa'
  },
  waiverText: {
    fontSize: 14,
    color: '#92400e',
    marginLeft: 8,
    fontWeight: '500'
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  filterRow: {
    marginBottom: 12
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8
  },
  filterScroll: {
    flexDirection: 'row'
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    marginRight: 8
  },
  filterChipActive: {
    backgroundColor: '#1e40af'
  },
  filterChipText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500'
  },
  filterChipTextActive: {
    color: '#ffffff'
  },
  playersList: {
    flex: 1,
    padding: 16
  },
  resultsText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    fontWeight: '500'
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
    alignItems: 'flex-start'
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
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1
  },
  watchlistButton: {
    padding: 4
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
  ownershipText: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4
  },
  newsText: {
    fontSize: 12,
    color: '#1e40af',
    marginTop: 4,
    fontStyle: 'italic'
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
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
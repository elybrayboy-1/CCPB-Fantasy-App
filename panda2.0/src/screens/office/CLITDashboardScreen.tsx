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
  Crown,
  TrendingUp,
  TrendingDown,
  Users,
  Trophy,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Star
} from 'lucide-react-native';

interface TeamPerformance {
  teamName: string;
  owner: string;
  record: string;
  pointsFor: number;
  pointsAgainst: number;
  trend: 'up' | 'down' | 'stable';
  powerRanking: number;
  imageUrl: string;
  weeklyChange: number;
}

interface LeagueAlert {
  id: string;
  type: 'trade' | 'waiver' | 'lineup' | 'injury';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  actionRequired: boolean;
}

interface WeeklyHighlight {
  type: 'highest' | 'lowest' | 'upset' | 'blowout';
  title: string;
  description: string;
  value: string;
  teamName: string;
  imageUrl: string;
}

const mockTeamPerformance: TeamPerformance[] = [
  {
    teamName: 'Steel Curtain',
    owner: 'Sarah Wilson',
    record: '8-3',
    pointsFor: 1234.6,
    pointsAgainst: 1089.2,
    trend: 'up',
    powerRanking: 1,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    weeklyChange: 2
  },
  {
    teamName: 'Gridiron Gladiators',
    owner: 'You',
    record: '7-4',
    pointsFor: 1198.4,
    pointsAgainst: 1156.8,
    trend: 'stable',
    powerRanking: 2,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    weeklyChange: 0
  },
  {
    teamName: 'Thunder Bolts',
    owner: 'Mike Johnson',
    record: '6-5',
    pointsFor: 1167.2,
    pointsAgainst: 1134.6,
    trend: 'down',
    powerRanking: 3,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    weeklyChange: -1
  },
  {
    teamName: 'Touchdown Titans',
    owner: 'Alex Rodriguez',
    record: '6-5',
    pointsFor: 1145.8,
    pointsAgainst: 1178.4,
    trend: 'up',
    powerRanking: 4,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    weeklyChange: 1
  }
];

const mockAlerts: LeagueAlert[] = [
  {
    id: '1',
    type: 'trade',
    title: 'Trade Proposal Pending',
    description: 'Mike Johnson proposed a trade with Alex Rodriguez',
    priority: 'medium',
    timestamp: '2 hours ago',
    actionRequired: true
  },
  {
    id: '2',
    type: 'waiver',
    title: 'Waiver Claims Due',
    description: '3 teams have pending waiver claims for Wednesday',
    priority: 'high',
    timestamp: '4 hours ago',
    actionRequired: true
  },
  {
    id: '3',
    type: 'lineup',
    title: 'Inactive Lineups',
    description: '2 teams haven\'t set their lineups for this week',
    priority: 'medium',
    timestamp: '1 day ago',
    actionRequired: true
  },
  {
    id: '4',
    type: 'injury',
    title: 'Key Player Injury',
    description: 'Josh Jacobs ruled out for Week 12',
    priority: 'high',
    timestamp: '6 hours ago',
    actionRequired: false
  }
];

const mockHighlights: WeeklyHighlight[] = [
  {
    type: 'highest',
    title: 'Highest Score',
    description: 'Week 11 Champion',
    value: '156.8',
    teamName: 'Steel Curtain',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    type: 'lowest',
    title: 'Lowest Score',
    description: 'Needs improvement',
    value: '78.2',
    teamName: 'Fumble Force',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    type: 'upset',
    title: 'Biggest Upset',
    description: '8th seed beat 1st seed',
    value: '12.4',
    teamName: 'Field Goal Fanatics',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  },
  {
    type: 'blowout',
    title: 'Biggest Blowout',
    description: 'Dominant performance',
    value: '67.8',
    teamName: 'Thunder Bolts',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face'
  }
];

export default function CLITDashboardScreen() {
  const [selectedMetric, setSelectedMetric] = useState<'performance' | 'alerts' | 'highlights' | 'analytics'>('performance');

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'trade': return Users;
      case 'waiver': return Target;
      case 'lineup': return CheckCircle;
      case 'injury': return AlertTriangle;
      default: return Clock;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getHighlightIcon = (type: string) => {
    switch (type) {
      case 'highest': return Trophy;
      case 'lowest': return TrendingDown;
      case 'upset': return Zap;
      case 'blowout': return Star;
      default: return BarChart3;
    }
  };

  const renderPerformanceOverview = () => (
    <View>
      <Text style={styles.sectionTitle}>Team Performance Overview</Text>
      {mockTeamPerformance.map((team, index) => (
        <View key={team.teamName} style={styles.performanceCard}>
          <View style={styles.performanceHeader}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>#{team.powerRanking}</Text>
            </View>
            <Image source={{ uri: team.imageUrl }} style={styles.teamImage} />
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{team.teamName}</Text>
              <Text style={styles.ownerName}>{team.owner}</Text>
            </View>
            <View style={styles.trendContainer}>
              {team.trend === 'up' && <TrendingUp size={16} color="#10b981" />}
              {team.trend === 'down' && <TrendingDown size={16} color="#ef4444" />}
              {team.trend === 'stable' && <BarChart3 size={16} color="#6b7280" />}
              <Text style={[
                styles.weeklyChange,
                { color: team.weeklyChange > 0 ? '#10b981' : team.weeklyChange < 0 ? '#ef4444' : '#6b7280' }
              ]}>
                {team.weeklyChange > 0 ? '+' : ''}{team.weeklyChange}
              </Text>
            </View>
          </View>
          
          <View style={styles.performanceStats}>
            <View style={styles.statColumn}>
              <Text style={styles.statValue}>{team.record}</Text>
              <Text style={styles.statLabel}>Record</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statValue}>{team.pointsFor.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Points For</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statValue}>{team.pointsAgainst.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Points Against</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={[
                styles.statValue,
                { color: (team.pointsFor - team.pointsAgainst) > 0 ? '#10b981' : '#ef4444' }
              ]}>
                {(team.pointsFor - team.pointsAgainst > 0 ? '+' : '')}{(team.pointsFor - team.pointsAgainst).toFixed(1)}
              </Text>
              <Text style={styles.statLabel}>Differential</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAlerts = () => (
    <View>
      <Text style={styles.sectionTitle}>League Alerts & Actions</Text>
      {mockAlerts.map(alert => {
        const AlertIcon = getAlertIcon(alert.type);
        const alertColor = getAlertColor(alert.priority);
        
        return (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <View style={[styles.alertIcon, { backgroundColor: `${alertColor}20` }]}>
                <AlertIcon size={16} color={alertColor} />
              </View>
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertDescription}>{alert.description}</Text>
              </View>
              <View style={styles.alertMeta}>
                <Text style={styles.alertTime}>{alert.timestamp}</Text>
                {alert.actionRequired && (
                  <View style={styles.actionBadge}>
                    <Text style={styles.actionText}>Action Required</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderHighlights = () => (
    <View>
      <Text style={styles.sectionTitle}>Weekly Highlights</Text>
      <View style={styles.highlightsGrid}>
        {mockHighlights.map((highlight, index) => {
          const HighlightIcon = getHighlightIcon(highlight.type);
          
          return (
            <View key={index} style={styles.highlightCard}>
              <View style={styles.highlightHeader}>
                <HighlightIcon size={20} color="#dc2626" />
                <Text style={styles.highlightTitle}>{highlight.title}</Text>
              </View>
              <Text style={styles.highlightValue}>{highlight.value}</Text>
              <Text style={styles.highlightDescription}>{highlight.description}</Text>
              <View style={styles.highlightTeam}>
                <Image source={{ uri: highlight.imageUrl }} style={styles.highlightImage} />
                <Text style={styles.highlightTeamName}>{highlight.teamName}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderAnalytics = () => (
    <View>
      <Text style={styles.sectionTitle}>League Analytics</Text>
      
      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>League Health Score</Text>
        <View style={styles.healthScore}>
          <Text style={styles.healthValue}>87%</Text>
          <Text style={styles.healthLabel}>Excellent</Text>
        </View>
        <View style={styles.healthMetrics}>
          <View style={styles.healthMetric}>
            <Text style={styles.metricLabel}>Activity Level</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '92%' }]} />
            </View>
            <Text style={styles.metricValue}>92%</Text>
          </View>
          <View style={styles.healthMetric}>
            <Text style={styles.metricLabel}>Engagement</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '85%' }]} />
            </View>
            <Text style={styles.metricValue}>85%</Text>
          </View>
          <View style={styles.healthMetric}>
            <Text style={styles.metricLabel}>Competitiveness</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '78%' }]} />
            </View>
            <Text style={styles.metricValue}>78%</Text>
          </View>
        </View>
      </View>

      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>Key Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricNumber}>156.8</Text>
            <Text style={styles.metricDesc}>Avg Weekly Score</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricNumber}>12</Text>
            <Text style={styles.metricDesc}>Active Trades</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricNumber}>89%</Text>
            <Text style={styles.metricDesc}>Lineup Set Rate</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricNumber}>4.2</Text>
            <Text style={styles.metricDesc}>Avg Moves/Week</Text>
          </View>
        </View>
      </View>

      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>Commissioner Insights</Text>
        <View style={styles.insightItem}>
          <CheckCircle size={16} color="#10b981" />
          <Text style={styles.insightText}>League is highly competitive with close standings</Text>
        </View>
        <View style={styles.insightItem}>
          <AlertTriangle size={16} color="#f59e0b" />
          <Text style={styles.insightText}>2 teams need lineup reminders</Text>
        </View>
        <View style={styles.insightItem}>
          <TrendingUp size={16} color="#10b981" />
          <Text style={styles.insightText}>Trade activity up 25% from last season</Text>
        </View>
        <View style={styles.insightItem}>
          <Users size={16} color="#3b82f6" />
          <Text style={styles.insightText}>All teams remain engaged and active</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Crown size={24} color="#dc2626" />
          <Text style={styles.titleText}>CLIT Dashboard</Text>
        </View>
        <Text style={styles.subtitle}>Commissioner League Intelligence Terminal</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'performance', label: 'Performance', icon: BarChart3 },
          { key: 'alerts', label: 'Alerts', icon: AlertTriangle },
          { key: 'highlights', label: 'Highlights', icon: Star },
          { key: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map(({ key, label, icon: Icon }) => (
          <TouchableOpacity
            key={key}
            style={[styles.tab, selectedMetric === key && styles.activeTab]}
            onPress={() => setSelectedMetric(key as any)}
          >
            <Icon size={16} color={selectedMetric === key ? '#dc2626' : '#6b7280'} />
            <Text style={[styles.tabText, selectedMetric === key && styles.activeTabText]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedMetric === 'performance' && renderPerformanceOverview()}
        {selectedMetric === 'alerts' && renderAlerts()}
        {selectedMetric === 'highlights' && renderHighlights()}
        {selectedMetric === 'analytics' && renderAnalytics()}
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontStyle: 'italic'
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
  performanceCard: {
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
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  teamImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  ownerName: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  trendContainer: {
    alignItems: 'center'
  },
  weeklyChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statColumn: {
    alignItems: 'center',
    flex: 1
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2
  },
  alertCard: {
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
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  alertInfo: {
    flex: 1
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  alertDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  },
  alertMeta: {
    alignItems: 'flex-end'
  },
  alertTime: {
    fontSize: 12,
    color: '#9ca3af'
  },
  actionBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4
  },
  actionText: {
    fontSize: 10,
    color: '#92400e',
    fontWeight: '600'
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  highlightCard: {
    width: '48%',
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
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8
  },
  highlightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 4
  },
  highlightDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8
  },
  highlightTeam: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  highlightImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6
  },
  highlightTeamName: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '500'
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
  healthScore: {
    alignItems: 'center',
    marginBottom: 16
  },
  healthValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#10b981'
  },
  healthLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4
  },
  healthMetrics: {
    gap: 12
  },
  healthMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
    width: 80
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    marginHorizontal: 12
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    width: 40,
    textAlign: 'right'
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  metricCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 12
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  metricDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center'
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  insightText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8
  }
});
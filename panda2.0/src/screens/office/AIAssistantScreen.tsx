import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { 
  Send,
  Bot,
  User,
  TrendingUp,
  Users,
  Trophy,
  Target,
  Lightbulb
} from 'lucide-react-native';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

const mockConversation: AIMessage[] = [
  {
    id: '1',
    type: 'ai',
    content: "Hey there! I'm your Assistant to the Assistant to the Commissioner! 🤖 I'm here to help with fantasy football strategy, player analysis, trade advice, and some good old-fashioned league banter. What can I help you with today?",
    timestamp: '2 minutes ago',
    suggestions: [
      'Analyze my lineup for this week',
      'Who should I target on waivers?',
      'Help me evaluate a trade',
      'Give me matchup predictions'
    ]
  },
  {
    id: '2',
    type: 'user',
    content: 'Should I start Gus Edwards or Romeo Doubs in my flex this week?',
    timestamp: '2 minutes ago'
  },
  {
    id: '3',
    type: 'ai',
    content: "Great question! Let me break this down for you:\n\n🏃‍♂️ **Gus Edwards (RB, LAC)**\n• Facing a tough Denver run defense (ranked 8th vs RBs)\n• Limited passing game involvement\n• Projected: 8-12 points\n\n🎯 **Romeo Doubs (WR, GB)**\n• 8+ targets in 3 of last 4 games\n• Packers vs Lions could be a shootout\n• Better weather conditions\n• Projected: 10-15 points\n\n**My recommendation:** Go with Romeo Doubs! The target share trend is promising and the game environment favors passing. Plus, Doubs has been building chemistry with Love lately.\n\nWant me to check the latest injury reports or weather updates? 🌤️",
    timestamp: '1 minute ago',
    suggestions: [
      'Check injury reports',
      'Compare to other flex options',
      'What about my opponent\'s lineup?',
      'Give me more waiver targets'
    ]
  }
];

const quickActions = [
  { icon: TrendingUp, label: 'Lineup Analysis', color: '#10b981' },
  { icon: Users, label: 'Waiver Targets', color: '#3b82f6' },
  { icon: Trophy, label: 'Trade Evaluator', color: '#f59e0b' },
  { icon: Target, label: 'Matchup Insights', color: '#ef4444' }
];

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState(mockConversation);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage: AIMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: newMessage,
        timestamp: 'now'
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: AIMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: generateAIResponse(newMessage),
          timestamp: 'now',
          suggestions: generateSuggestions()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('trade')) {
      return "I'd be happy to help evaluate that trade! 📊 To give you the best analysis, I'll need to know:\n\n• Who are the players involved?\n• What are your current roster needs?\n• How does this affect your playoff chances?\n\nTrade evaluation is one of my specialties - I consider player values, injury risks, schedule strength, and league context. Fire away with the details!";
    }
    
    if (input.includes('waiver') || input.includes('pickup')) {
      return "Great question about waivers! 🎯 Based on current trends and your league's availability, here are some players to consider:\n\n**Top Targets:**\n• Romeo Doubs (WR) - trending up\n• Gus Edwards (RB) - volume play\n• Tyler Higbee (TE) - streaming option\n\nRemember, your waiver priority is #7, so focus on players who might slip through. Want me to check specific positions or analyze your current roster gaps?";
    }
    
    if (input.includes('lineup') || input.includes('start')) {
      return "Let me help optimize your lineup! 🏆 I'll analyze:\n\n• Matchup difficulty\n• Recent target/carry trends\n• Weather conditions\n• Injury reports\n• Game script predictions\n\nFor the most accurate advice, tell me which players you're deciding between and I'll give you my detailed breakdown with projections!";
    }
    
    return "That's an interesting question! 🤔 I'm constantly analyzing the latest NFL data, injury reports, and fantasy trends to give you the best advice. Whether it's lineup decisions, waiver pickups, trade analysis, or just some friendly league banter, I'm here to help!\n\nWhat specific area would you like me to dive deeper into?";
  };

  const generateSuggestions = (): string[] => {
    const suggestions = [
      'Check this week\'s weather reports',
      'Analyze my opponent\'s weaknesses',
      'Find sleeper picks for next week',
      'Compare playoff scenarios',
      'Review my draft performance',
      'Predict this week\'s highest scorer'
    ];
    
    return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  const handleSuggestion = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const handleQuickAction = (label: string) => {
    const actionMessages = {
      'Lineup Analysis': 'Analyze my current lineup and suggest any changes for this week',
      'Waiver Targets': 'What are the best waiver wire pickups available this week?',
      'Trade Evaluator': 'I want to evaluate a potential trade. Can you help me analyze it?',
      'Matchup Insights': 'Give me insights about my matchup this week and how to win'
    };
    
    setNewMessage(actionMessages[label as keyof typeof actionMessages] || '');
  };

  const renderMessage = (message: AIMessage) => (
    <View key={message.id} style={[
      styles.messageContainer,
      message.type === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      <View style={styles.messageHeader}>
        <View style={styles.senderInfo}>
          {message.type === 'ai' ? (
            <View style={styles.aiAvatar}>
              <Bot size={16} color="#ffffff" />
            </View>
          ) : (
            <View style={styles.userAvatar}>
              <User size={16} color="#ffffff" />
            </View>
          )}
          <Text style={styles.senderName}>
            {message.type === 'ai' ? 'ATTATTC' : 'You'}
          </Text>
        </View>
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      </View>
      
      <Text style={styles.messageContent}>{message.content}</Text>
      
      {message.suggestions && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>💡 Try asking:</Text>
          {message.suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => handleSuggestion(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.headerTitle}>
            <Bot size={24} color="#dc2626" />
            <Text style={styles.titleText}>AI Assistant</Text>
          </View>
          <Text style={styles.subtitle}>Assistant to the Assistant to the Commissioner</Text>
        </View>
        <View style={styles.statusIndicator}>
          <View style={styles.onlineDot} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {quickActions.map(({ icon: Icon, label, color }) => (
          <TouchableOpacity
            key={label}
            style={styles.quickActionButton}
            onPress={() => handleQuickAction(label)}
          >
            <Icon size={20} color={color} />
            <Text style={styles.quickActionText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.messagesList} 
        showsVerticalScrollIndicator={false}
        ref={ref => ref?.scrollToEnd({ animated: true })}
      >
        {messages.map(renderMessage)}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <View style={styles.messageHeader}>
              <View style={styles.senderInfo}>
                <View style={styles.aiAvatar}>
                  <Bot size={16} color="#ffffff" />
                </View>
                <Text style={styles.senderName}>ATTATTC</Text>
              </View>
            </View>
            <View style={styles.typingIndicator}>
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask me anything about fantasy football..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxLength={500}
          placeholderTextColor="#9ca3af"
        />
        <TouchableOpacity 
          style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!newMessage.trim() || isTyping}
        >
          <Send size={20} color={newMessage.trim() ? "#ffffff" : "#9ca3af"} />
        </TouchableOpacity>
      </View>
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
  headerInfo: {
    flex: 1
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
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 6
  },
  statusText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500'
  },
  quickActions: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4
  },
  quickActionText: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500'
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  messageContainer: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  userMessage: {
    backgroundColor: '#eff6ff',
    alignSelf: 'flex-end',
    maxWidth: '85%',
    borderBottomRightRadius: 4
  },
  aiMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    maxWidth: '90%',
    borderBottomLeftRadius: 4
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  aiAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  senderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937'
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af'
  },
  messageContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20
  },
  suggestionsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6'
  },
  suggestionsTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '500'
  },
  suggestionChip: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 6,
    alignSelf: 'flex-start'
  },
  suggestionText: {
    fontSize: 12,
    color: '#6b7280'
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
    marginRight: 4
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1f2937',
    maxHeight: 100,
    marginRight: 12
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonDisabled: {
    backgroundColor: '#f3f4f6'
  }
});
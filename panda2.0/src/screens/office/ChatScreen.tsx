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
  Send,
  Image as ImageIcon,
  Smile,
  AtSign,
  Pin,
  Settings
} from 'lucide-react-native';

interface ChatMessage {
  id: string;
  type: 'message' | 'activity' | 'memo';
  sender?: string;
  senderImage?: string;
  content: string;
  timestamp: string;
  mentions?: string[];
  isPinned?: boolean;
  isCurrentUser?: boolean;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'activity',
    content: 'Waivers have been processed. 3 claims were successful.',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'message',
    sender: 'Mike Johnson',
    senderImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    content: 'Anyone else think the refs screwed us over in that Monday night game? 🤬',
    timestamp: '3 hours ago',
    isCurrentUser: false
  },
  {
    id: '3',
    type: 'message',
    sender: 'You',
    senderImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    content: '@Mike Johnson totally agree! That holding call was bogus',
    timestamp: '3 hours ago',
    mentions: ['Mike Johnson'],
    isCurrentUser: true
  },
  {
    id: '4',
    type: 'activity',
    content: 'Trade completed: Sarah Wilson traded Travis Kelce to David Chen for DeAndre Hopkins + 2024 2nd round pick',
    timestamp: '5 hours ago'
  },
  {
    id: '5',
    type: 'memo',
    content: 'COMMISSIONER MEMO: Reminder that playoff seeding will be finalized after Week 14. Tiebreakers are: 1) Record 2) Points For 3) Head-to-Head. Good luck everyone! 🏆',
    timestamp: '1 day ago',
    isPinned: true
  },
  {
    id: '6',
    type: 'message',
    sender: 'Sarah Wilson',
    senderImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    content: 'Just dropped Gus Edwards for Romeo Doubs. Thoughts?',
    timestamp: '1 day ago',
    isCurrentUser: false
  },
  {
    id: '7',
    type: 'message',
    sender: 'Alex Rodriguez',
    senderImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
    content: '@ATTATTC who should I start this week at flex?',
    timestamp: '1 day ago',
    mentions: ['ATTATTC'],
    isCurrentUser: false
  },
  {
    id: '8',
    type: 'message',
    sender: 'ATTATTC (AI)',
    senderImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=face',
    content: '@Alex Rodriguez Based on matchups and recent target share, I\'d go with Romeo Doubs over Gus Edwards this week. Doubs has been trending up with 8+ targets in 3 of his last 4 games, while Edwards is facing a tough run defense. Plus, weather looks good for the Packers game! 🏈',
    timestamp: '1 day ago',
    mentions: ['Alex Rodriguez'],
    isCurrentUser: false
  }
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showMentions, setShowMentions] = useState(false);

  const leagueMembers = [
    'Mike Johnson', 'Sarah Wilson', 'David Chen', 'Alex Rodriguez', 
    'Emma Thompson', 'Ryan Martinez', 'Lisa Garcia', 'ATTATTC'
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        type: 'message',
        sender: 'You',
        senderImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=face',
        content: newMessage,
        timestamp: 'now',
        isCurrentUser: true,
        mentions: newMessage.includes('@') ? extractMentions(newMessage) : undefined
      };
      
      setMessages(prev => [message, ...prev]);
      setNewMessage('');
    }
  };

  const extractMentions = (text: string): string[] => {
    const mentionRegex = /@(\w+(?:\s+\w+)*)/g;
    const mentions: string[] = [];
    let match;
    
    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1]);
    }
    
    return mentions;
  };

  const handleMention = (member: string) => {
    setNewMessage(prev => prev + `@${member} `);
    setShowMentions(false);
  };

  const togglePin = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isPinned: !msg.isPinned }
        : msg
    ));
  };

  const renderMessage = (message: ChatMessage) => {
    if (message.type === 'activity') {
      return (
        <View key={message.id} style={styles.activityMessage}>
          <View style={styles.activityDot} />
          <Text style={styles.activityText}>{message.content}</Text>
          <Text style={styles.timestamp}>{message.timestamp}</Text>
        </View>
      );
    }

    if (message.type === 'memo') {
      return (
        <View key={message.id} style={styles.memoMessage}>
          <View style={styles.memoHeader}>
            <Text style={styles.memoTitle}>📋 COMMISSIONER MEMO</Text>
            {message.isPinned && (
              <TouchableOpacity onPress={() => togglePin(message.id)}>
                <Pin size={16} color="#f59e0b" fill="#f59e0b" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.memoContent}>{message.content}</Text>
          <Text style={styles.timestamp}>{message.timestamp}</Text>
        </View>
      );
    }

    return (
      <View key={message.id} style={[
        styles.messageContainer,
        message.isCurrentUser && styles.currentUserMessage
      ]}>
        <Image source={{ uri: message.senderImage }} style={styles.senderImage} />
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={styles.senderName}>{message.sender}</Text>
            <Text style={styles.timestamp}>{message.timestamp}</Text>
            {message.isPinned && (
              <Pin size={12} color="#f59e0b" fill="#f59e0b" style={styles.pinIcon} />
            )}
          </View>
          <Text style={styles.messageText}>
            {message.content}
          </Text>
          {message.mentions && message.mentions.length > 0 && (
            <View style={styles.mentionsContainer}>
              {message.mentions.map(mention => (
                <Text key={mention} style={styles.mentionTag}>@{mention}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>League Chat</Text>
          <Text style={styles.headerSubtitle}>8 members online</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.messagesList} 
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Mentions Dropdown */}
      {showMentions && (
        <View style={styles.mentionsDropdown}>
          <Text style={styles.mentionsTitle}>Mention someone:</Text>
          {leagueMembers.map(member => (
            <TouchableOpacity
              key={member}
              style={styles.mentionItem}
              onPress={() => handleMention(member)}
            >
              <AtSign size={16} color="#6b7280" />
              <Text style={styles.mentionName}>{member}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
            placeholderTextColor="#9ca3af"
          />
          <View style={styles.inputActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setShowMentions(!showMentions)}
            >
              <AtSign size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <ImageIcon size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Smile size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send size={20} color={newMessage.trim() ? "#ffffff" : "#9ca3af"} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.characterCount}>
          {newMessage.length}/500
        </Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#10b981',
    marginTop: 2
  },
  settingsButton: {
    padding: 8
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-start'
  },
  currentUserMessage: {
    flexDirection: 'row-reverse'
  },
  senderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  senderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 8
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af'
  },
  pinIcon: {
    marginLeft: 8
  },
  messageText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20
  },
  mentionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  mentionTag: {
    fontSize: 12,
    color: '#1e40af',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 2
  },
  activityMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#0ea5e9'
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0ea5e9',
    marginRight: 8
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#0c4a6e',
    fontWeight: '500'
  },
  memoMessage: {
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#fed7aa'
  },
  memoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  memoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e'
  },
  memoContent: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20
  },
  mentionsDropdown: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
    maxHeight: 200
  },
  mentionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12
  },
  mentionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  mentionName: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end'
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
    marginRight: 8
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4
  },
  sendButtonDisabled: {
    backgroundColor: '#f3f4f6'
  },
  characterCount: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
    marginTop: 4
  }
});
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CircleCheck as CheckCircle, DollarSign, ShoppingBag, CircleAlert as AlertCircle } from 'lucide-react-native';

// Mock notifications data
const NOTIFICATIONS = [
  {
    id: '1',
    type: 'approval',
    title: 'Design Approved!',
    message: 'Your "Neon Dreams" design has been approved and is now live.',
    designId: '1',
    timestamp: '2h ago',
    read: false,
  },
  {
    id: '2',
    type: 'sale',
    title: 'New Sale',
    message: 'Someone purchased a t-shirt with your "Cosmic Waves" design.',
    designId: '2',
    timestamp: '1d ago',
    read: true,
  },
  {
    id: '3',
    type: 'payout',
    title: 'Royalty Payment',
    message: 'You received a payout of $45.60 for April sales.',
    timestamp: '3d ago',
    read: true,
  },
  {
    id: '4',
    type: 'alert',
    title: 'Trending Design',
    message: 'Your "Urban Jungle" design is trending with 200+ likes today!',
    designId: '4',
    timestamp: '1w ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle size={24} color="#4CAF50" />;
      case 'sale':
        return <ShoppingBag size={24} color="#2196F3" />;
      case 'payout':
        return <DollarSign size={24} color="#9C27B0" />;
      case 'alert':
        return <AlertCircle size={24} color="#FF9800" />;
      default:
        return null;
    }
  };
  
  const getBackgroundForType = (type: string) => {
    switch (type) {
      case 'approval':
        return '#E8F5E9';
      case 'sale':
        return '#E3F2FD';
      case 'payout':
        return '#F3E5F5';
      case 'alert':
        return '#FFF3E0';
      default:
        return '#f5f5f5';
    }
  };
  
  const handleNotificationPress = (notification: typeof NOTIFICATIONS[0]) => {
    if (notification.designId) {
      router.push(`/design/${notification.designId}`);
    }
  };
  
  const renderNotificationItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        { backgroundColor: item.read ? '#fff' : getBackgroundForType(item.type) },
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getBackgroundForType(item.type) }]}>
        {getIconForType(item.type)}
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.timestamp}</Text>
      </View>
      
      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      
      {NOTIFICATIONS.length > 0 ? (
        <FlatList
          data={NOTIFICATIONS}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No notifications yet</Text>
          <Text style={styles.emptyStateText}>
            When you receive notifications about your designs, sales, or payouts, they'll appear here.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontFamily: 'Garamond-Bold',
    fontSize: 24,
  },
  notificationsList: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#999',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F7D6E0',
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateTitle: {
    fontFamily: 'Garamond-Bold',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: '80%',
  },
});
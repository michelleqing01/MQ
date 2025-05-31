import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, CreditCard, Shirt as TShirt, Heart, LogOut, ChevronRight } from 'lucide-react-native';

// Mock user data
const USER = {
  name: 'Jessica Smith',
  username: '@jessicasmith',
  bio: 'Graphic designer passionate about minimal aesthetics and bold colors.',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  designsCount: 8,
  likesCount: 423,
  sales: 35,
  earnings: 246.80,
};

// Mock user designs
const USER_DESIGNS = [
  {
    id: '3',
    title: 'Desert Bloom',
    image: 'https://images.pexels.com/photos/7147449/pexels-photo-7147449.jpeg',
    likes: 189,
  },
  {
    id: '5',
    title: 'Retro Wave',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
    likes: 315,
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('designs');
  
  const tabs = [
    { id: 'designs', name: 'Designs' },
    { id: 'stats', name: 'Stats' },
    { id: 'liked', name: 'Liked' },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'designs':
        return (
          <View style={styles.designsGrid}>
            {USER_DESIGNS.map((design) => (
              <TouchableOpacity 
                key={design.id}
                style={styles.designCard}
                onPress={() => router.push(`/design/${design.id}`)}
              >
                <Image source={{ uri: design.image }} style={styles.designImage} />
                <View style={styles.designInfo}>
                  <Text style={styles.designTitle}>{design.title}</Text>
                  <View style={styles.designStats}>
                    <Heart size={16} color="#F7D6E0" fill="#F7D6E0" />
                    <Text style={styles.designLikes}>{design.likes}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={styles.uploadCard}
              onPress={() => router.push('/(tabs)/submit')}
            >
              <TShirt size={32} color="#888" />
              <Text style={styles.uploadText}>Upload New Design</Text>
            </TouchableOpacity>
          </View>
        );
        
      case 'stats':
        return (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Sales</Text>
              <Text style={styles.statValue}>{USER.sales}</Text>
              <Text style={styles.statSubtext}>items sold</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Earnings</Text>
              <Text style={styles.statValue}>${USER.earnings.toFixed(2)}</Text>
              <Text style={styles.statSubtext}>lifetime royalties</Text>
            </View>
            
            <View style={[styles.statCard, styles.statCardFull]}>
              <Text style={styles.statLabel}>Engagement</Text>
              <View style={styles.engagementStats}>
                <View style={styles.engagementStat}>
                  <Text style={styles.engagementValue}>{USER.designsCount}</Text>
                  <Text style={styles.engagementLabel}>Designs</Text>
                </View>
                
                <View style={styles.engagementDivider} />
                
                <View style={styles.engagementStat}>
                  <Text style={styles.engagementValue}>{USER.likesCount}</Text>
                  <Text style={styles.engagementLabel}>Likes Received</Text>
                </View>
              </View>
            </View>
          </View>
        );
        
      case 'liked':
        return (
          <View style={styles.emptyState}>
            <Heart size={48} color="#F7D6E0" />
            <Text style={styles.emptyStateTitle}>No liked designs yet</Text>
            <Text style={styles.emptyStateText}>
              Designs you like will appear here for easy access
            </Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.browseButtonText}>Browse Designs</Text>
            </TouchableOpacity>
          </View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
          >
            <Settings size={24} color="#000" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileInfo}>
          <Image source={{ uri: USER.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{USER.name}</Text>
          <Text style={styles.username}>{USER.username}</Text>
          <Text style={styles.bio}>{USER.bio}</Text>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => router.push('/edit-profile')}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text 
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {renderTabContent()}
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/payout-method')}>
            <CreditCard size={20} color="#000" />
            <Text style={styles.actionText}>Payout Method</Text>
            <ChevronRight size={20} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <LogOut size={20} color="#000" />
            <Text style={styles.actionText}>Sign Out</Text>
            <ChevronRight size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Garamond-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  username: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editProfileText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#888',
  },
  activeTabText: {
    color: '#000',
  },
  designsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  designCard: {
    width: '48%',
    marginBottom: 16,
    marginHorizontal: '1%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  designImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  designInfo: {
    padding: 12,
  },
  designTitle: {
    fontFamily: 'Garamond-Bold',
    fontSize: 14,
    marginBottom: 4,
  },
  designStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  designLikes: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  uploadCard: {
    width: '48%',
    height: 200,
    marginHorizontal: '1%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  uploadText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  statsContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statCardFull: {
    width: '100%',
  },
  statLabel: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Garamond-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statSubtext: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#888',
  },
  engagementStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  engagementStat: {
    flex: 1,
    alignItems: 'center',
  },
  engagementValue: {
    fontFamily: 'Garamond-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  engagementLabel: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#666',
  },
  engagementDivider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontFamily: 'Garamond-Bold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#C6E8E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  browseButtonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#000',
  },
  actionsContainer: {
    padding: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
});
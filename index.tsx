import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';

// Mock data for designs
const DESIGNS = [
  {
    id: '1',
    title: 'Neon Dreams',
    creator: 'Sarah Johnson',
    image: 'https://images.pexels.com/photos/4641825/pexels-photo-4641825.jpeg',
    likes: 342,
    isLiked: false,
  },
  {
    id: '2',
    title: 'Cosmic Waves',
    creator: 'Michael Chen',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
    likes: 256,
    isLiked: true,
  },
  {
    id: '3',
    title: 'Desert Bloom',
    creator: 'Jessica Smith',
    image: 'https://images.pexels.com/photos/7147449/pexels-photo-7147449.jpeg',
    likes: 189,
    isLiked: false,
  },
  {
    id: '4',
    title: 'Urban Jungle',
    creator: 'David Wong',
    image: 'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg',
    likes: 421,
    isLiked: false,
  },
  {
    id: '5',
    title: 'Retro Wave',
    creator: 'Emma Davis',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
    likes: 315,
    isLiked: false,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('trending');
  const [designs, setDesigns] = useState(DESIGNS);
  
  const tabs = [
    { id: 'trending', name: 'Trending' },
    { id: 'new', name: 'New' },
    { id: 'staff', name: 'Staff Picks' },
  ];
  
  const handleLike = (id: string) => {
    setDesigns(designs.map(design => {
      if (design.id === id) {
        return {
          ...design,
          likes: design.isLiked ? design.likes - 1 : design.likes + 1,
          isLiked: !design.isLiked,
        };
      }
      return design;
    }));
  };
  
  const renderDesignCard = ({ item }: { item: typeof DESIGNS[0] }) => (
    <TouchableOpacity 
      style={styles.designCard}
      onPress={() => router.push(`/design/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.designImage} />
      <View style={styles.designInfo}>
        <View>
          <Text style={styles.designTitle}>{item.title}</Text>
          <Text style={styles.designCreator}>by {item.creator}</Text>
        </View>
        <TouchableOpacity 
          style={styles.likeButton}
          onPress={() => handleLike(item.id)}
        >
          <Heart 
            size={20} 
            color={item.isLiked ? '#F7D6E0' : '#000'} 
            fill={item.isLiked ? '#F7D6E0' : 'transparent'} 
          />
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>MOT Creators</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {tabs.map(tab => (
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
        </ScrollView>
      </View>
      
      <FlatList
        data={designs}
        renderItem={renderDesignCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.designsList}
      />
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    fontFamily: 'Garamond-Bold',
    fontSize: 24,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabs: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginRight: 8,
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
  designsList: {
    padding: 16,
  },
  designCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  designImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  designInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  designTitle: {
    fontFamily: 'Garamond-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  designCreator: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  likeCount: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
});
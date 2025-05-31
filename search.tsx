import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search as SearchIcon, X } from 'lucide-react-native';

// Mock data for search results
const ALL_DESIGNS = [
  {
    id: '1',
    title: 'Neon Dreams',
    creator: 'Sarah Johnson',
    image: 'https://images.pexels.com/photos/4641825/pexels-photo-4641825.jpeg',
    tags: ['neon', 'retro', 'abstract'],
  },
  {
    id: '2',
    title: 'Cosmic Waves',
    creator: 'Michael Chen',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
    tags: ['space', 'galaxy', 'abstract'],
  },
  {
    id: '3',
    title: 'Desert Bloom',
    creator: 'Jessica Smith',
    image: 'https://images.pexels.com/photos/7147449/pexels-photo-7147449.jpeg',
    tags: ['nature', 'floral', 'minimal'],
  },
  {
    id: '4',
    title: 'Urban Jungle',
    creator: 'David Wong',
    image: 'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg',
    tags: ['urban', 'geometric', 'modern'],
  },
  {
    id: '5',
    title: 'Retro Wave',
    creator: 'Emma Davis',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
    tags: ['retro', 'wave', 'vintage'],
  },
  {
    id: '6',
    title: 'Mountain Echo',
    creator: 'Alex Thompson',
    image: 'https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg',
    tags: ['nature', 'landscape', 'minimal'],
  },
  {
    id: '7',
    title: 'Ocean Vibes',
    creator: 'Olivia Wilson',
    image: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg',
    tags: ['ocean', 'blue', 'minimal'],
  },
];

// Popular tags for the tag chips
const POPULAR_TAGS = ['abstract', 'minimal', 'retro', 'nature', 'geometric', 'vintage', 'space'];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(ALL_DESIGNS);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query && selectedTags.length === 0) {
      setSearchResults(ALL_DESIGNS);
      return;
    }
    
    const filtered = ALL_DESIGNS.filter(design => {
      const matchesQuery = query 
        ? design.title.toLowerCase().includes(query.toLowerCase()) ||
          design.creator.toLowerCase().includes(query.toLowerCase())
        : true;
        
      const matchesTags = selectedTags.length > 0
        ? selectedTags.some(tag => design.tags.includes(tag))
        : true;
        
      return matchesQuery && matchesTags;
    });
    
    setSearchResults(filtered);
  };
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSearchResults(ALL_DESIGNS);
  };
  
  useEffect(() => {
    handleSearch(searchQuery);
  }, [selectedTags]);
  
  const renderDesignItem = ({ item }: { item: typeof ALL_DESIGNS[0] }) => (
    <TouchableOpacity 
      style={styles.designItem}
      onPress={() => router.push(`/design/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.designThumbnail} />
      <View style={styles.designItemInfo}>
        <Text style={styles.designItemTitle}>{item.title}</Text>
        <Text style={styles.designItemCreator}>by {item.creator}</Text>
        <View style={styles.tagsRow}>
          {item.tags.slice(0, 2).map(tag => (
            <View key={tag} style={styles.tagPill}>
              <Text style={styles.tagPillText}>{tag}</Text>
            </View>
          ))}
          {item.tags.length > 2 && (
            <Text style={styles.moreTags}>+{item.tags.length - 2}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Designs</Text>
        
        <View style={styles.searchBar}>
          <SearchIcon size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search designs or creators"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {(searchQuery || selectedTags.length > 0) && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.tagsContainer}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsScroll}
          >
            {POPULAR_TAGS.map(tag => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagChip,
                  selectedTags.includes(tag) && styles.tagChipSelected,
                ]}
                onPress={() => toggleTag(tag)}
              >
                <Text 
                  style={[
                    styles.tagChipText,
                    selectedTags.includes(tag) && styles.tagChipTextSelected,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      
      {searchResults.length === 0 ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsTitle}>No designs found</Text>
          <Text style={styles.noResultsText}>Try a different search term or tag</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderDesignItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.searchResults}
        />
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
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  tagsContainer: {
    marginBottom: 8,
  },
  tagsScroll: {
    paddingRight: 16,
  },
  tagChip: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  tagChipSelected: {
    backgroundColor: '#C6E8E5',
  },
  tagChipText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#555',
  },
  tagChipTextSelected: {
    color: '#000',
  },
  searchResults: {
    padding: 16,
  },
  designItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    overflow: 'hidden',
  },
  designThumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  designItemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  designItemTitle: {
    fontFamily: 'Garamond-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  designItemCreator: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagPill: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 6,
  },
  tagPillText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#666',
  },
  moreTags: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#888',
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  noResultsTitle: {
    fontFamily: 'Garamond-Bold',
    fontSize: 20,
    marginBottom: 8,
  },
  noResultsText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
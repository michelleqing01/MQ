import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Share2, Flag, Shirt as TShirt } from 'lucide-react-native';
import { useState } from 'react';
import { BlurView } from 'expo-blur';

// Mock designs data
const DESIGNS = {
  '1': {
    id: '1',
    title: 'Neon Dreams',
    creator: 'Sarah Johnson',
    creatorAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    image: 'https://images.pexels.com/photos/4641825/pexels-photo-4641825.jpeg',
    mockup: 'https://images.pexels.com/photos/6347193/pexels-photo-6347193.jpeg',
    description: 'A vibrant exploration of neon colors and geometric shapes that capture the essence of urban nightlife.',
    tags: ['neon', 'retro', 'abstract', 'urban', 'geometric'],
    likes: 342,
    isLiked: false,
    created: '2 weeks ago',
  },
  '2': {
    id: '2',
    title: 'Cosmic Waves',
    creator: 'Michael Chen',
    creatorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
    mockup: 'https://images.pexels.com/photos/7691441/pexels-photo-7691441.jpeg',
    description: 'Inspired by the mysteries of the cosmos, this design depicts the flowing energy waves of distant galaxies.',
    tags: ['space', 'galaxy', 'abstract', 'cosmic', 'blue'],
    likes: 256,
    isLiked: true,
    created: '1 month ago',
  },
  '3': {
    id: '3',
    title: 'Desert Bloom',
    creator: 'Jessica Smith',
    creatorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    image: 'https://images.pexels.com/photos/7147449/pexels-photo-7147449.jpeg',
    mockup: 'https://images.pexels.com/photos/6348101/pexels-photo-6348101.jpeg',
    description: 'A delicate portrayal of desert flora, showcasing the resilience and beauty of nature in harsh environments.',
    tags: ['nature', 'floral', 'minimal', 'desert', 'botanical'],
    likes: 189,
    isLiked: false,
    created: '3 weeks ago',
  },
  '4': {
    id: '4',
    title: 'Urban Jungle',
    creator: 'David Wong',
    creatorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    image: 'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg',
    mockup: 'https://images.pexels.com/photos/8985493/pexels-photo-8985493.jpeg',
    description: 'A bold collision of city architecture and lush tropical elements, representing the balance between urban life and nature.',
    tags: ['urban', 'geometric', 'modern', 'tropical', 'green'],
    likes: 421,
    isLiked: false,
    created: '2 months ago',
  },
  '5': {
    id: '5',
    title: 'Retro Wave',
    creator: 'Emma Davis',
    creatorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
    mockup: 'https://images.pexels.com/photos/7691401/pexels-photo-7691401.jpeg',
    description: 'A nostalgic throwback to 80s aesthetics with a modern twist, featuring bold patterns and sunset gradients.',
    tags: ['retro', 'wave', 'vintage', '80s', 'sunset'],
    likes: 315,
    isLiked: false,
    created: '1 week ago',
  },
};

export default function DesignDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const design = DESIGNS[id as keyof typeof DESIGNS];
  
  const [isLiked, setIsLiked] = useState(design?.isLiked || false);
  const [likesCount, setLikesCount] = useState(design?.likes || 0);
  const [showMockup, setShowMockup] = useState(false);
  
  if (!design) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Design not found</Text>
          <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.notFoundButton}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction}>
              <Share2 size={24} color="#000" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.headerAction}>
              <Flag size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.imageContainer}>
          {showMockup ? (
            <View>
              <Image source={{ uri: design.mockup }} style={styles.designImage} />
              <BlurView intensity={80} style={styles.mockupLabel}>
                <Text style={styles.mockupLabelText}>T-Shirt Preview</Text>
              </BlurView>
              <TouchableOpacity 
                style={styles.viewOriginalButton}
                onPress={() => setShowMockup(false)}
              >
                <Text style={styles.viewOriginalText}>View Original Design</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Image source={{ uri: design.image }} style={styles.designImage} />
          )}
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{design.title}</Text>
            <TouchableOpacity 
              style={[styles.likeButton, isLiked && styles.likeButtonActive]}
              onPress={handleLike}
            >
              <Heart 
                size={20} 
                color={isLiked ? '#fff' : '#000'} 
                fill={isLiked ? '#F7D6E0' : 'transparent'} 
              />
              <Text 
                style={[styles.likeCount, isLiked && styles.likeCountActive]}
              >
                {likesCount}
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.creatorRow}
            onPress={() => {
              // Would navigate to creator profile
              // For now, just go back to profile tab
              router.push('/(tabs)/profile');
            }}
          >
            <Image source={{ uri: design.creatorAvatar }} style={styles.creatorAvatar} />
            <View>
              <Text style={styles.creatorLabel}>Created by</Text>
              <Text style={styles.creatorName}>{design.creator}</Text>
            </View>
            <Text style={styles.createdDate}>{design.created}</Text>
          </TouchableOpacity>
          
          <Text style={styles.description}>{design.description}</Text>
          
          <View style={styles.tagsContainer}>
            {design.tags.map((tag) => (
              <TouchableOpacity key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {!showMockup && (
            <TouchableOpacity 
              style={styles.mockupButton}
              onPress={() => setShowMockup(true)}
            >
              <TShirt size={20} color="#000" />
              <Text style={styles.mockupButtonText}>View T-Shirt Preview</Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.productInfo}>
            <Text style={styles.productInfoTitle}>About this product</Text>
            <Text style={styles.productInfoText}>
              This design is available as a premium quality t-shirt. Each purchase supports the artist with a 10% royalty on sales.
            </Text>
            
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now • $29.99</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  designImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  mockupLabel: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mockupLabelText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 12,
    color: '#fff',
  },
  viewOriginalButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewOriginalText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#fff',
  },
  detailsContainer: {
    padding: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Garamond-Bold',
    fontSize: 28,
    flex: 1,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  likeButtonActive: {
    backgroundColor: '#F7D6E0',
  },
  likeCount: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    marginLeft: 6,
    color: '#000',
  },
  likeCountActive: {
    color: '#fff',
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
  },
  creatorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  creatorLabel: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#888',
  },
  creatorName: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
  },
  createdDate: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#888',
    marginLeft: 'auto',
  },
  description: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
  },
  mockupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C6E8E5',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  mockupButtonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  productInfo: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  productInfoTitle: {
    fontFamily: 'SFPro-Medium',
    fontSize: 18,
    marginBottom: 8,
  },
  productInfoText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    color: '#fff',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  notFoundText: {
    fontFamily: 'Garamond-Bold',
    fontSize: 20,
    marginBottom: 16,
  },
  notFoundButton: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
});
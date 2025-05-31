import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { useState } from 'react';

interface DesignCardProps {
  id: string;
  title: string;
  creator: string;
  image: string;
  likes: number;
  isLiked: boolean;
  onLike?: (id: string) => void;
}

export default function DesignCard({ 
  id, 
  title, 
  creator, 
  image, 
  likes, 
  isLiked,
  onLike 
}: DesignCardProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    if (onLike) {
      onLike(id);
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push(`/design/${id}`)}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.creator}>by {creator}</Text>
        </View>
        <TouchableOpacity 
          style={styles.likeButton}
          onPress={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <Heart 
            size={20} 
            color={liked ? '#F7D6E0' : '#000'} 
            fill={liked ? '#F7D6E0' : 'transparent'} 
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  info: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Garamond-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  creator: {
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
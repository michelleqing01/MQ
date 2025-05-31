import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, X, Plus, Share2, Check } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

// Mock tag suggestions
const SUGGESTED_TAGS = ['abstract', 'geometric', 'minimal', 'colorful', 'typography', 'vintage', 'nature', 'pop art'];

export default function SubmitDesignScreen() {
  const router = useRouter();
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [shareProfits, setShareProfits] = useState(true);
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      setDesignImage(result.assets[0].uri);
    }
  };
  
  const addTag = (tag: string) => {
    const formattedTag = tag.trim().toLowerCase();
    if (formattedTag && !tags.includes(formattedTag) && tags.length < 5) {
      setTags([...tags, formattedTag]);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = () => {
    if (!designImage) {
      Alert.alert('Missing Image', 'Please upload a design image.');
      return;
    }
    
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please add a title for your design.');
      return;
    }
    
    if (tags.length === 0) {
      Alert.alert('Missing Tags', 'Please add at least one tag for your design.');
      return;
    }
    
    // Would submit to API here
    Alert.alert(
      'Design Submitted!',
      'Your design has been submitted for review. You\'ll be notified once it\'s approved.',
      [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Submit Your Design</Text>
        <Text style={styles.subtitle}>Share your creativity with the MOT community</Text>
        
        <TouchableOpacity 
          style={[styles.imageUpload, designImage && styles.imagePreviewContainer]} 
          onPress={pickImage}
        >
          {designImage ? (
            <>
              <Image source={{ uri: designImage }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.changeImageButton}
                onPress={pickImage}
              >
                <Camera size={20} color="#fff" />
                <Text style={styles.changeImageText}>Change</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Camera size={32} color="#888" />
              <Text style={styles.uploadText}>Upload Design</Text>
              <Text style={styles.uploadSubtext}>Tap to browse your gallery</Text>
            </>
          )}
        </TouchableOpacity>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Design Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Give your design a name"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
            maxLength={40}
          />
          <Text style={styles.characterCount}>{title.length}/40</Text>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Tags (up to 5)</Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag) => (
              <View key={tag} style={styles.tagPill}>
                <Text style={styles.tagPillText}>{tag}</Text>
                <TouchableOpacity onPress={() => removeTag(tag)}>
                  <X size={14} color="#555" />
                </TouchableOpacity>
              </View>
            ))}
            
            {tags.length < 5 && (
              <View style={styles.tagInputContainer}>
                <TextInput
                  style={styles.tagInput}
                  placeholder={tags.length === 0 ? "Add tags (e.g., abstract, minimal)" : "Add another tag"}
                  placeholderTextColor="#888"
                  value={tagInput}
                  onChangeText={setTagInput}
                  onSubmitEditing={() => addTag(tagInput)}
                  blurOnSubmit={false}
                />
                {tagInput.trim() && (
                  <TouchableOpacity onPress={() => addTag(tagInput)}>
                    <Plus size={18} color="#555" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestedTags}
          >
            {SUGGESTED_TAGS.filter(tag => !tags.includes(tag)).map((tag) => (
              <TouchableOpacity 
                key={tag} 
                style={styles.suggestedTag}
                onPress={() => addTag(tag)}
                disabled={tags.length >= 5}
              >
                <Text style={styles.suggestedTagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.profitSharingRow}>
            <View>
              <Text style={styles.label}>Profit Sharing</Text>
              <Text style={styles.profitSharingDescription}>
                Earn 10% of sales when your design becomes merchandise
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.checkbox, shareProfits && styles.checkboxChecked]}
              onPress={() => setShareProfits(!shareProfits)}
            >
              {shareProfits && <Check size={16} color="#fff" />}
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.licenseInfo}>
          <Share2 size={20} color="#888" />
          <Text style={styles.licenseText}>
            By submitting, you grant MOT Creators a license to reproduce and sell products featuring your design.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Design</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    fontFamily: 'Garamond-Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  imageUpload: {
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
  },
  imagePreviewContainer: {
    borderStyle: 'solid',
    height: 300,
    backgroundColor: '#fff',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  changeImageText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
  },
  uploadText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    color: '#555',
    marginTop: 12,
  },
  uploadSubtext: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
  },
  characterCount: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagPillText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    marginRight: 6,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
    flex: 1,
    minWidth: 150,
  },
  tagInput: {
    flex: 1,
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
  },
  suggestedTags: {
    paddingVertical: 8,
  },
  suggestedTag: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  suggestedTagText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#555',
  },
  profitSharingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profitSharingDescription: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    maxWidth: '80%',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  licenseInfo: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  licenseText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    color: '#fff',
  },
});
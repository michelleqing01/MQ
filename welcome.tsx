import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {
  const router = useRouter();
  
  return (
    <LinearGradient 
      colors={['#FFFFFF', '#F7D6E0', '#C6E8E5']} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
            style={styles.logoImage}
          />
          
          <Text style={styles.title}>MOT Creators</Text>
          <Text style={styles.subtitle}>Where artists thrive and fashion comes alive</Text>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Upload your designs, get community love, and earn when your art becomes merch.
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]} 
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]} 
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.skipButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Garamond-Bold',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontFamily: 'Garamond-Italic',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
    width: '100%',
  },
  description: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    color: '#fff',
  },
  secondaryButtonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    color: '#000',
  },
  skipButton: {
    padding: 8,
  },
  skipButtonText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'underline',
  },
});
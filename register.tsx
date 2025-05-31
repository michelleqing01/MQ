import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Lock, User, ChevronRight, Apple, CircleUser as UserCircle } from 'lucide-react-native';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isCreator, setIsCreator] = useState<boolean | null>(null);
  
  const handleNext = () => {
    if (step === 1) {
      if (!email || !password || !name) {
        // Would show validation errors
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!username) {
        // Would show validation errors
        return;
      }
      setStep(3);
    } else {
      // Final step - register user
      router.replace('/(tabs)');
    }
  };
  
  const renderStep1 = () => (
    <>
      <Text style={styles.stepIndicator}>Step 1 of 3</Text>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Join the MOT Creators community</Text>
      
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <User size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Mail size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Lock size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <Text style={styles.passwordHint}>Password must be at least 8 characters</Text>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign up with</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Apple size={24} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <UserCircle size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  
  const renderStep2 = () => (
    <>
      <Text style={styles.stepIndicator}>Step 2 of 3</Text>
      <Text style={styles.title}>Create Your Profile</Text>
      <Text style={styles.subtitle}>Choose a unique username</Text>
      
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <User size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        
        <Text style={styles.usernameHint}>
          This will be your @handle and URL (motcreators.com/{username || 'username'})
        </Text>
      </View>
    </>
  );
  
  const renderStep3 = () => (
    <>
      <Text style={styles.stepIndicator}>Step 3 of 3</Text>
      <Text style={styles.title}>How will you use MOT?</Text>
      <Text style={styles.subtitle}>Select your primary role</Text>
      
      <View style={styles.roleOptions}>
        <TouchableOpacity 
          style={[
            styles.roleCard,
            isCreator === true && styles.roleCardSelected,
          ]}
          onPress={() => setIsCreator(true)}
        >
          <View style={[styles.roleIcon, isCreator === true && styles.roleIconSelected]}>
            <UserCircle size={32} color={isCreator === true ? '#fff' : '#000'} />
          </View>
          <Text style={styles.roleTitle}>Creator</Text>
          <Text style={styles.roleDescription}>
            I want to submit designs and earn from merchandise sales
          </Text>
          {isCreator === true && (
            <View style={styles.roleSelectedIndicator}>
              <ChevronRight size={20} color="#000" />
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.roleCard,
            isCreator === false && styles.roleCardSelected,
          ]}
          onPress={() => setIsCreator(false)}
        >
          <View style={[styles.roleIcon, isCreator === false && styles.roleIconSelected]}>
            <Heart size={32} color={isCreator === false ? '#fff' : '#000'} />
          </View>
          <Text style={styles.roleTitle}>Fan</Text>
          <Text style={styles.roleDescription}>
            I want to discover designs and support creators I love
          </Text>
          {isCreator === false && (
            <View style={styles.roleSelectedIndicator}>
              <ChevronRight size={20} color="#000" />
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      <Text style={styles.roleNote}>
        Don't worry, you can change your role or do both later!
      </Text>
    </>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => step > 1 ? setStep(step - 1) : router.back()} 
              style={styles.backButton}
            >
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[
                styles.nextButton,
                step === 3 && !isCreator && styles.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={step === 3 && isCreator === null}
            >
              <Text style={styles.nextButtonText}>
                {step < 3 ? 'Continue' : 'Create Account'}
              </Text>
            </TouchableOpacity>
            
            {step === 1 && (
              <View style={styles.loginPrompt}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicator: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Garamond-Bold',
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    color: '#333',
  },
  passwordHint: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  usernameHint: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#888',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#888',
    paddingHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  roleOptions: {
    marginBottom: 24,
  },
  roleCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleCardSelected: {
    borderColor: '#000',
  },
  roleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  roleIconSelected: {
    backgroundColor: '#000',
  },
  roleTitle: {
    fontFamily: 'Garamond-Bold',
    fontSize: 20,
    marginBottom: 8,
  },
  roleDescription: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  roleSelectedIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  roleNote: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  footer: {
    marginTop: 'auto',
  },
  nextButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    color: '#fff',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#555',
  },
  loginLink: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#000',
  },
});
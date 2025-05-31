import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, Bell, Shield, CircleHelp as HelpCircle, FileText, LogOut, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  
  const sections = [
    {
      title: 'Account',
      items: [
        {
          icon: <CreditCard size={20} color="#000" />,
          label: 'Payout Methods',
          onPress: () => router.push('/payout-method'),
        },
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: <Bell size={20} color="#000" />,
          label: 'Push Notifications',
          toggle: true,
          value: pushEnabled,
          onToggle: setPushEnabled,
        },
        {
          icon: <Bell size={20} color="#000" />,
          label: 'Email Notifications',
          toggle: true,
          value: emailEnabled,
          onToggle: setEmailEnabled,
        },
      ]
    },
    {
      title: 'Legal',
      items: [
        {
          icon: <Shield size={20} color="#000" />,
          label: 'Privacy Policy',
          onPress: () => {},
        },
        {
          icon: <FileText size={20} color="#000" />,
          label: 'Terms of Service',
          onPress: () => {},
        },
        {
          icon: <FileText size={20} color="#000" />,
          label: 'Creator Agreement',
          onPress: () => {},
        },
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle size={20} color="#000" />,
          label: 'Help Center',
          onPress: () => {},
        },
        {
          icon: <HelpCircle size={20} color="#000" />,
          label: 'Contact Support',
          onPress: () => {},
        },
      ]
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView>
        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex}
                style={styles.menuItem}
                onPress={item.onPress}
                disabled={item.toggle}
              >
                <View style={styles.menuItemLeft}>
                  {item.icon}
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </View>
                
                {item.toggle ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#ddd', true: '#C6E8E5' }}
                    thumbColor={item.value ? '#000' : '#f4f3f4'}
                  />
                ) : (
                  <ChevronRight size={20} color="#888" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
        
        <TouchableOpacity style={styles.signOutButton}>
          <LogOut size={20} color="#F7D6E0" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>MOT Creators v1.0.0</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Garamond-Bold',
    fontSize: 20,
  },
  placeholder: {
    width: 40,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    marginLeft: 12,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  signOutText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    color: '#F7D6E0',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
});
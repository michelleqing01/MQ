import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, Ban as Bank, DollarSign, Plus, ChevronRight } from 'lucide-react-native';

export default function PayoutMethodScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payout Methods</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceTitle}>Available Balance</Text>
            <TouchableOpacity style={styles.historyButton}>
              <Text style={styles.historyButtonText}>History</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.balanceAmount}>$246.80</Text>
          
          <TouchableOpacity style={styles.withdrawButton}>
            <DollarSign size={20} color="#000" />
            <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        
        <View style={styles.paymentMethodsContainer}>
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={styles.paymentMethodLeft}>
              <View style={styles.paymentMethodIcon}>
                <Bank size={24} color="#000" />
              </View>
              <View>
                <Text style={styles.paymentMethodTitle}>Bank Account</Text>
                <Text style={styles.paymentMethodSubtitle}>ending in 6789</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addPaymentMethod}>
            <Plus size={24} color="#000" />
            <Text style={styles.addPaymentMethodText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.connectContainer}>
          <Text style={styles.connectTitle}>Connect with Stripe</Text>
          <Text style={styles.connectDescription}>
            Connect your Stripe account to receive direct payments and manage your earnings more efficiently.
          </Text>
          
          <TouchableOpacity style={styles.connectButton}>
            <Image 
              source={{ uri: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' }} 
              style={styles.stripeIcon} 
              resizeMode="contain"
            />
            <Text style={styles.connectButtonText}>Connect with Stripe</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>About Payouts</Text>
          <Text style={styles.infoText}>
            Payouts are processed on the 1st and 15th of each month for all earnings above $50. Lower balances are carried forward to the next payout period.
          </Text>
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
  balanceCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceTitle: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#666',
  },
  historyButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  historyButtonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 14,
    color: '#000',
    textDecorationLine: 'underline',
  },
  balanceAmount: {
    fontFamily: 'Garamond-Bold',
    fontSize: 36,
    marginBottom: 16,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C6E8E5',
    borderRadius: 12,
    paddingVertical: 12,
  },
  withdrawButtonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  sectionTitle: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  paymentMethodsContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  paymentMethodTitle: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  paymentMethodSubtitle: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
  },
  addPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
  },
  addPaymentMethodText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  connectContainer: {
    margin: 16,
    padding: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  connectTitle: {
    fontFamily: 'SFPro-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  connectDescription: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  stripeIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6772E5',
    borderRadius: 12,
    paddingVertical: 12,
  },
  connectButtonText: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    color: '#fff',
  },
  infoContainer: {
    margin: 16,
    marginBottom: 32,
  },
  infoTitle: {
    fontFamily: 'SFPro-Medium',
    fontSize: 16,
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
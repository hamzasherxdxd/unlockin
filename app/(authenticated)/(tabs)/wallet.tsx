import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, Button, Modal } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Picker } from '@react-native-picker/picker';
import { Currency } from '@/interfaces/crypto';
import { Link } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [availableBalance, setAvailableBalance] = useState("0.00");
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  // form input
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'India',
    // Add more countries as needed
  ];


  const currencies = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
  });

  const ids = currencies.data?.map((currency: Currency) => currency.id).join(',');

  const { data } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ paddingTop: headerHeight }}>
      <Text style={styles.linkHeader}>Wallet</Text>
      <View style={styles.account1}>
      <View style={styles.pendingBalance}>
      <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
        <View style={{ flex: 1, gap: 6 }}>
        <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>Pending Balance</Text>
          </View>
        <View style={{ gap: 6, alignItems: 'flex-end' }}>
          <Text>Rs0.00  <AntDesign name="exclamationcircle" size={16} color='#212121' /></Text>
           </View>
         </TouchableOpacity>
         </View> 

        <View style={styles.row}>
        <TouchableOpacity style={[ styles.setPriceButton, { backgroundColor: 'white', marginVertical: 20 },]}> 
          {/* <Text style={[styles.setPriceNum, { color: Colors.dark }]}>Rs0.00</Text> */}
          <Text style={[styles.setPriceNum, { color: Colors.dark }]}>Rs{availableBalance}</Text>
        </TouchableOpacity>  
      </View>
      <Text style={{ color: Colors.gray, fontSize: 14, }}>Available Balance</Text>
      </View>

      <View style={styles.wallet}>        
        <TouchableOpacity style={[ styles.setWalletButton, { backgroundColor: "#031A6B", marginVertical: 20 }, ]} onPress={() => setModalVisible1(true)}>
          <Text style={[defaultStyles.buttonTextSmall, { color: "white" }]} >Set Up Your Wallet</Text>
          
        </TouchableOpacity>
        
      </View> 
      <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
      <Text style={[defaultStyles.sectionHeader,{paddingBottom:25, flex: 1, gap: 6 }]}>Latest Transactions</Text>
      <TouchableOpacity onPress={() => setModalVisible3(true)}>
      <Text style={styles.seeAll}>
        See all 
        </Text>
        </TouchableOpacity>
      </View>


      <Text style={{ color: Colors.gray, fontSize: 14, textAlign:'center'}}>There are no transactions at the moment</Text>
     


     {/* Dialog box when you click the (set up your wallet) button */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible1(false)}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.linkHeader}>Set Up Your Wallet</Text>
        <Text style={{ color: 'black', fontSize: 14, textAlign:'center',marginTop:20}}>Complete these steps to withdraw cash to your bank account when you start making sales</Text>
     
      <View style={styles.bankVerify0}>
        
      <View style={styles.bankVerify}>
      <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }} onPress={() => setModalVisible2(true)}>
      <TouchableOpacity style={styles.bankIcon}>
      <MaterialCommunityIcons name="bank" size={22} color="white" />
      </TouchableOpacity >
        <View style={{ flex: 1, gap: 6 }} >
        <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>  Bank account added</Text>
          </View>
        <View style={{ gap: 6, alignItems: 'flex-end' }}>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
           </View>
      </TouchableOpacity>
      </View> 

      <View style={styles.bankVerify}>
      <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
      <TouchableOpacity style={styles.bankIcon}>
      <MaterialIcons name="verified-user" size={22} color="white" />
      </TouchableOpacity>
      <View style={{ flex: 1, gap: 6 }}>
      <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>Identity Verified</Text>
      </View>
      <View style={{ gap: 6, alignItems: 'flex-end' }}>
      <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </View>
      </TouchableOpacity>
      </View> 

      <View style={[styles.bottomMessage, { marginTop: 280, backgroundColor:Colors.lightGray, flexDirection: 'row', gap: 3 }]}>
      <AntDesign name="exclamationcircle" size={14} color='#626D77' />
      <Text style={{ color: Colors.gray }}>
           Our payment service provider require you to complete
            an Identity check as part of mandatory regulatory
            requirements. If you don't complete this check when 
           required, you'll be restricted from making withdrawals
      </Text>  
      </View>
      </View>
      </View>
      </Modal>

      
      {/* Dialog box when you click the (Bank Account Added) */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible2(false)}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.linkHeader}>Add a bank account</Text>
        <Text style={{ color: 'black', fontSize: 14, textAlign:'center',marginTop:20, marginBottom:40}}>Complete these steps to withdraw cash to your bank account when you start making sales</Text>
        
        <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>Full Name</Text>
         <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>Country</Text>
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={text => setCountry(text)}
      />

      <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>Account Number or IBAN</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={accountNumber}
        onChangeText={text => setAccountNumber(text)}
      />

      <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>Account Type</Text>
      <Picker
        style={styles.input}
        selectedValue={accountType}
        onValueChange={(itemValue:string, itemIndex:number) => setAccountType(itemValue)}
      >
        <Picker.Item label="Select Account Type" value="" />
        <Picker.Item label="Savings" value="savings" />
        <Picker.Item label="Checking" value="checking" />
        <Picker.Item label="Credit" value="credit" />
      </Picker>
    </View>
      
      

      <View style={[styles.bottomMessage]}>
            
        <TouchableOpacity style={[ styles.setWalletButton, { backgroundColor: "#031A6B", marginVertical: 25 , paddingHorizontal:120} ]} onPress={() =>{ setModalVisible2(false); setModalVisible1(false)}}>
          <Text style={[defaultStyles.buttonTextSmall, { color: "white" }]}   >
          Complete
          </Text>
        </TouchableOpacity>
        
      </View>   
      </Modal>



      {/* Dialog box when you click the (see all) */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(false);
        }}
      >

        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible3(false)}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.linkHeader}>Lastest Transactions</Text>

        <Text style={{ color: Colors.gray, fontSize: 14, textAlign:'center', marginTop:300}}>
          There are no transactions at the moment
        </Text>
        
        
      

     

     
    </View>
      </Modal>

    </ScrollView>
  );

};

const styles = StyleSheet.create({

linkHeader: {
  fontSize: 25,
  textAlign:"center",
  fontWeight: 'bold',
  margin: 20,
  marginBottom: 10,
},
wallet: {
  marginHorizontal: 19,
  padding: 14,
  marginTop:17,
  backgroundColor: '#fff',
  borderRadius: 16,
  gap: 0,
},
setWalletButton: {
  paddingHorizontal: 20,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
},
  account1: {
    margin: 20,
    alignItems: 'center',
  },
  bottomMessage: {
    marginHorizontal: 10,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 13,
    gap: 20,
  },

  bankVerify0: {
    marginTop: 60,
    alignItems: 'center',
  },
 
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  setPriceButton: {
    paddingHorizontal: 24,
    height: 60,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setPriceNum: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '500',
  },

  pendingBalance: {
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: '#D8DCE2'
  },
  bankVerify: {
    paddingHorizontal: 16,
    height: 70,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
    backgroundColor: '#D8DCE2'
  },

  seeAll: {
    color:Colors.primary, 
    paddingRight: 21, 
    paddingBottom: 13, 
    fontWeight: '500',
  },



  modalContainer: {
    flex: 1,
    marginTop:30,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    height:70,
    width:70,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  bankIcon: {
    width: 40,
    height: 40,
    borderRadius: 90,
    backgroundColor: '#031A6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overView: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.gray,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 23,
    marginTop:7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 7,
  },
 

});
export default Page;

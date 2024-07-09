import { useAuth, useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { Ionicons, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultStyles } from '@/constants/Styles';
// import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon';

const ICONS = [
  {
    name: 'Default',
    icon: require('@/assets/images/icon.png'),
  },
  {
    name: 'Dark',
    icon: require('@/assets/images/icon-dark.png'),
  },
  {
    name: 'Vivid',
    icon: require('@/assets/images/icon-vivid.png'),
  },
];

const Page = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [edit, setEdit] = useState(false);

  const [generatedLink, setGeneratedLink] = useState('');
  
  // Function to generate a random link
  const generateLink = () => {
    setPressLink(true); 
    const randomString1 = Math.random().toString(36).substring(7); // Generates a random string
    const randomString2 = Math.random().toString(36).substring(7); // Generates a random string
    setGeneratedLink(`unlockin.me/${randomString1}/${randomString2}`);
  };
const generateButton = "Press to generate link"
const [pressLink, setPressLink] = useState(false)
  const [activeIcon, setActiveIcon] = useState('Default');

  useEffect(() => {
    // const loadCurrentIconPref = async () => {
    //   const icon = await getAppIcon();
    //   console.log('🚀 ~ loadCurrentIconPref ~ icon:', icon);
    //   setActiveIcon(icon);
    // };
    // loadCurrentIconPref();
  }, []);

  const onSaveUser = async () => {
    try {
      await user?.update({ firstName: firstName!, lastName: lastName! });
      setEdit(false);
    } catch (error) {
      console.error(error);
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      console.log(base64);

      user?.setProfileImage({
        file: base64,
      });
    }
  };

  // const onChangeAppIcon = async (icon: string) => {
  //   await setAppIcon(icon.toLowerCase());
  //   setActiveIcon(icon);
  // };

  return (
    <ScrollView style={{marginBottom:50}}>
    <BlurView
      intensity={0}
      tint={'dark'}
      style={{ flex: 1, paddingTop: 100, backgroundColor: 'white' }}>
      

      <View style={styles.actions}>
      
      <View style={styles.affiliatedBlock}>  
        <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
          <View style={{ flex: 1, gap: 6 }}>
            <Text style={{ fontWeight: '600', color: 'white', fontSize:25 }}>Affiliated Users</Text>
            <Text style={{ color: 'white' ,fontSize:15}}>You will receive 10% of the earnings of any new user that registers using this link.</Text>
          
            <View style={styles.genLink1}>
            <TouchableOpacity onPress={generateLink} style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
  
            <View style={{ flex: 1, gap: 6 }}>
            <TextInput value={pressLink?generatedLink:generateButton} style={{  color: 'white', fontSize:16, paddingLeft:4 }}/>
            </View>

            <View style={{  alignItems: 'flex-end' }}>
            <TouchableOpacity style={[defaultStyles.copyButton,{ backgroundColor: '#212121', }]}>
            <Text style={[styles.copyButtonText, { color: "white" }]}>
              <FontAwesome6 name="copy" size={16} color="white"  /> Share link</Text>
            </TouchableOpacity>
            </View>

            </TouchableOpacity>
            </View> 


          </View>
        </TouchableOpacity>
       </View>


      <View style={styles.collectionBlock}>  
        <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
          <View style={{ flex: 1, gap: 6 }}>
            <Text style={{ fontWeight: '600', color: 'black', fontSize:25 }}>My Collection</Text>
            <Text style={{ color: Colors.gray ,fontSize:15}}>One link, all your media, more income</Text>
          </View>
          
          <TouchableOpacity  style={[styles.buttonPre]}>
          <AntDesign name="eye" size={18} color='#626D77' />
           <Text > Preview</Text>
          </TouchableOpacity>
            
          
        </TouchableOpacity>
       </View>



      <Text style={{ fontWeight: '700', color: Colors.dark, fontSize:18.5,marginTop:10,marginBottom:10 }}>Account Settings</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'black', fontSize: 17.5 }}>Personal Informations</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
          
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'black', fontSize: 17.5 }}>Affiliated Users</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'black', fontSize: 17.5 }}>Bank Account</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
          
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'black', fontSize: 17.5 }}>Dynamic Links</Text>
        </TouchableOpacity>

        <Text style={{ fontWeight: '700', color: Colors.dark, fontSize:18.5,marginTop:30,marginBottom:10 }}>Support</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'black', fontSize: 17.5 }}>Frequently asked questions</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
          
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'black', fontSize: 17.5 }}>Contact us</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
          
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'black', fontSize: 17.5 }}>Give us feedback</Text>
        </TouchableOpacity>
        
        <Text style={{ fontWeight: '700', color: Colors.dark, fontSize:18.5,marginTop:30,marginBottom:10 }}>Legal</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'black', fontSize: 17.5 }}>Privacy Policy</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
          
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'black', fontSize: 17.5 }}>Terms of use</Text>
        </TouchableOpacity>

        <Text style={{ fontWeight: '700', color: Colors.dark, fontSize:18.5 ,marginTop:30,marginBottom:10}}>Danger Zone</Text>

        <TouchableOpacity style={styles.btn} onPress={() => signOut()}>      
          <Text style={{ color: 'black', fontSize: 17.5 }}>Log out</Text>
        </TouchableOpacity>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
          
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'red', fontSize: 17.5 }}>Delete Account</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.btn}>
          <Ionicons name="megaphone" size={24} color={'#fff'} />
          <Text style={{ color: '#fff', fontSize: 18, flex: 1 }}>Inbox</Text>
          <View
            style={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>14</Text>
          </View>
        </TouchableOpacity> */}
      </View>

     
    </BlurView>
    </ScrollView>);
};

const styles = StyleSheet.create({
  editRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  buttonPre: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 9,
    paddingHorizontal: 17,
    borderRadius: 24, // Adjust the radius to make curved edges
  },
  iconPre: {
    marginRight: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  captureBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },

  affiliatedBlock: {
    padding: 14,
    backgroundColor: Colors.primary,
    borderRadius: 11,
  },

  collectionBlock: {
    padding: 14,
    backgroundColor: Colors.lightGray,
    borderRadius: 11,
    marginBottom:18,
    marginTop:18
  },

  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
  inputField: {
    width: 140,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },

  genLink1: {
    paddingHorizontal: 10,
    marginTop:8,
    height: 55,
    borderRadius:50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  actions: {
    backgroundColor: 'rgba(256, 256, 256, 0.1)',
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  btn: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 14,
    flexDirection: 'row',
    gap: 20,
  },
});
export default Page;

import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Modal, Switch} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Currency } from '@/interfaces/crypto';
import { Link } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { AntDesign, Entypo, Feather, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Directions } from 'react-native-gesture-handler';
import { Video, ResizeMode } from 'expo-av';
import { useAssets } from 'expo-asset';
import { BlurView } from 'expo-blur';

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [modalVisible, setModalVisible] = useState(false);
  const [linkData, setLinkData] = useState({
    date: "22 Dec",
    expireDate: "Sept 11",
    earning:"0.00"
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  



  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ paddingTop: headerHeight }}>
      <Text style={styles.linkHeader}>Links</Text>
      <View style={styles.linkBlock}>
        
          
            <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }} onPress={()=>{setModalVisible(true)}}>
              <Image source={require("../../../assets/images/icon-dark.png")} style={{ width: 60, height: 60 }} />
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>{linkData.date}</Text>
                <Text style={{ color: Colors.gray ,fontSize:12}}>{linkData.expireDate}</Text>
              </View>
              <View style={{ gap: 6, alignItems: 'flex-end' }}>
                <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>{linkData.earning}</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                <AntDesign name="eye" size={18} color='#626D77' />
                  <Text
                    style={{ color: Colors.gray , fontSize:12 }}>
                    Earning
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
      </View>


      {/* Dialog box when you click the (particular link) */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
          <View style={styles.modalContainer}>

            
        <View style={[styles.modalContainerRowHeader,{marginBottom:10}]}>

        <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible(false)} >
        <Ionicons name="chevron-back" size={25} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={[ styles.generateLinkButton, { backgroundColor: Colors.lightGray  }, ]}>
          <Text style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}>{linkData.date}</Text>
        </TouchableOpacity> 

        <TouchableOpacity >
        <View style={[styles.circle]}>
        <Feather name="more-horizontal" size={24} color="black" />
        </View>
        </TouchableOpacity>
        
        </View>
        






        {false && (<View style={styles.containerVideo}>
  
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          // isLooping
          // shouldPlay
          source={require('@/assets/videos/intro.mp4')}
          style={styles.videoVideo}
        />
        
        <View style={{  padding: 15, alignItems:"flex-end" }}>
        <View style={[styles.circleEye]}>
        <AntDesign name="eye" size={24} color="white" />
        </View>
        </View>

        <View
          style={[styles.pillButton, { flex: 1,  }]}>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Unlock For</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 52, fontWeight: '600' }}>Rs500</Text>
          </TouchableOpacity>

        </View>
    
    </View>)}







  { true && (
  <View style={styles.containerVideo}>
  
  
  <Image
    resizeMode={ResizeMode.COVER}
    source={require('../../../assets/images/icon-dark.png')}
    style={styles.videoVideo}
  />
  <BlurView intensity={1000} tint="dark" style={[StyleSheet.absoluteFill,]} />
  
  <View style={{  padding: 15, alignItems:"flex-end" }}>
  <View style={[styles.circleEye]}>
  <AntDesign name="eye" size={24} color="white" />
  </View>
  </View>

  <View
    style={[styles.pillButton, { flex: 1,  }]}>

    <Entypo name="controller-play" size={140} color="white" />

    <TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Unlock For</Text>
    </TouchableOpacity>

    <TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 52, fontWeight: '600' }}>Rs500</Text>
    </TouchableOpacity>

  </View>

</View>
  )}



        <View style={[styles.modalContainerRow,{marginTop:30}]}>

        <View style={{ gap: 6, alignItems: 'center' }}>

          <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:15 }}>Price</Text>

          <View style={{ flexDirection: 'row', gap: 4 }}>
          <Text style={{ color: Colors.gray , fontSize:12 }}>Rs0.00</Text>
        </View>

        </View>


        <View style={{ gap: 6, alignItems: 'center' }}>

          <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:15 }}>Link clicks</Text>

          <View style={{ flexDirection: 'row', gap: 4 }}>
          <Text style={{ color: Colors.gray , fontSize:12 }}>Rs0.00</Text>
        </View>

        </View>


        <View style={{ gap: 6, alignItems: 'center' }}>

          <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:15 }}>Unlockins</Text>

          <View style={{ flexDirection: 'row', gap: 4 }}>
          <Text style={{ color: Colors.gray , fontSize:12 }}>Rs0.00</Text>
        </View>

        </View>


        <View style={{ gap: 6, alignItems: 'center' }}>

          <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:15 }}>Total earnings</Text>

          <View style={{ flexDirection: 'row', gap: 4 }}>
          <Text style={{ color: Colors.gray , fontSize:12 }}>Rs0.00</Text>
        </View>

        </View>

        

       
                      
        </View>



        <View style={[styles.modalContainerRow,{marginTop:30},]}>

        <TouchableOpacity style={[styles.circle1]}>
        <Feather name="more-horizontal" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={[defaultStyles.pillButtonSmall,{ backgroundColor: Colors.gray, }]}>
        <Text style={[styles.copyButtonText, { color: "white" }]}>
          <FontAwesome6 name="copy" size={16} color="white" /> Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[defaultStyles.pillButtonSmall,{ backgroundColor: Colors.primary, }]}>
        <Text style={[styles.copyButtonText, { color: "white" }]}>
        <MaterialIcons name="library-add" size={14} color="white" /> Add to Story</Text>
        </TouchableOpacity>
                      
        </View>



      <View style={styles.bankVerify0}>
        
      <View style={styles.bankVerify}>
      <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
        
      <TouchableOpacity style={styles.bankIcon}>
      <MaterialCommunityIcons name="view-grid-plus" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ flex: 1, gap: 6 }}>
      <Text style={{ fontWeight: '600', color: Colors.dark, fontSize:16 }}>Add to Collection</Text>
      </View>

      <View style={{ gap: 6, alignItems: 'flex-end' }}>
      <Switch
        trackColor={{false: '#767577', true: Colors.primary}}
        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
        thumbColor={isEnabled ? 'white' : 'white'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled} />
      </View>

      </TouchableOpacity>
      </View> 

      </View>
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
copyButtonText: {
  color: '#fff',
  fontSize: 15,
  fontWeight: '400',
},
linkBlock: {
  marginHorizontal: 20,
  padding: 14,
  marginTop:25,
  backgroundColor: '#D8DCE2',
  borderRadius: 16,
  
  gap: 20,
},

modalContainer: {
  flex: 1,
  backgroundColor: '#fff',
  marginTop:40,
  padding: 20,
},

modalContainerRowHeader:{
  flexDirection:"row",
  justifyContent:"space-between"
  
},

modalContainerRow:{
  flexDirection:"row",
  justifyContent:'space-around'
  
},
pillButton: {
  padding: 10,
  marginTop:30,
  height: 60,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
},

backButton: {
  display: 'flex',
  // position: 'absolute',
  height: 70,
  width: 70,
  top: 10,
  // left: 2,
  zIndex: 1,
},
Generate: {
  
  backgroundColor: '#fff',
  borderRadius: 16,
  gap: 0,
},
generateLinkButton: {
  paddingHorizontal: 20,
  height: 42,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
},
circle: {
  width: 42,
  height: 42,
  borderRadius: 45, // half of width and height to make it circular
  backgroundColor: Colors.lightGray, // gray color
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft:28,
  
},
circle1: {
  width: 43,
  height: 43,
  borderRadius: 45, // half of width and height to make it circular
  backgroundColor: Colors.lightGray, // gray color
  alignItems: 'center',
  justifyContent: 'center',
  
},

circleEye: {
  width: 35,
  height: 35,
  borderRadius: 45, // half of width and height to make it circular
  backgroundColor: Colors.primary, // gray color
  alignItems: 'center',
  justifyContent: 'center',
 
},

bankVerify0: {
  marginTop: 60,
  alignItems: 'center',
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

bankIcon: {
  width: 40,
  height: 40,
  borderRadius: 90,
  backgroundColor: "#E0F900",
  justifyContent: 'center',
  alignItems: 'center',
},


containerVideo: {
  flex: 1,
  justifyContent: 'space-between',
  
},
videoVideo: {
  width: '100%',
  height: '100%',
  position: 'absolute',
 
},
headerVideo: {
  fontSize: 36,
  fontWeight: '900',
  textTransform: 'uppercase',
  color: 'white',
},
buttonsVideo: {
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 20,
  marginBottom: 60,
  paddingHorizontal: 20,
},


});
export default Page;

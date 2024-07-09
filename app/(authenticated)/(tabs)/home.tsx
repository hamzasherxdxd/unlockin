import Dropdown from "@/components/Dropdown";
import RoundBtn from "@/components/RoundBtn";
import WidgetList from "@/components/SortableList/WidgetList";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useBalanceStore } from "@/store/balanceStore";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Image,
  Modal,
  LogBox,
} from "react-native";
// import Clipboard from '@react-native-clipboard/clipboard';
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";
import { ResizeMode } from "expo-av";
import { Switch } from "react-native-gesture-handler";

const Page = () => {
  LogBox.ignoreAllLogs();
  // const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();
  const headerHeight = useHeaderHeight();
  const [price, setPrice] = useState(0);
  const [editing, setEditing] = useState(false);
  const [media, setMedia] = useState(null);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const [generateLinkState, setGenerateLinkState] = useState(false);
  const [generateButtonState, setGenerateButtonState] = useState(true);

  const [addMedia, setAddMedia] = useState(true);
  const [showMedia, setShowMedia] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [generatedLink, setGeneratedLink] = useState("");

  // Function to generate a random link
  const generateLink = () => {
    setGenerateLinkState(true);
    setGenerateButtonState(false);
    const randomString1 = Math.random().toString(36).substring(7); // Generates a random string
    const randomString2 = Math.random().toString(36).substring(7); // Generates a random string
    setGeneratedLink(`unlockin.me/${randomString1}/${randomString2}`);
  };

  const copyToClipboard = () => {
    (Clipboard as any).setString(generatedLink);
    alert("Link copied to clipboard!");
  };

  // \\\DOB
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    setShowMedia(true);
    setAddMedia(false);
  };

  const handlePress = () => {
    setEditing(true);
  };

  const handleChange = (text: string) => {
    // Extracting the numerical value without 'Rs' and ensuring it's a valid number
    const newPrice = parseFloat(text.replace("Rs ", ""));
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
    }
  };

  const messageAlert = () => {
    alert("Media is not selected!");
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      {addMedia && (
        <View style={styles.account}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.addMediaButton}
              onPress={loggedIn ? pickMedia : toggleDialog}
            >
              <AntDesign name="plus" size={70} color="white" />
            </TouchableOpacity>
            {media && (
              <Image
                source={{ uri: media }}
                style={{ width: 200, height: 200, marginTop: 20 }}
              />
            )}
          </View>
          <Text style={styles.addMediaHeader}>Add Media</Text>
          <Text style={{ color: Colors.gray, fontSize: 15.5 }}>All kind</Text>
        </View>
      )}

      {showMedia && (
        <View style={styles.modalContainerHome}>
          <View style={styles.containerVideoHome}>
            <Image
              resizeMode={ResizeMode.COVER}
              source={require("../../../assets/images/icon-dark.png")}
              style={styles.videoVideoHome}
            />

            <TouchableOpacity
              style={{ padding: 15, alignItems: "flex-end" }}
              onPress={() => {
                setShowMedia(false);
                setAddMedia(true);
                setGenerateLinkState(false);
                setGenerateButtonState(true);
                setPrice(0);
              }}
            >
              <View style={[styles.circleEyeHome]}>
                <Entypo name="cross" size={24} color="white" />
              </View>
            </TouchableOpacity>

            <View style={[styles.pillButtonHome, { flex: 1 }]}></View>
            <View style={{ padding: 15, alignItems: "flex-end" }}>
              <View style={[styles.circleEyeHome]}>
                <AntDesign name="eye" size={24} color="white" />
              </View>
            </View>
          </View>
        </View>
      )}

      {generateButtonState && (
        <>
          <View style={styles.account1}>
            <Text style={{ color: Colors.gray, fontSize: 15.5 }}>
              Set a price
            </Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.setPriceButton,
                  { backgroundColor: Colors.lightGray, marginVertical: 20 },
                ]}
              >
                <TextInput
                  style={[styles.setPriceNum, { color: Colors.dark }]}
                  keyboardType="numeric"
                  value={editing ? `${price}` : `Rs ${price}`}
                  onChangeText={handleChange}
                  onBlur={() => setEditing(false)}
                  onFocus={() => setEditing(true)}
                  selectTextOnFocus={true}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Generate}>
            <TouchableOpacity
              style={[
                styles.generateLinkButton,
                { backgroundColor: Colors.lightGray, marginVertical: 5 },
              ]}
              onPress={showMedia ? generateLink : messageAlert}
            >
              <Text
                style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}
              >
                Generate Link
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {generateLinkState && (
        <>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text style={styles.linkGenerateHeader}>
              Attach the link to your story
            </Text>

            <View style={[styles.modalContainerRow2]}>
              <View style={styles.genLink0}>
                <View style={styles.genLink1}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      gap: 14,
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 1, gap: 6 }}>
                      <TextInput
                        value={generatedLink}
                        style={{ color: "black", fontSize: 16 }}
                      />
                    </View>

                    <View style={{ alignItems: "flex-end" }}>
                      <TouchableOpacity
                        style={[
                          defaultStyles.copyButton,
                          { backgroundColor: Colors.gray },
                        ]}
                      >
                        <Text
                          style={[styles.copyButtonText, { color: "white" }]}
                        >
                          <FontAwesome6
                            name="copy"
                            size={16}
                            color="white"
                            onPress={copyToClipboard}
                            disabled={!generatedLink}
                          />{" "}
                          Copy
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[styles.modalContainerRow, { marginTop: 10 }]}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: Colors.primary },
                ]}
              >
                <Text style={[styles.copyButtonText, { color: "white" }]}>
                  <MaterialIcons name="library-add" size={14} color="white" />{" "}
                  Add to Story
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.circle1]}>
                <Feather name="more-horizontal" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.circle1]}>
                <FontAwesome5 name="telegram-plane" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.circle1]}>
                <FontAwesome6 name="x-twitter" size={23} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.bankVerify0}>
              <View style={styles.bankVerify}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible1(true);
                  }}
                  style={{
                    flexDirection: "row",
                    gap: 14,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity style={styles.bankIcon}>
                    <MaterialCommunityIcons
                      name="view-grid-plus"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>

                  <View style={{ flex: 1, gap: 6 }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: Colors.dark,
                        fontSize: 16,
                      }}
                    >
                      Add this link to your Collection
                    </Text>
                  </View>

                  <View style={{ gap: 6, alignItems: "flex-end" }}>
                    <Entypo name="chevron-right" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}

      {/* Dialog when you click (Generate Link) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDialogVisible}
        onRequestClose={toggleDialog}
      >
        <View style={styles.modalContainerGenerateLink}>
          <View style={styles.dialogGenerateLink}>
            {/* Content of your dialog goes here */}
            <View style={styles.containerHalfDialog}>
              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  {
                    height: 30,
                    gap: 10,
                    marginTop: 15,
                    paddingHorizontal: 20,
                    backgroundColor: Colors.primary,
                  },
                ]}
              >
                <Image
                  source={require("../../../assets/images/halfDialogLogo.png")}
                  style={styles.logo}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={styles.descriptionTextHalfDialog}>
                  Create an account or Log in
                </Text>
              </View>

              <TouchableOpacity
                // onPress={() => onSignIn(SignInType.Email)}
                onPress={() => setModalVisible(true)}
                style={[
                  styles.pillButtonHalfDialog,
                  {
                    flexDirection: "row",
                    gap: 16,
                    marginTop: 20,
                    backgroundColor: "#fff",
                  },
                ]}
              >
                <Ionicons name="mail" size={24} color={"#000"} />
                <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
                  Continue with email{" "}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => onSignIn(SignInType.Google)}
                style={[
                  styles.pillButtonHalfDialog,
                  {
                    flexDirection: "row",
                    gap: 16,
                    marginTop: 20,
                    backgroundColor: "#fff",
                  },
                ]}
              >
                <Ionicons name="logo-google" size={24} color={"#000"} />
                <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
                  Continue with Google{" "}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => onSignIn(SignInType.Apple)}
                style={[
                  styles.pillButtonHalfDialog,
                  {
                    flexDirection: "row",
                    gap: 16,
                    marginTop: 20,
                    backgroundColor: "black",
                  },
                ]}
              >
                <Ionicons name="logo-apple" size={24} color={"white"} />
                <Text style={[defaultStyles.buttonText, { color: "white" }]}>
                  Continue with Apple{" "}
                </Text>
              </TouchableOpacity>
              <View style={{ marginTop: "auto" }}>
                <Text
                  style={{ color: "white", fontSize: 14, textAlign: "center" }}
                >
                  By signing up you agree to our{" "}
                  <Text style={styles.underLine}>Terms of use </Text>and{" "}
                  <Text style={styles.underLine}>privacy policy</Text>{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Dialog box when you click the (Continue with email) */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.linkHeader}>Account Information</Text>
          <Text
            style={{
              color: "black",
              fontSize: 14,
              textAlign: "center",
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            Provide these informations to start accepting payments
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={(text) => setCountry(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <Text
            style={{
              fontWeight: "600",
              color: Colors.dark,
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Date of Birth
          </Text>
          <View>
            <View style={styles.containerDob}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputDob}
                  placeholder="D"
                  keyboardType="numeric"
                  maxLength={2}
                  value={date}
                  onChangeText={(text) => setDate(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputDob}
                  placeholder="M"
                  keyboardType="numeric"
                  maxLength={2}
                  value={month}
                  onChangeText={(text) => setMonth(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputDob}
                  placeholder="Y"
                  keyboardType="numeric"
                  maxLength={4}
                  value={year}
                  onChangeText={(text) => setYear(text)}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.bottomMessage]}>
          <TouchableOpacity
            style={[
              styles.setWalletButton,
              {
                backgroundColor: "#031A6B",
                marginBottom: 25,
                paddingHorizontal: 120,
              },
            ]}
            onPress={() => {
              setModalVisible(false);

              setLoggedIn(true);
              setDialogVisible(false);
            }}
          >
            <Text style={[defaultStyles.buttonTextSmall, { color: "white" }]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Dialog box when you click the () button */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(false);
        }}
      >
        <View style={styles.modalContainer}>
          {/* <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible1(false)}>
          <AntDesign name="close" size={26} color="black" />
        </TouchableOpacity> */}

          <Text style={[styles.linkHeader, { marginTop: 40 }]}>
            Gather multiple links in one place with collection
          </Text>
          <Text
            style={{
              paddingHorizontal: 20,
              color: Colors.gray,
              fontSize: 16,
              textAlign: "center",
              marginTop: 25,
            }}
          >
            Host your media on 1 link and share it with your link in bio tool
          </Text>

          <Image
            source={require("../../../assets/images/mobile.png")}
            style={{
              alignSelf: "center",
              marginTop: 50,
              height: 600,
              width: 300,
            }}
          />

          <View style={[styles.bottomVerButton]}>
            <TouchableOpacity
              style={[
                styles.setWalletButton,
                { backgroundColor: "#031A6B", paddingHorizontal: 70 },
              ]}
              onPress={() => {
                setModalVisible1(false);
                setModalVisible2(true);
              }}
            >
              <Text style={[defaultStyles.buttonTextSmall, { color: "white" }]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Dialog box when you click the () button */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(false);
        }}
      >
        <View style={styles.modalContainer}>
          {/* <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible1(false)}>
          <AntDesign name="close" size={26} color="black" />
        </TouchableOpacity> */}

          <Text style={[styles.linkHeader, { marginTop: 40 }]}>
            How to add link to collection and share it to your fans
          </Text>
          <Text
            style={{
              paddingHorizontal: 20,
              color: Colors.gray,
              fontSize: 16,
              textAlign: "center",
              marginTop: 22,
              marginBottom: 10,
            }}
          >
            Host your media on 1 link to generate more
          </Text>

          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Image
              source={require("../../../assets/images/block-02.png")}
              style={{ width: 150, height: 150 }}
            />

            <View style={{ padding: 26 }}>
              <TouchableOpacity style={styles.LinkIcon}>
                <Text style={{ color: "white" }}>1</Text>
              </TouchableOpacity>
              <Text>
                Add content to your collection{"\n"}when you create a link
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Image
              source={require("../../../assets/images/block-01.png")}
              style={{ width: 150, height: 150 }}
            />

            <View style={{ padding: 26 }}>
              <TouchableOpacity style={styles.LinkIcon}>
                <Text style={{ color: "white" }}>2</Text>
              </TouchableOpacity>
              <Text>
                Copy the link to My Collection{"\n"}from the "Account" page
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Image
              source={require("../../../assets/images/block-03.png")}
              style={{ width: 150, height: 150 }}
            />

            <View style={{ padding: 26 }}>
              <TouchableOpacity style={styles.LinkIcon}>
                <Text style={{ color: "white" }}>3</Text>
              </TouchableOpacity>
              <Text>
                Add your My Collection link{"\n"}to your favorite "link in bio"
                {"\n"}tool
              </Text>
            </View>
          </View>

          <View style={[styles.bottomVerButton]}>
            <TouchableOpacity
              style={[
                styles.setWalletButton,
                { backgroundColor: "#031A6B", paddingHorizontal: 70 },
              ]}
              onPress={() => {
                setModalVisible2(false);
                setModalVisible3(true);
              }}
            >
              <Text style={[defaultStyles.buttonTextSmall, { color: "white" }]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Dialog box when you click the () button */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(false);
        }}
      >
        <View style={styles.modalContainer}>
          {/* <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible1(false)}>
          <AntDesign name="close" size={26} color="black" />
        </TouchableOpacity> */}

          <Text
            style={[styles.linkHeader, { marginTop: 40 }, { marginBottom: 35 }]}
          >
            The power of unlockin in a single link
          </Text>

          <View
            style={{
              flexDirection: "row",
              paddingRight: 35,
              paddingLeft: 25,
              marginVertical: 17,
            }}
          >
            <Ionicons name="eye-off" size={20.5} color="black" />
            <Text style={{ color: "black", fontSize: 16, paddingLeft: 5 }}>
              You can remove a link from your collection at any time
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingRight: 35,
              paddingLeft: 25,
              marginVertical: 17,
            }}
          >
            <Ionicons name="shield-checkmark-sharp" size={20.5} color="black" />
            <Text
              style={{
                color: "black",
                fontSize: 16,
                textAlign: "left",
                paddingLeft: 5,
              }}
            >
              No one can access your collection if you don't share the link.
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingRight: 35,
              paddingLeft: 25,
              marginVertical: 17,
            }}
          >
            <MaterialCommunityIcons name="web" size={20.5} color="black" />
            <Text
              style={{
                color: "black",
                fontSize: 16,
                textAlign: "left",
                paddingLeft: 5,
              }}
            >
              Compatible with all tools such as Linktree, Beacons etc
            </Text>
          </View>

          <Image
            source={require("../../../assets/images/mobileHalf.png")}
            style={{
              alignSelf: "center",
              marginTop: 60,
              height: 380,
              width: 330,
            }}
          />

          <View style={[styles.bottomVerButton]}>
            <TouchableOpacity
              style={[
                styles.setWalletButton,
                { backgroundColor: "#031A6B", paddingHorizontal: 70 },
              ]}
              onPress={() => {
                setModalVisible3(false);
              }}
            >
              <Text style={[defaultStyles.buttonTextSmall, { color: "white" }]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  pad: {
    paddingHorizontal: 30,
  },

  modalContainerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  modalContainerRow2: {
    justifyContent: "space-around",
  },

  circle1: {
    width: 43,
    height: 43,
    borderRadius: 45, // half of width and height to make it circular
    backgroundColor: Colors.lightGray, // gray color
    alignItems: "center",
    justifyContent: "center",
  },
  containerDob: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputDob: {
    paddingHorizontal: 30,
    fontSize: 16,
  },

  bankIcon: {
    width: 40,
    height: 40,
    borderRadius: 90,
    backgroundColor: "#E0F900",
    justifyContent: "center",
    alignItems: "center",
  },

  LinkIcon: {
    width: 25,
    height: 25,
    borderRadius: 90,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  },

  circleEyeHome: {
    width: 35,
    height: 35,
    borderRadius: 45, // half of width and height to make it circular
    backgroundColor: Colors.primary, // gray color
    alignItems: "center",
    justifyContent: "center",
  },

  containerVideoHome: {
    flex: 1,
    justifyContent: "space-between",
  },

  copyButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "400",
  },

  videoVideoHome: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 20,
  },

  inputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 10,
  },
  account: {
    margin: 60,
    paddingTop: 24,
    alignItems: "center",
  },
  modalContainerHome: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  setWalletButton: {
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  pillButtonHome: {
    padding: 10,
    marginTop: 30,
    height: 220,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomMessage: {
    marginHorizontal: 10,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 13,
    gap: 20,
  },

  bottomVerButton: {
    marginHorizontal: 20,
    marginTop: "auto",
    paddingHorizontal: 15,
    paddingBottom: 18,
    backgroundColor: "transparent",
    borderRadius: 13,
    gap: 20,
  },
  account1: {
    margin: 15,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  linkHeader: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    marginBottom: 10,
  },

  linkGenerateHeader: {
    fontSize: 19,
    textAlign: "center",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 23,
    marginTop: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 7,
  },
  logo: {
    width: 230, // Adjust width and height as per your logo's dimensions
    height: 160,
    resizeMode: "contain",
  },

  bankVerify0: {
    marginTop: 30,
    alignItems: "center",
  },
  bankVerify: {
    paddingHorizontal: 16,
    height: 70,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 0,
    backgroundColor: "#D8DCE2",
  },

  genLink0: {
    marginTop: 15,
    alignItems: "center",
  },
  genLink1: {
    paddingHorizontal: 20,
    height: 55,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#D8DCE2",
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  Generate: {
    marginHorizontal: 19,
    padding: 14,
    marginTop: 17,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 0,
  },
  underLine: {
    textDecorationLine: "underline",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  setPriceNum: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "500",
  },
  setPriceButton: {
    paddingHorizontal: 24,
    height: 60,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
  },
  containerHalfDialog: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 16,
    paddingTop: 12,
  },

  descriptionTextHalfDialog: {
    fontSize: 20,
    marginTop: 20,
    color: "white",
  },
  pillButtonHalfDialog: {
    padding: 10,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  generateLinkButton: {
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addMediaButton: {
    width: 150,
    height: 150,
    borderRadius: 90,
    backgroundColor: "#031A6B",
    justifyContent: "center",
    alignItems: "center",
  },
  addMediaHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  modalContainerGenerateLink: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialogGenerateLink: {
    backgroundColor: Colors.primary,
    marginTop: "auto",
    width: "100%",
    height: "55%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
});
export default Page;

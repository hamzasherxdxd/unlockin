import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { LogBox } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Page = () => {
  // const [countryCode, setCountryCode] = useState('+1');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  // const router = useRouter();
  // const { signUp } = useSignUp();

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const onSignUpPress = async () => {
    // if (!isLoaded) {
    //   return;
    // }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      signUp!.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push({
        pathname: "/verify/[phone]",
        params: { emailAddress: emailAddress },
      });

      // setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
    LogBox.ignoreAllLogs();
  };

  //   const fullPhoneNumber = `${countryCode}${phoneNumber}`;

  //   try {
  //     await signUp!.create({
  //       phoneNumber: fullPhoneNumber,
  //     });
  //     signUp!.preparePhoneNumberVerification();

  //     router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber } });
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //   }
  //   LogBox.ignoreAllLogs();
  // };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your Email. We will send you a confirmation code there
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Email"
            placeholderTextColor={Colors.gray}
            // keyboardType="numeric"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            // keyboardType="numeric"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <Link href={"/login"} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            emailAddress !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignUpPress}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

    //   <KeyboardAvoidingView
    //     style={{ flex: 1, marginTop: 80, padding: 0 }}
    //     behavior="padding"
    //     keyboardVerticalOffset={keyboardVerticalOffset}>

    //     <View style={defaultStyles.container}>
    //       <Text style={defaultStyles.header}>Let's get started!</Text>
    //       <Text style={defaultStyles.descriptionText}>
    //         Enter your phone number. We will send you a confirmation code there
    //       </Text>
    //       <View style={styles.inputContainer}>
    //         <TextInput
    //           style={styles.input}
    //           placeholder="Country code"
    //           placeholderTextColor={Colors.gray}
    //           value={countryCode}
    //         />
    //         <TextInput
    //           style={[styles.input, { flex: 1 }]}
    //           placeholder="Mobile number"
    //           placeholderTextColor={Colors.gray}
    //           keyboardType="numeric"
    //           value={phoneNumber}
    //           onChangeText={setPhoneNumber}
    //         />
    //       </View>

    //       <Link href={'/login'} replace asChild>
    //         <TouchableOpacity>
    //           <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
    //         </TouchableOpacity>
    //       </Link>

    //       <View style={{ flex: 1 }} />

    //       <TouchableOpacity
    //         style={[
    //           defaultStyles.pillButton,
    //           phoneNumber !== '' ? styles.enabled : styles.disabled,
    //           { marginBottom: 20 },
    //         ]}
    //         onPress={onSignup}>
    //         <Text style={defaultStyles.buttonText}>Sign up</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 15,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
export default Page;

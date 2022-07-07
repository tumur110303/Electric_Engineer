import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as Facebook from "expo-facebook";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { dark, darker, light, w400, w500 } from "../constants";
import logo from "../../assets/logo-white.png";

const LoginScreen: FC = () => {
  const logIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "757408645234463",
      });
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      console.log(result);
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={css.container}>
      <LinearGradient colors={[dark, darker]} style={css.background} />

      <View style={css.welcomeContainer}>
        <Image source={logo} style={css.logo} />
        <Text style={css.welcome}>Тавтай морил</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={css.loginContainer}
        onPress={() => navigation.navigate("Нүүр хуудас" as any)}
      >
        <Ionicons name="logo-facebook" size={25} color={light} />
        <Text style={css.loginText}>Нэвтрэх</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const css = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logo: {
    width: 200,
    height: 200,
  },
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 3,
  },
  welcome: {
    fontFamily: w500,
    fontSize: 30,
    textTransform: "uppercase",
    color: light,
    marginTop: 20,
  },

  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  loginText: {
    color: light,
    fontSize: 20,
    fontFamily: w400,
    textTransform: "uppercase",
    marginLeft: 5,
  },
});
